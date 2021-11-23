<template>
    <section class="CommonSameProducts">
        <div class="CommonSameProducts-wrapper">
            <h2
                class="CommonSameProducts-title"
                v-text="$translations.sameProducts()"
            ></h2>
            <div
                ref="sameSlider"
                class="CommonSameProducts-slider swiper-container"
            >
                <div
                    ref="sameSliderWrapper"
                    class="CommonSameProducts-sliderWrapper swiper-wrapper"
                >
                    <div
                        v-for="(slide, index) in same.articles"
                        :key="index"
                        ref="sameSliderItem"
                        class="CommonSameProducts-sliderItem swiper-slide"
                    >
                        <product-item
                            :product="slide"
                            :is-comparable="false"
                            :is-big="true"
                        ></product-item>
                    </div>
                </div>
            </div>
            <div
                v-if="same.articles.length > 1"
                class="CommonSameProducts-sliderPagination swiper-pagination"
            ></div>
            <div v-if="!!same.banner" class="CommonSameProducts-banner">
                <catalog-banner :banner="same.banner"></catalog-banner>
            </div>
        </div>
    </section>
</template>

<script>
import { Swiper, Pagination } from 'swiper';

import 'swiper/swiper.scss';

import ProductItem from '@/components/ProductItem';
import CatalogBanner from '@/components/CatalogBanner';

import { isMobile } from '@/utils/utils';
import { DURATION_ANIMATION_POPUPS } from '@/utils/constants';

// Swiper modules
Swiper.use([Pagination]);

export default {
    name: 'CommonSameProducts',
    components: { CatalogBanner, ProductItem },

    props: {
        same: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            swiper: undefined
        };
    },

    watch: {
        same() {
            setTimeout(() => {
                this.swiper && this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.sameSliderWrapper.removeAttribute('style');
                this.$refs.sameSliderItem[0].removeAttribute('style');
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
                this.swiper = new Swiper(this.$refs.sameSlider, {
                    direction: 'horizontal',
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    pagination: {
                        el: '.CommonSameProducts-sliderPagination',
                        clickable: true
                    }
                });
            } else if (!isMobile() && this.swiper !== undefined) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.sameSliderWrapper.removeAttribute('style');
                this.$refs.sameSliderItem[0].removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonSameProducts {
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
        margin-top: 34px;
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
            width: (100% / 3);
            display: flex;

            @include mobile {
                width: (240 * 100% / 320);
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

    &-banner {
        width: 100%;
        display: flex;
        margin-top: 40px;

        @include mobile {
            padding: 0 20px;
        }
    }
}
</style>
