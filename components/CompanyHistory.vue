<template>
    <div ref="Slider" class="CompanyHistory swiper-container">
        <div class="swiper-wrapper">
            <div
                v-for="(item, index) in history"
                :key="index"
                class="CompanyHistory-item swiper-slide"
            >
                <div class="CompanyHistory-itemImageWrapper">
                    <div class="CompanyHistory-itemImage">
                        <picture>
                            <source
                                :srcset="
                                    item.image + ' 1x, ' + item.image2x + ' 2x'
                                "
                            />
                            <img :src="item.image" alt="" />
                        </picture>
                    </div>
                    <div
                        v-if="index < history.length - 1"
                        class="CompanyHistory-itemLine"
                    >
                        <div
                            v-for="id in 9"
                            :key="id"
                            class="CompanyHistory-itemLineDot"
                        ></div>
                    </div>
                </div>
                <div class="CompanyHistory-itemYear" v-text="item.year"></div>
                <p class="CompanyHistory-itemText" v-text="item.text"></p>
            </div>
        </div>
        <button
            type="button"
            class="CompanyHistory-arrow CompanyHistory-arrow--prev"
        >
            <svg-icon name="arrow-left-slider" />
        </button>
        <button
            type="button"
            class="CompanyHistory-arrow CompanyHistory-arrow--next"
        >
            <svg-icon name="arrow-right-slider" />
        </button>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
import 'swiper/swiper.scss';

export default {
    name: 'CompanyHistory',

    props: {
        history: {
            type: Array,
            required: true
        }
    },

    mounted() {
        this.swiper = new Swiper(this.$refs.Slider, {
            slidesPerView: 'auto',
            centeredSlides: true,
            simulateTouch: false,
            navigation: {
                nextEl: '.CompanyHistory-arrow--next',
                prevEl: '.CompanyHistory-arrow--prev'
            },
            breakpoints: {
                320: {
                    centeredSlides: false
                }
            }
        });
    }
};
</script>

<style lang="scss" scoped>
.CompanyHistory {
    $component: &;

    overflow: visible;

    @include hover {
        &:hover #{$component}-arrow {
            opacity: 1;
            visibility: visible;

            &.swiper-button-disabled {
                opacity: 0;
                visibility: hidden;
            }
        }
    }

    &-item {
        width: 200px;
        margin-right: 40px;
        color: $c-black;

        @include mobile {
            width: 100px;
        }

        &:last-child {
            margin-right: 0;
        }

        &Image {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            border: 1px solid #e4e4e4;
            background-color: $c-white;
            position: relative;
            overflow: hidden;

            &Wrapper {
                width: 160px;
                height: 160px;
                position: relative;

                @include mobile {
                    width: 100px;
                    height: 100px;
                }
            }

            img {
                @include m-absoluteObjectFit();
            }
        }

        &Year {
            @include title;

            margin: 26px 0 19px;

            @include mobile {
                margin: 12px 0 0;
                font-size: 48px;
                line-height: (60 / 48);
                letter-spacing: -1.5px;
            }
        }

        &Text {
            @include text-light;
        }

        &Line {
            position: absolute;
            top: 50%;
            left: calc(100% + 8px);
            display: flex;
            margin-top: -1px;

            @include mobile {
                left: calc(100% + 4px);
            }

            &Dot {
                width: 2px;
                height: 2px;
                border-radius: 100%;
                background-color: $c-gray;

                @include mobile {
                    &:nth-child(1n + 6) {
                        display: none;
                    }
                }

                &:not(:last-child) {
                    margin-right: 6px;
                }
            }
        }
    }

    &-arrow {
        position: absolute;
        top: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border: none;
        border-radius: 100%;
        background-color: $c-white;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
        outline: 0;
        cursor: pointer;
        z-index: $z-sliderArrow;
        opacity: 0;
        visibility: hidden;
        transition: opacity $d-hover ease-in-out,
            visibility $d-hover ease-in-out;

        &--prev {
            left: -20px;
        }

        &--next {
            right: -20px;
        }

        svg {
            width: 38px;
            height: 24px;
            fill: $c-black;
            transition: fill $d-hover ease-in-out;
        }

        @include hover {
            &:hover {
                svg {
                    fill: $c-blue;
                }
            }
        }

        &:focus,
        &:active {
            svg {
                fill: $c-blue;
            }
        }

        &.swiper-button-disabled {
            opacity: 0;
            visibility: hidden;
        }

        @include mobile {
            display: none;
        }
    }
}
</style>
