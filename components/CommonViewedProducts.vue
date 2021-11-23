<template>
    <section class="CommonViewedProducts">
        <div class="CommonViewedProducts-wrapper">
            <h2
                class="CommonViewedProducts-title"
                v-text="$translations.viewedProducts()"
            ></h2>
            <div
                ref="viewedSlider"
                class="CommonViewedProducts-slider swiper-container"
            >
                <div
                    ref="viewedSliderWrapper"
                    class="CommonViewedProducts-sliderWrapper swiper-wrapper"
                >
                    <div
                        v-for="(slide, index) in computedViewedProducts"
                        :key="index"
                        ref="viewedSliderItem"
                        class="CommonViewedProducts-sliderItem swiper-slide"
                    >
                        <product-item
                            :product="slide"
                            :is-comparable="false"
                        ></product-item>
                    </div>
                </div>
            </div>
            <div
                v-if="computedViewedProducts.length > 2"
                class="CommonViewedProducts-sliderPagination swiper-pagination"
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
    name: 'CommonViewedProducts',
    components: { ProductItem },
    props: {
        viewed: {
            type: Array,
            required: true
        },
        currentIdProduct: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            swiper: undefined,
            computedViewedProducts: []
        };
    },

    watch: {
        viewed() {
            setTimeout(() => {
                this.computingViewedProducts();
                this.swiper && this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.viewedSliderWrapper.removeAttribute('style');
                this.$refs.viewedSliderItem[0].removeAttribute('style');
                this.initSwiper();
            }, DURATION_ANIMATION_POPUPS / 2);
        }
    },

    mounted() {
        this.computingViewedProducts();
        window.addEventListener('resize', this.initSwiper);
        this.initSwiper();
    },

    destroyed() {
        window.removeEventListener('resize', this.initSwiper);
    },

    methods: {
        initSwiper() {
            if (isMobile() && this.swiper === undefined) {
                this.swiper = new Swiper(this.$refs.viewedSlider, {
                    direction: 'horizontal',
                    centeredSlides: false,
                    slidesPerView: 'auto',
                    slidesPerGroup: 2,
                    pagination: {
                        el: '.CommonViewedProducts-sliderPagination',
                        clickable: true
                    }
                });
            } else if (!isMobile() && this.swiper !== undefined) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.viewedSliderWrapper.removeAttribute('style');
                this.$refs.viewedSliderItem[0].removeAttribute('style');
            }
        },

        computingViewedProducts() {
            this.computedViewedProducts = this.viewed
                .map((product) => {
                    return {
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                        description: product.description,
                        linkSheets: product.dataSheetUrl,
                        tag: product.tags?.length ? product.tags[0] : undefined,
                        image: product.media?.length
                            ? product.media[0].main
                            : undefined,
                        url: product.url,
                        articles: product.familyList?.length
                            ? [...product.familyList]
                            : []
                    };
                })
                .filter((p) => p.slug !== this.$route.params?.popupSlug);
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonViewedProducts {
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
            margin-top: 14px;
            overflow: hidden;
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
