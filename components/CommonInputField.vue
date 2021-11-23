<template>
    <div
        class="CommonInputField"
        :class="[
            modifier ? `CommonInputField--${modifier}` : '',
            !!inputValue ? 'isFilled' : '',
            isFocused ? 'isFocused' : '',
            isLightBg ? 'isLightBg' : '',
            !!error ? error : ''
        ]"
        @click="onClickInput"
    >
        <div
            class="CommonInputField-placeholder"
            :class="{ isVisiblePlaceholder: !isFocused && !inputValue }"
            v-text="placeholder"
        ></div>
        <div
            v-if="!!internalError"
            class="CommonInputField-errored b-errored-field"
            v-text="internalError"
        ></div>
        <div class="CommonInputField-inputWrapper">
            <input
                :id="name"
                :ref="name"
                v-model="inputValue"
                :name="name"
                :type="type"
                :min="min"
                :max="max"
                :maxlength="max"
                class="CommonInputField-input"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput"
            />
            <div
                v-if="isRequired && modifier !== 'calculator'"
                class="CommonInputField-icon b-required-icon"
                v-text="`*`"
            ></div>
        </div>
    </div>
</template>

<script>
import { ERROR_CODES_FIELD, VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'CommonInputField',

    model: {
        prop: 'input',
        event: VUE_CUSTOM_EVENTS.input
    },

    props: {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        modifier: {
            type: String,
            default: ''
        },
        isLightBg: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: undefined
        },
        min: {
            type: String,
            default: undefined
        },
        max: {
            type: String,
            default: undefined
        }
    },

    data() {
        return {
            inputValue: '',
            isFocused: false,
            isFilled: false,
            internalError: undefined,
            mapErrors: {}
        };
    },

    watch: {
        error(error) {
            this.internalError = error ? this.mapErrors[error] : undefined;
        }
    },

    mounted() {
        this.mapErrors = {
            [ERROR_CODES_FIELD.isEmpty]: this.$translations.requiredField(),
            [ERROR_CODES_FIELD.isNotValid]: this.$translations.checkData()
        };
    },

    methods: {
        onFocus() {
            this.isFocused = true;
        },

        onBlur() {
            this.isFocused = false;
        },

        onInput() {
            this.$emit(VUE_CUSTOM_EVENTS.input, this.inputValue);

            if (this.inputValue.length > this.max && this.max) {
                this.inputValue = this.inputValue.slice(0, this.max);
            }
        },

        onClickInput() {
            this.$refs[this.name].focus();
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonInputField {
    $component: &;

    @include text;

    line-height: (24 / 20);
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 15px;
    padding-bottom: 9px;

    @include mobile {
        @include text-light-same-mobile-medium;
    }

    &:before,
    &:after {
        content: '';
        display: block;
        width: 100%;
        position: absolute;
        height: 1px;
        background: currentColor;
        will-change: width;
        bottom: 0;
        left: 0;
    }

    &:after {
        width: 0;
    }

    @include hover {
        &:hover {
            &:before {
                width: 0;
            }

            &:after {
                width: 100%;
                transition: $d-hover * 2 width;
            }
        }
    }

    &--small {
        @include text-small;

        line-height: (20 / 18);

        @include mobile {
            @include text-light-same-mobile;
        }
    }

    &--isSubscribeProduct {
        @include text-small;

        line-height: (20 / 18);
        color: $c-gray;

        @include mobile {
            @include text-light-same-mobile;
        }

        &:before,
        &:after {
            background: $c-gray;
        }
    }

    &--calculator {
        @include text-small;

        margin-top: 0;

        @include mobile {
            @include text-light-same-mobile;
        }

        #{$component} {
            &-placeholder {
                display: none;

                &.isVisiblePlaceholder {
                    display: block;
                }
            }

            &-errored.b-errored-field {
                transform: translate3d(-30px, 5px, 0);
            }
        }
    }

    &-placeholder {
        @include text-light;

        color: inherit;
        position: absolute;
        top: 0;
        left: 0;
        will-change: transform, opacity, color;
        opacity: 0.5;
        transform: translate3d(0, -20px, 0);
        transform-origin: 0 0;
        transition: $d-hover transform, $d-hover opacity, $d-hover color,
            $d-hover font-size, $d-hover line-height, $d-hover letter-spacing,
            $d-hover font-weight;

        #{$component}--isSubscribeProduct & {
            opacity: 1;
        }

        @include mobile {
            transform: translate3d(0, -13px, 0);
        }

        &.isVisiblePlaceholder {
            opacity: 1;
            color: inherit;
            font-size: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            font-weight: inherit;
            transform: translate3d(0, 0, 0);

            #{$component}.isEmpty & {
                color: $c-yellow;
            }

            #{$component}.isEmpty.isLightBg & {
                color: $c-red;
            }
        }
    }

    &-input {
        font-size: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        color: inherit;
        width: 100%;
        background: none;
        outline: none;
        border: none;
        position: relative;

        #{$component}--isSubscribeProduct & {
            color: $c-black;
        }

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

        &[type='number'] {
            -moz-appearance: textfield;
        }

        &Wrapper {
            display: flex;
            position: relative;
            width: 100%;
        }
    }

    &-errored {
        #{$component}.isLightBg & {
            color: $c-red;
        }
    }
}
</style>
