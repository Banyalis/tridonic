<template>
    <div
        ref="header"
        class="Header"
        :style="{
            transform: `translate3d(0, ${currentHeaderTranslate}px, 0)`
        }"
        :class="{ withTransition, isHeaderHidden }"
    >
        <nuxt-link v-if="$route.path !== '/'" to="/" class="Header-logo">
            <svg-icon name="tridonic-logo" />
        </nuxt-link>
        <div v-else v-scroll-to="'#layout'" class="Header-logo">
            <svg-icon name="tridonic-logo" />
        </div>

        <div class="Header-navigation">
            <div
                v-for="(navItem, key) in header.items"
                :key="key"
                class="b-navigation-item b-navigation-link"
                @click="openMenu(navItem.id)"
            >
                {{ navItem.title }}
            </div>
        </div>
        <div class="Header-navigationUtils">
            <NavigationUtilsHead></NavigationUtilsHead>
        </div>
        <div class="Header-hamburger" @click="openMobileMenu">
            <svg-icon name="mobile-hamburger"></svg-icon>
        </div>
        <div class="Header-searchIcon" @click="openMobileSearch">
            <svg-icon name="search-icon"></svg-icon>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { DIRECTIONS } from '@/utils/constants';
import NavigationUtilsHead from '@/components/NavigationUtilsHead';
import { isMobile } from '@/utils/utils';

export default {
    name: 'Header',
    components: { NavigationUtilsHead },
    data() {
        return {
            headerHeight: 0,
            scrollTop: 0,
            headerTranslateLimit: 0,
            headerTranslateLimitDesktop: -100,
            headerTranslateLimitMobile: -65,
            withTransition: false,
            delay: 50 // wait 50px of scroll before hide header
        };
    },
    computed: {
        ...mapState('header', ['header', 'isHeaderHidden']),
        ...mapState(['isBodyScrollLocked', 'currentHeaderTranslate'])
    },
    watch: {
        isBodyScrollLocked: {
            handler(val, oldVal) {
                if (val === true || oldVal === val) {
                    return;
                }
                this.onBodyScrollUnlock();
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },
    methods: {
        onBodyScrollUnlock() {
            this.scrollTop = window.scrollY;
            this.updateHeaderTranslate(0);
        },
        openMenu(navItemId) {
            this.setActiveNavigationItem(navItemId);
            this.blurContent();
            this.blurPopup();
            this.blurBlackPopup();
            this.blockScroll();
            this.openNavigationMenu();
        },
        openMobileMenu() {
            this.blurContent();
            this.blurPopup();
            this.blurBlackPopup();
            this.blockScroll();
            this.openMobileNavigationMenu();
        },
        onScroll() {
            const scrollTop = window.scrollY;
            const direction =
                scrollTop > this.scrollTop ? DIRECTIONS.down : DIRECTIONS.up;
            const difference = Math.abs(scrollTop - this.scrollTop);
            this.scrollTop = scrollTop;
            const isTopEdge = scrollTop <= 0;
            const isBottomEdge =
                scrollTop + window.innerHeight >
                document.documentElement.scrollHeight;

            if (isTopEdge) {
                this.updateHeaderTranslate(0);

                return;
            }

            if (isBottomEdge) {
                this.updateHeaderTranslate(this.headerTranslateLimit);
            }

            if (direction === DIRECTIONS.down) {
                this.withTransition = false;
                this.updateHeaderTranslate(
                    this.currentHeaderTranslate - difference
                );
                if (this.currentHeaderTranslate > this.headerTranslateLimit) {
                    return;
                }
                this.updateHeaderTranslate(this.headerTranslateLimit);

                return;
            }

            this.updateHeaderTranslate(0);
            this.withTransition = true;
        },
        onResize() {
            this.headerHeight = this.$refs.header.offsetHeight;
            this.headerTranslateLimit = isMobile()
                ? this.headerTranslateLimitMobile
                : this.headerTranslateLimitDesktop;
            this.onScroll();
        },
        ...mapMutations({
            blurContent: 'blurContent',
            blurPopup: 'blurPopup',
            blurBlackPopup: 'blurBlackPopup',
            blockScroll: 'blockScroll',
            updateHeaderTranslate: 'updateHeaderTranslate',
            openNavigationMenu: 'navigation/openMenu',
            openMobileNavigationMenu: 'navigation/openMobileMenu',
            setActiveNavigationItem: 'navigation/setActiveNavigationItem'
        }),
        ...mapActions({
            openMobileSearch: 'search-mobile/openSearchPanel'
        })
    }
};
</script>

<style lang="scss" scoped>
.Header {
    width: 100%;
    height: 80px;
    border-bottom: $border-default $c-gray--border;
    position: fixed;
    padding-left: 40px;
    z-index: $z-header;
    background: $c-white;
    top: 0;
    display: flex;
    will-change: transform;
    backface-visibility: hidden;
    justify-content: space-between;

    &.withTransition {
        transition: $d-hover transform;
    }

    &.isHeaderHidden {
        transform: translate3d(0, -100px, 0) !important;

        @include mobile {
            transform: translate3d(0, -80px, 0) !important;
        }
    }

    @include mobile {
        height: 60px;
    }

    &-logo {
        width: 126px;
        height: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        fill: $c-purple;
        transition: $d-hover fill;
        cursor: pointer;

        svg {
            width: 100%;
            height: 100%;
        }

        @include hover {
            &:hover {
                fill: $c-purple--hovered;
            }
        }

        @include mobile {
            width: 88px;
            height: 14px;
        }
    }

    &-navigation {
        color: $c-black;
        display: flex;
        align-items: center;
        height: 100%;

        @include mobile {
            display: none;
        }
    }

    &-hamburger {
        display: none;

        @include mobile {
            width: 20px;
            height: 16px;
            display: block;
            position: absolute;
            left: 20px;
            top: 17px;
        }
    }

    &-searchIcon {
        display: none;

        @include mobile {
            width: 22px;
            height: 22px;
            top: 18px;
            right: 18px;
            position: absolute;
            display: block;
            fill: $c-black;
        }
    }

    &-navigationUtils {
        @include mobile {
            display: none;
        }
    }
}
</style>
