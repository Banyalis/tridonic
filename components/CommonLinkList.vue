<template>
    <div
        class="CommonLinkList"
        :class="[type ? `CommonLinkList--${type}` : undefined]"
    >
        <div class="CommonLinkList-container">
            <ul class="CommonLinkList-list">
                <li
                    v-for="(link, index) in list"
                    :key="index"
                    class="CommonLinkList-listItem"
                >
                    <nuxt-link :to="link.url" class="CommonLinkList-link">
                        {{ link.title }}

                        <div class="CommonLinkList-linkArrow">
                            <Arrow />
                        </div>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Arrow from '@/components/Arrow';

export default {
    name: 'CommonLinkList',
    components: { Arrow },
    props: {
        list: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
.CommonLinkList {
    $component: &;

    width: 100%;

    &-list {
        border-top: 1px solid $c-gray--shadow;
        border-bottom: 1px solid $c-gray--shadow;
        list-style: none;
        margin: 0;
        padding: 0;

        #{$component}--isNews & {
            border-top-color: rgba($c-white, 0.15);
            border-bottom-color: rgba($c-white, 0.15);
        }
    }

    &-listItem {
        border-bottom: 1px solid $c-gray--shadow;

        #{$component}--isNews & {
            border-bottom-color: rgba($c-white, 0.15);
        }

        &:last-child {
            border: 0;
        }
    }

    &-link {
        @include text;

        display: block;
        color: $c-black;
        padding: 15px 0;
        position: relative;
        transition: $d-hover color;
        transform: translate3d(0, 0, 0);

        #{$component}--isNews & {
            color: $c-white;
        }

        @include mobile {
            @include text-light-same-mobile-medium;

            padding: 20px 0;
        }

        &Arrow {
            color: $c-black;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate3d(0, -50%, 0);

            #{$component}--isNews & {
                color: $c-white;
            }
        }

        @include hover {
            &:hover {
                color: $c-blue;

                #{$component}-linkArrow {
                    color: $c-blue;

                    svg {
                        transform: none;
                    }
                }
            }
        }
    }
}
</style>
