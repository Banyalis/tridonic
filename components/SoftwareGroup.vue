<template>
    <div class="SoftwareGroupWrapper">
        <h2 v-if="title" class="SoftwareGroupWrapper-title">{{ title }}</h2>
        <div ref="Slider" class="SoftwareGroupWrapper-slider swiper-container">
            <ul class="SoftwareGroupList swiper-wrapper">
                <li
                    v-for="item in list"
                    :key="item.id"
                    class="SoftwareGroupList-item swiper-slide"
                >
                    <nuxt-link
                        :to="item.link.url"
                        class="SoftwareGroupList-itemLink"
                    >
                        <div class="SoftwareGroupList-itemFigure">
                            <img v-if="item.image" :src="item.image" alt="" />
                        </div>
                        <h3 class="SoftwareGroupList-itemTitle">
                            {{ item.title }}
                        </h3>
                        <div class="SoftwareGroupList-itemPlatform">
                            {{ item.platform }}
                        </div>
                        <p class="SoftwareGroupList-itemDescriptionText">
                            {{ item.text }}
                        </p>

                        <svg-icon
                            name="arrow-right"
                            class="SoftwareGroupList-icon"
                        />
                    </nuxt-link>
                </li>
            </ul>

            <button
                type="button"
                class="SoftwareGroupWrapper-sliderArrow SoftwareGroupWrapper-sliderArrow--prev js-sliderPrev"
            >
                <svg-icon name="arrow-left-slider" />
            </button>
            <button
                type="button"
                class="SoftwareGroupWrapper-sliderArrow SoftwareGroupWrapper-sliderArrow--next js-sliderNext"
            >
                <svg-icon name="arrow-right-slider" />
            </button>
        </div>
    </div>
</template>

<script>
import { Swiper } from 'swiper';
import 'swiper/swiper.scss';

export default {
    props: {
        title: {
            type: String,
            default: null
        },
        list: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },

    mounted() {
        this.swiper = new Swiper(this.$refs.Slider, {
            direction: 'horizontal',
            centeredSlides: true,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.js-sliderNext',
                prevEl: '.js-sliderPrev'
            },
            breakpoints: {
                // when window width is >= 768px
                768: {
                    centeredSlides: false
                }
            }
        });
    }
};
</script>

<style lang="scss">
.SoftwareGroupWrapper {
    overflow: hidden;
    margin: 0 auto 83px;
    max-width: 1240px;

    @media (min-width: 1241px) {
        overflow: visible;
    }

    @include mobile {
        margin-bottom: 58px;
    }

    .SoftwareGroupWrapper-slider {
        overflow: visible;
    }
}

@include hover {
    .SoftwareGroupWrapper-slider:hover .SoftwareGroupWrapper-sliderArrow {
        opacity: 1;

        &.swiper-button-disabled {
            opacity: 0;
        }
    }
}

.SoftwareGroupWrapper-sliderArrow {
    background: #fff;
    border: none;
    border-radius: 100%;
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    outline: 0;
    opacity: 0;
    padding: 0;
    position: absolute;
    top: 80px;
    height: 80px;
    width: 80px;
    z-index: $z-sliderArrow;
    transition: opacity 0.35s ease;

    &--prev {
        left: -20px;
    }

    &--next {
        right: -20px;
    }

    svg {
        fill: $c-black;
        opacity: 1;
        margin: auto;
        height: 24px;
        width: 38px;
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

.SoftwareGroupWrapper-title {
    @include title-bordered-h2;
    text-align: center;
}

.SoftwareGroupList {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    list-style: none;
    margin: 40px 0 0;
    padding: 0;

    @include mobile {
        margin-top: 20px;
    }

    &-item {
        color: $c-black;
        flex-shrink: 0;
        flex-grow: 0;
        margin-left: 40px;
        max-width: 360px;
        width: 360px;

        @include mobile {
            margin-left: 20px;
            max-width: 240px;
            width: 240px;
        }
    }

    &-itemLink {
        color: $c-black;

        @include hover {
            &:hover {
                .SoftwareGroupList-itemTitle {
                    color: $c-blue;
                }

                .SoftwareGroupList-icon {
                    opacity: 1;
                }
            }
        }
    }

    &-itemFigure {
        background: #fafafa;
        position: relative;
        margin: 0 auto 16px;

        @include mobile {
            margin-bottom: 23px;
        }

        img {
            display: block;
            margin: auto;
            max-height: 100%;
            max-width: 100%;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translate(-50%, 0);
        }

        &::before {
            content: '';
            display: block;
            padding-top: (2 / 3) * 100%;
            width: 100%;
        }
    }

    &-itemTitle {
        font-size: 24px;
        line-height: calc(30 / 24);
        letter-spacing: -0.2px;
        margin: 0;
        transition: color $d-hover;

        @include mobile {
            font-size: 18px;
            line-height: calc(20 / 18);
            letter-spacing: 0;
            margin: 0 0 7px;
        }
    }

    &-itemPlatform {
        color: $c-gray;
        font-size: 14px;
        line-height: calc(20 / 14);

        @include mobile {
            font-size: 10px;
            line-height: calc(12 / 10);
        }
    }

    &-itemDescriptionText {
        font-size: 14px;
        line-height: calc(20 / 14);
        letter-spacing: 0;
        margin: 20px 0 0;

        @include mobile {
            margin-top: 22px;
        }
    }

    &-icon {
        margin: 18px 0 0;
        opacity: 0;
        height: 34px;
        width: 50px;

        transition: opacity $d-hover;
    }
}
</style>
