<template>
    <div id="layout">
        <NavigationMenu />
        <NavigationMenuMobile />
        <Header />
        <NavigationUtilsMenu />
        <EshopMobilePanel />
        <SearchMobilePanel />
        <TooltipBubble
            :text="tooltipText"
            :position-x="tooltipPositionX"
            :position-y="tooltipPositionY"
            :modify="modify"
            :is-shown="isTooltipShown"
        />
        <FiltersMobileWrapper />
        <div
            class="dimmed-overlay dimmed-overlay-popup"
            :class="{ isActive: isPopupBlurred }"
        ></div>
        <div
            class="dimmed-overlay dimmed-overlay-popup-black"
            :class="{ isActive: isBlackPopupBlurred }"
        ></div>
        <BasePopup :class="{ isBlurred: isPopupBlurred }" />
        <BaseBlackPopup :class="{ isBlurred: isBlackPopupBlurred }" />
        <ModalPopupWrapper />
        <div
            class="dimmed-overlay"
            :class="{ isActive: isContentBlurred }"
        ></div>
        <ComparePanel />
        <CompareOverlay />
        <section
            id="main-content"
            class="main-content"
            :class="{ isBlurred: isContentBlurred }"
        >
            <div>
                <nuxt keep-alive />
            </div>
            <Footer></Footer>
        </section>
    </div>
</template>

<script>
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { mapMutations, mapState } from 'vuex';
import NavigationMenu from '@/components/NavigationMenu';
import NavigationMenuMobile from '@/components/NavigationMenuMobile';
import EshopMobilePanel from '@/components/EshopMobilePanel';
import NavigationUtilsMenu from '@/components/NavigationUtilsMenu';
import SearchMobilePanel from '@/components/SearchMobilePanel';
import TooltipBubble from '@/components/TooltipBubble';
import FiltersMobileWrapper from '@/components/FiltersMobileWrapper';
import BasePopup from '@/components/BasePopup';
import ComparePanel from '@/components/ComparePanel';
import CompareOverlay from '@/components/CompareOverlay';
import ModalPopupWrapper from '@/components/ModalPopupWrapper';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import BaseBlackPopup from '@/components/BaseBlackPopup';

export default {
    components: {
        BaseBlackPopup,
        ModalPopupWrapper,
        CompareOverlay,
        ComparePanel,
        FiltersMobileWrapper,
        TooltipBubble,
        BasePopup,
        SearchMobilePanel,
        EshopMobilePanel,
        NavigationUtilsMenu,
        NavigationMenuMobile,
        NavigationMenu,
        Header,
        Footer
    },
    data() {
        return {
            isBrowsersDefined: false
        };
    },
    computed: {
        ...mapState([
            'isContentBlurred',
            'isPopupBlurred',
            'isBlackPopupBlurred'
        ]),
        ...mapState('navigation', [
            'isNavigationOpened',
            'isMobileNavigationOpened'
        ]),
        ...mapState('tooltip', [
            'tooltipPositionX',
            'tooltipPositionY',
            'tooltipText',
            'modify',
            'isTooltipShown'
        ])
    },
    mounted() {
        this.isBrowsersDefined = this.$isBrowsersDefined;
        window.addEventListener('resize', this.onResize);
        window.addEventListener('keyup', this.onKeyUp);
        this.onResize();
    },
    methods: {
        onResize() {
            this.setMediaSize(window.innerWidth);
        },

        onKeyUp(event) {
            this.$root.$emit(VUE_CUSTOM_EVENTS.onKeyUp, event);
        },

        ...mapMutations({
            setMediaSize: 'setMediaSize'
        })
    },
    head() {
        let htmlClass = '';

        htmlClass += this.$isFirefox ? ' isFirefox' : ' isNotFirefox';
        htmlClass += this.$isEdge ? ' isEdge' : ' isNotEdge';

        return {
            htmlAttrs: {
                class: this.isBrowsersDefined ? htmlClass : ''
            },
            meta: [
                {
                    name: 'viewport',
                    content:
                        'width=device-width, initial-scale=1, maximum-scale=1.0'
                }
            ]
        };
    }
};
</script>
<style lang="scss" scoped>
.main-content {
    padding-top: 80px;

    .isFirefox & {
        &.isBlurred {
            filter: blur(5px);
        }
    }

    @include mobile {
        padding-top: 60px;
    }
}
.dimmed-overlay {
    background: $c-purple--dimmed;
    pointer-events: none;
    width: 100%;
    height: 100%;
    position: fixed;
    opacity: 0;
    top: 0;
    left: 0;
    z-index: $z-contentDimmedOverlay;
    backdrop-filter: blur(10px);
    transition: $d-hover opacity;

    &-popup {
        z-index: $z-contentDimmedOverlayPopup;
    }

    &-popup-black {
        z-index: $z-contentDimmedOverlayPopup;
    }

    &.isActive {
        opacity: 1;
    }

    @include mobile {
        display: none;
    }
}
</style>
