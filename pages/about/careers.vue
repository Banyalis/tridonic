<template>
    <div class="CareersPage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :main-title="internalHeader.mainTitle"
        />
        <div class="CareersPage-content b-container">
            <div class="CareersPage-tabs">
                <CareersTabs :tabs="tabs" />
            </div>
            <div class="CareersPage-links">
                <div
                    v-for="(link, index) in links"
                    :key="index"
                    class="CareersPage-link"
                >
                    <CommonBlockLink :link="link" />
                </div>
            </div>
        </div>
        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import InternalHeader from '@/components/InternalHeader';
import AnchorLinks from '@/components/AnchorLinks';
import CareersTabs from '@/components/CareersTabs';
import CommonBlockLink from '@/components/CommonBlockLink';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    components: {
        CommonBlockLink,
        CareersTabs,
        InternalHeader,
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

        const [CareersPage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/about/careers`),
            axios.get(`${baseURL}/${language}/${region}/anchor-links/careers`)
        ]);

        store.commit('careers/init', CareersPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        ...mapState('careers', ['internalHeader', 'tabs', 'links']),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'Careers'
        };
    }
};
</script>

<style lang="scss">
.CareersPage {
    .InternalHeader {
        padding-bottom: 254px;

        @include mobile {
            padding-bottom: 144px;
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        margin-top: -160px;
        align-items: center;
        padding-bottom: 80px;

        @include mobile {
            margin-top: -100px;
            padding-bottom: 60px;
        }
    }

    &-tabs {
        width: 100vw;
        max-width: 1920px;
        padding: 0 80px;

        @include tablet {
            width: 100%;
            padding: 0;
        }

        @include mobile {
            width: 100vw;
            padding: 0;
        }
    }

    &-links {
        width: 100%;
        display: flex;
        margin-top: 80px;
        flex-wrap: wrap;
        align-items: stretch;
        justify-content: flex-start;

        @include mobile {
            margin-top: 40px;
            flex-direction: column;
            align-items: flex-start;
        }
    }

    &-link {
        display: flex;
        align-items: stretch;
        width: (360 * 100% / 1160);
        margin-left: (40 * 100% / 1160);

        &:first-child {
            margin-top: 0 !important;
        }

        &:nth-child(3n + 1) {
            margin-left: 0;
        }

        &:nth-child(n + 4) {
            margin-top: 80px;
        }

        @include mobile {
            margin-left: 0;
            margin-top: 40px !important;
            width: 100%;
        }
    }
}
</style>
