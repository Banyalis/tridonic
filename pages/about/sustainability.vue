<template>
    <div class="SustainabilityPage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :main-title="internalHeader.mainTitle"
        />
        <div class="SustainabilityPage-content b-container">
            <div class="SustainabilityPage-preview">
                <div class="SustainabilityPage-previewImage">
                    <img :src="preview" />
                </div>
            </div>
            <div class="SustainabilityPage-blocks">
                <div
                    v-for="(block, index) in blocks"
                    :key="index"
                    class="SustainabilityPage-block"
                >
                    <CommonBlockLink :link="block" />
                </div>
            </div>
            <div class="SustainabilityPage-projects">
                <div class="SustainabilityPage-projectsWrapper b-container">
                    <SolutionsProjectsCategory :category="mapCategory" />
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
import CommonBlockLink from '@/components/CommonBlockLink';
import SolutionsProjectsCategory from '@/components/SolutionsProjectsCategory';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    components: {
        SolutionsProjectsCategory,
        CommonBlockLink,
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

        const [SustainabilityPage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/about/sustainability`),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/sustainability`
            )
        ]);

        store.commit('sustainability/init', SustainabilityPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        mapCategory() {
            return {
                title: this.$translations.titleSustainableProjects(),
                projects: this.projects
            };
        },

        ...mapState('sustainability', [
            'internalHeader',
            'preview',
            'blocks',
            'projects'
        ]),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'Sustainability'
        };
    }
};
</script>

<style lang="scss">
.SustainabilityPage {
    overflow: hidden;

    .InternalHeader {
        padding-bottom: 234px;

        @include mobile {
            padding-bottom: 134px;
        }
    }

    &-content {
        display: flex;
        flex-direction: column;
        margin-top: -160px;
        align-items: center;

        @include mobile {
            margin-top: -100px;
        }
    }

    &-preview {
        width: 100vw;
        max-width: 1920px;
        padding: 0 80px;

        @include tablet {
            width: 100%;
            padding: 0;
        }

        @include mobile {
            width: 100%;
            padding: 0;
        }

        &Image {
            @include m-aspectRatio(1320, 640);

            width: 100%;

            @include mobile {
                @include m-aspectRatio(280, 280);
            }

            img {
                @include m-absoluteObjectFit();
            }
        }
    }

    &-blocks {
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

    &-block {
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

    &-projects {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100vw;
        margin-top: 115px;
        background: $c-gray--bg;
        box-shadow: inset 0 1px 0 0 $c-gray--shadow;
        padding: 68px 0 80px;

        @include mobile {
            margin-top: 55px;
            padding: 43px 0 56px;
        }

        &Wrapper {
            display: flex;
            width: 100%;
            margin: 0 auto;
        }
    }
}
</style>
