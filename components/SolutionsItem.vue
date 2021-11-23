<template>
    <div class="SolutionsItem">
        <nuxt-link :to="item.url" class="SolutionsItem-wrapper">
            <div class="SolutionsItem-info">
                <div class="SolutionsItem-infoInner">
                    <div
                        class="SolutionsItem-infoTitle"
                        v-text="item.title"
                    ></div>
                    <div
                        class="SolutionsItem-infoDescription"
                        v-text="item.description"
                    ></div>
                </div>
                <div class="SolutionsItem-infoArrow">
                    <Arrow />
                </div>
            </div>
            <div class="SolutionsItem-image">
                <img :src="item.image" />
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import Arrow from '@/components/Arrow';

export default {
    name: 'SolutionsItem',

    components: { Arrow },

    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.SolutionsItem {
    $component: &;

    width: 100%;
    display: flex;

    &-wrapper {
        display: flex;
        width: 100%;
        flex-direction: row;
        align-items: stretch;
        justify-content: flex-start;

        @include mobile {
            flex-direction: column-reverse;
            align-items: flex-start;
        }

        @include hover {
            &:hover {
                #{$component}-info {
                    color: $c-blue;

                    &:after {
                        width: 100%;

                        @include mobile {
                            width: 0;
                        }
                    }

                    &Title {
                        color: $c-white;

                        @include mobile {
                            color: $c-black;
                        }
                    }

                    &Description {
                        color: $c-white;

                        @include mobile {
                            color: $c-gray;
                        }
                    }

                    &Arrow {
                        svg {
                            transform: none;
                        }
                    }
                }

                #{$component}-image img {
                    transform: translate3d(0, 0, 0) scale(1.05);

                    @include mobile {
                        transform: translate3d(0, 0, 0);
                    }
                }
            }
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        position: relative;
        width: (400 * 100% / 1160);
        padding: 48px 80px 43px 40px;
        background: $c-white;
        color: $c-purple;
        border-left: 4px solid $c-purple;
        transition: $d-hover color;

        @include mobile {
            width: 100%;
            margin-top: 16px;
            padding: 0 0 0 18px;
            border-left-width: 2px;
        }

        &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background: $c-purple;
            transition: $d-hover width;
            z-index: 1;
        }

        &Inner {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            z-index: 2;
            position: relative;
        }

        &Title {
            @include title-small;

            width: 100%;
            display: flex;
            color: $c-black;
            transition: $d-hover color;
        }

        &Description {
            @include text-light-same-mobile;

            width: 100%;
            display: flex;
            color: $c-gray;
            margin-top: 17px;
            transition: $d-hover color;
        }

        &Arrow {
            position: relative;
            display: flex;
            margin-top: 20px;
            z-index: 2;

            @include mobile {
                display: flex;
                margin-top: 15px;
            }
        }
    }

    &-image {
        @include m-aspectRatio(760, 360);

        display: flex;
        width: (760 * 100% / 1160);
        overflow: hidden;

        @include mobile {
            @include m-aspectRatio(280, 140);

            width: 100%;
        }

        img {
            @include m-absoluteObjectFit();

            transform: translate3d(0, 0, 0) scale(1);
            transition: $d-hover transform;
        }
    }
}
</style>
