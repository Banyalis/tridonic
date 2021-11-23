<template>
    <div
        id="tooltip-bubble"
        class="TooltipBubble"
        :class="[
            isShown ? 'isShown' : '',
            modify ? `TooltipBubble--${modify}` : ''
        ]"
        :style="{ left: getXPosition, top: getYPosition }"
    >
        <div class="TooltipBubble-text" v-text="text"></div>
    </div>
</template>

<script>
export default {
    name: 'TooltipBubble',
    props: {
        text: {
            type: String,
            required: true
        },
        positionX: {
            type: Number,
            required: true
        },
        positionY: {
            type: Number,
            required: true
        },
        modify: {
            type: String,
            required: true
        },
        isShown: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        getYPosition() {
            return `${this.positionY}px`;
        },
        getXPosition() {
            return `${this.positionX}px`;
        }
    }
};
</script>

<style lang="scss" scoped>
.TooltipBubble {
    opacity: 0;
    pointer-events: none;
    transition: $d-hover opacity;
    position: fixed;
    transform: translate3d(30px, -50%, 0);
    z-index: $z-tooltip;

    @include mobile {
        transform: translate3d(0, calc(-100% - 10px), 0);
        width: calc(100% - 40px);

        &.isShown {
            pointer-events: all;
        }
    }

    &--markCommonData {
        transform: translate3d(-43%, calc(-100% - 15px), 0);

        @include mobile {
            transform: translate3d(0, calc(-100% - 10px), 0);
            width: calc(100% - 40px);
        }
    }

    &.isShown {
        opacity: 1;
    }

    &-text {
        border-radius: 5px;
        padding: 20px;
        width: 280px;
        z-index: 4;
        background: $c-purple;
        color: $c-white;
        @include text-light-same-mobile;
        transition: $d-hover opacity;
        pointer-events: none;

        @include mobile {
            width: auto;
        }
    }
}
</style>
