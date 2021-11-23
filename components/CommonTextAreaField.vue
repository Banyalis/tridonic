<template>
    <div
        class="CommonTextAreaField"
        :class="[
            modifier ? `CommonTextAreaField--${modifier}` : '',
            !!inputValue ? 'isFilled' : '',
            isFocused ? 'isFocused' : '',
            !!error ? error : ''
        ]"
        @click="onClickInput"
    >
        <div
            class="CommonTextAreaField-placeholder"
            :class="{ isVisiblePlaceholder: !isFocused && !inputValue }"
            v-text="placeholder"
        ></div>
        <div
            v-if="!!internalError"
            class="CommonTextAreaField-errored b-errored-field"
            v-text="internalError"
        ></div>
        <div class="CommonTextAreaField-inputWrapper">
            <textarea
                :id="name"
                :ref="name"
                v-model="inputValue"
                :name="name"
                class="CommonTextAreaField-input"
                @focus="onFocus"
                @blur="onBlur"
                @input="onInput"
            />
            <div
                v-if="isRequired"
                class="CommonTextAreaField-icon b-required-icon"
                v-text="`*`"
            ></div>
        </div>
    </div>
</template>

<script>
import { ERROR_CODES_FIELD, VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'CommonTextAreaField',

    model: {
        prop: 'input',
        event: VUE_CUSTOM_EVENTS.input
    },

    props: {
        name: {
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
        error: {
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
        },

        onClickInput() {
            this.$refs[this.name].focus();
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonTextAreaField {
    $component: &;

    @include text-small;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 15px;

    @include mobile {
        @include text-light-same-mobile;
    }

    &-placeholder {
        font-size: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        color: inherit;
        position: absolute;
        will-change: transform, opacity, color;
        opacity: 0;
        z-index: 2;
        top: 0;
        left: 0;
        transition: $d-hover opacity, $d-hover color;

        @include mobile {
            @include text-light-same-mobile-medium;
        }

        &.isVisiblePlaceholder {
            color: inherit;
            opacity: 1;

            #{$component}.isEmpty & {
                color: $c-yellow;
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
        height: 210px;
        resize: none;
        outline: none;
        border: none;
        position: relative;
        background-attachment: local;
        background-image: repeating-linear-gradient(
                to right,
                rgba($c-gray, 0) 0px,
                rgba($c-gray, 0) 2px,
                $c-black--bg 2px,
                $c-black--bg 6px
            ),
            linear-gradient($c-black--bg 29px, $c-gray 30px);
        background-color: $c-black--bg;
        background-size: 6px 30px;

        @include mobile {
            height: 200px;
            background-image: repeating-linear-gradient(
                    to right,
                    rgba($c-gray, 0) 0px,
                    rgba($c-gray, 0) 2px,
                    $c-black--bg 2px,
                    $c-black--bg 6px
                ),
                linear-gradient($c-black--bg 18px, $c-gray 19px);
            background-color: $c-black--bg;
            background-size: 6px 19px;
        }

        &Wrapper {
            display: flex;
            position: relative;
            width: 100%;
        }
    }

    &-icon {
        top: 4px;
        transform: translate3d(-100%, 0, 0);
    }
}
</style>
