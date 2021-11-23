<template>
    <div class="CareersTabs">
        <div ref="slider" class="CareersTabs-slider swiper-container">
            <div
                v-if="tabs.length > 1"
                class="CareersTabs-sliderPagination swiper-no-swiping"
                :class="{ withOutScroll: tabs.length <= 4 }"
            >
                <div class="CareersTabs-sliderPaginationOutter">
                    <div
                        ref="sliderPagination"
                        class="CareersTabs-sliderPaginationWrapper"
                    ></div>
                </div>
            </div>
            <div
                ref="sliderWrapper"
                class="CareersTabs-sliderWrapper swiper-wrapper"
            >
                <div
                    v-for="(slide, index) in tabs"
                    :key="index"
                    ref="sliderItem"
                    class="CareersTabs-slide swiper-slide"
                >
                    <div class="CareersTabs-slideImage">
                        <img :src="slide.image" :alt="slide.text" />
                    </div>
                </div>
            </div>
            <div class="CareersTabs-slideTexts">
                <div
                    v-for="(slide, index) in tabs"
                    :key="`text-${index}`"
                    class="CareersTabs-slideText swiper-no-swiping"
                    :class="{ isActive: activeIndex === index }"
                    v-text="slide.text"
                ></div>
            </div>
            <div
                v-if="tabs.length > 1"
                class="CareersTabs-sliderNavigation"
                :class="[
                    tabs[activeIndex] && tabs[activeIndex].isLightNavigation
                        ? 'isLight'
                        : undefined
                ]"
            >
                <div
                    ref="sliderNavigationPrev"
                    class="CareersTabs-sliderNavigationItem CareersTabs-sliderNavigationItem--prev swiper-no-swiping"
                >
                    <Arrow />
                </div>
                <div
                    ref="sliderNavigationNext"
                    class="CareersTabs-sliderNavigationItem CareersTabs-sliderNavigationItem--next swiper-no-swiping"
                >
                    <Arrow />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/swiper.scss';

import Arrow from '@/components/Arrow';
import { DURATION_ANIMATION_POPUPS } from '@/utils/constants';

// Swiper modules
Swiper.use([Pagination, Navigation, Autoplay]);

export default {
    name: 'CareersTabs',
    components: { Arrow },
    props: {
        tabs: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            swiper: undefined,
            activeIndex: 0,
            isShowText: true
        };
    },

    watch: {
        tabs() {
            setTimeout(() => {
                this.swiper && this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.sliderWrapper.removeAttribute('style');
                this.$refs.sliderItem[0].removeAttribute('style');
                this.initSwiper();
            }, DURATION_ANIMATION_POPUPS / 2);
        }
    },

    mounted() {
        this.initSwiper();
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$refs.slider, {
                direction: 'horizontal',
                centeredSlides: true,
                slidesPerView: 'auto',
                loop: true,
                autoplay: {
                    delay: 3000
                },
                navigation: {
                    nextEl: this.$refs.sliderNavigationNext,
                    prevEl: this.$refs.sliderNavigationPrev
                },
                pagination: {
                    el: this.$refs.sliderPagination,
                    clickable: true,
                    renderBullet: (index, className) => {
                        return (
                            '<div class="' +
                            className +
                            '">' +
                            this.tabs[index].title +
                            '</div>'
                        );
                    }
                },
                on: {
                    slideChangeTransitionStart: (swiper) =>
                        this.slideChangeTransitionStart(swiper),
                    slideChangeTransitionEnd: (swiper) =>
                        this.slideChangeTransitionEnd(swiper)
                }
            });
        },

        slideChangeTransitionStart(swiper) {
            this.activeIndex = swiper.realIndex;
            this.isShowText = false;
        },

        slideChangeTransitionEnd() {
            this.isShowText = true;
        }
    }
};
</script>

<style lang="scss">
.CareersTabs {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-slider {
        width: 100%;
        display: flex;

        @include mobile {
            justify-content: center;
        }

        &Wrapper {
            width: 100%;
            display: flex;
            position: relative;

            &:before {
                content: '';
                background: linear-gradient(
                    to bottom,
                    rgba($c-black, 1) 0,
                    rgba($c-black, 0) 100%
                );
                opacity: 0.75;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 240px;
                z-index: 1;

                @include mobile {
                    display: none;
                }
            }
        }

        &Navigation {
            position: absolute;
            z-index: 3;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;
            pointer-events: none;

            @include mobile {
                display: none;
            }

            &Item {
                display: flex;
                cursor: pointer;
                color: $c-black;
                transition: $d-hover color;
                pointer-events: all;

                #{$component}-sliderNavigation.isLight & {
                    color: $c-white;
                }

                &--prev {
                    transform: translate3d(0, 0, 0) rotate(180deg);
                }

                &.swiper-button-disabled {
                    opacity: 0;
                    pointer-events: none;
                }
            }
        }

        &Pagination {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            z-index: 2;
            display: flex;
            overflow-scrolling: touch;
            scroll-behavior: smooth;
            overflow-x: scroll;
            overflow-y: hidden;

            @include mobile {
                padding: 25px 0 0;
                align-items: center;
                left: auto;
                right: auto;
                max-width: 100%;
            }

            /* Works on Firefox */
            & {
                scrollbar-width: none;
                scrollbar-color: transparent transparent;
            }

            /* Works on Chrome, Edge, and Safari */
            &::-webkit-scrollbar {
                width: 0;
                display: none;
            }

            &::-webkit-scrollbar-track {
                background: transparent;
                display: none;
            }

            &::-webkit-scrollbar-thumb {
                background-color: transparent;
                width: 0;
                display: none;
            }

            &Outter {
                width: auto;
                flex-wrap: nowrap;
                display: flex;
                padding: 56px 80px 0;
                position: relative;
                z-index: 2;

                #{$component}-sliderPagination.withOutScroll & {
                    width: 100%;

                    @include mobile {
                        width: auto;
                    }
                }

                @include mobile {
                    padding: 0 20px;
                }
            }

            &Wrapper {
                width: auto;
                display: flex;
                flex-direction: row;
                align-items: stretch;
                justify-content: flex-start;
                flex-wrap: nowrap;
                border-bottom: 1px solid rgba($c-gray--shadow, 0.2);

                #{$component}-sliderPagination.withOutScroll & {
                    width: 100%;

                    @include mobile {
                        width: auto;
                    }
                }
            }

            & .swiper-pagination-bullet {
                @include text;

                width: 100%;
                min-width: 200px;
                text-align: center;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                padding-bottom: 14px;
                margin-bottom: -2px;
                cursor: pointer;
                color: $c-white;
                opacity: 0.75;
                border-bottom: 2px solid transparent;
                transition: $d-hover opacity;

                @include mobile {
                    @include text-light-same-mobile-medium;

                    width: 120px;
                    opacity: 0.5;
                    min-width: 0;
                }

                @include hover {
                    &:hover {
                        opacity: 1;
                    }
                }

                &.swiper-pagination-bullet-active {
                    border-bottom-color: $c-white;
                    pointer-events: none;
                    opacity: 1;
                }
            }
        }
    }

    &-slide {
        width: 100%;
        display: flex;
        flex-direction: column;

        &Image {
            @include m-aspectRatio(1320, 640);

            display: flex;
            width: 100%;
            background: #000;

            @include mobile {
                @include m-aspectRatio(320, 320);
            }

            img {
                @include m-absoluteObjectFit();
            }
        }

        &Texts {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0;
        }

        &Text {
            @include text-light;

            padding: 25px 40px 35px;
            max-width: 360px;
            left: 80px;
            bottom: 40px;
            color: $c-white;
            background: $c-purple;
            width: 100%;
            opacity: 0;
            z-index: 2;
            position: absolute;
            transform: translate3d(80px, 0, 0);
            transition: $d-hover opacity, 0s transform $d-hover;

            @include mobile {
                max-width: 100%;
                padding: 20px 20px 24px;
                left: 20px;
                right: 20px;
                bottom: 20px;
            }

            &.isActive {
                opacity: 1;
                z-index: 3;
                transform: translate3d(0, 0, 0);
                transition: $d-hover opacity $d-hover,
                    $d-hover transform $d-hover;
            }
        }
    }
}
</style>
