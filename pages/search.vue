<template>
    <div class="SearchPage">
        <div class="SearchPage-header">
            <div class="SearchPage-container">
                <div class="SearchPage-filter">
                    <div class="SearchPage-filterInput">
                        <CommonSearchInput
                            v-model="searchInputValue"
                            search-id="result"
                            modifier="large"
                            @on-search-input="getResults"
                            @on-focus="onLeaveFocus"
                            @on-key-down="onInputKeyDown"
                        />
                        <div
                            v-if="prompts.length"
                            class="SearchPage-filterPrompt"
                        >
                            <!-- eslint-disable -->
                            <div
                                v-for="(item, index) in prompts"
                                :key="index"
                                class="SearchPage-filterPromptItem"
                                :class="{ isHighlight: index === highlight }"
                                v-html="onSetMark(item.title)"
                            ></div>
                            <!-- eslint-enable -->
                        </div>
                    </div>
                    <div
                        v-if="results && results.length"
                        class="SearchPage-filterInner"
                        :class="{ isActive: currentFilter !== '1' }"
                    >
                        <div class="SearchPage-filterList">
                            <div
                                v-for="(item, index) in filters"
                                :key="index"
                                class="SearchPage-filterListItem"
                                :class="{
                                    isActive: item.id == currentFilter
                                }"
                                @click="onSetFilter(item.id)"
                            >
                                <span
                                    class="SearchPage-filterListItemTitle"
                                    v-text="item.title"
                                ></span>
                                <span
                                    class="SearchPage-filterListItemCount"
                                    v-text="'(' + item.count + ')'"
                                ></span>
                            </div>
                        </div>
                        <filter-select
                            v-model="currentSorting"
                            :options="sorting"
                        ></filter-select>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="SearchPage-content"
            :class="{ isGray: currentFilter === '1' }"
        >
            <div class="SearchPage-container">
                <search-results-list
                    v-if="results && results.length"
                    :results="results"
                ></search-results-list>
                <div v-if="pagination" class="SearchPage-pagination">
                    <Pagination
                        :page-count="pagination.pageCount"
                        :active-page-number="currentPage"
                        @on-page-number-click="onPageChange"
                    />
                </div>
                <div
                    v-if="!results"
                    class="SearchPage-emptyMessage"
                    v-text="$translations.textEmptyResults()"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import { KEY_CODES, VUE_CUSTOM_EVENTS } from '@/utils/constants';
import CommonSearchInput from '@/components/CommonSearchInput';
import FilterSelect from '@/components/FilterSelect';
import SearchResultsList from '@/components/SearchResultsList';
import Pagination from '@/components/Pagination';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    name: 'SearchPage',

    components: {
        CommonSearchInput,
        FilterSelect,
        SearchResultsList,
        Pagination
    },

    mixins: [mixinOpenPopup],

    async fetch({ $config: { baseURL }, store }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const language = store.state.locale.language;
        const region = store.state.locale.region;

        const [filterList, resultsList] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/search/filters`),
            axios.get(`${baseURL}/${language}/${region}/search`)
        ]);
        store.commit('search-filters/init', filterList.data);
        store.commit('search-results/init', resultsList.data);
    },

    data() {
        return {
            searchInputValue: '',
            selected: {},
            highlight: -1,
            currentFilter: '0',
            currentSorting: 'relevance',
            sorting: [
                {
                    name: 'Sort by Relevance',
                    value: 'relevance'
                },
                {
                    name: 'Sort by Flagship',
                    value: 'flagship'
                },
                {
                    name: 'Sort by New',
                    value: 'new'
                },
                {
                    name: 'Sort by A-Z',
                    value: 'asc'
                },
                {
                    name: 'Sort by Z-A',
                    value: 'desc'
                }
            ],
            currentPage: 1
        };
    },

    computed: {
        ...mapState('search-filters', ['filters']),
        ...mapState('search-results', ['results', 'pagination', 'prompts']),
        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        searchInputValue(value) {
            if (value) {
                this.$axios
                    .get(
                        `${this.$config.baseURL}/${this.language}/${this.region}/search/prompts`,
                        {
                            params: {
                                searchValue: value
                            }
                        }
                    )
                    .then((response) => {
                        this.setPrompts(response.data);
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.log(error);
                        this.errored = true;
                    });
            } else {
                this.clearPrompts();
            }
        }
    },

    methods: {
        onLeaveFocus(isFocused) {
            if (!isFocused) {
                this.clearPrompts();
            }
        },

        onSetMark(word) {
            const regex = new RegExp('(' + this.searchInputValue + ')', 'gi');
            return word.replace(regex, '<span>$1</span>');
        },

        onInputKeyDown() {
            if (!event.keyCode) {
                return;
            }

            if (event.keyCode === KEY_CODES.arrowUp) {
                if (!this.searchInputValue && this.highlight === -1) return;
                this.highlight =
                    this.highlight - 1 < 0
                        ? this.prompts.length - 1
                        : this.highlight - 1;

                return;
            }

            if (event.keyCode === KEY_CODES.arrowDown) {
                if (!this.searchInputValue && this.highlight === -1) return;
                this.highlight = (this.highlight + 1) % this.prompts.length;

                return;
            }

            if (
                event.keyCode === KEY_CODES.enter &&
                this.prompts?.[this.highlight]
            ) {
                if (this.highlight === -1) return;
                this.selected = this.prompts[this.highlight];
                this.searchInputValue = this.selected.title;
                this.highlight = 0;

                this.$root.$emit(
                    VUE_CUSTOM_EVENTS.onInputChange,
                    this.searchInputValue
                );
            }
        },

        getResults(value, category) {
            this.clearPrompts();
            this.$axios
                .get(
                    `${this.$config.baseURL}/${this.language}/${this.region}/search`,
                    {
                        params: {
                            searchValue: value,
                            categoryValue: category
                        }
                    }
                )
                .then((response) => {
                    this.updateResults(response.data);
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.errored = true;
                });
        },

        onSetFilter(id) {
            this.currentFilter = id;
            this.getResults(id);
        },

        onSortingResults(option) {
            this.currentSort = option.value;
        },

        onPageChange(newPageNumber) {
            this.isResultItemsShown = false;
            this.currentPage = newPageNumber;

            setTimeout(() => {
                this.isResultItemsShown = true;
            });
        },

        ...mapMutations({
            updateResults: 'search-results/update',
            setPrompts: 'search-results/setPrompts',
            clearPrompts: 'search-results/clearPrompts'
        })
    }
};
</script>

<style lang="scss" scoped>
.SearchPage {
    width: 100%;

    &-container {
        width: 1160px;
        margin: 0 auto;
    }

    &-header {
        padding-top: 46px;
    }

    &-filter {
        &Input {
            position: relative;
        }

        &Prompt {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 19px;
            padding: 45px 80px 54px;
            background-color: $c-white;
            box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
            z-index: 10;

            &Item {
                @include text;

                color: #787585;

                &.isHighlight {
                    color: $c-blue;
                }

                & /deep/ span {
                    color: $c-black;
                }
            }
        }

        &Inner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 59px;
            padding-bottom: 21px;

            &.isActive {
                border-bottom: 1px solid #e4e4e4;
            }
        }

        &List {
            display: flex;

            &Item {
                @include text-light;

                position: relative;
                cursor: pointer;

                &:not(:last-child) {
                    margin-right: 32px;
                }

                &.isActive {
                    color: $c-purple;
                    font-weight: $fw-medium;

                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: -22px;
                        height: 2px;
                        background-color: $c-purple;
                    }
                }
            }
        }
    }

    &-content {
        padding: 42px 0 80px;

        &.isGray {
            border-top: 1px solid #e4e4e4;
            background-color: $c-gray--bg;
        }
    }

    &-pagination {
        margin-top: 39px;
    }

    &-emptyMessage {
        @include text;

        max-width: 400px;
        margin: 133px auto 0;
        color: $c-black;
        text-align: center;
    }
}
</style>
