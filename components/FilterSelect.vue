<template>
    <div ref="select" class="Select">
        <div v-if="value" class="Select-text" @click="toggleSelect">
            {{ getValueName }}
        </div>
        <div class="Select-options" :class="{ isOpen: isOpen }">
            <div
                v-for="(option, key) in options"
                :key="key"
                class="Select-option"
                :class="{ isActive: option.value === value }"
                @click="changeSelect(option)"
                v-text="option.name"
            ></div>
        </div>
        <select
            v-model="value"
            class="Select-optionsMobile"
            @change="changeSelectMobile()"
        >
            <option
                v-for="(option, key) in options"
                :key="key"
                class="Select-optionMobile"
                :value="option.value"
                v-text="option.name"
            ></option>
        </select>
    </div>
</template>

<script>
import { isElementParentOf } from '~/utils/utils';

export default {
    props: {
        options: {
            type: Array,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            isOpen: false
        };
    },

    computed: {
        getValueName() {
            return this.options.find((option) => option.value === this.value)
                ?.name;
        }
    },
    mounted() {
        window.addEventListener('click', this.onOutsideClick);
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

            this.isOpen = false;
        },
        toggleSelect() {
            this.isOpen = !this.isOpen;
        },

        changeSelectMobile() {
            this.$emit('input', this.value);
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
.Select {
    display: flex;
    position: relative;

    & + & {
        margin-left: 48px;
    }

    &-text {
        @include text-light-medium;

        display: flex;
        color: $c-purple;
        transition: $d-hover color;
        z-index: $z-filterSelectText;
        cursor: pointer;

        @include mobile {
            font-size: 14px;
        }

        @include hover {
            &:hover {
                color: $c-blue;
            }
        }
    }

    &-options {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: nowrap;
        background: $c-purple;
        padding: 20px;
        border-radius: 5px;
        z-index: $z-selectFilter;
        opacity: 0;
        pointer-events: none;
        box-shadow: 0 8px 20px 0 rgba(#000, 0.25);

        @include mobile {
            display: none;
        }

        &.isOpen {
            opacity: 1;
            pointer-events: all;
            transition: $d-hover opacity;
        }
    }

    &-option {
        @include text-light-medium;

        display: flex;
        flex-direction: row;
        color: $c-white;
        margin-top: 14px;
        transition: $d-hover color;
        flex-wrap: nowrap;
        white-space: nowrap;
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
}
</style>
