<template>
    <div class="SolutionsPage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :main-title="internalHeader.mainTitle"
        />
        <div class="SolutionsPage-list b-container">
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

        const [SolutionsPage, anchorLinks] = await Promise.all([
            axios.get(
                `${baseURL}/${language}/${region}/solutions/${params.slug}`
            ),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/solutions-${params.slug}`
            )
        ]);

        store.commit('solutions/init', SolutionsPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        ...mapState('solutions', ['internalHeader', 'listSolutions']),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'Solutions'
        };
    }
};
</script>

<style lang="scss" scoped>
.SolutionsPage {
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
