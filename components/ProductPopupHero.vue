<template>
    <div
        class="ProductPopupHero"
        :class="[
            isFamily ? `ProductPopupHero--family` : `ProductPopupHero--product`,
            `ProductPopupHero--${available}`
        ]"
    >
        <div class="ProductPopupHero-slider">
            <div
                ref="heroSlider"
                class="ProductPopupHero-sliderInner swiper-container"
            >
                <div
                    v-if="!isComingSoon"
                    class="ProductPopupHero-sliderPagination"
                >
                    <div
                        v-if="media.length > 1"
                        class="ProductPopupHero-sliderPaginationInner"
                    >
                        <div
                            v-for="(item, index) in media"
                            :key="index"
                            class="ProductPopupHero-sliderPaginationItem"
                            :class="[
                                activeIndex === index ? 'isActive' : '',
                                `ProductPopupHero-sliderPaginationItem--${item.type}`
                            ]"
                            @click="setMedia(item, index)"
                        >
                            <div
                                class="ProductPopupHero-sliderPaginationItemInner"
                            >
                                <div
                                    v-if="item.type === 'video'"
                                    class="ProductPopupHero-sliderPaginationItemPlay"
                                ></div>
                                <img v-else :src="item.preview" />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="!isMobileLayout"
                    class="ProductPopupHero-sliderContent"
                >
                    <div
                        class="ProductPopupHero-sliderImage"
                        :class="`ProductPopupHero-sliderImage--${activeMedia.type}`"
                    >
                        <!-- eslint-disable -->
                        <div
                            v-if="activeMedia.type === 'video'"
                            class="ProductPopupHero-sliderImageVideo"
                        >
                            <div
                                class="ProductPopupHero-sliderImageVideoInner"
                                v-html="activeMedia.main"
                            ></div>
                        </div>
                        <!-- eslint-enable -->
                        <img v-else :src="activeMedia.main" />
                    </div>
                    <div
                        v-if="activeMedia.caption"
                        class="ProductPopupHero-sliderCaption"
                        v-text="activeMedia.caption"
                    ></div>
                </div>
                <div
                    ref="heroSliderWrapper"
                    class="ProductPopupHero-sliderContent ProductPopupHero-sliderContent--mobile swiper-wrapper"
                >
                    <div
                        v-for="(item, index) in media"
                        :key="index"
                        ref="heroSliderItem"
                        class="ProductPopupHero-sliderImage swiper-slide"
                        :class="`ProductPopupHero-sliderImage--${item.type}`"
                    >
                        <div class="ProductPopupHero-sliderImageWrapper">
                            <!-- eslint-disable -->
                            <div
                                v-if="item.type === 'video'"
                                class="ProductPopupHero-sliderImageVideo"
                            >
                                <div
                                    class="ProductPopupHero-sliderImageVideoInner"
                                    v-html="item.main"
                                ></div>
                            </div>
                            <!-- eslint-enable -->
                            <img v-else :src="item.main" />
                        </div>
                    </div>
                </div>
                <div
                    v-if="media.length > 1 && !isComingSoon"
                    class="ProductPopupHero-sliderPaginationMobile swiper-pagination"
                ></div>
            </div>
        </div>
        <div class="ProductPopupHero-info">
            <div
                class="ProductPopupHero-infoInner"
                :class="[
                    !!linkSheet && isFamily
                        ? 'ProductPopupHero-infoInner--withSheetLink'
                        : ''
                ]"
            >
                <div class="ProductPopupHero-infoBlock">
                    <div
                        v-if="isAvailable || isComingSoon"
                        class="ProductPopupHero-infoTags"
                    >
                        <div
                            v-for="(tag, key) in tags"
                            :key="key"
                            class="ProductPopupHero-infoTag"
                        >
                            <tag :id="tag.id" :text="tag.text"></tag>
                        </div>
                    </div>
                    <div
                        v-else-if="isPhasedOut"
                        class="ProductPopupHero-infoTags ProductPopupHero-infoTags--phased"
                        v-text="$translations.phasedOut()"
                    ></div>
                    <div class="ProductPopupHero-infoName" v-text="name"></div>
                    <div
                        v-if="description"
                        class="ProductPopupHero-infoCaption"
                        v-text="description"
                    ></div>

                    <div
                        v-if="!isFamily && !isComingSoon"
                        class="ProductPopupHero-infoFooter"
                        :class="{ isRounded: isRounded }"
                        :style="{
                            transform: `translate3d(0, -${translateFooter}px, 0)`
                        }"
                    >
                        <div class="ProductPopupHero-infoFooterInfo">
                            <div class="ProductPopupHero-infoFooterInfoImage">
                                <img
                                    v-if="media.length"
                                    :src="media[0].preview"
                                />
                            </div>
                            <div class="ProductPopupHero-infoFooterInfoBlock">
                                <div
                                    class="ProductPopupHero-infoFooterInfoName"
                                    v-text="name"
                                ></div>
                                <div
                                    class="ProductPopupHero-infoFooterInfoAttrs"
                                >
                                    <div
                                        class="ProductPopupHero-infoFooterInfoNo"
                                        v-text="
                                            $translations.articleNo() +
                                            articleNumber
                                        "
                                    ></div>
                                    /
                                    <div
                                        class="ProductPopupHero-infoFooterInfoEAN"
                                        v-text="`${$translations.ean()}${ean}`"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div class="ProductPopupHero-infoFooterButtons">
                            <RoundedButton
                                :link="{
                                    url: linkSheet,
                                    title: $translations.dataSheetDownload()
                                }"
                                :type="
                                    isMobileLayout
                                        ? 'isPurple'
                                        : 'isTransparent'
                                "
                            ></RoundedButton>
                            <RoundedButton
                                :link="{
                                    url: linkEshop,
                                    title: $translations.visitEshop()
                                }"
                                :type="
                                    isMobileLayout ? 'isBlack' : 'isTransparent'
                                "
                            ></RoundedButton>
                            <RoundedButton
                                :link="{
                                    url: linkSetbuilder,
                                    title: $translations.setbuilder()
                                }"
                                :type="
                                    isMobileLayout ? 'isBlack' : 'isTransparent'
                                "
                            ></RoundedButton>
                        </div>
                    </div>

                    <div
                        v-if="info && !isComingSoon"
                        class="ProductPopupHero-infoDescription"
                    >
                        <div
                            v-if="info.items && info.items.length"
                            class="ProductPopupHero-infoDescriptionItems"
                        >
                            <div
                                v-for="(item, key) in info.items"
                                :key="key"
                                class="ProductPopupHero-infoDescriptionItem"
                            >
                                <div
                                    v-if="item.title"
                                    class="ProductPopupHero-infoDescriptionItemTitle"
                                    v-text="item.title"
                                ></div>
                                <div
                                    v-if="item.text"
                                    class="ProductPopupHero-infoDescriptionItemText"
                                    v-text="item.text"
                                ></div>
                                <div
                                    v-if="item.props && item.props.length"
                                    class="ProductPopupHero-infoDescriptionItemText"
                                >
                                    <div
                                        v-for="(prop, id) in item.props"
                                        :key="id"
                                        class="ProductPopupHero-infoDescriptionItemTextProp"
                                        v-text="prop.text"
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="info.notes"
                            class="ProductPopupHero-infoDescriptionNotes"
                            v-text="info.notes"
                        ></div>
                    </div>
                </div>
                <div
                    v-if="!!linkSheet && isFamily && !isComingSoon"
                    class="ProductPopupHero-infoSheet"
                >
                    <RoundedButton
                        :link="{
                            url: linkSheet,
                            title: $translations.dataSheetDownload()
                        }"
                        type="isPurple"
                    ></RoundedButton>
                </div>
            </div>
            <div v-if="isComingSoon" class="ProductPopupHero-form">
                <product-popup-hero-coming-form
                    :coming-date="comingDate"
                ></product-popup-hero-coming-form>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, Pagination } from 'swiper';

import 'swiper/swiper.scss';

import Tag from '@/components/Tag';
import RoundedButton from '@/components/RoundedButton';

import { isMobile } from '@/utils/utils';
import {
    DURATION_ANIMATION_POPUPS,
    PRODUCT_AVAILABLE
} from '@/utils/constants';
import ProductPopupHeroComingForm from '@/components/ProductPopupHeroComingForm';

// Swiper modules
Swiper.use([Pagination]);

export default {
    name: 'ProductPopupHero',

    components: { ProductPopupHeroComingForm, Tag, RoundedButton },

    props: {
        isFamily: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            required: true
        },
        media: {
            type: Array,
            required: true
        },
        info: {
            type: Object,
            required: true
        },
        available: {
            type: String,
            required: true
        },
        linkSheet: {
            type: String,
            default: ''
        },
        linkSetbuilder: {
            type: String,
            default: ''
        },
        linkEshop: {
            type: String,
            default: ''
        },
        articleNumber: {
            type: String,
            default: ''
        },
        ean: {
            type: String,
            default: ''
        },
        comingDate: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            activeIndex: null,
            activeMedia: {
                main: undefined,
                type: undefined
            },
            isMobileLayout: false,
            pageHeight: 0,
            windowHeight: 0,
            translateFooter: 0,
            maxTranslate: 20,
            isRounded: false,
            swiper: undefined
        };
    },

    computed: {
        isAvailable() {
            return PRODUCT_AVAILABLE.inStock === this.available;
        },

        isPhasedOut() {
            return PRODUCT_AVAILABLE.phasedOut === this.available;
        },

        isComingSoon() {
            return PRODUCT_AVAILABLE.comingSoon === this.available;
        }
    },

    watch: {
        media(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.activeIndex = 0;
                this.activeMedia = this.media[this.activeIndex];

                setTimeout(() => {
                    this.swiper && this.swiper.destroy();
                    this.swiper = undefined;
                    this.$refs.heroSliderWrapper.removeAttribute('style');
                    this.$refs.heroSliderItem[0].removeAttribute('style');

                    this.onResize();
                }, DURATION_ANIMATION_POPUPS / 2);
            }
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        window.addEventListener('scroll', this.onScroll);
        this.onResize();

        if (this.media.length) {
            this.activeIndex = 0;
            this.activeMedia = this.media[this.activeIndex];
        }
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
        window.removeEventListener('scroll', this.onScroll);
    },

    methods: {
        setMedia(item, index) {
            this.activeIndex = index;
            this.activeMedia = item;
        },

        onResize() {
            this.isMobileLayout = isMobile();

            this.pageHeight = document
                .querySelector('.ProductPopup')
                .getBoundingClientRect().height;
            this.windowHeight = window.innerHeight;

            this.initSwiper();

            this.onScroll();
        },

        onScroll() {
            if (this.isFamily) return;

            if (isMobile()) {
                this.translateFooter = 0;

                return;
            }

            const currentScrolled = Math.max(
                this.pageHeight -
                    (window.pageYOffset + this.windowHeight - 120),
                0
            );

            if (currentScrolled <= 20) {
                this.translateFooter = this.maxTranslate - currentScrolled;
                if (!this.isRounded) this.isRounded = true;
            } else {
                this.translateFooter = 0;
                if (this.isRounded) this.isRounded = false;
            }
        },

        initSwiper() {
            if (this.isMobileLayout && this.swiper === undefined) {
                this.swiper = new Swiper(this.$refs.heroSlider, {
                    direction: 'horizontal',
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    spaceBetween: 5,
                    pagination: {
                        el: '.ProductPopupHero-sliderPaginationMobile',
                        clickable: true
                    }
                });
            } else if (!this.isMobileLayout && this.swiper !== undefined) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.heroSliderWrapper.removeAttribute('style');
                this.$refs.heroSliderItem[0].removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupHero {
    $component: &;
    $product: #{$component}--product;
    $family: #{$component}--family;
    $isComingSoon: #{$component}--comingSoon;

    display: flex;
    width: 100%;
    position: relative;
    padding: 0 40px;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;
    max-width: 1360px;
    margin: 0 auto;
    background: $c-white;
    border-radius: 10px 10px 0 0;

    &#{$isComingSoon} {
        min-height: 100%;
        border-radius: 10px;
    }

    @include mobile {
        padding: 0 20px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    &-slider {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 400px;

        #{$product} & {
            width: (600 * 100% / 1320);
            padding: 60px 0 85px;
        }

        #{$family} & {
            width: (680 * 100% / 1320);
        }

        #{$isComingSoon} & {
            width: (600 * 100% / 1280);
            padding: 60px 0;
        }

        @include mobile {
            width: 100% !important;
            min-width: auto;
            padding: 20px 0 0 !important;
        }

        &Inner {
            position: sticky;
            top: 60px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            overflow: visible;

            @include mobile {
                position: relative;
                flex-direction: column;
                justify-content: flex-start;
                top: 0;
                overflow: hidden;
            }
        }

        &Pagination {
            width: 40px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 60px 0;

            #{$isComingSoon} & {
                display: none;
            }

            @include mobile {
                display: none;
            }

            &Mobile {
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

            &Inner {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
            }

            &Item {
                width: 40px;
                height: 40px;
                margin-top: 20px;
                border-radius: 2px;
                border: 1px solid #e5e5e5;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                filter: grayscale(100%);
                transition: filter $d-hover ease-out,
                    border-color $d-hover ease-out;

                &:first-child {
                    margin-top: 0;
                }

                &--video {
                    filter: grayscale(0);
                }

                @include hover {
                    &:hover {
                        filter: grayscale(0);
                        border-color: #000000;
                    }
                }

                &.isActive {
                    filter: grayscale(0);
                    border-color: #000000;
                    pointer-events: none;
                }

                &Inner {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                }

                &Play {
                    display: flex;
                    width: 0;
                    height: 0;
                    border-top: 6px solid transparent;
                    border-bottom: 6px solid transparent;
                    border-left: 12px solid $c-purple;
                }

                img {
                    @include m-absoluteObjectFit(contain);
                }
            }
        }

        &Content {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;

            #{$product} & {
                width: (520 * 100% / 600);
            }

            #{$family} & {
                width: (600 * 100% / 680);
            }

            #{$isComingSoon} & {
                width: 100%;
            }

            @include mobile {
                width: 100% !important;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
            }

            &--mobile {
                display: none;

                @include mobile {
                    display: flex;
                }
            }
        }

        &Image {
            @include m-aspectRatio(520, 520);

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            #{$isComingSoon} &,
            #{$product} & {
                width: (520 * 100% / 520);
            }

            #{$family} & {
                width: (480 * 100% / 600);
            }

            &:before {
                @include mobile {
                    display: none;
                }
            }

            &Wrapper {
                @include m-aspectRatio(520, 520);

                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                @include mobile {
                    width: (240 * 100% / 280) !important;
                }
            }

            img {
                @include m-absoluteObjectFit();
            }

            @include mobile {
                width: 100% !important;
            }

            &Video {
                width: (601 * 100% / 480);
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                @include mobile {
                    width: (280 * 100% / 240);
                }

                &Inner {
                    @include m-aspectRatio(601, 332);

                    display: flex;
                    width: 100%;
                }

                & /deep/ iframe {
                    @include m-absolute100();
                }
            }
        }

        &Caption {
            @include text-light;

            width: 100%;
            position: absolute;
            top: 100%;
            text-align: center;
            margin-top: 25px;
            color: $c-gray;

            @include mobile {
                display: none;
            }
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 0 60px 40px;
        min-width: 400px;

        #{$product} & {
            width: (720 * 100% / 1320);
        }

        #{$family} & {
            width: (640 * 100% / 1320);
        }

        #{$isComingSoon} & {
            width: (560 * 100% / 1280);
            justify-content: space-between;
            padding: 80px 0 60px 40px;

            @include mobile {
                padding: 40px 0 0;
                flex: 1 1 auto;
            }
        }

        @include mobile {
            width: 100% !important;
            min-width: auto !important;
            padding: 40px 0 40px;
            align-items: flex-start !important;
            justify-content: flex-start;
        }

        &Inner {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            min-width: 400px;

            #{$product} & {
                width: (600 * 100% / 720);
            }

            #{$family} & {
                width: (440 * 100% / 700);
            }

            #{$isComingSoon} & {
                width: (440 * 100% / 520);
                min-width: 320px;
            }

            &--withSheetLink {
                justify-content: space-between;
                height: 100%;
            }

            @include mobile {
                width: 100% !important;
                min-width: auto !important;
                align-items: center;
                justify-content: flex-start;
            }
        }

        &Block {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }

        &Tags {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            width: 100%;
            margin-bottom: 8px;
            overflow: hidden;
            height: 20px;

            &--phased {
                @include text-light-same-mobile;

                margin-bottom: 0;
                color: $c-gray;
            }

            @include mobile {
                position: absolute;
                top: 20px;
                margin-bottom: 0;
                width: calc(100% - 40px);
                left: 20px;
            }
        }

        &Tag {
            display: flex;
            margin-left: 10px;

            &:first-child {
                margin-left: 0;
            }
        }

        &Name {
            @include title-small;

            display: flex;
            width: 100%;
            color: $c-black;
        }

        &Caption {
            @include text-light;

            display: flex;
            width: 100%;
            color: $c-gray;
            margin-top: -3px;

            @include mobile {
                @include text-light-same-mobile;

                font-size: 14px;
                line-height: (20 / 14);
                margin-top: 0;
            }
        }

        &Description {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            &Items {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                margin-top: 20px;

                @include mobile {
                    margin-top: 25px;
                }
            }

            &Item {
                @include text-light;

                width: 100%;
                display: flex;
                color: $c-black;
                flex-direction: row;
                justify-content: space-between;

                #{$product} & {
                    margin-top: 20px;
                }

                #{$family} & {
                    border-top: 1px solid rgba(#000, 0.1);
                    padding: 10px 0;

                    &:first-child {
                        border-top: 0;
                        padding-top: 5px;

                        @include mobile {
                            padding-top: 0;
                        }
                    }

                    &:last-child {
                        padding-bottom: 0;
                    }

                    &:first-child:last-child {
                        padding-top: 0;
                    }
                }

                @include mobile {
                    @include text-light-same-mobile;

                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: flex-start;
                }

                &Title {
                    font-weight: $fw-medium;
                    display: flex;
                    width: (120 * 100% / 600);

                    @include mobile {
                        width: 100%;
                    }
                }

                &Text {
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    white-space: pre-line;

                    #{$component}-infoDescriptionItemTitle + & {
                        width: (425 * 100% / 600);

                        @include mobile {
                            width: 100%;
                        }
                    }

                    &Prop {
                        display: flex;
                        width: 100%;
                        flex-direction: row;
                        position: relative;

                        @include mobile {
                            padding-left: 10px;
                        }

                        &:before {
                            content: '—';
                            position: absolute;
                            top: 3px;
                            left: -15px;

                            @include mobile {
                                content: '-';
                                left: 0;
                            }
                        }
                    }
                }
            }

            &Notes {
                @include text-light;

                margin-top: 40px;
                color: $c-gray;
                display: flex;
                width: 100%;
                white-space: pre-line;

                @include mobile {
                    @include text-light-same-mobile;
                }
            }
        }

        &Sheet {
            display: flex;
            margin: 40px 0 20px;

            @include mobile {
                margin: 50px 0 0;

                & a {
                    width: 240px;
                    font-size: 14px;
                    line-height: (20 / 14);
                }
            }
        }

        &Footer {
            position: fixed;
            bottom: 0;
            left: 20px;
            right: 20px;
            background: $c-purple;
            padding: 20px;
            top: auto;
            display: flex;
            z-index: 20;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            transform: translate3d(0, 0, 0);
            will-change: transform, border-radius;

            &.isRounded {
                border-radius: 0 0 10px 10px;
            }

            @include mobile {
                position: relative;
                bottom: auto;
                left: 0;
                right: 0;
                padding: 0;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                margin-top: 25px;
                background: transparent;
                width: 100%;
            }

            &Info {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;

                @include mobile {
                    flex-direction: column;
                    align-items: flex-start;
                }

                &Image {
                    @include m-aspectRatio(40, 40);

                    display: flex;
                    width: 40px;

                    img {
                        @include m-absoluteObjectFit();
                    }

                    @include mobile {
                        display: none;
                    }
                }

                &Block {
                    @include text-light;

                    margin-left: 20px;
                    font-weight: $fw-medium;
                    color: $c-white;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;

                    @include mobile {
                        @include text-light-same-mobile;

                        margin-left: 0;
                        width: 100%;
                        color: $c-black;
                    }
                }

                &Name {
                    @include mobile {
                        display: none;
                    }
                }

                &Attrs {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                }

                &No,
                &EAN {
                    display: flex;
                    white-space: nowrap;
                }

                &No {
                    margin-right: 5px;
                }

                &EAN {
                    margin-left: 5px;
                }
            }

            &Buttons {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                @include mobile {
                    width: 100%;
                    flex-direction: column;
                }

                & > a {
                    margin-left: 20px;

                    &:first-child {
                        margin-left: 0;
                    }

                    @include tablet {
                        width: 150px;
                    }

                    @include mobile {
                        font-size: 14px;
                        line-height: (20 / 14);
                        margin-left: 0;
                        margin-top: 20px;
                        width: 100%;
                    }
                }
            }
        }
    }

    &-form {
        display: flex;
        margin-top: 100px;
        width: (440 * 100% / 520);
        min-width: 320px;

        @include mobile {
            margin-top: 45px;
            width: 100% !important;
            min-width: auto !important;
        }
    }
}
</style>
