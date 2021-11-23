<template>
    <div class="ProductsCategoriesPage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :main-title="internalHeader.mainTitle"
        />
        <div class="ProductsCategoriesPage-list b-container">
            <SolutionsList :list="listSolutions" />
        </div>
        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { mixinOpenPopup } from '@/utils/mixins';

import InternalHeader from '@/components/InternalHeader';
import AnchorLinks from '@/components/AnchorLinks';
import SolutionsList from '@/components/SolutionsList';

export default {
    components: {
        SolutionsList,
        InternalHeader,
        AnchorLinks
    },

    mixins: [mixinOpenPopup],

    async fetch({ $config: { baseURL }, store, params }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const language = store.state.locale.language;
        const region = store.state.locale.region;

        const [ProductsCategoriesPage, anchorLinks] = await Promise.all([
            axios.get(
                `${baseURL}/${language}/${region}/categories/${params.slug}`
            ),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/categories-${params.slug}`
            )
        ]);

        store.commit('products-categories/init', ProductsCategoriesPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        ...mapState('products-categories', ['internalHeader', 'listSolutions']),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'Products'
        };
    }
};
</script>

<style lang="scss" scoped>
.ProductsCategoriesPage {
    .InternalHeader {
        padding-bottom: 313px;

        @include mobile {
            padding-bottom: 85px;
        }
    }

    &-list {
        display: flex;
        width: 100%;
        padding-bottom: 120px;
        margin-top: -240px;

        @include mobile {
            margin-top: -60px;
            padding-bottom: 40px;
        }
    }
}
</style>
