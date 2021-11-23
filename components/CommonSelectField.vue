<template>
    <div
        ref="select"
        class="CommonSelectField"
        :class="[
            modifier ? `CommonSelectField--${modifier}` : '',
            !!error ? error : '',
            isOpen ? 'isOpen' : ''
        ]"
        @click="toggleSelect"
    >
        <div
            v-if="placeholder"
            class="CommonSelectField-placeholder"
            :class="{
                isVisiblePlaceholder: !value || value === options[0].value
            }"
            v-text="placeholder"
        ></div>
        <div
            v-if="!!internalError"
            class="CommonSelectField-errored b-errored-field"
            v-text="internalError"
        ></div>
        <div class="CommonSelectField-select">
            <div
                class="CommonSelectField-text"
                :class="{
                    isVisiblePlaceholder: !value || value === options[0].value
                }"
                v-text="getValueName"
            ></div>
            <div ref="options" class="CommonSelectField-options">
                <perfect-scrollbar
                    ref="scroll"
                    class="CommonSelectField-optionsInner"
                    :options="{ suppressScrollX: true }"
                >
                    <div
                        v-for="(option, key) in options"
                        :key="key"
                        class="CommonSelectField-option"
                        :class="{
                            isActive: option.value === value,
                            isDisable: option.disabled
                        }"
                        @click="changeSelect(option)"
                        v-text="option.name"
                    ></div>
                </perfect-scrollbar>
            </div>
            <select
                v-model="value"
                class="CommonSelectField-optionsMobile"
                @change="changeSelectMobile()"
            >
                <option
                    v-for="(option, key) in options"
                    :key="key"
                    class="CommonSelectField-optionMobile"
                    :value="option.value"
                    :disable="option.value.disabled"
                    v-text="option.name"
                ></option>
            </select>
            <div class="CommonSelectField-selectIcon"></div>
            <div
                v-if="isRequired && modifier !== 'calculator'"
                class="CommonSelectField-icon b-required-icon"
                v-text="`*`"
            ></div>
        </div>
    </div>
</template>

<script>
import { ERROR_CODES_FIELD } from '@/utils/constants';
import { isElementParentOf } from '~/utils/utils';

export default {
    name: 'CommonSelectField',

    props: {
        options: {
            type: Array,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        isRequired: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
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
            isOpen: false,
            internalError: undefined,
            mapErrors: {}
        };
    },

    computed: {
        getValueName() {
            const value = this.options.find(
                (option) => option.value === this.value
            )?.name;

            return this.placeholder
                ? value && value !== this.options[0].value
                    ? value
                    : this.placeholder
                : value;
        }
    },
    watch: {
        error(error) {
            this.internalError = error ? this.mapErrors[error] : undefined;
        }
    },

    mounted() {
        window.addEventListener('click', this.onOutsideClick);

        this.mapErrors = {
            [ERROR_CODES_FIELD.isEmpty]: this.$translations.requiredField(),
            [ERROR_CODES_FIELD.isNotValid]: this.$translations.checkData()
        };
    },

    beforeDestroy() {
        window.removeEventListener('click', this.onOutsideClick);
    },

    methods: {
        onOutsideClick(event) {
            if (
                (this.isOpen &&
                    isElementParentOf(this.$refs.select, event.target)) ||
                this.$refs.select.isEqualNode(event.target)
            ) {
                return;
            }

            this.closeSelect();
        },

        toggleSelect(event) {
            if (
                isElementParentOf(this.$refs.options, event.target) ||
                this.$refs.options.isEqualNode(event.target)
            ) {
                return;
            }

            this.isOpen = !this.isOpen;
        },

        changeSelectMobile() {
            this.$emit('input', this.value);

            this.closeSelect();
        },

        changeSelect(option) {
            this.closeSelect();

            this.$emit('input', option.value);
        },

        closeSelect() {
            this.isOpen = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonSelectField {
    $component: &;

    @include text;

    display: flex;
    position: relative;
    width: 100%;
    color: $c-white;
    cursor: pointer;
    margin-top: 15px;
    padding-bottom: 9px;

    @include mobile {
        @include text-light-same-mobile-medium;
    }

    &--small {
        @include text-small;

        line-height: (20 / 18);

        @include mobile {
            @include text-light-same-mobile-medium;
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

    &-select {
        position: relative;
        width: 100%;

        &Icon {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            top: calc(50% + 3px);
            right: 4px;
            width: 8px;
            height: 2px;
            transform: translate3d(0, -50%, 0) rotate(180deg);

            #{$component}.isOpen & {
                transform: translate3d(0, -50%, 0);
            }

            &:after,
            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: currentColor;
                transform: rotate(45deg);
                margin-left: 4px;
            }

            &:before {
                transform: rotate(-45deg);
                margin-left: -4px;
            }
        }
    }

    &-text {
        font-size: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        font-weight: inherit;
        color: inherit;
        display: flex;
        z-index: $z-filterSelectText;
        cursor: pointer;

        @include mobile {
            font-size: 14px;
        }

        &.isVisiblePlaceholder {
            color: inherit;

            #{$component}.isEmpty & {
                color: $c-yellow;
            }
        }
    }

    &-options {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        transform: translate3d(0, 100%, 0);
        max-height: 240px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: nowrap;
        background: $c-white;
        z-index: $z-selectFilter;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 8px 20px 0 rgba(#000, 0.25);

        @include mobile {
            display: none;
        }

        #{$component}.isOpen & {
            opacity: 1;
            pointer-events: all;
            transition: $d-hover opacity;
        }

        &Inner {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 20px;
        }
    }

    &-option {
        @include text-small;

        color: $c-black;
        transition: $d-hover color;
        cursor: pointer;

        &:first-child {
            margin-top: 0;
        }

        @include hover {
            &:hover {
                color: $c-blue;
            }
        }

        &.isActive {
            cursor: default;
            pointer-events: none;
            color: $c-blue;
        }

        &.isDisable {
            display: none;
        }
    }

    &-optionsMobile {
        display: none;

        @include mobile {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            opacity: 0;
            z-index: $z-hiddenSelect;
        }
    }

    &-placeholder {
        @include text-light;

        position: absolute;
        top: 0;
        left: 0;
        will-change: transform, opacity, color;
        opacity: 0.5;
        pointer-events: none;
        transform: translate3d(0, -20px, 0);
        transform-origin: 0 0;
        transition: $d-hover transform, $d-hover opacity, $d-hover color,
            $d-hover font-size, $d-hover line-height, $d-hover letter-spacing,
            $d-hover font-weight;

        @include mobile {
            transform: translate3d(0, -13px, 0);
        }

        &.isVisiblePlaceholder {
            opacity: 0;
            color: inherit;
            font-size: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            font-weight: inherit;
            transform: translate3d(0, 0, 0);
        }
    }
}
</style>
