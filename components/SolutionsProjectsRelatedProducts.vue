<template>
    <section class="SolutionsProjectsRelatedProducts">
        <div class="SolutionsProjectsRelatedProducts-wrapper">
            <h2
                class="SolutionsProjectsRelatedProducts-title"
                v-text="$translations.relatedProducts()"
            ></h2>
            <div
                ref="productsSlider"
                class="SolutionsProjectsRelatedProducts-slider swiper-container"
            >
                <div
                    ref="productsSliderWrapper"
                    class="SolutionsProjectsRelatedProducts-sliderWrapper swiper-wrapper"
                >
                    <div
                        v-for="(slide, index) in products"
                        :key="index"
                        ref="productsSliderItem"
                        class="SolutionsProjectsRelatedProducts-sliderItem swiper-slide"
                    >
                        <product-item
                            :product="slide"
                            :is-comparable="false"
                        ></product-item>
                    </div>
                </div>
            </div>
            <div
                v-if="products.length > 2"
                class="SolutionsProjectsRelatedProducts-sliderPagination swiper-pagination"
            ></div>
        </div>
    </section>
</template>

<script>
import { Swiper, Pagination } from 'swiper';

import 'swiper/swiper.scss';

import ProductItem from '@/components/ProductItem';

import { isMobile } from '@/utils/utils';
import { DURATION_ANIMATION_POPUPS } from '@/utils/constants';

// Swiper modules
Swiper.use([Pagination]);

export default {
    name: 'SolutionsProjectsRelatedProducts',

    components: { ProductItem },

    props: {
        products: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            swiper: undefined
        };
    },

    watch: {
        products() {
            setTimeout(() => {
                this.swiper && this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.productsSliderWrapper.removeAttribute('style');
                this.$refs.productsSliderItem[0].removeAttribute('style');
                this.initSwiper();
            }, DURATION_ANIMATION_POPUPS / 2);
        }
    },

    mounted() {
        window.addEventListener('resize', this.initSwiper);
        this.initSwiper();
    },

    destroyed() {
        window.removeEventListener('resize', this.initSwiper);
    },

    methods: {
        initSwiper() {
            if (isMobile() && this.swiper === undefined) {
                this.swiper = new Swiper(this.$refs.productsSlider, {
                    direction: 'horizontal',
                    centeredSlides: false,
                    slidesPerView: 'auto',
                    slidesPerGroup: 2,
                    pagination: {
                        el:
                            '.SolutionsProjectsRelatedProducts-sliderPagination',
                        clickable: true
                    }
                });
            } else if (!isMobile() && this.swiper !== undefined) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.productsSliderWrapper.removeAttribute('style');
                this.$refs.productsSliderItem[0].removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.SolutionsProjectsRelatedProducts {
    $component: &;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;

    &-wrapper {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    &-title {
        @include title-small;

        width: 100%;
        color: $c-black;

        @include mobile {
            padding: 0 20px;
        }
    }

    &-slider {
        width: 100%;
        display: flex;
        margin-top: 32px;
        overflow: visible;

        @include mobile {
            overflow: hidden;
            margin-top: 14px;
        }

        &Wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;

            @include mobile {
                flex-wrap: nowrap;
            }
        }

        &Item {
            width: (100% / 5);
            display: flex;

            @include mobile {
                width: 50%;
            }
        }

        &Pagination {
            display: none;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: 26px;

            @include mobile {
                display: flex;
            }

            & /deep/ .swiper-pagination-bullet {
                width: 8px;
                height: 8px;
                background: transparent;
                display: flex;
                border-radius: 100%;
                border: 1px solid $c-gray;
                margin-left: 12px;

                &:first-child {
                    margin-left: 0;
                }

                &.swiper-pagination-bullet-active {
                    background: $c-purple;
                    border-color: $c-purple;
                }
            }
        }
    }
}
</style>
