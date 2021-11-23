<template>
    <div class="SolutionsProductsFeatures" :class="{ isShowProducts }">
        <div
            class="SolutionsProductsFeatures-title"
            v-text="
                `What do you need for your ${activeSolutionTitle.toLowerCase()}?`
            "
        ></div>
        <!--    TODO: replace text    -->
        <div class="SolutionsProductsFeatures-features b-container">
            <div
                ref="container"
                class="SolutionsProductsFeatures-featuresList"
                :class="{ needSlider }"
            >
                <div
                    class="SolutionsProductsFeatures-featuresListProductsOutter"
                >
                    <div
                        ref="slider"
                        class="SolutionsProductsFeatures-featuresListProducts swiper-container"
                    >
                        <div
                            ref="sliderWrapper"
                            class="SolutionsProductsFeatures-featuresListProductsWrapper swiper-wrapper"
                        >
                            <div
                                v-for="product in features.list"
                                :key="product.id"
                                ref="sliderSlide"
                                class="SolutionsProductsFeatures-featuresListProduct swiper-slide"
                            >
                                <div
                                    class="SolutionsProductsFeatures-featuresListProductBg"
                                ></div>
                                <div
                                    class="SolutionsProductsFeatures-featuresListProductProperties"
                                >
                                    <div
                                        v-for="(prop,
                                        index) in getAllProperties"
                                        :key="`${product.id}-${index}`"
                                        class="SolutionsProductsFeatures-featuresListProductProperty"
                                    >
                                        <svg-icon
                                            v-if="isChecked(prop, product)"
                                            name="icon-checked"
                                        />
                                    </div>
                                </div>
                                <!-- eslint-disable -->
                                <div
                                    class="SolutionsProductsFeatures-featuresListProductTitle"
                                    v-html="product.title"
                                ></div>
                                <!-- eslint-enable -->
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="features.list.length > 6"
                        class="SolutionsProductsFeatures-featuresListProductsNavigation swiper-navigation"
                    >
                        <button
                            type="button"
                            class="SolutionsProductsFeatures-featuresListProductsNavigationItem SolutionsProductsFeatures-featuresListProductsNavigationItem--prev js-sliderPrev"
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
                            class="SolutionsProductsFeatures-featuresListProductsNavigationItem SolutionsProductsFeatures-featuresListProductsNavigationItem--next js-sliderNext"
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
                <div class="SolutionsProductsFeatures-featuresListCategories">
                    <div
                        v-for="(category, index) in features.categories"
                        :key="index"
                        class="SolutionsProductsFeatures-featuresListCategory"
                    >
                        <div
                            class="SolutionsProductsFeatures-featuresListCategoryTitle"
                            v-text="category.title"
                        ></div>
                        <div
                            class="SolutionsProductsFeatures-featuresListCategoryProperties"
                        >
                            <div
                                v-for="property in category.list"
                                :key="property.id"
                                class="SolutionsProductsFeatures-featuresListCategoryProperty"
                            >
                                <div
                                    class="SolutionsProductsFeatures-featuresListCategoryPropertyTitle"
                                    v-text="property.title"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="SolutionsProductsFeatures-featuresListProductsOutter isCopy"
                >
                    <div
                        ref="sliderCopy"
                        class="SolutionsProductsFeatures-featuresListProducts swiper-container"
                    >
                        <div
                            ref="sliderWrapperCopy"
                            class="SolutionsProductsFeatures-featuresListProductsWrapper swiper-wrapper"
                        >
                            <div
                                v-for="product in features.list"
                                :key="`copy-${product.id}`"
                                ref="sliderSlideCopy"
                                class="SolutionsProductsFeatures-featuresListProduct swiper-slide"
                                :class="{
                                    isActive: product.id === activeProductId
                                }"
                                @click="clickProduct(product.id)"
                            >
                                <div
                                    class="SolutionsProductsFeatures-featuresListProductBg"
                                ></div>
                                <div
                                    class="SolutionsProductsFeatures-featuresListProductProperties"
                                >
                                    <div
                                        v-for="(prop,
                                        index) in getAllProperties"
                                        :key="`copy-${product.id}-${index}`"
                                        class="SolutionsProductsFeatures-featuresListProductProperty"
                                    >
                                        <svg-icon
                                            v-if="isChecked(prop, product)"
                                            name="icon-checked"
                                        />
                                    </div>
                                </div>
                                <!-- eslint-disable -->
                                <div
                                    class="SolutionsProductsFeatures-featuresListProductTitle"
                                    v-html="product.title"
                                ></div>
                                <!-- eslint-enable -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- eslint-disable -->
            <div
                v-if="features.footNotes"
                class="SolutionsProductsFeatures-featuresNotes"
                v-html="features.footNotes"
            ></div>
            <!-- eslint-enable -->
        </div>
    </div>
</template>

<script>
import { Swiper, Navigation } from 'swiper';
import 'swiper/swiper.scss';

import { isMobile } from '@/utils/utils';

import {
    DURATION_ANIMATION_POPUPS,
    MEDIA_SIZES,
    VUE_CUSTOM_EVENTS
} from '@/utils/constants';

import VueScrollTo from 'vue-scrollto';

// Swiper modules
Swiper.use([Navigation]);

export default {
    name: 'SolutionsProductsFeatures',

    components: {},

    props: {
        features: {
            type: Object,
            required: true
        },

        activeSolutionTitle: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            swiper: undefined,
            swiperCopy: undefined,
            activeProductId: '',
            isShowProducts: false,
            needSlider: false
        };
    },

    computed: {
        getAllProperties() {
            return this.features.categories
                .map((category) => {
                    return category.list.map((prop) => prop);
                })
                .flat();
        }
    },

    watch: {
        features() {
            this.checkSlider();
            this.isShowProducts = false;

            setTimeout(() => {
                this.activeProductId = '';
                this.swiper && this.swiper.destroy();
                this.swiperCopy && this.swiperCopy.destroy();
                this.swiper = undefined;
                this.swiperCopy = undefined;
                this.$refs.sliderWrapper.removeAttribute('style');
                this.$refs.sliderSlide[0].removeAttribute('style');
                this.$refs.sliderWrapperCopy.removeAttribute('style');
                this.$refs.sliderSlideCopy[0].removeAttribute('style');
                this.initSwiper();
            }, DURATION_ANIMATION_POPUPS / 2);
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.checkSlider();
            this.initSwiper();
        },

        checkSlider() {
            this.needSlider = this.features.list.length > 6;
        },

        isChecked(prop, product) {
            return !!product.listProperties.filter(
                (productProperty) => productProperty.id === prop.id
            ).length;
        },

        initSwiper() {
            this.isShowProducts = true;

            if ((isMobile() || this.needSlider) && this.swiper === undefined) {
                this.swiper = new Swiper(this.$refs.slider, {
                    direction: 'horizontal',
                    centeredSlides: false,
                    slidesPerView: 'auto',
                    spaceBetween: 4,
                    simulateTouch: false,
                    touchReleaseOnEdges: false,
                    navigation: {
                        nextEl: '.js-sliderNext',
                        prevEl: '.js-sliderPrev'
                    },
                    breakpoints: {
                        [MEDIA_SIZES.mobile]: {
                            slidesPerView: 6,
                            spaceBetween: 3
                        },
                        [MEDIA_SIZES.tablet]: {
                            slidesPerView: 6,
                            spaceBetween: 4
                        }
                    }
                });
            } else if (
                !isMobile() &&
                !this.needSlider &&
                this.swiper !== undefined
            ) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.sliderWrapper.removeAttribute('style');
                this.$refs.sliderSlide[0].removeAttribute('style');
            }

            if (
                (isMobile() || this.needSlider) &&
                this.swiperCopy === undefined
            ) {
                this.swiperCopy = new Swiper(this.$refs.sliderCopy, {
                    direction: 'horizontal',
                    centeredSlides: false,
                    slidesPerView: 'auto',
                    spaceBetween: 4,
                    simulateTouch: false,
                    touchReleaseOnEdges: false,
                    navigation: {
                        nextEl: '.js-sliderNext',
                        prevEl: '.js-sliderPrev'
                    },
                    breakpoints: {
                        [MEDIA_SIZES.mobile]: {
                            slidesPerView: 6,
                            spaceBetween: 3
                        },
                        [MEDIA_SIZES.tablet]: {
                            slidesPerView: 6,
                            spaceBetween: 4
                        }
                    }
                });

                this.swiperCopy.on('setTranslate', (swiper, translate) => {
                    this.swiper.setTranslate(translate);
                });

                this.swiperCopy.on('setTransition', (swiper, translate) => {
                    this.$refs.sliderWrapper.style.transitionDuration =
                        translate + 'ms';
                });
            } else if (
                !isMobile() &&
                !this.needSlider &&
                this.swiperCopy !== undefined
            ) {
                this.swiperCopy.destroy();
                this.swiperCopy = undefined;
                this.$refs.sliderWrapperCopy.removeAttribute('style');
                this.$refs.sliderSlideCopy[0].removeAttribute('style');
            }
        },

        clickProduct(id) {
            this.activeProductId = id;

            this.$emit(VUE_CUSTOM_EVENTS.solutionProductChange, id);

            const options = {
                offset: 0,
                force: true,
                y: true
            };

            VueScrollTo.scrollTo(this.$refs.container, 200, options);
        }
    }
};
</script>

<style lang="scss" scoped>
.SolutionsProductsFeatures {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: $c-gray--bg;
    padding: 28px 0 55px;
    box-shadow: inset 0 1px 0 0 $c-gray--shadow;
    opacity: 0;
    transform: translate3d(0, 20px, 0);

    &.isShowProducts {
        opacity: 1;
        transform: translate3d(0, 0, 0);
        transition: $d-hover opacity, $d-hover tansform;
    }

    &-title {
        @include title-bordered-h2;

        color: $c-black;

        @include mobile {
            padding-left: 20px;
            padding-right: 20px;
        }
    }

    &-features {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 40px;
        padding: 0 105px;
        overflow: hidden;

        @include tablet {
            padding: 0 40px;
        }

        @include mobile {
            padding: 0 20px;
        }

        &List {
            width: 100%;
            display: flex;
            position: relative;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;

            &Categories {
                width: 100%;
                position: absolute;
                top: 20px;
                left: 0;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                pointer-events: none;

                @include mobile {
                    top: 11px;
                    right: -20px;
                    width: calc(100% + 20px);
                }
            }

            &Category {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                border-bottom: 1px solid $c-gray--shadow;

                &:last-child {
                    border-bottom: none;
                }

                &Title {
                    @include text-light-same-mobile-medium;

                    display: flex;
                    width: 60px;
                    margin-right: 20px;
                    padding: 10px 0;
                    color: $c-gray;

                    @include mobile {
                        display: none;
                    }
                }

                &Properties {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    width: calc(100% - 80px);

                    @include mobile {
                        width: 100%;
                    }
                }

                &Property {
                    height: 40px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 10px 0;
                    width: 100%;
                    border-bottom: 1px dashed $c-gray--shadow;

                    &:last-child {
                        margin-bottom: -1px;
                    }

                    &Title {
                        @include text-light;

                        color: $c-black;
                        width: 140px;
                        font-weight: $fw-medium;
                        padding-right: 20px;
                        line-height: 1;

                        @include mobile {
                            width: 82px;
                            padding-right: 0;
                            line-height: 1;
                        }
                    }
                }
            }

            &Products {
                width: 100%;
                position: relative;
                z-index: initial;

                @include mobile {
                    padding-right: 5px;
                }

                &Wrapper {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: stretch;
                    justify-content: flex-start;
                    z-index: initial;
                    flex-wrap: nowrap;
                    position: relative;
                }

                &Outter {
                    width: calc(100% - 220px);
                    position: relative;
                    display: flex;

                    @include mobile {
                        margin-right: -20px;
                        width: calc(100% - 62px);
                    }

                    &.isCopy {
                        position: absolute;
                        right: 0;
                        top: 0;
                        z-index: 4;
                        margin-left: 0;
                    }
                }

                &Navigation {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 6;
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

                        &--prev {
                            left: 0;
                            transform: translate3d(-50%, 0, 0);
                        }

                        &--next {
                            right: 0;
                            transform: translate3d(50%, 0, 0);
                        }

                        svg {
                            fill: $c-black;
                            opacity: 1;
                            margin: auto;
                            transition: opacity $d-hover ease,
                                fill $d-hover ease;
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
                            pointer-events: none;
                        }

                        @include mobile {
                            display: none;
                        }
                    }
                }
            }

            &Product {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                width: (154 * 100% / 970);
                border: 1px solid $c-gray--shadow;
                background: $c-white;
                border-radius: 5px;
                position: relative;
                overflow: hidden;
                cursor: pointer;
                height: auto;
                box-sizing: border-box;
                transition: $d-hover opacity, $d-hover border-color,
                    $d-hover background;
                min-width: 100px;

                @include mobile {
                    width: (96 * 100% / 220);
                    min-width: 96px;
                }

                #{$component}-featuresList:not(.needSlider) & {
                    width: 100%;
                    flex: 1 1 auto;
                    margin-left: 4px;

                    &:first-child {
                        margin-left: 0;
                    }
                }

                .isCopy & {
                    opacity: 0;
                }

                &.isActive {
                    pointer-events: none;
                    opacity: 1;
                    border-color: $c-purple;

                    #{$component}-featuresListProduct {
                        &Bg {
                            opacity: 1;
                        }

                        &Property svg {
                            fill: $c-white;
                        }

                        &Title {
                            color: $c-white;

                            & /deep/ a {
                                color: $c-blue;

                                @include hover {
                                    &:hover {
                                        color: $c-white;
                                    }
                                }
                            }
                        }
                    }
                }

                @include hover {
                    &:hover {
                        opacity: 1;
                        border-color: $c-purple;
                        background: rgba($c-purple, 0.1);
                    }
                }

                &Bg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 3;
                    opacity: 0;
                    background: $c-purple;
                }

                &Properties {
                    width: 100%;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    margin-top: 20px;
                    z-index: 4;

                    @include mobile {
                        margin-top: 11px;
                    }
                }

                &Property {
                    width: 100%;
                    height: 40px;
                    position: relative;
                    display: flex;
                    z-index: 4;

                    svg {
                        position: absolute;
                        top: 45%;
                        left: 50%;
                        transform: translate3d(-50%, -50%, 0);
                        fill: $c-purple;
                        width: 24px;
                        height: 17px;
                    }
                }

                &Title {
                    @include text-light-same-mobile-medium;

                    color: $c-black;
                    padding: 40px 20px;
                    text-align: center;
                    z-index: 4;
                    position: relative;

                    @include mobile {
                        padding: 20px 8px;
                    }

                    & /deep/ a {
                        color: $c-purple;
                        transition: $d-hover color;

                        @include hover {
                            &:hover {
                                color: $c-blue;
                            }
                        }
                    }
                }
            }
        }

        &Notes {
            @include text-light-same-mobile;

            margin-top: 25px;
            width: 100%;
            color: $c-gray;

            @include tablet {
                width: 100%;
            }

            @include mobile {
                width: 100%;
            }
        }
    }
}
</style>
