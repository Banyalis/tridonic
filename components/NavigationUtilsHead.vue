<template>
    <div
        class="NavigationUtilsHead"
        :class="{ isNavigationUtilsMenuOpened: isNavigationUtilsOpened }"
    >
        <div
            :ref="intlPanelId"
            class="NavigationUtilsHead-item NavigationUtilsHead-intl"
            :class="{
                isActive: intlPanelId === activeItemId
            }"
            @click="onItemClick(intlPanelId)"
        >
            {{ languageObject.titleShort }}
        </div>
        <div
            :ref="eshopPanelId"
            class="NavigationUtilsHead-item NavigationUtilsHead-eShop"
            :class="{
                isActive: eshopPanelId === activeItemId
            }"
            @click="onItemClick(eshopPanelId)"
        >
            {{ navigationUtils.eshopPanel.navTitle }}
        </div>
        <div
            :ref="searchPanelId"
            class="NavigationUtilsHead-item NavigationUtilsHead-search"
            :class="{
                isActive: searchPanelId === activeItemId
            }"
            @click="onItemClick(searchPanelId)"
        >
            <svg-icon name="search-icon"></svg-icon>
        </div>
        <div
            class="NavigationUtilsHead-activeItemPointer"
            :style="getActivePointerStyle"
        ></div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import { FRONTEND_IDS } from '~/utils/constants';

export default {
    name: 'NavigationUtilsHead',
    data() {
        return {
            searchPanelId: FRONTEND_IDS.searchPanelId,
            intlPanelId: FRONTEND_IDS.intlPanelId,
            eshopPanelId: FRONTEND_IDS.eshopPanelId
        };
    },
    computed: {
        getActivePointerStyle() {
            if (process.server || !this.activeItemId) {
                return;
            }
            const currentActiveItem = this.$refs[this.activeItemId];

            return {
                width: `${currentActiveItem.offsetWidth - 20}px`,
                transform: `translate3d(${
                    currentActiveItem.offsetLeft + 10
                }px, 0, 0)`
            };
        },
        ...mapState('navigation-utils', [
            'navigationUtils',
            'isNavigationUtilsOpened',
            'activeItemId'
        ]),
        ...mapState('locale', ['languageObject'])
    },
    methods: {
        onItemClick(activeItemId) {
            this.setActiveNavigationUtilsItem(activeItemId);
            if (this.isNavigationUtilsOpened) {
                return;
            }
            this.openNavigationUtilsMenuInner(activeItemId);
        },
        openNavigationUtilsMenuInner(activeItemId) {
            this.blurContent();
            this.blurPopup();
            this.blurBlackPopup();
            this.blockScroll();
            this.setActiveNavigationUtilsItem(activeItemId);
            this.openNavigationUtilsMenu();
        },
        ...mapMutations({
            openNavigationUtilsMenu: 'navigation-utils/openMenu',
            setActiveNavigationUtilsItem:
                'navigation-utils/setActiveNavigationUtilsItem',
            blurContent: 'blurContent',
            blurPopup: 'blurPopup',
            blurBlackPopup: 'blurBlackPopup',
            blockScroll: 'blockScroll'
        })
    }
};
</script>

<style lang="scss" scoped>
.NavigationUtilsHead {
    display: flex;
    height: 100%;
    position: relative;

    &.isNavigationUtilsMenuOpened {
        margin-left: auto;

        .NavigationUtilsHead-item {
            color: $c-white;
            border-right: none;

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }

            &.isActive {
                pointer-events: none;
            }
        }

        .NavigationUtilsHead-item {
            fill: $c-white;

            @include hover {
                &:hover {
                    fill: $c-blue;
                }
            }
        }
    }

    &-item {
        @include text-light;
        padding: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        border-right: $border-default $c-gray--border;
        cursor: pointer;
        color: $c-black;
        transition: $d-hover color;

        @include hover {
            &:hover {
                color: $c-blue;
            }
        }

        &:last-of-type {
            border-right: none;
        }
    }

    &-search {
        transition: $d-hover fill;

        @include hover {
            &:hover {
                fill: $c-blue;
            }
        }
    }

    &-activeItemPointer {
        height: 2px;
        background: $c-white;
        width: 100px;
        position: absolute;
        left: 0;
        bottom: 0;
        transition: $d-hover transform, $d-hover width;
    }
}
</style>
