<template>
    <div
        class="NavigationUtilsMenu"
        :class="{ isActive: isNavigationUtilsOpened }"
        @click="onMenuClick($event)"
    >
        <div ref="menuInner" class="NavigationUtilsMenu-inner">
            <div class="NavigationUtilsMenu-head">
                <div
                    ref="closeCrossMenu"
                    class="NavigationUtilsMenu-headClose"
                    @click="closeNavigationUtilsMenuInner"
                >
                    <svg-icon name="close-cross"></svg-icon>
                </div>
                <NavigationUtilsHead></NavigationUtilsHead>
            </div>
            <div class="NavigationUtilsMenu-content">
                <div
                    class="NavigationUtilsMenu-contentItem NavigationUtilsMenu-contentItemIntl"
                    :class="{
                        isActive: activeItemId === intlPanelId
                    }"
                >
                    <NavigationUtilsIntl
                        :intl-list="getIntlList"
                        :active-intl-id="getActiveIntlId"
                    ></NavigationUtilsIntl>
                </div>
                <div
                    class="NavigationUtilsMenu-contentItem NavigationUtilsMenu-contentItemEshop"
                    :class="{
                        isActive: activeItemId === eshopPanelId
                    }"
                >
                    <NavigationUtilsEshop
                        :eshop-panel="navigationUtils.eshopPanel"
                    ></NavigationUtilsEshop>
                </div>
                <div
                    class="NavigationUtilsMenu-contentItem NavigationUtilsMenu-contentItemSearch"
                    :class="{
                        isActive: activeItemId === searchPanelId
                    }"
                >
                    <NavigationUtilsSearch
                        :popular-search-items="
                            navigationUtils.searchPanel.popularSearchItems
                        "
                        :popular-search-items-title="
                            navigationUtils.searchPanel.popularSearchItemsTitle
                        "
                        :is-active="activeItemId === searchPanelId"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { FRONTEND_IDS } from '@/utils/constants';
import NavigationUtilsHead from '~/components/NavigationUtilsHead';
import { onMediaSizeChange, isElementParentOf } from '~/utils/utils';
import NavigationUtilsIntl from '~/components/NavigationUtilsIntl';
import NavigationUtilsEshop from '~/components/NavigationUtilsEshop';
import NavigationUtilsSearch from '~/components/NavigationUtilsSearch';

export default {
    name: 'NavigationUtilsMenu',
    components: {
        NavigationUtilsSearch,
        NavigationUtilsEshop,
        NavigationUtilsIntl,
        NavigationUtilsHead
    },
    data() {
        return {
            searchPanelId: FRONTEND_IDS.searchPanelId,
            intlPanelId: FRONTEND_IDS.intlPanelId,
            eshopPanelId: FRONTEND_IDS.eshopPanelId
        };
    },
    computed: {
        getActiveIntlId() {
            return this.languageObject.id;
        },
        getIntlList() {
            return this.navigationUtils?.intlPanel?.intlList || [];
        },
        ...mapState('navigation-utils', [
            'isNavigationUtilsOpened',
            'navigationUtils',
            'activeItemId'
        ]),
        ...mapState(['currentMediaSize']),
        ...mapState('locale', ['languageObject'])
    },
    watch: {
        currentMediaSize: {
            handler(newVal, oldVal) {
                onMediaSizeChange(
                    newVal,
                    oldVal,
                    this.closeNavigationUtilsMenuInner
                );
            }
        }
    },
    methods: {
        closeNavigationUtilsMenuInner() {
            if (!this.isNavigationUtilsOpened) {
                return;
            }
            this.closeNavigationUtilsMenu();
            this.unblockScroll();
            this.unblurContent();
            this.unblurPopup();
            this.unblurBlackPopup();
        },
        onMenuClick(event) {
            const menuInner = this.$refs.menuInner;
            const target = event.target;

            if (this.$refs.closeCrossMenu?.isEqualNode(target)) {
                return;
            }

            if (isElementParentOf(menuInner, target)) {
                return;
            }

            this.closeNavigationUtilsMenuInner();
        },
        ...mapMutations({
            closeNavigationUtilsMenu: 'navigation-utils/closeMenu',
            unblurContent: 'unblurContent',
            unblurPopup: 'unblurPopup',
            unblurBlackPopup: 'unblurBlackPopup',
            unblockScroll: 'unblockScroll'
        })
    }
};
</script>

<style lang="scss" scoped>
.NavigationUtilsMenu {
    position: fixed;
    right: 0;
    opacity: 0;
    height: 100vh;
    width: 100%;
    top: 0;
    z-index: $z-navigationMenu;
    transition: $d-hover opacity;
    pointer-events: none;

    &-inner {
        background: $c-purple;
        width: 480px;
        height: 100%;
        transform: translate3d(100%, 0, 0);
        transition: $d-hover transform;
        right: 0;
        position: absolute;
    }

    @include mobile {
        display: none;
    }

    &.isActive {
        opacity: 1;
        pointer-events: all;

        .NavigationUtilsMenu-inner {
            transform: translate3d(0, 0, 0);
        }
    }

    &-head {
        height: 80px;
        display: flex;

        &Close {
            position: absolute;
            top: 28px;
            cursor: pointer;
            transition: $d-hover opacity;
            left: 28px;

            svg {
                fill: $c-blue;
            }

            @include hover {
                &:hover {
                    opacity: $v-hover-opacity;
                }
            }
        }
    }

    &-content {
        position: relative;
        width: 100%;
        height: calc(100% - 80px);
    }

    &-contentItem {
        position: absolute;
        padding: 0 60px 60px;
        margin-top: 38px;
        left: 0;
        top: 0;
        height: 100%;
        opacity: 0;
        width: 100%;
        transform: translate3d(-40px, 0, 0);
        pointer-events: none;

        &.isActive {
            transform: none;
            opacity: 1;
            pointer-events: all;
            transition: $d-hover transform, $d-hover opacity;
        }

        &Search {
            padding-right: 40px;
        }
    }
}
</style>
