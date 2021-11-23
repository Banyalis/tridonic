<template>
    <div class="GuaranteePage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :main-title="internalHeader.mainTitle"
            :button-link="internalHeader.buttonLink"
            :has-background="false"
        />

        <div class="GuaranteePage-content">
            <TextContentWrapper>
                <TextContent>
                    <template v-for="(block, idx) in content">
                        <!-- eslint-disable -->
                        <TextContent
                            v-if="block.type === 'text'"
                            :key="`text-section-${idx}`"
                            v-html="block.html"
                        />
                        <!-- eslint-enable -->
                    </template>
                </TextContent>
            </TextContentWrapper>
        </div>

        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import InternalHeader from '@/components/InternalHeader';
import TextContentWrapper from '@/components/TextContentWrapper';
import TextContent from '@/components/TextContent';
import AnchorLinks from '@/components/AnchorLinks';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    layout: 'page',
    components: {
        InternalHeader,
        TextContentWrapper,
        TextContent,
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

        const [guaranteePage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/support/guarantee`),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/support-guarantee`
            )
        ]);

        store.commit('guarantee/init', guaranteePage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        ...mapState('guarantee', ['internalHeader', 'content']),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'Guarantee'
        };
    }
};
</script>

<style lang="scss">
.GuaranteePage {
    &-content {
        width: 100%;
        padding-bottom: 80px;

        @include mobile {
            padding-bottom: 60px;
        }
    }
}

.GuaranteePage .InternalHeader .RoundedButton {
    margin: auto;
}
</style>
