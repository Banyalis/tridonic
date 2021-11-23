<template>
    <div class="CloseCross" :class="[`type-${type}`, `theme-${theme}`]">
        <div v-if="type === types.filledSmall" class="CloseCross-wrapper">
            <div class="CloseCross-line CloseCross-line--1"></div>
            <div class="CloseCross-line CloseCross-line--2"></div>
        </div>
        <div v-if="type === types.dottedBig" class="CloseCross-wrapper">
            <div class="CloseCross-icon">
                <svg-icon name="cross-dotted"></svg-icon>
            </div>
            <div class="CloseCross-icon_mobile">
                <svg-icon name="cross-dotted-mobile"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CloseCross',
    props: {
        type: {
            type: String, // filled-small | dotted-big
            required: true
        },
        theme: {
            type: String, // blue | black | white todo
            required: true
        }
    },
    data() {
        return {
            types: {
                filledSmall: 'filled-small',
                dottedBig: 'dotted-big'
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.CloseCross {
    $component: &;

    position: relative;
    cursor: pointer;

    &-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &-line {
        transform-origin: center center;
        position: absolute;

        &--1 {
            transform: rotate(45deg);
        }

        &--2 {
            transform: rotate(-45deg);
        }
    }

    &.type-filled-small {
        width: 24px;
        height: 24px;

        .CloseCross-line {
            height: 2px;
            width: 16px;
            transition: $d-hover transform;
        }

        @include hover {
            &:hover {
                .CloseCross-line--1 {
                    transform: rotate(45deg) scaleX(1.5);
                }

                .CloseCross-line--2 {
                    transform: rotate(-45deg) scaleX(1.5);
                }
            }
        }
    }

    &.theme-blue {
        .CloseCross-line {
            background-color: $c-blue;
        }
    }

    &.theme-black {
        .CloseCross-line {
            background-color: $c-black;
        }
    }

    &.theme-white {
        .CloseCross-line {
            background-color: $c-white;
        }
    }

    @include hover {
        &:hover {
            .CloseCross-icon {
                clip-path: inset(0 0 0 0);
            }
        }
    }

    @include hover {
        &.theme-black:hover,
        &.theme-white:hover {
            .CloseCross-icon svg {
                fill: $c-blue;
            }
        }
    }

    &-icon {
        width: 34px;
        height: 34px;
        position: relative;
        clip-path: inset(5px 5px 5px 5px);
        transition: $d-hover clip-path;

        @include mobile {
            display: none;
        }

        svg {
            @include m-absolute100;

            transition: $d-hover fill;

            #{$component}.theme-blue & {
                fill: $c-blue;
            }

            #{$component}.theme-black & {
                fill: $c-black;
            }

            #{$component}.theme-white & {
                fill: $c-white;
            }
        }

        &_mobile {
            display: none;

            @include mobile {
                display: block;
                width: 20px;
                height: 20px;

                svg {
                    @include m-absolute100;

                    transition: $d-hover fill;

                    #{$component}.theme-blue & {
                        fill: $c-blue;
                    }

                    #{$component}.theme-black & {
                        fill: $c-black;
                    }

                    #{$component}.theme-white & {
                        fill: $c-white;
                    }
                }
            }
        }
    }
}
</style>
