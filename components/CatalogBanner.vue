<template>
    <div
        class="CatalogBanner"
        :class="{ isBackgroundFull: banner.isBackgroundFull }"
    >
        <nuxt-link :to="banner.url" class="b-hidden-link"></nuxt-link>
        <div class="CatalogBanner-wrapper">
            <div class="CatalogBanner-content">
                <div class="CatalogBanner-image">
                    <figure>
                        <img :src="banner.image" alt="Banner image" />
                    </figure>
                </div>
                <div class="CatalogBanner-info">
                    <div
                        class="CatalogBanner-infoTitle"
                        v-text="banner.title"
                    ></div>
                    <div
                        class="CatalogBanner-infoText"
                        :class="{ isBlack: banner.isBlackText }"
                        v-text="banner.text"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        banner: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CatalogBanner {
    display: flex;
    width: 100%;
    background: $c-purple;
    transition: $d-hover background-color;
    position: relative;

    @include hover {
        &:hover {
            background: $c-bannerHover;

            .CatalogBanner-wrapper::after {
                border-bottom-color: $c-bannerHover;
            }

            &.isBackgroundFull .CatalogBanner-image img {
                transform: scale(1.05);
            }
        }
    }

    &.isBackgroundFull {
        background: transparent;
    }

    &-wrapper {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
        padding: 20px 80px;
        position: relative;

        @include desktop {
            justify-content: center;
        }

        @include laptop {
            justify-content: center;
        }

        @include tablet {
            padding: 20px 40px;
        }

        @include mobile {
            padding: 10px 20px;
        }

        &:after {
            content: '';
            display: flex;
            position: absolute;
            right: -20px;
            bottom: 20px;
            width: 0;
            height: 0;
            border-bottom: 20px solid $c-purple;
            transition: $d-hover border-bottom-color;
            border-right: 20px solid transparent;

            @include mobile {
                border-bottom: 10px solid $c-purple;
                border-right: 10px solid transparent;
                right: -10px;
                bottom: 10px;
            }

            .isBackgroundFull & {
                display: none;
            }
        }
    }

    &-content {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        max-width: 840px;
    }

    &-image {
        display: flex;
        border-radius: 100%;
        position: relative;
        width: 120px;
        height: 120px;
        overflow: hidden;
        z-index: $z-bannerImage;

        @include tablet {
            width: 80px;
            height: 80px;
        }

        @include mobile {
            width: 40px;
            height: 40px;
        }

        .isBackgroundFull & {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0;

            img {
                transition: $d-hover transform;

                @include mobile {
                    object-position: left;
                }
            }
        }

        img {
            @include m-absoluteObjectFit();
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: (680 * 100% / 840);
        margin-left: (40 * 100% / 840);
        z-index: $z-bannerInfo;

        .isBackgroundFull & {
            margin-left: calc(120px + (40 * 100% / 840));

            @include tablet {
                margin-left: calc(140px + (40 * 100% / 600));
            }

            @include mobile {
                margin-left: calc(60px + (20 * 100% / 240));
            }
        }

        &Title {
            @include text-light;

            color: rgba($c-white, 0.5);

            @include mobile {
                font-size: 12px;
            }
        }

        &Text {
            @include text;

            color: $c-white;

            &.isBlack {
                color: $c-black;
            }

            @include tablet {
                font-size: 18px;
                line-height: (20 / 18);
            }

            @include mobile {
                font-size: 12px;
                line-height: (12 / 10);
                margin-top: 4px;
            }
        }
    }
}
</style>
