<template>
    <div
        class="CommonGridItem"
        :class="modifier ? `CommonGridItem--${modifier}` : ''"
    >
        <NuxtLink :to="item.link" class="b-hidden-link"></NuxtLink>
        <div class="CommonGridItem-image">
            <picture>
                <source :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'" />
                <img :src="item.image" alt="" />
            </picture>
        </div>
        <div v-if="item.category" class="CommonGridItem-header">
            <div class="CommonGridItem-category" v-text="item.category"></div>
            <div class="CommonGridItem-date" v-text="item.date"></div>
        </div>
        <div class="CommonGridItem-title" v-text="item.title"></div>
        <p v-if="item.text" class="CommonGridItem-text" v-text="item.text"></p>
        <div class="CommonGridItem-icon">
            <svg-icon name="arrow-right"></svg-icon>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonGridItem',

    props: {
        item: {
            type: Object,
            required: true
        },
        modifier: {
            type: String,
            required: false,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonGridItem {
    $component: &;

    position: relative;
    color: $c-black;

    @include hover {
        &:hover #{$component} {
            &-image img {
                transform: scale(1.05);
            }

            &-title {
                color: $c-blue;
            }

            &-icon svg {
                fill: $c-blue;
            }
        }
    }

    &--small #{$component} {
        &-image {
            @include mobile {
                @include m-aspectRatio(280, 140);
            }
        }

        &-title {
            @include text;

            margin: 0 0 27px;

            @include mobile {
                margin: 0 0 17px;
                line-height: (20 / 18);
            }
        }
    }

    &-image {
        @include m-aspectRatio(360, 200);

        overflow: hidden;

        @include mobile {
            @include m-aspectRatio(280, 160);
        }

        img {
            @include m-absoluteObjectFit();

            transition: transform $d-hover ease-in-out;
        }
    }

    &-header {
        @include text-light;

        display: flex;
        margin: 25px 0 11px;
        color: #909096;

        @include mobile {
            margin: 10px 0 1px;
        }
    }

    &-date {
        margin-left: 5px;
    }

    &-title {
        @include title-small;

        margin: 28px 0 17px;
        transition: color $d-hover ease-in-out;

        @include mobile {
            margin: 16px 0 19px;
        }
    }

    &-text {
        @include text-light-same-mobile;

        margin-bottom: 18px;

        @include mobile {
            margin-bottom: 15px;
        }
    }

    &-icon {
        width: 50px;
        height: 34px;

        @include mobile {
            width: 32px;
            height: 20px;
        }

        svg {
            width: 100%;
            height: 100%;
            fill: $c-purple;
            transition: fill $d-hover ease-in-out;
        }
    }
}
</style>
