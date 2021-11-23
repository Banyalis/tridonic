<template>
    <div v-if="popup.phasedProducts" class="ProductPopupPhasedOut">
        <div class="ProductPopupPhasedOut-wrapper">
            <div
                class="ProductPopupPhasedOut-title"
                v-text="$translations.titlePhasedOutProduct()"
            ></div>
            <div class="ProductPopupPhasedOut-items">
                <div class="ProductPopupPhasedOut-section">
                    <div
                        class="ProductPopupPhasedOut-sectionTitle"
                        v-text="$translations.titleReplacementProduct()"
                    ></div>
                    <div class="ProductPopupPhasedOut-sectionList">
                        <div
                            v-for="(product, index) in popup.phasedProducts
                                .replacement"
                            :key="index"
                            class="ProductPopupPhasedOut-sectionListItem"
                        >
                            <product-item
                                :product="product"
                                :is-comparable="false"
                            ></product-item>
                        </div>
                    </div>
                </div>
                <div class="ProductPopupPhasedOut-section">
                    <div
                        class="ProductPopupPhasedOut-sectionTitle"
                        v-text="$translations.titleAlternativeProduct()"
                    ></div>
                    <div class="ProductPopupPhasedOut-sectionList">
                        <div
                            v-for="(product, index) in popup.phasedProducts
                                .alternatives"
                            :key="index"
                            class="ProductPopupPhasedOut-sectionListItem"
                        >
                            <product-item
                                :product="product"
                                :is-comparable="false"
                            ></product-item>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ProductPopupPhasedOut-button">
                <rounded-button
                    type="isBlack"
                    :text="$translations.showPhasedOutProduct()"
                    @click="handleOnClick"
                ></rounded-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductItem from '@/components/ProductItem';
import RoundedButton from '@/components/RoundedButton';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'ProductPopupPhasedOut',

    components: { RoundedButton, ProductItem },

    computed: {
        ...mapState('popup', ['popup'])
    },

    methods: {
        handleOnClick() {
            this.$emit(VUE_CUSTOM_EVENTS.closeModalPopup);
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupPhasedOut {
    display: flex;
    width: 100%;

    &-wrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    &-title {
        @include text;

        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: center;
        text-align: center;
        color: $c-black;

        @include mobile {
            @include text-light-same-mobile-medium;

            width: (200 * 100% / 320);
            margin-top: 20px;
        }
    }

    &-items {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        margin-top: 34px;

        @include mobile {
            margin-top: 20px;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
        }
    }

    &-section {
        display: flex;
        padding: 20px;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background: $c-gray--bg;
        border-radius: 10px;
        overflow: hidden;

        & + & {
            margin-left: 40px;

            @include mobile {
                margin-left: 0;
            }
        }

        @include mobile {
            margin-top: 20px;

            &:first-child {
                margin-top: 0;
            }
        }

        &Title {
            @include text-small;

            display: flex;
            width: 100%;
            flex-direction: row;
            justify-content: center;
            color: $c-black;
            line-height: 20 / 18;
        }

        &List {
            display: flex;
            width: 100%;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            margin-top: 17px;

            &Item {
                width: 240px;
                display: flex;

                @include mobile {
                    width: (160 * 100vw / 320);
                }
            }
        }
    }

    &-button {
        margin-top: 20px;

        @include mobile {
            margin-top: 40px;
        }
    }
}
</style>
