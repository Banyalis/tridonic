<template>
    <div class="GridCatalog" :class="{ hasFilter: filterList.length }">
        <div
            v-if="!!filterList.length && !isMobileLayout"
            ref="filters"
            class="GridCatalog-filter"
            :style="{ top: getFiltersTopPosition }"
        >
            <Filters
                v-if="!!apiEvent"
                :filter-list="filterList"
                @resize="updateFiltersHeight"
            ></Filters>
        </div>
        <div class="GridCatalog-grid">
            <div class="GridCatalog-gridHeader">
                <div
                    class="GridCatalog-mobileFilters"
                    @click="
                        openMobileFilters({
                            filterComponent: 'Filters',
                            needPreselected: false
                        })
                    "
                >
                    <svg-icon name="mobile-filters-icon"></svg-icon>
                    <span v-text="$translations.filtersTitle()"></span>
                </div>
                <filter-select
                    v-model="currentSort"
                    :options="getOptions"
                ></filter-select>
                <div class="GridCatalog-viewOptions">
                    <filter-select
                        v-model="currentViewType"
                        :options="getOptionsView"
                    ></filter-select>
                </div>
            </div>
            <div v-if="banners.topBanner" class="GridCatalog-gridBanner">
                <catalog-banner :banner="banners.topBanner"></catalog-banner>
            </div>
            <div class="GridCatalog-gridItems" :class="{ isList }">
                <div
                    v-for="(product, index) in getFamilyOrArticle"
                    :key="product.id"
                    class="GridCatalog-gridItem"
                    :style="{
                        transitionDelay: `${
                            productItemTransitionDelay * index
                        }s`
                    }"
                    :class="{ isActive: isProductItemsShown }"
                >
                    <product-item
                        :product="product"
                        :is-list="isList"
                    ></product-item>
                </div>
            </div>
            <div class="GridCatalog-pagination">
                <Pagination
                    :page-count="products.pageCount"
                    :active-page-number="currentPage"
                    @on-page-number-click="onPageChange"
                />
            </div>
            <div
                v-if="banners.bottomBanner"
                class="GridCatalog-gridBanner GridCatalog-gridBanner_bottom"
            >
                <catalog-banner :banner="banners.bottomBanner"></catalog-banner>
            </div>
        </div>
    </div>
</template>

<script>
import ProductItem from '@/components/ProductItem';
import FilterSelect from '@/components/FilterSelect';
import CatalogBanner from '@/components/CatalogBanner';
import { mapActions, mapMutations, mapState } from 'vuex';
import { isMobile, mapFilters, scrollToTop } from '@/utils/utils';
import Pagination from '@/components/Pagination';
import Filters from '@/components/Filters';
import {
    VUE_CUSTOM_EVENTS,
    COOKIES_NAMES,
    FRONTEND_IDS
} from '@/utils/constants';

export default {
    components: {
        Filters,
        Pagination,
        ProductItem,
        FilterSelect,
        CatalogBanner
    },

    props: {
        filterList: {
            type: Array,
            default: () => []
        },
        banners: {
            type: Object,
            default: () => {}
        },
        products: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            currentPage: 1,
            isProductItemsShown: false,
            options: [],
            optionsView: [],
            viewType: '',
            sort: '',
            productItemTransitionDelay: 0.05,
            filtersHeight: 0,
            filtersMargin: 20,
            isMobileLayout: false
        };
    },
    computed: {
        getFiltersTopPosition() {
            if (process.server) {
                return;
            }
            const top =
                window.innerHeight > this.filtersHeight
                    ? this.filtersMargin
                    : window.innerHeight -
                      this.filtersHeight -
                      this.filtersMargin;
            return `${top}px`;
        },
        currentSort: {
            set(value) {
                this.setSort(value);
            },
            get() {
                return this.sort;
            }
        },
        currentViewType: {
            set(value) {
                this.setView(value);
            },
            get() {
                return this.viewType;
            }
        },
        /**
         *
         * @returns <p>Family item (if more than one article in product item)</p>
         * <p>||</p>
         * <p>Article item (if one article in product item)</p>
         */
        getFamilyOrArticle() {
            return this.products.familyList.filter((product) => {
                const articles = product.articles;
                if (articles.length === 1) {
                    articles[0].family = product;
                }

                return articles.length > 1 ? product : articles[0];
            });
        },
        getOptions() {
            return [
                {
                    name: this.$translations.sortByRelevance(),
                    value: FRONTEND_IDS.productListSort.byRelevance
                },
                {
                    name: this.$translations.sortByFlagship(),
                    value: FRONTEND_IDS.productListSort.byFlagship
                },
                {
                    name: this.$translations.sortByNew(),
                    value: FRONTEND_IDS.productListSort.byNew
                },
                {
                    name: this.$translations.sortAz(),
                    value: FRONTEND_IDS.productListSort.ascending
                },
                {
                    name: this.$translations.sortZa(),
                    value: FRONTEND_IDS.productListSort.descending
                }
            ];
        },
        getOptionsView() {
            return [
                {
                    name: this.$translations.viewGrid(),
                    value: FRONTEND_IDS.productListViewType.grid
                },
                {
                    name: this.$translations.viewList(),
                    value: FRONTEND_IDS.productListViewType.list
                }
            ];
        },
        isList() {
            return this.viewType !== FRONTEND_IDS.productListViewType.grid;
        },
        ...mapState('category', ['categorySlug', 'productListSort']),
        ...mapState(['currentMediaSize']),
        ...mapState('filters', ['filterValues', 'apiEvent', 'isPopup']),
        ...mapState('locale', ['language', 'region'])
    },
    mounted() {
        window.addEventListener('resize', this.onResize);

        if (!this.isPopup)
            this.updateApiEvent(VUE_CUSTOM_EVENTS.fetchCatalogProducts);

        this.$root.$on(
            VUE_CUSTOM_EVENTS.fetchCatalogProducts,
            this.fetchNewProductsOnFilter
        );
        this.onResize();
        this.isProductItemsShown = true;
        this.sort = this.productListSort;
    },
    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },
    methods: {
        onPageChange(newPageNumber) {
            this.currentPage = newPageNumber;
            this.fetchProducts();
            scrollToTop();
        },
        onResize() {
            this.isMobileLayout = isMobile(); // store to use in template
            if (this.isMobileLayout) {
                this.viewType = FRONTEND_IDS.productListViewType.grid;

                return;
            }

            this.filtersHeight = this.$refs.filters.offsetHeight;

            this.setCatalogViewFromCookies();
        },
        updateFiltersHeight() {
            this.filtersHeight = this.$refs.filters.offsetHeight;
        },
        setCatalogViewFromCookies() {
            const curView = this.$cookies.get(COOKIES_NAMES.productListView);
            this.viewType = curView || FRONTEND_IDS.productListViewType.grid;
        },
        setSort(sortValue) {
            this.sort = sortValue;
            this.$cookies.set(COOKIES_NAMES.productListSort, this.sort);
            this.updateSort(this.sort);

            this.fetchProducts();
        },

        fetchNewProductsOnFilter() {
            this.currentPage = 1;
            this.fetchProducts();
        },

        async fetchProducts() {
            this.isProductItemsShown = false;
            const filters = mapFilters(this.filterValues, this.apiEvent);

            const productListResponse = await this.$axios.get(
                `${this.$config.baseURL}/${this.language}/${this.region}/products/${this.categorySlug}`,
                {
                    params: {
                        sort: this.productListSort,
                        currentPage: this.currentPage,
                        currentFilterValues: filters
                    }
                }
            );

            if (!productListResponse) {
                return;
            }
            const banners = await this.$axios.get(
                `${this.$config.baseURL}/${this.language}/${this.region}/category-banners/${this.categorySlug}`,
                {
                    params: {
                        currentFilterValues: filters
                    }
                }
            );

            this.updateProducts(productListResponse.data);
            this.updateBanners(banners.data);
            this.isProductItemsShown = true;
        },

        setView(viewValue) {
            // remove isActive class to restart animation
            this.isProductItemsShown = false;
            this.$cookies.set(COOKIES_NAMES.productListView, viewValue);
            this.viewType = viewValue;
            // add isActive class in next tick to start animation again
            // removing and adding class in the same tick will not remove and add corresponding class,
            // so we have to do it in next tick
            setTimeout(() => {
                this.isProductItemsShown = true;
            });
        },
        ...mapMutations({
            updateProducts: 'products/update',
            updateSort: 'category/updateSort',
            updateBanners: 'category/updateCategoryBanners',
            updateApiEvent: 'filters/updateApiEvent',
            setIsPopup: 'filters/setIsPopup'
        }),
        ...mapActions({
            openMobileFilters: 'filters-mobile/openMobileFilters'
        })
    }
};
</script>

<style lang="scss" scoped>
.GridCatalog {
    width: 100%;
    display: flex;
    padding: 20px 20px 80px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;

    @include mobile {
        padding: 0;
    }

    &-filter {
        width: 220px;
        display: flex;
        flex: 0 0 220px;
        padding-right: 20px;
        margin-right: 20px;
        position: sticky;
        top: 90px;

        @include mobile {
            display: none;
        }
    }

    &-grid {
        width: 100%;
        display: flex;
        flex: 1 1 auto;
        flex-direction: column;

        &Header {
            display: flex;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            padding: 0 25px;

            @include mobile {
                padding: 20px 20px 0;
            }
        }

        &Items {
            display: flex;
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: stretch;
            justify-content: flex-start;
            padding-top: 18px;

            @include mobile {
                padding-top: 0;
                margin-top: 20px;
            }

            &.isList {
                flex-direction: column;
            }
        }

        &Item {
            display: flex;
            opacity: 0;
            transition: none;

            &.isActive {
                opacity: 1;
                transition-duration: $d-productShow;
                transition-property: opacity;
            }

            @include desktop {
                width: (100% / 7);
            }

            @include laptop {
                width: (100% / 6);
            }

            @include tablet {
                width: (100% / 4);
            }

            .hasFilter & {
                @include desktop {
                    width: (100% / 7);
                }

                @include laptop {
                    width: (100% / 5);
                }

                @include tablet {
                    width: (100% / 3);
                }

                @include mobile {
                    width: (100% / 2) !important;
                }
            }

            .isList & {
                width: 100% !important;
            }
        }

        &Banner {
            margin-top: 20px;

            @include mobile {
                padding: 0 20px;
            }

            &_bottom {
                @include mobile {
                    margin-bottom: 20px;
                }
            }
        }
    }

    .GridCatalog-viewOptions {
        margin-left: 48px;

        @include mobile {
            display: none;
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

    &-mobileFilters {
        display: none;

        @include mobile {
            display: flex;
            align-items: center;
            margin-right: auto;

            span {
                color: $c-purple;
                @include text-light-same-mobile-medium;
                margin-left: 10px;
            }
        }
    }
}
</style>
