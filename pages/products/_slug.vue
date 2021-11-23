<template>
    <section class="ProductsPage">
        <div class="ProductsPage-header">
            <div class="ProductsPage-headerText">
                {{ catalog.name }}
                <span>/&nbsp;{{ getProductListLength }}</span>
            </div>
        </div>
        <div class="ProductsPage-catalog">
            <grid-catalog
                v-if="getProductListLength && catalog"
                :filter-list="filterList[customApiEvent]"
                :products="products"
                :banners="banners"
            ></grid-catalog>
        </div>

        <AnchorLinks :anchor-links="anchorLinks" />
    </section>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import GridCatalog from '@/components/GridCatalog';
import AnchorLinks from '@/components/AnchorLinks';
import { mixinOpenPopup } from '@/utils/mixins';
import {
    COOKIES_NAMES,
    FRONTEND_IDS,
    VUE_CUSTOM_EVENTS
} from '@/utils/constants';

export default {
    name: 'ProductsPage',
    components: {
        GridCatalog,
        AnchorLinks
    },

    mixins: [mixinOpenPopup],

    async fetch({ $config: { baseURL }, $cookies, store, params }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const curSort = $cookies.get(COOKIES_NAMES.productListSort);

        const productListSort =
            curSort || FRONTEND_IDS.productListSort.byRelevance;

        const language = store.state.locale.language;
        const region = store.state.locale.region;

        const [
            resCategory,
            resProducts,
            filters,
            banners,
            anchorLinks
        ] = await Promise.all([
            axios.get(
                `${baseURL}/${language}/${region}/category/${params.slug}`
            ),
            axios.get(
                `${baseURL}/${language}/${region}/products/${params.slug}`,
                {
                    params: { sort: productListSort, currentPage: 1 }
                }
            ),
            axios.get(
                `${baseURL}/${language}/${region}/product-filters/${params.slug}`
            ),
            axios.get(
                `${baseURL}/${language}/${region}/category-banners/${params.slug}`
            ),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/categories-${params.slug}`
            )
        ]);
        store.commit('category/init', {
            catalog: resCategory.data,
            categorySlug: params.slug,
            productListSort
        });
        store.commit('products/init', { products: resProducts.data });
        store.commit(
            'filters/updateApiEvent',
            VUE_CUSTOM_EVENTS.fetchCatalogProducts
        );
        store.commit('filters/updateFilterList', filters.data);
        store.commit('category/updateCategoryBanners', banners.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    data() {
        return {
            customApiEvent: VUE_CUSTOM_EVENTS.fetchCatalogProducts
        };
    },

    computed: {
        getProductListLength() {
            return this.products?.familyList?.length || '';
        },
        ...mapState('category', [
            'catalog',
            'categorySlug',
            'productListSort',
            'banners'
        ]),
        ...mapState('products', ['products']),
        ...mapState('filters', ['filterList']),
        ...mapState('locale', ['language', 'region']),
        ...mapState('anchor-links', ['anchorLinks'])
    }
};
</script>

<style lang="scss">
.ProductsPage {
    background: $c-gray--bg;

    &-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        background: $c-white;
        box-shadow: 0 -1px 0 0 #e4e4e4;
        padding: 45px 0 64px;
        border-bottom: $border-default $c-gray--border;

        @include mobile {
            padding: 40px 0;
        }

        &Text {
            @include title;

            color: $c-black;

            span {
                color: $c-gray--light;
            }
        }
    }
}
</style>
