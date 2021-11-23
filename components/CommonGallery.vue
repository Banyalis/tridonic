<template>
    <div class="CommonGallery">
        <div
            ref="slider"
            class="CommonGallery-slider swiper-container"
            :class="[gallery.length === 1 ? 'swiper-no-swiping' : '']"
        >
            <div
                ref="sliderWrapper"
                class="CommonGallery-sliderWrapper swiper-wrapper"
            >
                <div
                    v-for="(slide, index) in gallery"
                    :key="index"
                    ref="sliderItem"
                    class="CommonGallery-slide swiper-slide"
                >
                    <div class="CommonGallery-slideImage">
                        <img
                            :src="slide.image"
                            :alt="slide.text ? slide.text : undefined"
                        />
                    </div>
                </div>
            </div>
            <div
                v-if="gallery.length > 1"
                class="CommonGallery-sliderNavigation"
                :class="[
                    gallery[activeIndex] &&
                    gallery[activeIndex].isLightNavigation
                        ? 'isLight'
                        : undefined
                ]"
            >
                <div
                    ref="sliderNavigationPrev"
                    class="CommonGallery-sliderNavigationItem CommonGallery-sliderNavigationItem--prev"
                >
                    <Arrow />
                </div>
                <div
                    ref="sliderNavigationNext"
                    class="CommonGallery-sliderNavigationItem CommonGallery-sliderNavigationItem--next"
                >
                    <Arrow />
                </div>
            </div>
        </div>
        <div
            v-if="gallery[activeIndex] && gallery[activeIndex].text"
            class="CommonGallery-desc"
            :class="{ isShowText }"
            v-text="gallery[activeIndex].text"
        ></div>
    </div>
</template>

<script>
import { Swiper, Pagination, Navigation } from 'swiper';
import 'swiper/swiper.scss';

import Arrow from '@/components/Arrow';
import { DURATION_ANIMATION_POPUPS } from '@/utils/constants';

// Swiper modules
Swiper.use([Pagination, Navigation]);

export default {
    name: 'CommonGallery',
    components: { Arrow },
    props: {
        gallery: {
            swiper: undefined,
            type: Array,
            required: true
        }
    },

    data() {
        return {
            activeIndex: 0,
            isShowText: true
        };
    },

    watch: {
        gallery() {
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
                spaceBetween: 5,
                autoHeight: true,
                loop: true,
                navigation: {
                    nextEl: this.$refs.sliderNavigationNext,
                    prevEl: this.$refs.sliderNavigationPrev
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
.CommonGallery {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-slider {
        width: 100%;
        display: flex;

        &Wrapper {
            width: 100%;
            display: flex;
        }

        &Navigation {
            position: absolute;
            z-index: 1;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0 15px;

            @include mobile {
                padding: 0;
            }

            &Item {
                display: flex;
                cursor: pointer;
                color: $c-black;
                transition: $d-hover color;

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
    }

    &-slide {
        width: 100%;
        display: flex;
        flex-direction: column;

        &Image {
            display: flex;
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            background: #000;

            img {
                width: 100%;
                max-width: 100%;
                height: auto;
            }
        }
    }

    &-desc {
        @include text-light;

        width: 100%;
        color: $c-gray;
        margin: 5px 0 0;
        opacity: 0;
        white-space: pre-line;

        @include mobile {
            margin-top: 10px;
        }

        &.isShowText {
            opacity: 1;
            transition: $d-hover / 2 opacity;
        }
    }
}
</style>
