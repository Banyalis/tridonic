<template>
    <div class="NewsList">
        <div class="NewsList-wrapper">
            <div class="NewsList-header">
                <div class="NewsList-headerSearch">
                    <CommonSearchInput
                        v-model="searchInput"
                        :placeholder="$translations.searchByKeywords()"
                        search-id="newsSearch"
                        @on-search-input="onSearch"
                    />
                </div>
                <div class="NewsList-headerFilters">
                    <div class="NewsList-headerFiltersProducts">
                        <FilterSelect
                            :options="getTypesOptions"
                            :value="startValuesFilter.type"
                            @handle-submit="setTypeFilter"
                        />
                    </div>
                    <div class="NewsList-headerFiltersLocations">
                        <FilterSelect
                            :options="getDateOptions"
                            :value="startValuesFilter.date"
                            @handle-submit="setDateFilter"
                        />
                    </div>
                </div>
                <div
                    class="NewsList-headerFiltersIcon"
                    @click="openMobileFilters"
                >
                    <svg-icon name="mobile-filters-icon" />
                </div>
            </div>
            <div v-if="!isFiltered" class="NewsList-list">
                <div
                    v-for="(newsItem, index) in news.listNews"
                    :key="`${newsItem.title}-${index}`"
                    class="NewsList-listItem"
                    :style="{ transitionDelay: `${0.05 * index}s` }"
                    :class="{ isActive: isItemShown }"
                >
                    <NewsListItem :news="newsItem" />
                </div>
            </div>
            <div v-else class="NewsList-list NewsList-list--isFiltered">
                <!-- TODO: replace text -->
                <div
                    class="NewsList-listTitle"
                    v-text="getCountResults + ` results`"
                ></div>
                <div class="NewsList-listNews">
                    <div
                        v-for="(newsItem, index) in news.listNews"
                        :key="index"
                        class="NewsList-listItem"
                        :style="{ transitionDelay: `${0.05 * index}s` }"
                        :class="{ isActive: isItemShown }"
                    >
                        <NewsListItem :news="newsItem" />
                    </div>
                </div>
            </div>
            <div class="NewsList-pagination">
                <Pagination
                    :page-count="news.pageCount"
                    :active-page-number="currentPage"
                    @on-page-number-click="onPageChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
import CommonSearchInput from '@/components/CommonSearchInput';
import { mapActions, mapMutations, mapState } from 'vuex';
import FilterSelect from '@/components/FilterSelect';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import NewsListItem from '@/components/NewsListItem';
import Pagination from '@/components/Pagination';
import { scrollToTop } from '@/utils/utils';

export default {
    name: 'NewsList',

    components: {
        Pagination,
        NewsListItem,
        FilterSelect,
        CommonSearchInput
    },

    props: {
        news: {
            type: Object,
            required: true
        },
        filters: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            currentPage: 1,
            isItemShown: false,
            searchInput: '',
            activeType: this.filters.type[0]?.value,
            activeDate: this.filters.date[0]?.value,
            activeSearch: '',
            startValuesFilter: {
                type: this.filters.type[0]?.value,
                date: this.filters.date[0]?.value
            }
        };
    },

    computed: {
        getTypesOptions() {
            return this.filters.type.map((item) => {
                return this.getMappedOption(item);
            });
        },

        getDateOptions() {
            return this.filters.date.map((item) => {
                return this.getMappedOption(item);
            });
        },

        isFiltered() {
            return (
                !!this.activeSearch ||
                this.activeType !== this.startValuesFilter.type ||
                this.activeDate !== this.startValuesFilter.date
            );
        },

        getCountResults() {
            return this.news.listNews.length;
        },

        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        searchInput(val) {
            this.onSearch(val);
        }
    },

    mounted() {
        this.isItemShown = true;

        this.$root.$on(VUE_CUSTOM_EVENTS.fetchNews, this.mobileFetchNewNews);

        this.$root.$on(
            VUE_CUSTOM_EVENTS.solutionsProjectsFiltersMounted,
            this.setMobileFilterValues
        );
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.fetchNews, this.mobileFetchNewNews);

        this.$root.$off(
            VUE_CUSTOM_EVENTS.solutionsProjectsFiltersMounted,
            this.setMobileFilterValues
        );
    },

    methods: {
        onPageChange(newPageNumber) {
            this.currentPage = newPageNumber;
            this.fetchNewNews();
            scrollToTop();
        },

        getMappedOption(item) {
            return {
                name: this.$translations.sortBy() + ' ' + item.name,
                value: item.value
            };
        },

        onSearch(val) {
            this.activeSearch = val;

            this.fetchNewNews();
        },

        setTypeFilter(option) {
            this.activeType = option.value;

            this.fetchNewNews();
        },

        setDateFilter(option) {
            this.activeDate = option.value;

            this.fetchNewNews();
        },

        openMobileFilters() {
            this.openModalPopup({
                modalComponent: 'NewsMobileFilters',
                isPurple: true
            });
        },

        async fetchNewNews() {
            const params = {};

            this.isItemShown = false;

            if (this.activeSearch) params.searchValue = this.activeSearch;

            params.currentFilterValues = this.mapActiveFilters();
            params.currentPage = this.currentPage;

            const newsListResponse = await this.$axios.get(
                `${this.$config.baseURL}/${this.language}/${this.region}/about/news`,
                { params }
            );

            if (!newsListResponse) return;

            this.isItemShown = true;

            this.updateNews(newsListResponse.data);
        },

        mapActiveFilters() {
            return [
                {
                    id: 'type',
                    value: this.activeType
                },
                {
                    id: 'date',
                    value: this.activeDate
                }
            ];
        },

        mobileFetchNewNews({ type, date }) {
            this.activeType = type;
            this.activeDate = date;

            this.fetchNewNews();
        },

        setMobileFilterValues() {
            this.$root.$emit(VUE_CUSTOM_EVENTS.setMobileFilterValues, {
                type: this.activeType,
                date: this.activeDate
            });
        },

        ...mapMutations({
            updateProjects: 'news/updateNews'
        }),

        ...mapActions({
            openModalPopup: 'modal-popup/openModalPopup'
        })
    }
};
</script>

<style lang="scss">
.NewsList {
    $component: &;

    display: flex;
    width: 100%;
    margin-top: 50px;

    @include mobile {
        margin-top: 30px;
    }

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: 1px solid $c-gray--shadow;

        @include mobile {
            border-bottom: none;
            align-items: flex-start;
        }

        &Search {
            display: flex;
            margin-bottom: -1px;
            width: (360 * 100% / 1160);

            @include mobile {
                width: calc(100% - 40px);
                margin-bottom: 0;
            }
        }

        &Filters {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding-bottom: 9px;

            @include mobile {
                padding-bottom: 0;
            }

            &Products {
                display: flex;

                @include mobile {
                    display: none;
                }
            }

            &Locations {
                display: flex;
                margin-left: 34px;

                @include mobile {
                    display: none;
                }
            }

            &Icon {
                display: none;
                width: 20px;
                height: 18px;
                margin-top: 2px;

                @include mobile {
                    display: flex;
                }
            }
        }
    }

    &-list {
        width: 100%;
        display: flex;
        margin-top: 40px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        &--isFiltered {
            align-items: center;
        }

        &Title {
            @include title-bordered-h2;

            color: $c-black;
        }

        &News {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            margin-top: 27px;

            @include mobile {
                margin-top: 18px;
            }
        }

        &Item {
            width: 100%;
            display: flex;
            opacity: 0;
            transition: none;
            margin-top: 40px;

            @include mobile {
                margin-top: 37px;
            }

            &.isActive {
                opacity: 1;
                transition-duration: $d-productShow;
                transition-property: opacity;
            }

            &:first-child {
                margin-top: 0 !important;
            }

            &:last-child {
                @include mobile {
                    padding-bottom: 37px;
                    border-bottom: 1px solid $c-gray--shadow;
                }
            }
        }
    }

    &-pagination {
        padding: 0 20px;
        margin-top: 40px;
        margin-bottom: 80px;

        @include mobile {
            margin-bottom: 20px;
            margin-top: 20px;
        }
    }
}
</style>
