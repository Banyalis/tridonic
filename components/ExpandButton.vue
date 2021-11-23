<template>
    <div class="ExpandButton" @click="onClick">
        <div class="ExpandButton-icon" :class="{ isExpanded }">
            <div class="ExpandButton-iconItem ExpandButton-iconItem--1"></div>
            <div class="ExpandButton-iconItem ExpandButton-iconItem--2"></div>
        </div>
        <div class="ExpandButton-text" v-text="text"></div>
    </div>
</template>

<script>
export default {
    name: 'ExpandButton',
    props: {
        text: {
            type: String,
            required: true
        },
        isExpanded: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClick() {
            this.$emit('click');
        }
    }
};
</script>

<style lang="scss" scoped>
.ExpandButton {
    display: flex;
    align-items: center;
    cursor: pointer;

    @include hover {
        &:hover {
            .ExpandButton-text {
                color: $c-blue;
            }
        }
    }

    &-icon {
        width: 10px;
        height: 10px;
        position: relative;

        &Item {
            width: 10px;
            height: 2px;
            background: $c-blue;
            position: absolute;
            transform-origin: 50% 50%;
            transition: $d-hover transform;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%, -50%, 0);

            &--1 {
                transform: translate3d(-50%, -50%, 0) rotate(90deg);
            }
        }

        &.isExpanded {
            .ExpandButton-iconItem--1 {
                transform: translate3d(-50%, -50%, 0);
            }
        }
    }

    &-text {
        @include text-light-same-mobile;
        color: $c-white;
        font-weight: $fw-medium;
        margin-left: 5px;
        transition: $d-hover color;
    }
}
</style>
