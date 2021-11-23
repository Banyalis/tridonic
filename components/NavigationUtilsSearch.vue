<template>
    <div class="NavigationUtilsSearch">
        <div class="NavigationUtilsSearch-input">
            <input
                v-model="searchInputValue"
                class="b-input"
                name="search-input"
                type="text"
                :placeholder="$translations.searchInputPlaceholder()"
                @keydown="onInputKeydown($event)"
            />
            <a
                href="/"
                class="NavigationUtilsSearch-inputArrow"
                :class="{ isActive: searchInputValue !== '' }"
            >
                <svg-icon name="arrow-right"></svg-icon>
            </a>
            <div
                class="NavigationUtilsSearch-inputClear"
                :class="{ isActive: searchInputValue !== '' }"
                @click="clearSearch"
            >
                {{ $translations.searchClearText() }}
            </div>
        </div>
        <div
            class="NavigationUtilsSearch-searchResults"
            :class="{ isActive: searchResults && searchResults.length }"
        >
            <div
                v-for="(searchResult, index) in getSearchResults"
                :key="index"
                class="NavigationUtilsSearch-searchResultsItem"
                :class="{ isActive: index === activeSearchResultNumber }"
            >
                <HiddenLink
                    :is-external="searchResult.link.isExternal"
                    :url="searchResult.link.url"
                ></HiddenLink>
                <span>{{ searchResult.link.title }}</span>
                <div
                    v-if="searchResult.tag"
                    class="NavigationUtilsSearch-searchResultsItemTag"
                >
                    <Tag :text="searchResult.tag" type="isYellow"></Tag>
                </div>
                <div
                    v-if="searchResult.fileExtension"
                    class="NavigationUtilsSearch-searchResultsItemExtension"
                >
                    <FileExtension
                        :extension="searchResult.fileExtension"
                    ></FileExtension>
                </div>
            </div>
        </div>
        <div
            class="NavigationUtilsSearch-popular"
            :class="{ isActive: searchInputValue === '' }"
        >
            {{ searchInputValue }}
            <NavigationMenuAdditionalLinks
                :link-list="popularSearchItems"
                :title="popularSearchItemsTitle"
            ></NavigationMenuAdditionalLinks>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { KEY_CODES } from '@/utils/constants';
import NavigationMenuAdditionalLinks from '@/components/NavigationMenuAdditionalLinks';
import FileExtension from '@/components/FileExtension';
import Tag from '@/components/Tag';
import HiddenLink from '@/components/HiddenLink';

export default {
    name: 'NavigationUtilsSearch',
    components: {
        HiddenLink,
        Tag,
        FileExtension,
        NavigationMenuAdditionalLinks
    },
    props: {
        popularSearchItemsTitle: {
            type: String,
            required: true,
            default: ''
        },
        popularSearchItems: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        isActive: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data() {
        return {
            searchInputValue: '',
            searchResults: [],
            activeSearchResultNumber: -1
        };
    },
    computed: {
        getSearchResults() {
            if (this.activeSearchResultNumber === -1) {
                return this.searchResults;
            }
            const searchResults = [...this.searchResults];
            const activeSearchResult =
                searchResults[this.activeSearchResultNumber];
            if (activeSearchResult) {
                activeSearchResult.isActive = true;
            }
            return searchResults;
        },
        ...mapState('search-mobile', ['isSearchPanelOpened']),
        ...mapState('locale', ['language', 'region'])
    },
    watch: {
        async searchInputValue() {
            if (this.searchInputValue === '') {
                this.searchResults = [];

                return;
            }
            const params = {
                searchValue: this.searchInputValue
            };
            this.searchResults = await this.$axios.$get(
                `${this.$config.baseURL}/${this.language}/${this.region}/search-autosuggest`,
                { params }
            );
        },
        isSearchPanelOpened() {
            if (!this.isSearchPanelOpened) {
                this.clearSearch();
            }
        },
        isActive() {
            if (this.isActive) {
                return;
            }
            this.clearSearch();
        }
    },
    methods: {
        clearSearch() {
            this.searchInputValue = '';
            this.searchResults = [];
            this.activeSearchResultNumber = -1;
        },
        onInputKeydown(event) {
            if (!event.keyCode) {
                return;
            }

            if (this.searchInputValue === '') {
                this.activeSearchResultNumber = -1;

                return;
            }

            if (event.keyCode === KEY_CODES.arrowUp) {
                if (this.activeSearchResultNumber === 0) {
                    this.activeSearchResultNumber =
                        this.searchResults.length - 1;
                    return;
                }
                this.activeSearchResultNumber--;

                return;
            }

            if (event.keyCode === KEY_CODES.arrowDown) {
                if (
                    this.activeSearchResultNumber ===
                    this.searchResults.length - 1
                ) {
                    this.activeSearchResultNumber = 0;
                    return;
                }

                this.activeSearchResultNumber++;

                return;
            }

            if (event.keyCode === KEY_CODES.enter) {
                // disabled until overlay exists
                // const url = this.searchResults[this.activeSearchResultNumber].url;
                //
                // if (!url) {
                //     return;
                // }
                // go to the url of current search result (open overlay)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.NavigationUtilsSearch {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;

    &-input {
        position: relative;
        padding-right: 20px;

        @include mobile {
            padding-right: 0;
        }

        input {
            @include title-small;
            border-color: $c-white;
            color: $c-white;
            line-height: (60 / 32);
            letter-spacing: -0.8px;

            &::placeholder {
                color: $c-white;
            }

            @include mobile {
                padding-bottom: 5px;
            }
        }

        &Arrow {
            display: block;
            position: absolute;
            top: 50%;
            width: 52px;
            height: 34px;
            transform: translate3d(0, -50%, 0);
            right: 13px;
            transition: $d-hover opacity;
            pointer-events: none;
            opacity: 0;

            &.isActive {
                opacity: 1;
                pointer-events: all;

                svg {
                    transform: none;
                }

                @include hover {
                    &:hover {
                        opacity: $v-hover-opacity;
                    }
                }
            }

            svg {
                width: 100%;
                height: 100%;
                transform: translate3d(-7px, 0, 0);
                transition: $d-hover transform;
            }

            @include mobile {
                display: none;
            }
        }

        &Clear {
            @include text-light;
            position: absolute;
            font-weight: $fw-medium;
            bottom: 6px;
            right: 0;
            color: $c-white;
            opacity: 0;
            pointer-events: none;
            transition: $d-hover opacity;
            display: none;

            @include mobile {
                display: block;
            }

            &.isActive {
                opacity: 1;
                pointer-events: all;
            }
        }
    }

    &-popular {
        position: absolute;
        bottom: 50px;
        opacity: 0;
        pointer-events: none;
        transition: $d-hover opacity;

        &.isActive {
            pointer-events: all;
            opacity: 1;
        }

        .NavigationMenuAdditionalLinks {
            padding-left: 0;
        }
    }

    &-searchResults {
        opacity: 0;
        pointer-events: none;
        transition: $d-hover opacity;

        &.isActive {
            opacity: 1;
            pointer-events: all;
        }

        &Item {
            position: relative;
            margin-top: 25px;
            @include text-small;
            line-height: (20 / 18);
            padding-right: 20px;
            color: $c-white;
            transition: $d-hover color;
            display: flex;
            align-items: center;

            @include mobile {
                padding-right: 0;
            }

            span {
                flex: 0 0 70%;
            }

            @include hover {
                &:hover {
                    color: $c-blue;

                    /deep/
                        .NavigationUtilsSearch-searchResultsItemExtension
                        svg {
                        fill: $c-blue;
                    }

                    .NavigationUtilsSearch-searchResultsItemTag {
                        opacity: $v-hover-opacity;
                    }
                }
            }

            &.isActive {
                color: $c-blue;

                /deep/ .NavigationUtilsSearch-searchResultsItemExtension svg {
                    fill: $c-blue;
                }

                .NavigationUtilsSearch-searchResultsItemTag {
                    opacity: $v-hover-opacity;
                }
            }

            &Tag {
                margin-left: auto;
                transition: $d-hover opacity;
            }

            &Extension {
                margin-left: auto;
                flex: 0;
            }
        }
    }
}
</style>
