<template>
    <div class="CommonRadioInput" :class="{ error }">
        <input
            :id="id"
            v-model="inputModel"
            :name="name"
            :value="value"
            type="radio"
            class="CommonRadioInput-input"
            @change="onInputChange"
        />
        <label class="CommonRadioInput-label" :for="id" v-text="title"></label>
    </div>
</template>

<script>
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'CommonRadioInput',

    model: {
        prop: 'change',
        event: VUE_CUSTOM_EVENTS.change
    },

    props: {
        title: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
        error: {
            type: String,
            default: undefined
        }
    },

    data() {
        return {
            inputModel: false
        };
    },

    methods: {
        onInputChange() {
            this.$emit(VUE_CUSTOM_EVENTS.change, this.inputModel);
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonRadioInput {
    $component: &;

    position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;

    &-input {
        position: absolute;
        opacity: 0;
    }

    &-label {
        @include text;

        line-height: (20 / 24);
        padding: 1px 0 0 30px;
        transition: $d-hover color;
        color: $c-white;
        cursor: pointer;
        display: inline-block;
        width: 100%;

        #{$component}.isEmpty &,
        .isEmpty & {
            color: $c-yellow;
        }

        @include mobile {
            @include text-light-same-mobile;
        }

        &::before {
            content: '';
            position: absolute;
            border-radius: 100%;
            left: 0;
            width: 20px;
            height: 20px;
            top: 0;
            transition: $d-hover color;
            border: 1px solid;
            color: $c-white;

            #{$component}.isEmpty &,
            .isEmpty & {
                color: $c-yellow;
                border-color: $c-yellow;
            }
        }

        &::after {
            content: '';
            position: absolute;
            border-radius: 100%;
            background: $c-white;
            opacity: 0;
            transition: $d-hover opacity;
            width: 12px;
            height: 12px;
            left: 4px;
            top: 50%;
            transform: translate3d(0, -50%, 0);

            #{$component}.isEmpty &,
            .isEmpty & {
                color: $c-yellow;
                border-color: $c-yellow;
            }
        }
    }

    @include hover {
        &-input:hover + &-label,
        &-input:checked:hover + &-label {
            color: $c-blue;

            &:before {
                border: 2px solid;
                color: $c-white;
            }
        }
    }

    &-input:checked + &-label {
        &:after {
            opacity: 1;
        }

        &:before {
            border-width: 1px;
        }
    }
}
</style>
