<template>
    <section
        class="ProductPopup"
        :class="[
            popup.isFamily ? `ProductPopup--family` : `ProductPopup--product`,
            `ProductPopup--${popup.available}`
        ]"
    >
        <div class="ProductPopup-wrapper">
            <product-popup-hero
                v-if="popup.type"
                :is-family="popup.isFamily"
                :name="popup.name"
                :description="popup.description"
                :tags="popup.tags"
                :media="popup.media"
                :info="popup.info ? popup.info : {}"
                :link-sheet="popup.linkSheet ? popup.linkSheet : ''"
                :link-setbuilder="
                    popup.linkSetbuilder ? popup.linkSetbuilder : ''
                "
                :link-eshop="popup.linkEshop ? popup.linkEshop : ''"
                :article-number="popup.articleNumber ? popup.articleNumber : ''"
                :ean="popup.ean ? popup.ean : ''"
                :available="popup.available"
                :coming-date="popup.comingDate ? popup.comingDate : ''"
            ></product-popup-hero>
            <div v-if="!isComingSoonProduct" class="ProductPopup-inner">
                <div
                    v-if="popup.isFamily && !!popup.familyListCount"
                    class="ProductPopup-section ProductPopup-section--articles isGray"
                >
                    <div class="ProductPopup-sectionWrapper">
                        <product-popup-articles
                            :filter-list="filterList[apiEvent]"
                            :count-articles="popup.familyListCount"
                            :articles="popup.familyList"
                        ></product-popup-articles>
                    </div>
                </div>
                <div class="ProductPopup-section ProductPopup-section--drawers">
                    <div class="ProductPopup-sectionWrapper">
                        <common-drawers
                            :content-components="contentComponents"
                            modifier="all"
                        ></common-drawers>
                    </div>
                </div>
                <div
                    v-if="!!popup.same"
                    class="ProductPopup-section ProductPopup-section--same isGray"
                >
                    <div class="ProductPopup-sectionWrapper">
                        <common-same-products
                            :same="popup.same"
                        ></common-same-products>
                    </div>
                </div>
                <div
                    v-if="!!popup.references"
                    class="ProductPopup-section ProductPopup-section--references"
                >
                    <div class="ProductPopup-sectionWrapper">
                        <product-popup-references
                            :references="popup.references"
                        ></product-popup-references>
                    </div>
                </div>
                <div
                    v-if="listViewedProducts.length > 1"
                    class="ProductPopup-section ProductPopup-section--viewed isGray"
                >
                    <div class="ProductPopup-sectionWrapper">
                        <common-viewed-products
                            :viewed="listViewedProducts"
                            :current-id-product="popup.id"
                        ></common-viewed-products>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ProductPopupHero from '@/components/ProductPopupHero';
import ProductPopupArticles from '@/components/ProductPopupArticles';
import CommonSameProducts from '@/components/CommonSameProducts';
import CommonDrawers from '@/components/CommonDrawers';
import ProductPopupReferences from '@/components/ProductPopupReferences';
import CommonViewedProducts from '@/components/CommonViewedProducts';

import { mapActions, mapMutations, mapState } from 'vuex';
import { VUE_CUSTOM_EVENTS, PRODUCT_AVAILABLE } from '@/utils/constants';

export default {
    name: 'ProductPopup',

    components: {
        CommonViewedProducts,
        ProductPopupReferences,
        CommonSameProducts,
        ProductPopupHero,
        ProductPopupArticles,
        CommonDrawers
    },

    props: {
        popup: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            contentComponents: {
                overview: 'ProductPopupDrawersOverview',
                information: 'ProductPopupDrawersCommonTables',
                included: 'ProductPopupDrawersProducts',
                common: 'ProductPopupDrawersCommonDataTable',
                technical: 'ProductPopupDrawersCommonTables',
                downloads: 'ProductPopupDrawersDownloads',
                accessories: 'ProductPopupDrawersProducts',
                compatibles: 'ProductPopupDrawersProducts',
                faqs: 'ProductPopupDrawersFaqs'
            },
            listViewedProducts: []
        };
    },

    computed: {
        isComingSoonProduct() {
            return this.popup.available === PRODUCT_AVAILABLE.comingSoon;
        },

        ...mapState('filters', ['filterList', 'apiEvent']),
        ...mapState('drawers', ['drawers'])
    },

    watch: {
        popup(newPopup) {
            this.activateLogic(newPopup);
        }
    },

    mounted() {
        this.activateLogic(this.popup);
    },

    destroyed() {
        this.setIsPopup(false);
    },

    methods: {
        activateLogic(popup) {
            this.setDrawers();
            this.setViewedProduct(popup);
            this.setIsPopup(true);
            this.updateApiEvent(VUE_CUSTOM_EVENTS.fetchPopupFamilyArticles);
            this.updateFilterList(this.popup.filterList);

            this.$root.$emit(VUE_CUSTOM_EVENTS.getNewDrawers);

            if (popup.available === PRODUCT_AVAILABLE.phasedOut) {
                this.openPhasedOut();
            }
        },

        setDrawers() {
            const drawers = [];

            !!this.popup.overview && drawers.push(this.popup.overview);
            !!this.popup.information && drawers.push(this.popup.information);
            !!this.popup.included && drawers.push(this.popup.included);
            !!this.popup.common && drawers.push(this.popup.common);
            !!this.popup.technical && drawers.push(this.popup.technical);
            !!this.popup.downloads && drawers.push(this.popup.downloads);
            !!this.popup.accessories && drawers.push(this.popup.accessories);
            !!this.popup.compatibles && drawers.push(this.popup.compatibles);
            !!this.popup.faqs && drawers.push(this.popup.faqs);

            this.updateDrawers({ all: drawers });
        },

        setViewedProduct(popup) {
            const currentCookies = window.localStorage.getItem(
                'viewedProducts'
            );

            this.listViewedProducts = currentCookies
                ? JSON.parse(currentCookies)
                : [];

            if (
                !this.listViewedProducts.length ||
                !this.listViewedProducts.filter((item) => item.id === popup.id)
                    .length
            )
                this.listViewedProducts.push(popup);

            if (this.listViewedProducts.length > 6) {
                this.listViewedProducts.shift();
            }

            window.localStorage.setItem(
                'viewedProducts',
                JSON.stringify(this.listViewedProducts)
            );
        },

        openPhasedOut() {
            this.openModalPopup({ modalComponent: 'ProductPopupPhasedOut' });
        },

        ...mapMutations({
            updateFilterList: 'filters/updateFilterList',
            updateApiEvent: 'filters/updateApiEvent',
            setIsPopup: 'filters/setIsPopup',
            updateDrawers: 'drawers/updateDrawers'
        }),

        ...mapActions({
            openModalPopup: 'modal-popup/openModalPopup'
        })
    }
};
</script>

<style lang="scss" scoped>
.ProductPopup {
    $component: &;
    $product: #{$component}--product;
    $family: #{$component}--family;
    $isComingSoon: #{$component}--comingSoon;

    width: 100%;
    position: relative;

    &#{$product} {
        padding-bottom: 60px;
    }

    &#{$isComingSoon} {
        padding-bottom: 0;
        display: flex;
    }

    &-wrapper {
        display: flex;
        width: 100%;
        position: relative;
        flex-direction: column;
    }

    &-inner {
        overflow: hidden;
        border-radius: 0 0 10px 10px;
        padding-top: 1px;

        #{$isComingSoon} & {
            border-radius: 10px;
        }
    }

    &-section {
        width: 100%;
        position: relative;
        box-shadow: 0 -1px 0 0 #e4e4e4;
        background: $c-white;

        &.isGray {
            background: $c-gray--bg;
        }

        &--drawers {
            @include mobile {
                box-shadow: none;
            }
        }

        &Wrapper {
            display: flex;
            width: 100%;
            position: relative;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-left: 40px;
            padding-right: 40px;
            max-width: 1240px;
            margin: 0 auto;

            @include mobile {
                padding-left: 0;
                padding-right: 0;
            }

            #{$component}-section--articles & {
                padding-top: 28px;
                padding-bottom: 60px;

                @include tablet {
                    padding-bottom: 40px;
                }

                @include mobile {
                    padding-top: 36px;
                    padding-bottom: 40px;
                }
            }

            #{$component}-section--drawers & {
                padding-top: 80px;
                padding-bottom: 80px;

                @include mobile {
                    padding-top: 0;
                    padding-bottom: 16px;
                }
            }

            #{$component}-section--same & {
                padding-top: 28px;
                padding-bottom: 80px;

                @include mobile {
                    padding-top: 36px;
                    padding-bottom: 40px;
                }
            }

            #{$component}-section--references & {
                padding-top: 28px;
                padding-bottom: 80px;

                @include mobile {
                    padding-top: 36px;
                    padding-bottom: 46px;
                }
            }

            #{$component}-section--viewed & {
                padding-top: 28px;
                padding-bottom: 80px;

                @include mobile {
                    padding-top: 36px;
                    padding-bottom: 46px;
                }
            }
        }
    }
}
</style>
