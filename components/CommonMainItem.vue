<template>
    <div class="CommonMainItem">
        <nuxt-link v-if="main" :to="main.url" class="CommonMainItem-wrapper">
            <div class="CommonMainItem-image">
                <img :src="main.image" :alt="main.title" />
            </div>
            <div class="CommonMainItem-info">
                <div
                    class="CommonMainItem-infoSubTitle"
                    v-text="main.subTitle"
                ></div>
                <div class="CommonMainItem-infoTitle" v-text="main.title"></div>
                <div class="CommonMainItem-infoArrow">
                    <Arrow />
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import Arrow from '@/components/Arrow';

export default {
    components: {
        Arrow
    },

    props: {
        main: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonMainItem {
    $component: &;

    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;

    &-wrapper {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-end;
        width: 100%;
        position: relative;

        @include mobile {
            flex-direction: column;
            justify-content: flex-start;
        }
    }

    @include hover {
        &:hover {
            & #{$component} {
                &-image img {
                    transform: translate3d(0, 0, 0) scale(1.05);
                }

                &-info {
                    &SubTitle {
                        color: rgba($c-white, 1);
                    }

                    &Arrow svg {
                        transform: none;
                    }
                }
            }
        }
    }

    &-image {
        @include m-aspectRatio(920, 440);

        width: (920 * 100% / 1160);
        background: black;
        overflow: hidden;

        @include mobile {
            width: 100%;
        }

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: (280 * 100% / 920);
            height: 100%;
            background: linear-gradient(
                to right,
                black 0%,
                rgba(black, 0) 100%
            );
            opacity: 0.5;

            @include mobile {
                display: none;
            }
        }

        img {
            @include m-absoluteObjectFit();

            opacity: 0.75;
            transform: translate3d(0, 0, 0);
            z-index: 1;
            transition: $d-hover transform;
        }
    }

    &-info {
        position: absolute;
        left: 0;
        z-index: 3;
        top: 50%;
        width: (600 * 100% / 1160);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        transform: translate3d(0, -50%, 0);

        @include mobile {
            position: relative;
            top: 0;
            transform: none;
            width: 100%;
            margin-top: 10px;
        }

        &SubTitle {
            @include text-light-same-mobile;

            color: rgba($c-white, 0.5);
            width: 100%;
            transition: $d-hover color;
        }

        &Title {
            @include title;

            color: $c-white;
            width: 100%;
            margin-top: 1px;

            @include mobile {
                font-size: 24px;
                line-height: (30 / 24);
                letter-spacing: -0.2px;
                margin-top: 0;
            }
        }

        &Arrow {
            margin-top: 57px;
            color: $c-blue;

            @include mobile {
                margin-top: 14px;
            }
        }
    }
}
</style>
