<template>
    <section class="ProductPopupReferences">
        <div class="ProductPopupReferences-wrapper">
            <h2
                class="ProductPopupReferences-title"
                v-text="$translations.references()"
            ></h2>
            <div
                ref="referencesSlider"
                class="ProductPopupReferences-slider swiper-container"
            >
                <div
                    ref="referencesSliderWrapper"
                    class="ProductPopupReferences-sliderWrapper swiper-wrapper"
                >
                    <div
                        v-for="(reference, index) in references"
                        :key="index"
                        ref="referencesSliderItem"
                        class="ProductPopupReferences-sliderItem swiper-slide"
                    >
                        <nuxt-link
                            :to="reference.link"
                            class="ProductPopupReferences-sliderItemWrapper"
                        >
                            <div class="ProductPopupReferences-sliderItemImage">
                                <img :src="reference.image" />
                                <div
                                    v-if="
                                        reference.category.toLowerCase() ===
                                        'video'
                                    "
                                    class="ProductPopupReferences-sliderItemImagePlay"
                                >
                                    <svg-icon name="icon-play"></svg-icon>
                                </div>
                            </div>
                            <div
                                class="ProductPopupReferences-sliderItemCategory"
                                v-text="reference.category"
                            ></div>
                            <div
                                class="ProductPopupReferences-sliderItemTitle"
                                v-text="reference.title"
                            ></div>
                        </nuxt-link>
                    </div>
                </div>

                <div
                    v-if="references.length > 1"
                    class="ProductPopupReferences-sliderNavigation swiper-navigation"
                >
                    <button
                        type="button"
                        class="ProductPopupReferences-sliderNavigationItem ProductPopupReferences-sliderNavigationItem--prev js-sliderPrev"
                    >
                        <svg
                            width="38"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 20a2 2 0 100 4 2 2 0 000-4zm-5-5a2 2 0 100 4 2 2 0 000-4zm-5-5l-.15.005A2 2 0 102 10zm10 0a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4zm6 0a2 2 0 100 4 2 2 0 000-4zM7 5a2 2 0 100 4 2 2 0 000-4zm5-5a2 2 0 100 4 2 2 0 000-4z"
                                fill-rule="evenodd"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        class="ProductPopupReferences-sliderNavigationItem ProductPopupReferences-sliderNavigationItem--next js-sliderNext"
                    >
                        <svg
                            width="38"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M26 20a2 2 0 110 4 2 2 0 010-4zm5-5a2 2 0 110 4 2 2 0 010-4zm5-5l.15.005A2 2 0 1136 10zm-10 0a2 2 0 110 4 2 2 0 010-4zm-6 0a2 2 0 110 4 2 2 0 010-4zm-6 0a2 2 0 110 4 2 2 0 010-4zm-6 0a2 2 0 110 4 2 2 0 010-4zm-6 0a2 2 0 110 4 2 2 0 010-4zm29-5a2 2 0 110 4 2 2 0 010-4zm-5-5a2 2 0 110 4 2 2 0 010-4z"
                                fill-rule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <div
                v-if="references.length > 1"
                class="ProductPopupReferences-sliderPagination swiper-pagination"
            ></div>
        </div>
    </section>
</template>

<script>
import { Swiper, Pagination, Navigation } from 'swiper';

import 'swiper/swiper.scss';

import { MEDIA_SIZES, DURATION_ANIMATION_POPUPS } from '@/utils/constants';
import { isMobile } from '@/utils/utils';

// Swiper modules
Swiper.use([Pagination, Navigation]);

export default {
    name: 'ProductPopupReferences',
    props: {
        references: {
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
        references() {
            setTimeout(() => {
                this.swiper && this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.referencesSliderWrapper.removeAttribute('style');
                this.$refs.referencesSliderItem[0].removeAttribute('style');
                this.initSwiper();
            }, DURATION_ANIMATION_POPUPS / 2);
        }
    },

    mounted() {
        this.initSwiper();
    },

    methods: {
        initSwiper() {
            this.swiper = new Swiper(this.$refs.referencesSlider, {
                direction: 'horizontal',
                centeredSlides: true,
                slidesPerView: 'auto',
                spaceBetween: 20,
                loop: true,
                pagination: {
                    el: '.ProductPopupReferences-sliderPagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.js-sliderNext',
                    prevEl: '.js-sliderPrev'
                },
                breakpoints: {
                    [MEDIA_SIZES.mobile]: {
                        centeredSlides: false,
                        spaceBetween: 30
                    },
                    [MEDIA_SIZES.tablet]: {
                        centeredSlides: false,
                        spaceBetween: 40
                    }
                },
                on: {
                    click: (swiper) => this.clickSwiper(swiper)
                }
            });
        },

        clickSwiper(swiper) {
            const clickedSlide = swiper.clickedSlide;
            const clickedIndex = swiper.clickedIndex;
            const activeIndex = swiper.activeIndex;

            if (
                !clickedSlide ||
                clickedSlide.classList.contains('swiper-slide-active') ||
                (!isMobile() &&
                    clickedSlide.classList.contains('swiper-slide-next'))
            )
                return;

            if (clickedIndex > activeIndex) swiper.slideNext();
            else swiper.slidePrev();
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupReferences {
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
        }

        &Wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: nowrap;
            z-index: 1;
        }

        &Item {
            width: (560 * 100% / 1160);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            cursor: pointer;

            @include mobile {
                width: (240 * 100% / 320);
            }

            &Wrapper {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                pointer-events: none;

                #{$component}-sliderItem.swiper-slide-active & {
                    pointer-events: all;
                }

                #{$component}-sliderItem.swiper-slide-next & {
                    pointer-events: all;

                    @include mobile {
                        pointer-events: none;
                    }
                }
            }

            &Image {
                @include m-aspectRatio(560, 360);

                width: 100%;
                overflow: hidden;
                transition: $d-hover box-shadow;

                img {
                    @include m-absoluteObjectFit();

                    transform: translate3d(0, 0, 0);
                    transition: $d-hover transform;

                    @include hover {
                        #{$component}-sliderItem.swiper-slide-active:hover &,
                        #{$component}-sliderItem.swiper-slide-next:hover & {
                            transform: translate3d(0, 0, 0) scale(1.05);
                        }
                    }
                }

                @include hover {
                    #{$component}-sliderItem:hover & {
                        box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);
                    }
                }

                &Play {
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    bottom: 20px;
                    left: 20px;

                    @include mobile {
                        width: 40px;
                        height: 40px;
                    }

                    svg {
                        width: 100%;
                        height: 100%;
                        fill: $c-black;
                    }
                }
            }

            &Category {
                @include text-light;

                color: #909096;
                margin-top: 20px;

                @include mobile {
                    margin-top: 7px;
                }
            }

            &Title {
                @include text;

                color: $c-black;
                margin-top: 10px;
                transition: $d-hover color;

                @include hover {
                    #{$component}-sliderItem:hover & {
                        color: $c-blue;
                    }
                }

                @include mobile {
                    @include text-light-same-mobile-medium;

                    margin-top: 3px;
                }
            }
        }

        &Navigation {
            @include m-aspectRatio(1160, 360);

            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 2;
            pointer-events: none;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            &Item {
                background: #fff;
                border: none;
                border-radius: 100%;
                box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                outline: 0;
                opacity: 0;
                padding: 0;
                position: absolute;
                height: 80px;
                width: 80px;
                pointer-events: all;
                transition: opacity 0.35s ease;

                @include tablet {
                    height: 60px;
                    width: 60px;
                }

                @include hover {
                    #{$component}-wrapper:hover & {
                        opacity: 1;

                        &.swiper-button-disabled {
                            opacity: 0;
                            pointer-events: none;
                        }
                    }
                }

                &--prev {
                    left: -20px;
                    transform: translate3d(-50%, 0, 0);

                    @include tablet {
                        left: -10px;
                    }
                }

                &--next {
                    right: -20px;
                    transform: translate3d(50%, 0, 0);

                    @include tablet {
                        right: -10px;
                    }
                }

                svg {
                    fill: $c-black;
                    opacity: 1;
                    margin: auto;
                    transition: opacity $d-hover ease, fill $d-hover ease;
                }

                @include hover {
                    &:hover {
                        svg {
                            opacity: 1;
                            fill: $c-blue;
                        }
                    }
                }

                &:focus {
                    svg {
                        opacity: 1;
                        fill: $c-blue;
                    }
                }

                &:active {
                    svg {
                        opacity: 0.5;
                        fill: $c-blue;
                    }
                }

                &.swiper-button-disabled {
                    opacity: 0;
                }

                @include mobile {
                    display: none;
                }
            }
        }

        &Pagination {
            display: none;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: 40px;

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
