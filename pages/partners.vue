<template>
    <div class="PartnersPage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :main-title="internalHeader.mainTitle"
        />
        <PartnersSlider :slider="slider" />
        <div class="PartnersPage-inner">
            <div class="b-container">
                <div class="PartnersPage-titleWrapper">
                    <div
                        class="PartnersPage-title"
                        v-text="$translations.partnersTitle()"
                    ></div>
                </div>
                <CommonPartners :partners="partners" />
            </div>
        </div>
        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { mixinOpenPopup } from '@/utils/mixins';
import InternalHeader from '@/components/InternalHeader';
import PartnersSlider from '@/components/PartnersSlider';
import CommonPartners from '@/components/CommonPartners';
import AnchorLinks from '@/components/AnchorLinks';

export default {
    name: 'PartnersPage',

    components: {
        InternalHeader,
        PartnersSlider,
        CommonPartners,
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

        const [resPartners, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/partners`),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/solutions-technologies`
            )
        ]);

        store.commit('partners/init', resPartners.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        ...mapState('partners', ['internalHeader', 'slider', 'partners']),
        ...mapState('anchor-links', ['anchorLinks']),
        ...mapState('locale', ['language', 'region'])
    }
};
</script>

<style lang="scss" scoped>
.PartnersPage {
    $component: &;

    &-inner {
        padding: 108px 0 60px;

        @include mobile {
            padding: 63px 0 60px;
        }
    }

    &-title {
        @include title-bordered-h2;

        color: $c-black;

        &Wrapper {
            margin-bottom: 49px;

            @include mobile {
                margin-bottom: 29px;
            }
        }
    }

    .InternalHeader {
        padding: 138px 0 268px;

        @include mobile {
            padding: 93px 0 98px;
        }
    }
}
</style>
