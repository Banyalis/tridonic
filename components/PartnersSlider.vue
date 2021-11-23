<template>
    <div ref="Slider" class="PartnersSlider swiper-container">
        <div class="swiper-wrapper">
            <div
                v-for="(item, index) in slider"
                :key="index"
                class="PartnersSlider-item swiper-slide"
            >
                <HiddenLink
                    :is-external="item.link.isExternal"
                    :url="item.link.url"
                ></HiddenLink>
                <div class="PartnersSlider-itemImage">
                    <picture>
                        <source
                            :srcset="
                                item.image + ' 1x, ' + item.image2x + ' 2x'
                            "
                        />
                        <img :src="item.image" alt="" />
                    </picture>
                </div>
                <div class="PartnersSlider-itemInner">
                    <div
                        class="PartnersSlider-itemTitle"
                        v-text="item.title"
                    ></div>
                    <div class="PartnersSlider-itemInnerFooter">
                        <p
                            class="PartnersSlider-itemText"
                            v-text="item.text"
                        ></p>
                        <div class="PartnersSlider-itemIcon">
                            <svg-icon name="arrow-big-right" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="PartnersSlider-nav swiper-navigation">
            <button
                ref="sliderItemPrev"
                type="button"
                class="PartnersSlider-navItem"
            >
                <svg-icon name="arrow-left-slider" />
            </button>
            <button
                ref="sliderItemNext"
                type="button"
                class="PartnersSlider-navItem"
            >
                <svg-icon name="arrow-right-slider" />
            </button>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
import HiddenLink from '@/components/HiddenLink';

export default {
    name: 'PartnersSlider',

    components: {
        HiddenLink
    },

    props: {
        slider: {
            type: Array,
            required: true
        }
    },

    mounted() {
        this.swiper = new Swiper(this.$refs.Slider, {
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            simulateTouch: false,
            navigation: {
                nextEl: this.$refs.sliderItemNext,
                prevEl: this.$refs.sliderItemPrev
            },
            breakpoints: {
                320: {
                    spaceBetween: 20
                },
                960: {
                    spaceBetween: 40
                }
            }
        });
    }
};
</script>

<style lang="scss" scoped>
.PartnersSlider {
    $component: &;

    margin-top: -240px;
    overflow: visible;

    @include mobile {
        margin-top: -80px;
        overflow: hidden;
    }

    @include hover {
        &:hover #{$component}-navItem {
            opacity: 1;
        }
    }

    &-item {
        @include m-aspectRatio(360, 560);

        width: (360 * 100% / 1440);
        transition: box-shadow $d-hover ease-in-out;

        @include mobile {
            width: (240 * 100% / 320);
        }

        @include hover {
            &:hover {
                box-shadow: 0 20px 40px rgba(#000000, 0.5);

                #{$component}-item {
                    &Image:before {
                        opacity: 0;
                    }

                    &InnerFooter {
                        display: block;
                    }
                }
            }
        }

        &Image {
            width: 100%;

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: $c-black;
                z-index: 10;
                opacity: 0.25;
                transition: opacity $d-hover ease-in-out;
            }

            img {
                @include m-absoluteObjectFit();
            }
        }

        &Inner {
            position: absolute;
            left: 40px;
            right: 40px;
            bottom: 40px;
            z-index: 20;
            color: $c-white;

            @include mobile {
                left: 20px;
                right: 20px;
                bottom: 22px;
            }

            &Footer {
                display: none;

                @include mobile {
                    display: block;
                }
            }
        }

        &Title {
            @include title-h2;

            @include mobile {
                margin-bottom: 19px;
            }
        }

        &Text {
            @include text-light;

            margin: 17px 0 18px;

            @include mobile {
                display: none;
            }
        }

        &Icon {
            width: 62px;
            height: 34px;

            @include mobile {
                width: 23px;
                height: 16px;
            }

            svg {
                width: 100%;
                height: 100%;
                fill: $c-blue;
            }
        }

        .b-hidden-link {
            top: 0;
            z-index: 30;
        }
    }

    &-nav {
        position: absolute;
        top: 50%;
        left: 80px;
        right: 80px;
        display: flex;
        justify-content: space-between;
        margin-top: -40px;
        pointer-events: none;
        z-index: 5;

        @include mobile {
            display: none;
        }

        &Item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            height: 80px;
            border: none;
            border-radius: 100%;
            background-color: $c-white;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
            cursor: pointer;
            opacity: 0;
            pointer-events: all;
            outline: none;
            transition: opacity $d-hover ease-in-out;

            svg {
                width: 38px;
                height: 24px;
                fill: $c-black;
                opacity: 1;
                transition: fill $d-hover ease-in-out,
                    opacity $d-hover ease-in-out;
            }

            @include hover {
                &:hover {
                    svg {
                        fill: $c-blue;
                        opacity: 1;
                    }
                }
            }

            &:active {
                svg {
                    fill: $c-blue;
                    opacity: 0.5;
                }
            }
        }
    }
}
</style>
