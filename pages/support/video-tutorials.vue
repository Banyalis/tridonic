<template>
    <div class="VideoTutorialsPage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :has-background="false"
        />

        <div class="VideoTutorialsPage-main b-container">
            <div class="VideoTutorialsPage-header">
                <div class="VideoTutorialsPage-search">
                    <CommonSearchInput
                        v-model="searchInput"
                        placeholder="Search by keywords"
                        search-id="videoTutorials"
                        type="videoTutorials"
                        @on-search-input="handleSearch"
                    />
                </div>

                <div class="VideoTutorialsPage-filters">
                    <div class="VideoTutorialsPage-filtersMobile">
                        <svg-icon name="mobile-filters-icon"></svg-icon>
                    </div>

                    <div class="VideoTutorialsPage-filtersDesktop">
                        <filter-select
                            v-model="currentCategoryFilter"
                            :options="filters"
                        ></filter-select>

                        <filter-select
                            v-model="currentSort"
                            :options="sorts"
                        ></filter-select>
                    </div>
                </div>
            </div>

            <div class="VideoTutorialsPage-content">
                <article
                    v-for="(tutorial, idx) in tutorials"
                    :key="`video-tutorial-${idx}`"
                    class="VideoTutorialsPage-item"
                >
                    <div class="VideoTutorialsPage-itemContent">
                        <h2 class="VideoTutorialsPage-itemTitle">
                            {{ tutorial.title }}
                        </h2>
                        <p class="VideoTutorialsPage-itemDesc">
                            {{ tutorial.desc }}
                        </p>
                        <ul
                            v-if="tutorial.links"
                            class="VideoTutorialsPage-itemLinksList"
                        >
                            <li
                                v-for="(link, id) in tutorial.links"
                                :key="`video-tutorial-link-${id}`"
                                class="VideoTutorialsPage-itemLinksItem"
                            >
                                <ArrowLink
                                    :url="link.url"
                                    :title="link.title"
                                    type="isVideoLink"
                                />
                            </li>
                        </ul>
                    </div>
                    <div class="VideoTutorialsPage-itemFigure">
                        <CommonVideo
                            :poster="tutorial.poster"
                            :video="tutorial.video"
                        />
                    </div>
                </article>
            </div>

            <div class="VideoTutorialsPage-pagination">
                <Pagination
                    :page-count="pagination.pageCount"
                    :of-text="pagination.ofText"
                    :next-text="pagination.nextText"
                    :prev-text="pagination.prevText"
                    :active-page-number="currentPage"
                />
            </div>
        </div>

        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';

import InternalHeader from '@/components/InternalHeader';
import CommonSearchInput from '@/components/CommonSearchInput';
import FilterSelect from '@/components/FilterSelect';
import CommonVideo from '@/components/CommonVideo';
import ArrowLink from '@/components/ArrowLink';
import AnchorLinks from '@/components/AnchorLinks';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    layout: 'page',
    components: {
        InternalHeader,
        CommonSearchInput,
        FilterSelect,
        CommonVideo,
        ArrowLink,
        AnchorLinks
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

        const [videoTutorialsPage, anchorLinks] = await Promise.all([
            axios.get(
                `${baseURL}/${language}/${region}/support/video-tutorials`
            ),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/video-tutorials`
            )
        ]);

        store.commit('video-tutorials/init', videoTutorialsPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    data() {
        return {
            currentPage: 1,
            currentCategoryFilter: 'all',
            filters: [
                {
                    value: 'all',
                    name: 'Show All Videos'
                },
                {
                    value: 'products',
                    name: 'Products'
                },
                {
                    value: 'tech',
                    name: 'Technologies'
                },
                {
                    value: 'installation',
                    name: 'Installation'
                },
                {
                    value: 'software',
                    name: 'Software'
                },
                {
                    value: 'apps',
                    name: 'Applications'
                }
            ],

            currentSort: 'by-date',
            sorts: [
                {
                    value: 'by-date',
                    name: 'Sort by Date Added'
                },
                {
                    value: 'by-popular',
                    name: 'Sort by Most Popular'
                },
                {
                    value: 'by-alpha',
                    name: 'Sort by A-Z'
                }
            ],
            searchInput: ''
        };
    },

    computed: {
        ...mapState('video-tutorials', [
            'internalHeader',
            'tutorials',
            'pagination'
        ]),
        ...mapState('anchor-links', ['anchorLinks']),
        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        searchInput(val) {
            this.handleSearch(val);
        }
    },

    methods: {
        handleSearch(val) {
            this.$axios
                .get(
                    `${this.$config.baseURL}/${this.language}/${this.region}/support/video-tutorials`,
                    {
                        params: {
                            searchValue: val
                        }
                    }
                )
                .then((response) => {
                    this.updateVideoTutorials({
                        tutorials: response.data.tutorials,
                        pagination: response.data.pagination
                    });
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.errored = true;
                });
        },
        ...mapMutations({
            updateVideoTutorials: 'video-tutorials/update'
        })
    },

    head() {
        return {
            title: 'Video Tutorials'
        };
    }
};
</script>

<style lang="scss">
.VideoTutorialsPage {
    &-main {
        padding-bottom: 80px;

        @include mobile {
            padding-bottom: 40px;
        }
    }

    &-header {
        border-bottom: 1px solid $c-gray--divider;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        @include mobile {
            border-bottom: 0;
        }
    }

    &-search {
        margin-bottom: -1px;
        width: (280 * 100% / 1160);

        @include mobile {
            margin: 0;
            width: 100%;
        }
    }

    &-filters {
        display: flex;

        @include mobile {
            margin-left: 20px;
        }
    }

    &-filtersMobile {
        display: none;

        @include mobile {
            display: flex;
        }

        svg {
            height: 18px;
            width: 20px;
        }
    }

    &-filtersDesktop {
        display: flex;
        margin-bottom: 5px;

        @include mobile {
            display: none;
        }
    }

    &-item {
        border-bottom: 1px solid $c-gray--divider;
        color: $c-black;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 40px 0;

        @include mobile {
            border-bottom: 0;
            flex-direction: column-reverse;
            padding: 0 0 35px;

            &:first-child {
                padding-top: 40px;
            }

            &:last-child {
                border-bottom: 1px solid $c-gray--divider;
                padding-bottom: 55px;
            }
        }
    }

    &-itemContent {
        margin-right: 40px;
        max-width: 360px;

        @include mobile {
            margin: 24px 0 0;
        }
    }

    &-itemTitle {
        @include title-h2;
        margin-top: -10px;

        @include mobile {
            margin: 0;
        }
    }

    &-itemDesc {
        font-size: 14px;
        letter-spacing: 0;
        line-height: calc(20 / 14);
        margin: 17px 0 0;

        @include mobile {
            margin-top: 22px;
        }
    }

    &-itemLinksList {
        @include u-noList;
        margin: 40px 0 0;

        @include mobile {
            margin: 20px 0 0;
        }

        li {
            margin: 0 0 25px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &-itemFigure {
        flex-shrink: 0;
        margin: 0 -20px;

        @media (min-width: $bp-tablet) {
            width: (760 * 100% / 1160);
            margin: 0;
        }
    }

    &-pagination {
        margin: 40px auto 0;

        @include mobile {
            margin-top: 20px;
        }
    }
}
</style>
