<template>
    <component
        :is="url ? (isNuxtLink ? 'nuxt-link' : 'a') : 'div'"
        :href="!isNuxtLink ? (url ? url : undefined) : undefined"
        class="ArrowLink"
        :to="isNuxtLink ? (url ? url : undefined) : undefined"
        :class="[!!type ? `ArrowLink--${type}` : undefined]"
    >
        <span class="ArrowLink-arrow">
            <svg-icon name="link-arrow-right"></svg-icon>
        </span>
        <span class="ArrowLink-title">{{ title }}</span>
    </component>
</template>

<script>
export default {
    name: 'ArrowLink',
    props: {
        url: {
            type: String,
            default: null
        },
        title: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: ''
        },
        isNuxtLink: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="scss" scoped>
.ArrowLink {
    $component: &;

    display: flex;
    align-items: flex-end;

    &--popup {
        align-items: center;
    }

    &--isPurple {
        .ArrowLink-title {
            color: $c-purple;
        }

        .ArrowLink-arrow svg {
            fill: $c-purple;
        }

        @include hover {
            &:hover {
                .ArrowLink-title {
                    color: $c-purple--hovered;
                }

                .ArrowLink-arrow svg {
                    fill: $c-purple--hovered;
                }
            }
        }
    }

    &--isVideoLink {
        .ArrowLink-title {
            color: $c-purple;

            @include mobile {
                font-size: 14px;
            }
        }

        .ArrowLink-arrow svg {
            fill: $c-purple;
        }

        @include hover {
            &:hover {
                .ArrowLink-title {
                    color: $c-purple--hovered;
                }

                .ArrowLink-arrow svg {
                    fill: $c-purple--hovered;
                }
            }
        }
    }

    &-title {
        @include text-light-same-mobile;

        font-weight: $fw-medium;
        color: $c-white;
        margin-left: 4px;
        line-height: 1;
        transition: $d-hover color;

        #{$component}--popup & {
            @include text-small;

            line-height: (20 / 18);
            color: $c-black;
            margin-left: 25px;
            width: calc(100% - 42px);
        }
    }

    &-arrow {
        width: 17px;
        height: 11px;
        position: relative;
        overflow: hidden;

        svg {
            position: absolute;
            height: 100%;
            left: 0;
            fill: $c-blue;
            transform: translate3d(-7px, 0, 0);
            transition: $d-hover transform, $d-hover fill;

            #{$component}--popup & {
                fill: $c-purple;
            }
        }
    }

    @include hover {
        &:hover {
            .ArrowLink-title {
                color: $c-blue;
            }

            .ArrowLink-arrow {
                svg {
                    fill: $c-blue;
                    transform: translate3d(-4px, 0, 0);
                }
            }
        }
    }
}
</style>
