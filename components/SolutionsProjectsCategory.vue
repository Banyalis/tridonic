<template>
    <div class="SolutionsProjectsCategory">
        <div class="SolutionsProjectsCategory-wrapper">
            <h3
                class="SolutionsProjectsCategory-title"
                v-text="category.title"
            ></h3>
            <div class="SolutionsProjectsCategory-slider">
                <div
                    ref="slider"
                    class="SolutionsProjectsCategory-sliderOutter swiper-slider"
                >
                    <div
                        ref="sliderWrapper"
                        class="SolutionsProjectsCategory-sliderInner swiper-wrapper"
                    >
                        <div
                            v-for="(project, index) in category.projects"
                            :key="index"
                            ref="sliderItem"
                            class="SolutionsProjectsCategory-sliderItem swiper-slide"
                        >
                            <SolutionsProjectsCategoryItem :project="project" />
                        </div>
                    </div>
                </div>
                <div
                    v-if="category.projects.length > 1"
                    class="SolutionsProjectsCategory-sliderNavigation swiper-navigation"
                >
                    <button
                        ref="sliderNavigationItemPrev"
                        type="button"
                        class="SolutionsProjectsCategory-sliderNavigationItem SolutionsProjectsCategory-sliderNavigationItem--prev"
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
                        ref="sliderNavigationItemNext"
                        type="button"
                        class="SolutionsProjectsCategory-sliderNavigationItem SolutionsProjectsCategory-sliderNavigationItem--next"
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
        </div>
    </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper';
import SolutionsProjectsCategoryItem from '@/components/SolutionsProjectsCategoryItem';
import { DURATION_ANIMATION_POPUPS, MEDIA_SIZES } from '@/utils/constants';

// Swiper modules
Swiper.use([Navigation]);

export default {
    name: 'SolutionsProjectsCategory',

    components: {
        SolutionsProjectsCategoryItem
    },

    props: {
        category: {
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
        category() {
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
                spaceBetween: 20,
                loop: true,
                navigation: {
                    nextEl: this.$refs.sliderNavigationItemNext,
                    prevEl: this.$refs.sliderNavigationItemPrev
                },
                breakpoints: {
                    [MEDIA_SIZES.mobile]: {
                        spaceBetween: 30
                    },
                    [MEDIA_SIZES.tablet]: {
                        spaceBetween: 40
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss">
.SolutionsProjectsCategory {
    $component: &;

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
        @include title-bordered-h2;

        color: $c-black;
    }

    &-slider {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        margin-top: 40px;
        position: relative;

        @include mobile {
            margin-top: 20px;
        }

        &Outter {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
        }

        &Inner {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: flex-start;
            justify-content: flex-start;
        }

        &Item {
            display: flex;
            width: (360 * 100% / 1160);

            @include mobile {
                width: (240 * 100% / 320);
            }
        }

        &Navigation {
            @include m-aspectRatio(1160, 240);

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
                    #{$component}-slider:hover & {
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
    }
}
</style>
