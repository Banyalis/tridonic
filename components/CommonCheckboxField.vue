<template>
    <div class="CommonCheckboxField">
        <input
            :id="name"
            v-model="inputModel"
            :name="name"
            type="checkbox"
            class="CommonCheckboxField-input"
            @change="onInputChange"
        />
        <label
            class="CommonCheckboxField-label"
            :for="name"
            v-text="placeholder"
        ></label>
    </div>
</template>

<script>
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'CommonCheckboxField',

    model: {
        prop: 'isChanged',
        event: VUE_CUSTOM_EVENTS.isFilterChanged
    },

    props: {
        placeholder: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            inputModel: false
        };
    },

    methods: {
        onInputChange() {
            this.$emit(VUE_CUSTOM_EVENTS.isFilterChanged, this.inputModel);
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonCheckboxField {
    position: relative;
    display: flex;
    align-items: flex-start;

    @include hover {
        &:hover {
            .CommonCheckboxField-tooltip {
                opacity: 1;
            }
        }
    }

    &-input {
        position: absolute;
        opacity: 0;
    }

    &-label {
        @include text-light-same-mobile-medium;

        padding: 1px 30px 0;
        transition: $d-hover color;
        color: $c-white;
        cursor: pointer;
        display: inline-block;
        width: 100%;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            width: 20px;
            height: 20px;
            top: 0;
            transition: $d-hover color;
            border-radius: 2px;
            border: 1px solid;
            color: $c-filterSliderLine;
        }

        &::after {
            content: '';
            position: absolute;
            background: $c-white;
            opacity: 0;
            border-radius: 1px;
            transition: $d-hover opacity;
            width: 12px;
            height: 12px;
            left: 4px;
            top: 50%;
            transform: translate3d(0, -50%, 0);
        }
    }

    @include hover {
        &-input:hover + &-label,
        &-input:checked:hover + &-label {
            color: $c-white;

            &:before {
                border: 2px solid;
                color: $c-white;
            }
        }
    }

    &-input:checked + &-label {
        color: $c-white;

        &:after {
            opacity: 1;
        }

        &:before {
            border-width: 1px;
        }
    }

    &-count {
        @include text-light-same-mobile;

        position: absolute;
        right: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        color: $c-gray;
    }

    &-tooltip {
        position: absolute;
        right: 0;
        opacity: 0;
        transition: $d-hover opacity;

        &.withProductCount {
            right: 30px;
        }

        @include mobile {
            opacity: 1;
        }
    }
}
</style>
