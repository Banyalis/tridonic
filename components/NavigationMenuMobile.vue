<template>
    <div
        class="NavigationMenuMobile"
        :class="{ isActive: isMobileNavigationOpened }"
    >
        <div class="NavigationMenuMobile-close" @click="closeMobileMenuInner">
            <svg-icon name="close-cross"></svg-icon>
        </div>
        <div
            class="NavigationMenuMobile-back"
            :class="{ isActive: isMobileSubNavigationOpened }"
            @click="closeSubNavigation"
        >
            <svg-icon name="arrow-left-small"></svg-icon>
        </div>
        <div
            class="NavigationMenuMobile-main"
            :class="{ isActive: !isMobileSubNavigationOpened }"
        >
            <div class="NavigationMenuMobile-menuItems">
                <a
                    v-for="(menuItem, key) in header.items"
                    :key="key"
                    :href="menuItem.url"
                    class="NavigationMenuMobile-menuItem"
                    @click="openSubNavigation(menuItem)"
                >
                    {{ menuItem.title }}
                    <svg-icon name="arrow-right"></svg-icon>
                </a>
            </div>
            <div class="NavigationMenuMobile-buttons">
                <div class="NavigationMenuMobile-button">
                    <RoundedButton
                        :text="languageObject.titleShort"
                    ></RoundedButton>
                    <select
                        v-model="selectedLang"
                        class="NavigationMenuMobile-selectIntl"
                        @change="updateLanguage(selectedLang)"
                    >
                        <option
                            v-for="(intl, key) in getIntlList"
                            :key="key"
                            :value="intl"
                            :selected="intl.id === getActiveIntlId"
                        >
                            {{ intl.title }}
                        </option>
                    </select>
                </div>
                <div class="NavigationMenuMobile-button">
                    <RoundedButton
                        text="eShop"
                        @click="openEshopPanel"
                    ></RoundedButton>
                </div>
            </div>
        </div>
        <div
            class="NavigationMenuMobile-additional"
            :class="{ isActive: isMobileSubNavigationOpened }"
        >
            <div class="NavigationMenuMobile-additionalMenuItems">
                <div
                    v-for="(menuItem, key) in header.items"
                    :key="key"
                    class="NavigationMenuMobile-additionalMenuItem"
                >
                    <div
                        v-if="menuItem.id === mobileSubNavigationItemId"
                        class="NavigationMenuMobile-additionalMenuItemWrapper"
                    >
                        <a
                            v-for="(subItem, subItemKey) in menuItem.menuItems"
                            :key="subItemKey"
                            :href="subItem.url"
                            class="NavigationMenuMobile-additionalMenuSubItem"
                        >
                            {{ subItem.title }}
                        </a>
                    </div>
                </div>
            </div>
            <NavigationMenuAdditionalLinks
                :link-list="getBottomLinks"
                :title="getBottomLinksTitle"
            ></NavigationMenuAdditionalLinks>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import RoundedButton from '@/components/RoundedButton';
import NavigationMenuAdditionalLinks from '@/components/NavigationMenuAdditionalLinks';
import { updateLang } from '@/utils/utils';

export default {
    name: 'NavigationMenuMobile',
    components: { NavigationMenuAdditionalLinks, RoundedButton },
    data() {
        return {
            selectedLang: {}
        };
    },
    computed: {
        getActiveIntlId() {
            return this.languageObject.id;
        },
        getIntlList() {
            return this.navigationUtils?.intlPanel?.intlList || [];
        },
        getBottomLinksTitle() {
            const activeItem = this.getActiveItem();

            return activeItem && activeItem.bottomLinksTitle;
        },
        getBottomLinks() {
            const activeItem = this.getActiveItem();

            return activeItem && activeItem.bottomLinks;
        },
        ...mapState('navigation', [
            'isMobileNavigationOpened',
            'isMobileSubNavigationOpened',
            'mobileSubNavigationItemId'
        ]),
        ...mapState('navigation-utils', ['navigationUtils']),
        ...mapState('header', ['header']),
        ...mapState('locale', ['languageObject'])
    },
    mounted() {
        this.selectedLang = this.languageObject;
    },
    methods: {
        closeMobileMenuInner() {
            this.unblurContent();
            this.unblurPopup();
            this.unblurBlackPopup();
            this.unblockScroll();
            this.closeMobileMenu();
        },
        openSubNavigation(menuItem) {
            this.setActiveItemId(menuItem.id);
            this.openSubMenu();
        },
        closeSubNavigation() {
            this.setActiveItemId('');
            this.closeSubMenu();
        },
        getActiveItem() {
            return this.header.items.filter(
                (item) => item.id === this.mobileSubNavigationItemId
            )[0];
        },
        updateLanguage(langObject) {
            updateLang(langObject, this.$cookies);
        },
        ...mapMutations({
            closeMobileMenu: 'navigation/closeMobileMenu',
            setActiveItemId: 'navigation/setMobileSubNavigationItemId',
            closeSubMenu: 'navigation/closeMobileSubMenu',
            openSubMenu: 'navigation/openMobileSubMenu',
            unblurContent: 'unblurContent',
            unblurPopup: 'unblurPopup',
            unblurBlackPopup: 'unblurBlackPopup',
            unblockScroll: 'unblockScroll',
            openEshopPanel: 'eshop-mobile/openEshopPanel'
        })
    }
};
</script>

<style lang="scss" scoped>
.NavigationMenuMobile {
    opacity: 0;
    display: none;
    pointer-events: none;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: $c-purple;
    transition: $d-hover opacity;
    z-index: $z-navigationMenu;
    padding: 61px 20px 40px;

    @include mobile {
        display: block;
    }

    &.isActive {
        opacity: 1;
        pointer-events: all;
    }

    &-close {
        position: absolute;
        right: 22px;
        top: 22px;
        width: 16px;
        height: 16px;
        z-index: $z-mobileCloseCross;

        svg {
            width: 100%;
            height: 100%;
            fill: $c-blue;
        }
    }

    &-back {
        position: absolute;
        left: 21px;
        top: 23px;
        width: 24px;
        height: 18px;
        opacity: 0;
        pointer-events: none;
        transition: $d-hover opacity;
        z-index: $z-mobileBackArrow;

        svg {
            width: 100%;
            height: 100%;
        }

        &.isActive {
            pointer-events: all;
            opacity: 1;
        }
    }

    &-main {
        display: flex;
        flex-direction: column;
        height: 100%;
        transform: translate3d(-100%, 0, 0);
        opacity: 0;
        transition: $d-hover opacity, $d-hover transform;

        &.isActive {
            transform: none;
            opacity: 1;
        }
    }

    &-menuItem {
        @include text;
        display: block;
        color: $c-white;
        position: relative;
        margin-top: 20px;

        @include mobile {
            font-size: 24px;
            line-height: (20 / 24);
        }

        &:first-child {
            margin-top: 0;
        }

        svg {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            width: 23px;
            height: 16px;
        }
    }

    &-buttons {
        margin-top: auto;
        display: flex;
        flex-direction: column;
    }

    &-additional {
        opacity: 0;
        transform: translate3d(100%, 0, 0);
        transition: $d-hover transform, $d-hover opacity;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 61px 20px 35px;
        display: flex;
        flex-direction: column;

        &.isActive {
            transform: none;
            opacity: 1;
        }

        &MenuSubItem {
            display: block;
            @include text;
            color: $c-white;

            @include mobile {
                font-size: 24px;
                line-height: 1;
                margin: 20px 0;
            }
        }
    }

    &-button {
        position: relative;
        margin-left: auto;
        margin-right: auto;

        &:last-child {
            margin-top: 20px;
        }
    }

    &-selectIntl {
        position: absolute;
        z-index: $z-hiddenSelect;
        opacity: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
