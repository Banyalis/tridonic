<template>
    <div
        v-if="products.length > 1"
        class="CompareOverlay"
        :class="{ isActive: isComparisonOverlayOpened }"
        @touchstart="onTouchStart($event)"
        @touchend="onTouchEnd($event)"
    >
        <div class="CompareOverlay-close" @click="closeOverlay">
            <CloseCross type="dotted-big" theme="blue"></CloseCross>
        </div>
        <perfect-scrollbar
            ref="scroll"
            class="CompareOverlay-wrapper"
            :options="{ suppressScrollX: true }"
            @ps-scroll-y="onScroll"
        >
            <div
                class="CompareOverlay-smallHead"
                :class="{ isActive: isSmallHeadShown }"
            >
                <div
                    class="CompareOverlay-smallHeadTitle"
                    :data-count="products.length"
                    v-text="$translations.compareTitle()"
                ></div>
                <div class="CompareOverlay-smallHeadProducts">
                    <div
                        v-for="(product, key) in products"
                        :key="key"
                        :data-count="products.length"
                        class="CompareOverlay-smallHeadProduct"
                    >
                        <div class="CompareOverlay-smallHeadProductImage">
                            <img :src="product.image" />
                        </div>
                        <div
                            class="CompareOverlay-smallHeadProductTitle"
                            v-text="product.name"
                        ></div>
                    </div>
                </div>
            </div>
            <div ref="head" class="CompareOverlay-head">
                <div
                    class="CompareOverlay-headInfo"
                    :data-count="products.length"
                >
                    <div
                        class="CompareOverlay-headTitle"
                        v-text="$translations.compareTitle()"
                    ></div>
                    <div
                        class="CompareOverlay-headDescription"
                        v-text="$translations.compareDescription()"
                    ></div>
                </div>
                <div
                    ref="headProducts"
                    class="CompareOverlay-headProducts"
                    :class="{ isSwiped }"
                >
                    <div
                        v-for="(product, key) in products"
                        :key="key"
                        :data-count="products.length"
                        class="CompareOverlay-headProductWrapper"
                    >
                        <div class="CompareOverlay-headProduct">
                            <div
                                class="CompareOverlay-headProductImage"
                                :style="{ opacity: imageOpacity }"
                            >
                                <img :src="product.image" />
                            </div>
                            <div
                                class="CompareOverlay-headProductTitle"
                                v-text="product.name"
                            ></div>
                            <ArrowLink
                                class="CompareOverlay-headProductLink"
                                :title="$translations.compareDetails()"
                                :url="product.url"
                                :is-nuxt-link="true"
                            ></ArrowLink>
                        </div>
                    </div>
                </div>
                <div
                    v-if="products.length > 2"
                    class="CompareOverlay-headDots"
                    :class="{ isSwiped }"
                >
                    <div class="CompareOverlay-headDot"></div>
                    <div class="CompareOverlay-headDot"></div>
                    <div class="CompareOverlay-headDot"></div>
                </div>
            </div>
            <div class="CompareOverlay-descriptionTable">
                <CompareTable
                    :product-count="products.length"
                    :is-swiped="isSwiped"
                    @resize="onTableResize"
                ></CompareTable>
            </div>
        </perfect-scrollbar>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ArrowLink from '@/components/ArrowLink';
import CompareTable from '@/components/CompareTable';
import { isMobile } from '@/utils/utils';
import CloseCross from '@/components/CloseCross';

export default {
    name: 'CompareOverlay',
    components: { CloseCross, CompareTable, ArrowLink },
    data() {
        return {
            isSmallHeadShown: false,
            touchStartX: 0,
            touchStartY: 0,
            touchMoveGap: 30,
            isSwiped: false,
            imageOpacity: 1
        };
    },
    computed: {
        ...mapState('comparison', [
            'products',
            'isComparisonOverlayOpened',
            'comparisonData',
            'isComparisonHidden'
        ])
    },
    watch: {
        isComparisonOverlayOpened(newVal) {
            if (!newVal) {
                return;
            }

            this.imageOpacity = 1;
            this.$refs.scroll.update();
        }
    },
    methods: {
        onScroll() {
            const wrapperScroll = this.$refs.scroll.$refs.container.scrollTop;
            const headHeight = this.$refs.head.offsetHeight;
            if (isMobile()) {
                if (this.imageOpacity < 0) {
                    this.imageOpacity = 0;

                    return;
                }
                this.imageOpacity = 1 - wrapperScroll / (headHeight / 3);

                return;
            }
            const isSmallHeadShown = wrapperScroll > headHeight;
            if (isSmallHeadShown === this.isSmallHeadShown) {
                return;
            }
            this.isSmallHeadShown = isSmallHeadShown;
        },
        onTouchStart(event) {
            if (this.products.length < 3) {
                return;
            }
            this.touchStartX = event.touches[0].pageX;
            this.touchStartY = event.touches[0].pageY;
        },
        onTouchEnd(event) {
            if (this.products.length < 3) {
                return;
            }
            const touchEndX = event.changedTouches[0].pageX;
            const touchEndY = event.changedTouches[0].pageY;
            const diffX = Math.abs(touchEndX - this.touchStartX);
            const diffY = Math.abs(touchEndY - this.touchStartY);

            if (diffY > diffX || diffX <= this.touchMoveGap) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const swipeDirection = touchEndX - this.touchStartX >= 0 ? 1 : -1;

            if (swipeDirection === -1) {
                this.isSwiped = true;

                return;
            }

            this.isSwiped = false;
        },
        onTableResize() {
            this.updatePerfectScroll();
            this.onScroll();
        },
        updatePerfectScroll() {
            const perfectScroll = this.$refs.scroll;
            if (!perfectScroll) {
                return;
            }

            perfectScroll.update();
        },
        ...mapActions({
            closeOverlay: 'comparison/closeOverlay'
        })
    }
};
</script>

<style lang="scss" scoped>
.CompareOverlay {
    height: 72vh;
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    background: $c-purple;
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    pointer-events: none;
    transition: $d-hover transform, $d-hover opacity;
    z-index: $z-compareOverlay;
    overflow: hidden;

    @include mobile {
        height: 100%;
        transform: none;
        z-index: $z-compareOverlayMobile;
    }

    &.isActive {
        pointer-events: all;
        opacity: 1;
        transform: none;
    }

    .ps {
        height: 100%;
    }

    /deep/ .ps__rail-y {
        z-index: 3;
    }

    &-head {
        background: $c-purple--dark;
        padding: 0 (100vw / 1440 * 100) 20px;
        display: flex;
        align-items: center;
        z-index: 2;

        @include mobile {
            display: block;
            padding: 0 20px 20px;
            position: sticky;
            top: -160px;
        }

        &Info {
            flex: 0 0 (100% / 4);

            &[data-count='2'] {
                flex: 0 0 (100% / 3);
            }
        }

        &Title {
            @include text;
            color: $c-white;
            padding-top: 15px;
        }

        &Description {
            @include text-light;
            color: $c-white;
            margin-top: 20px;
            max-width: 200px;

            @include mobile {
                display: none;
            }
        }

        &Products {
            display: flex;
            padding-top: 20px;
            flex: auto;

            @include mobile {
                transition: $d-hover transform;

                &.isSwiped {
                    transform: translate3d(-43.75%, 0, 0);
                }
            }
        }

        &ProductWrapper {
            display: flex;

            &[data-count='2'] {
                flex: 0 0 50%;
            }

            &[data-count='3'] {
                flex: 0 0 (100% / 3);
            }

            @include mobile {
                &[data-count='3'] {
                    flex: 0 0 43.75%;
                }
            }
        }

        &Product {
            width: 200px;
            display: flex;
            flex-direction: column;

            @include mobile {
                width: 120px;
            }

            &Image {
                width: 100%;
                min-width: 160px;
                height: 160px;
                position: relative;

                @include mobile {
                    min-width: 120px;
                    height: 120px;
                }

                img {
                    @include m-absolute100;
                    width: 160px;
                    height: 100%;
                    left: 50%;
                    transform: translate3d(-50%, 0, 0);

                    @include mobile {
                        width: 120px;
                    }
                }
            }

            &Title {
                @include text-light-same-mobile;
                color: $c-white;
                font-weight: $fw-medium;
                margin-bottom: 20px;
            }

            &Link {
                color: $c-white;
                margin-top: auto;
            }
        }

        &Dots {
            margin: 20px auto 0;
            justify-content: center;
            display: none;

            @include mobile {
                display: flex;
            }

            &.isSwiped {
                .CompareOverlay-headDot {
                    &:first-of-type {
                        &:before {
                            transform: translate3d(20px, -50%, 0);
                        }
                    }
                }
            }
        }

        &Dot {
            width: 8px;
            height: 8px;
            background: $c-white;
            border-radius: 50%;
            margin-left: 12px;
            position: relative;

            &:first-of-type {
                margin-left: 0;

                &:before {
                    content: '';
                    position: absolute;
                    width: 32px;
                    height: 12px;
                    border-radius: 6px;
                    border: 1px solid $c-white;
                    left: -2px;
                    top: 50%;
                    transform: translate3d(0, -50%, 0);
                    transition: $d-hover transform;
                }
            }
        }
    }

    &-smallHead {
        transition: $d-hover opacity;
        display: flex;
        align-items: center;
        height: 80px;
        top: 28vh;
        position: fixed;
        background: $c-purple--dark;
        opacity: 0;
        pointer-events: none;
        width: 100%;
        padding: 0 (100vw / 1440 * 100);
        z-index: 3;

        @include mobile {
            display: none;
        }

        &Title {
            @include text;
            color: $c-white;

            &[data-count='2'] {
                flex: 0 0 (100% / 3);
            }

            &[data-count='3'] {
                flex: 0 0 (100% / 4);
            }
        }

        &Products {
            flex: auto;
            display: flex;
            align-items: center;
        }

        &Product {
            display: flex;
            align-items: center;
            padding-right: 40px;

            &[data-count='2'] {
                flex: 0 0 50%;
            }

            &[data-count='3'] {
                flex: 0 0 (100% / 3);
            }

            &Image {
                flex: 0 0 40px;
                height: 40px;
                position: relative;

                img {
                    @include m-absolute100;
                }
            }

            &Title {
                @include text-light;
                color: $c-white;
                margin-left: 20px;
            }
        }

        &.isActive {
            opacity: 1;
        }
    }

    &-close {
        position: absolute;
        right: 23px;
        top: 23px;
        z-index: 4;

        @include mobile {
            right: 20px;
            top: 20px;
        }
    }
}
</style>
