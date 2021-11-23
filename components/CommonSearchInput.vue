<template>
    <div
        class="CommonSearchInput"
        :class="[
            isFocused ? 'CommonSearchInput--isFocused' : '',
            !!inputValue.length ? 'CommonSearchInput--isFilled' : '',
            modifier ? `CommonSearchInput--${modifier}` : ''
        ]"
    >
        <label :for="searchId" class="CommonSearchInput-icon">
            <svg-icon name="search-icon"></svg-icon>
        </label>
        <input
            :id="searchId"
            :ref="`input-${searchId}`"
            v-model="inputValue"
            :placeholder="placeholder"
            type="text"
            class="CommonSearchInput-input"
            @focusin="toggleFocus"
            @focusout="toggleFocus"
            @input="onInput"
            @keyup="onKeyUp"
            @keydown="onKeyDown"
            @on-input-change="changeValue"
        />
        <div class="CommonSearchInput-clear" @click="clearInput">
            <svg-icon v-if="modifier == 'large'" name="close-cross"></svg-icon>
            <div v-else class="CommonSearchInput-clearIcon">
                <div class="CommonSearchInput-clearIconItem"></div>
                <div class="CommonSearchInput-clearIconItem"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { KEY_CODES, VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'CommonSearchInput',

    model: {
        prop: 'input',
        event: VUE_CUSTOM_EVENTS.input
    },

    props: {
        searchId: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: false,
            default: ''
        },
        modifier: {
            type: String,
            required: false,
            default: ''
        }
    },

    data() {
        return {
            inputValue: '',
            isFocused: false
        };
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.onInputChange, this.changeValue);
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.onInputChange, this.changeValue);
    },

    methods: {
        onKeyUp(event) {
            if (event.keyCode === KEY_CODES.enter) {
                this.$emit(
                    VUE_CUSTOM_EVENTS.onSearchInput,
                    this.inputValue.trim().toLowerCase()
                );
            }
        },

        onInput() {
            this.$emit(
                VUE_CUSTOM_EVENTS.input,
                this.inputValue.trim().toLowerCase()
            );
        },

        changeValue(value) {
            this.inputValue = value;
        },

        toggleFocus() {
            this.isFocused = !this.isFocused;

            this.$emit(VUE_CUSTOM_EVENTS.onFocus, this.isFocused);
        },

        onKeyDown() {
            this.$emit(VUE_CUSTOM_EVENTS.onKeyDown);
        },

        clearInput() {
            this.isFocused = false;
            this.inputValue = '';
            this.$emit(
                VUE_CUSTOM_EVENTS.input,
                this.inputValue.trim().toLowerCase()
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonSearchInput {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 5px;
    //border-bottom: 1px solid $c-gray;
    //transition: $d-hover border-color;

    @include mobile {
        width: 100%;

        &--videoTutorials {
            max-width: 240px;
        }
    }

    &--isFocused,
    &--isFilled {
        //border-color: $c-black;

        &#{$component}:before {
            width: 0;
            background: $c-black;
            transition: $d-hover * 2 background;
        }

        &#{$component}:after {
            width: 100%;
            background: $c-black;
            transition: $d-hover * 2 width, $d-hover * 2 background;
        }
    }

    &:before,
    &:after {
        content: '';
        display: block;
        width: 100%;
        position: absolute;
        height: 1px;
        background: $c-gray;
        will-change: width, background;
        bottom: 0;
        left: 0;
        transition: $d-hover background;

        @include mobile {
            bottom: -5px;
        }
    }

    &:after {
        width: 0;
    }

    &--large {
        align-items: flex-end;
        width: 100%;
        padding-bottom: 12px;

        #{$component} {
            &-icon {
                width: 50px;
                height: 49px;
            }

            &-input {
                @include title;

                height: 60px;
                margin: 0 30px;
            }

            &-clear {
                margin-bottom: 14px;

                @include hover {
                    &:hover svg {
                        fill: $c-blue;
                    }
                }

                svg {
                    fill: $c-black;
                    transition: fill $d-hover ease-in-out;
                }
            }
        }
    }

    &-icon {
        width: 21px;
        height: 21px;
        display: flex;
        position: relative;
        cursor: pointer;
        @include m-absoluteSvg;

        svg {
            fill: $c-gray;
            transition: $d-hover fill;

            #{$component}--isFocused &,
            #{$component}--isFilled & {
                fill: $c-black;
            }
        }
    }

    &-input {
        @include text-light-same-mobile-medium;

        height: 20px;
        color: $c-black;
        outline: none;
        border: none;
        margin: 0 9px;
        display: flex;
        width: calc(100% - 63px);

        &::placeholder {
            color: $c-gray;
            font-weight: $fw-normal;
        }

        &::-webkit-input-placeholder {
            color: $c-gray;
            font-weight: $fw-normal;
        }

        &::-moz-placeholder {
            color: $c-gray;
            font-weight: $fw-normal;
        }

        &:-moz-placeholder {
            color: $c-gray;
            font-weight: $fw-normal;
        }

        &:-ms-input-placeholder {
            color: $c-gray;
            font-weight: $fw-normal;
        }
    }

    &-clear {
        display: flex;
        position: relative;
        width: 24px;
        height: 24px;
        cursor: pointer;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: $d-hover opacity;

        #{$component}--isFilled & {
            pointer-events: all;
            opacity: 1;
        }

        &Icon {
            position: relative;
            width: 16px;
            height: 16px;
            transform: translate3d(0, 0, 0) rotate(45deg);
            transition: $d-hover transform;

            @include hover {
                #{$component}-clear:hover & {
                    transform: translate3d(0, 0, 0) scale(1.2) rotate(45deg);
                }
            }

            &Item {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: 2px;
                background: $c-black;
                transform: translate3d(-50%, -50%, 0);

                &:last-child {
                    transform: translate3d(-50%, -50%, 0) rotate(90deg);
                }
            }
        }
    }
}
</style>
