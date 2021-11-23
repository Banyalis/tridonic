<template>
    <div class="SolutionsProductsPopup">
        <div class="SolutionsProductsPopup-header b-container">
            <div class="SolutionsProductsPopup-headerWrapper">
                <div
                    class="SolutionsProductsPopup-headerTitle"
                    v-text="$translations.titleSolutionsProduct()"
                ></div>
                <div class="SolutionsProductsPopup-headerProducts">
                    <div class="SolutionsProductsPopup-headerProductsWrapper">
                        <nuxt-link
                            v-for="product in popup.products"
                            :key="product.id"
                            :to="product.url"
                            class="SolutionsProductsPopup-headerProduct"
                            :class="{ isActive: product.id === popup.id }"
                        >
                            <div
                                class="SolutionsProductsPopup-headerProductImage"
                            >
                                <div
                                    class="SolutionsProductsPopup-headerProductImageWrapper"
                                >
                                    <img
                                        :src="product.image"
                                        :alt="product.title"
                                    />
                                </div>
                            </div>
                            <div
                                class="SolutionsProductsPopup-headerProductTitle"
                                v-text="product.title"
                            ></div>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="SolutionsProductsPopup-features">
            <SolutionsProductsFeatures
                :features="popup.features"
                :active-solution-title="popup.title"
                @solution-product-change="onProductChange"
            />
        </div>
        <div v-if="info" class="SolutionsProductsPopup-info">
            <div class="SolutionsProductsPopup-infoBlock">
                <SolutionsProductsInfo :info="info.descr" />
            </div>
            <div class="SolutionsProductsPopup-infoBlock">
                <SolutionsProductsCorresponding :products="info.products" />
            </div>
        </div>
        <div class="SolutionsProductsPopup-contact">
            <SolutionsProductsContact :contact="popup.contact" />
        </div>
    </div>
</template>

<script>
import SolutionsProductsFeatures from '@/components/SolutionsProductsFeatures';
import SolutionsProductsInfo from '@/components/SolutionsProductsInfo';
import SolutionsProductsCorresponding from '@/components/SolutionsProductsCorresponding';
import SolutionsProductsContact from '@/components/SolutionsProductsContact';

export default {
    name: 'SolutionsProductsPopup',

    components: {
        SolutionsProductsContact,
        SolutionsProductsCorresponding,
        SolutionsProductsInfo,
        SolutionsProductsFeatures
    },

    props: {
        popup: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            info: undefined
        };
    },

    watch: {
        popup() {
            this.info = undefined;
        }
    },

    methods: {
        async onProductChange(id) {
            const infoResponse = await this.$axios.get(
                `${this.$config.baseURL}/${this.language}/${this.region}/solutions/products/${this.$route.params.popupSlug}/get-info`,
                {
                    params: {
                        productId: id
                    }
                }
            );

            if (!infoResponse) return;

            this.info = { ...infoResponse.data };
        }
    }
};
</script>

<style lang="scss" scoped>
.SolutionsProductsPopup {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &-header {
        width: 100%;
        display: flex;

        &Wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            padding: 48px 0 57px;
        }

        &Title {
            @include title-bordered-h2;

            color: $c-black;
        }

        &Products {
            display: flex;
            width: 100%;
            margin-top: 35px;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;

            @include mobile {
                width: 100vw;
                overflow-x: scroll;
                overflow-y: hidden;
                scroll-behavior: smooth;
                overflow-scrolling: touch;
                justify-content: flex-start;
                max-width: 730px;
            }

            &::-webkit-scrollbar {
                width: 0;
            }

            &::-webkit-scrollbar-track {
                background-color: transparent;
            }

            &::-webkit-scrollbar-thumb {
                background-color: transparent;
            }

            &::-webkit-scrollbar-button {
                background-color: transparent;
            }

            &::-webkit-scrollbar-corner {
                background-color: transparent;
            }

            &Wrapper {
                width: 100%;
                display: flex;
                flex-wrap: nowrap;
                flex-direction: row;
                align-items: flex-start;
                justify-content: center;

                @include mobile {
                    width: auto;
                    justify-content: flex-start;
                    padding: 0 20px;
                }
            }
        }

        &Product {
            display: flex;
            width: (134 * 100% / 1160);
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            cursor: pointer;
            margin-left: (35 * 100% / 1160);
            max-width: 134px;

            @include mobile {
                width: 90px;
                flex: 0 0 90px;
                margin-left: 30px;
            }

            &:first-child {
                margin-left: 0;
            }

            &.isActive {
                pointer-events: none;

                #{$component}-headerProduct {
                    &Image {
                        border-color: $c-purple;
                    }

                    &Title {
                        color: $c-purple;
                    }
                }
            }

            @include hover {
                &:hover {
                    #{$component}-headerProduct {
                        &Image {
                            border-color: $c-purple;
                        }

                        &Title {
                            color: $c-purple;
                        }
                    }
                }
            }

            &Image {
                display: flex;
                width: 100%;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                border: 2px solid transparent;
                border-radius: 100%;
                padding: 3px;
                transition: $d-hover border-color;

                @include mobile {
                    padding: 3px;
                }

                &Wrapper {
                    @include m-aspectRatio(120, 120);

                    display: flex;
                    width: 100%;
                    overflow: hidden;
                    border-radius: 100%;

                    img {
                        @include m-absoluteObjectFit();
                    }
                }
            }

            &Title {
                @include text-small;

                width: 100%;
                display: flex;
                text-align: center;
                align-items: center;
                justify-content: center;
                margin-top: 18px;
                line-height: (20 / 18);
                color: $c-black;
                transition: $d-hover color;

                @include mobile {
                    @include text-light-same-mobile-medium;

                    margin-top: 0;
                }
            }
        }
    }

    &-features {
        width: 100%;
    }

    &-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        &Block {
            width: 100%;
        }
    }

    &-contact {
        width: 100%;
    }
}
</style>
