<template>
    <div
        class="NavigationMenu"
        :class="{ isOpened: isNavigationOpened }"
        @click="onMenuClick($event)"
    >
        <div
            ref="menu"
            class="NavigationMenu-main"
            :class="{ isOpened: isNavigationOpened }"
        >
            <div class="NavigationMenu-mainHead">
                <div class="NavigationMenu-mainHeadInner">
                    <div
                        v-for="(navItem, key) in header.items"
                        :key="key"
                        :ref="navItem.id"
                        class="b-navigation-item b-navigation-link NavigationMenu-mainHeadItem"
                        :class="{ isActive: navItem.id === activeItemId }"
                        @click="setActiveNavigationItemScope(navItem.id)"
                    >
                        {{ navItem.title }}
                    </div>
                    <div
                        ref="activePointer"
                        class="NavigationMenu-mainHeadActivePointer"
                        :style="{
                            transform: `translate3d(${activePointerPosition}, 0, 0)`
                        }"
                    ></div>
                </div>
                <div
                    v-if="!isSubNavigationOpened"
                    ref="closeCrossMenu"
                    class="b-navigation-link NavigationMenu-closeCross"
                    @click="closeMenu"
                >
                    <svg-icon name="close-cross"></svg-icon>
                </div>
            </div>
            <div
                class="NavigationMenu-mainContentWrapper"
                :class="{ isActive: isMainContentWrapperActive }"
            >
                <div
                    class="NavigationMenu-mainContent"
                    @mouseleave="closeSubMenu($event)"
                >
                    <a
                        v-for="(menuItem, key) in getActiveMenuItems"
                        :key="key"
                        :ref="menuItem.id"
                        :href="menuItem.url"
                        class="b-navigation-main-content-item"
                        :class="{ isActive: menuItem.id === activeMenuItemId }"
                        @mouseenter="openSubMenu(menuItem)"
                    >
                        <span>{{ menuItem.title }}</span>
                        <svg-icon
                            v-if="menuItem.subItems && menuItem.subItems.length"
                            name="arrow-right"
                        ></svg-icon>
                    </a>
                    <div
                        class="NavigationMenu-mainContentCursorHelper"
                        :style="{ top: getCursorHelperTopPosition }"
                    ></div>
                </div>
                <NavigationMenuAdditionalLinks
                    v-if="getActiveMenuItemsAdditionalLinksLength"
                    :link-list="getActiveMenuItemsAdditionalLinks"
                    :title="getCurrentNavItemBottomLinksTitle"
                ></NavigationMenuAdditionalLinks>
            </div>
        </div>
        <div
            ref="subMenu"
            class="NavigationMenu-additional"
            :class="{ isActive: isSubNavigationOpened }"
            @mouseleave="closeSubMenuOnUnhover"
        >
            <perfect-scrollbar>
                <div
                    v-for="(menuItem, key) in getActiveMenuItems"
                    :key="key"
                    class="NavigationMenu-additionalItem"
                    :class="{ isActive: menuItem.id === activeMenuItemId }"
                >
                    <div
                        v-if="menuItem.id === activeMenuItemId"
                        class="NavigationMenu-additionalItemWrapper"
                    >
                        <div
                            v-for="(subItem, subItemKey) in menuItem.subItems"
                            :key="subItemKey"
                            class="b-navigation-main-content-item"
                        >
                            <a
                                :href="subItem.link.url"
                                class="b-hidden-link"
                            ></a>
                            <span v-if="!subItem.image">{{
                                subItem.title
                            }}</span>
                            <span
                                v-if="!subItem.image && subItem.extraText"
                                class="NavigationMenu-additionalSubItemExtra"
                                >{{ subItem.extraText }}</span
                            >
                            <div
                                v-if="subItem.image"
                                class="NavigationMenu-itemWithImage"
                            >
                                <div
                                    class="NavigationMenu-itemWithImageWrapper"
                                >
                                    <img :src="subItem.image" />
                                </div>
                                <span>{{ subItem.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </perfect-scrollbar>
            <div class="NavigationMenu-additionalOverlay"></div>
            <div
                v-if="isSubNavigationOpened"
                ref="closeCrossSubMenu"
                class="b-navigation-link NavigationMenu-closeCross"
                @click="closeMenu"
            >
                <svg-icon name="close-cross"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import NavigationMenuAdditionalLinks from '@/components/NavigationMenuAdditionalLinks';
import { isElementParentOf } from '@/utils/utils';

export default {
    name: 'NavigationMenu',
    components: { NavigationMenuAdditionalLinks },
    data() {
        return {
            cursorHelperTopPosition: 0,
            activeMenuItemId: '',
            activePointerLeftPosition: 0,
            isMainContentWrapperActive: true
        };
    },
    computed: {
        activePointerPosition() {
            this.updateActivePointerPosition();
            return this.activePointerLeftPosition;
        },
        getActiveMenuItems() {
            const currentNavItem = this.getCurrentNavItem();

            if (!currentNavItem) {
                return [];
            }
            return currentNavItem.menuItems;
        },
        getActiveMenuItemsAdditionalLinks() {
            const currentNavItem = this.getCurrentNavItem();

            if (!currentNavItem) {
                return [];
            }

            return currentNavItem.bottomLinks;
        },
        getCurrentNavItemBottomLinksTitle() {
            const currentNavItem = this.getCurrentNavItem();
            if (!currentNavItem) {
                return null;
            }

            return currentNavItem.bottomLinksTitle;
        },
        getActiveMenuItemsAdditionalLinksLength() {
            const currentNavItem = this.getCurrentNavItem();

            if (!currentNavItem) {
                return null;
            }

            return (
                currentNavItem.bottomLinks && currentNavItem.bottomLinks.length
            );
        },
        getCursorHelperTopPosition() {
            return `${this.cursorHelperTopPosition}px`;
        },
        ...mapState('navigation', [
            'isNavigationOpened',
            'activeItemId',
            'isSubNavigationOpened'
        ]),
        ...mapState('header', ['header'])
    },
    watch: {
        isNavigationOpened() {
            if (!this.isNavigationOpened) {
                return;
            }

            if (this.activeItemId !== '') {
                return;
            }

            this.setActiveNavigationItem(this.header.items[0].id);
        }
    },
    mounted() {
        window.addEventListener('resize', this.updateActivePointerPosition);
    },
    methods: {
        setActiveNavigationItemScope(activeItemId) {
            this.isMainContentWrapperActive = false;
            this.setActiveNavigationItem(activeItemId);
            setTimeout(() => {
                this.isMainContentWrapperActive = true;
            });
        },
        updateActivePointerPosition() {
            if (this.activeItemId === '') {
                return;
            }
            const activeItem = this.$refs[this.activeItemId][0];
            const widthOfActiveItem = activeItem.offsetWidth;
            const leftPositionOfActiveItem = activeItem.offsetLeft;
            const widthOfActivePointer = this.$refs.activePointer.offsetWidth;
            this.activePointerLeftPosition = `${
                widthOfActiveItem / 2 +
                leftPositionOfActiveItem -
                widthOfActivePointer / 2
            }px`;
        },
        onMenuClick(event) {
            const menu = this.$refs.menu;
            const subMenu = this.$refs.subMenu;
            const target = event.target;

            if (
                this.$refs.closeCrossMenu?.isEqualNode(target) ||
                this.$refs.closeCrossSubMenu?.isEqualNode(target)
            ) {
                return;
            }

            if (
                isElementParentOf(menu, target) ||
                isElementParentOf(subMenu, target)
            ) {
                return;
            }

            this.closeMenu();
        },
        getCurrentNavItem() {
            const currentNavItem = this.header.items.filter(
                (headerItem) => headerItem.id === this.activeItemId
            )[0];
            if (!currentNavItem) {
                return null;
            }

            return currentNavItem;
        },
        closeMenu() {
            this.closeSubNavigation();
            this.closeNavigationMenu();
            this.unblurContent();
            this.unblurPopup();
            this.unblurBlackPopup();
            this.unblockScroll();
        },
        openSubMenu(menuItem) {
            const menuItemEl = this.$refs[menuItem.id][0];
            if (menuItem) {
                this.cursorHelperTopPosition = menuItemEl.offsetTop;
            }
            this.activeMenuItemId = menuItem.id;

            if (menuItem && !menuItem.subItems) {
                this.closeSubNavigation();

                return;
            }
            this.openSubNavigation();
        },
        closeSubMenu(event) {
            const subMenuLeft = 480;
            if (event.offsetX > subMenuLeft) {
                return;
            }
            this.activeMenuItemId = '';
            this.closeSubNavigation();
        },
        closeSubMenuOnUnhover() {
            this.activeMenuItemId = '';
            this.closeSubNavigation();
        },
        ...mapMutations({
            setActiveNavigationItem: 'navigation/setActiveNavigationItem',
            closeNavigationMenu: 'navigation/closeMenu',
            openSubNavigation: 'navigation/openSubMenu',
            closeSubNavigation: 'navigation/closeSubMenu',
            unblurContent: 'unblurContent',
            unblurPopup: 'unblurPopup',
            unblurBlackPopup: 'unblurBlackPopup',
            unblockScroll: 'unblockScroll'
        })
    }
};
</script>

<style lang="scss" scoped>
.ps {
    height: 100%;
    padding: 118px 0 35px;
}

.NavigationMenu {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: $z-navigationMenu;
    pointer-events: none;
    opacity: 0;
    transform: translate3d(0, 0, 0);
    transition: 0s opacity $d-hover;

    @include mobile {
        display: none;
    }

    &.isOpened {
        opacity: 1;
        pointer-events: all;
        transition: none;
    }

    &-main {
        width: 480px;
        background: $c-purple;
        height: 100%;
        transition: $d-hover transform;
        transform: translateX(-100%);
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        display: flex;
        flex-direction: column;
        padding-bottom: 75px;

        &.isOpened {
            transform: none;
        }
    }

    &-mainHead {
        height: 80px;
        padding: 0 40px;
        position: relative;

        &Inner {
            display: flex;
            height: 100%;
            align-items: center;
            position: relative;
        }

        &Item {
            color: $c-white;

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }

            &.isActive {
                pointer-events: none;
            }
        }

        &ActivePointer {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 2px;
            background: $c-white;
            width: 100px;
            transition: $d-hover transform;

            @include tablet {
                width: 85px;
            }
        }
    }

    &-mainContent {
        margin-top: 38px;
        padding-left: 60px;
        position: relative;

        &Wrapper {
            transition: none;
            display: flex;
            flex-direction: column;
            height: 100%;
            transform: translate3d(-40px, 0, 0);
            opacity: 0;

            &.isActive {
                transform: none;
                opacity: 1;
                transition: $d-hover transform, $d-hover opacity;
            }
        }

        &CursorHelper {
            position: absolute;
            right: -5px;
            height: 80px;
            width: 150px;
            top: 0;
            cursor: pointer;
        }
    }

    &-closeCross {
        position: absolute;
        width: 24px;
        height: 24px;
        right: 28px;
        top: 28px;
        cursor: pointer;
        z-index: 100;

        svg {
            width: 100%;
            height: 100%;
            pointer-events: none;
            fill: $c-blue;
        }
    }

    &-additional {
        opacity: 0;
        width: 480px;
        height: 100%;
        background: $c-purple--dark;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate3d(0, 0, 0);
        transition: $d-hover opacity, $d-hover transform;
        z-index: 1;

        &.isActive {
            transform: translate3d(100%, 0, 0);
            transition: $d-hover transform;
            opacity: 1;

            .NavigationMenu-additionalOverlay {
                opacity: 1;
            }
        }

        &Item {
            transform: translate3d(-40px, 0, 0);
            opacity: 0;
            padding-left: 60px;

            &.isActive {
                transform: none;
                opacity: 1;
                transition: $d-hover transform, $d-hover opacity;
            }
        }

        &SubItemExtra {
            @include text-light;
            line-height: (30 / 14);
        }

        &Overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            transform: translate3d(0, 0, 0);
            width: 100%;
            height: 80px;
            opacity: 0;
            color: $c-purple;
            background-image: linear-gradient(
                180deg,
                rgba($c-purple--dark, 0) 0%,
                $c-purple--dark 100%
            );
        }
    }

    &-itemWithImage {
        display: flex;
        align-items: center;
        margin-top: 40px;
        padding-right: 60px;
        transform: translate3d(0, 0, 0);

        &Wrapper {
            overflow: hidden;
            width: 120px;
            height: 80px;
            flex: 0 0 120px;
            transform: translate3d(0, 0, 0);

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: $d-hover transform;
                transform: scale(1) translate3d(0, 0, 0);
            }
        }

        span {
            @include text-light;
            font-weight: $fw-medium;
            margin-left: 40px;
        }
    }
}
</style>
