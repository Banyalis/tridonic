<template>
    <div class="MobilePanel" :class="{ isActive: isOpened }">
        <div class="MobilePanel-close" @click="closePanel">
            <svg-icon name="close-cross"></svg-icon>
        </div>
        <div class="MobilePanel-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { onMediaSizeChange } from '@/utils/utils';

export default {
    name: 'MobilePanel',
    props: {
        isOpened: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    computed: {
        ...mapState(['currentMediaSize'])
    },
    watch: {
        currentMediaSize: {
            handler(newVal, oldVal) {
                onMediaSizeChange(newVal, oldVal, undefined, this.closePanel);
            }
        }
    },
    methods: {
        closePanel() {
            this.$emit('cross-click');
        }
    }
};
</script>

<style lang="scss" scoped>
.MobilePanel {
    position: fixed;
    width: 100%;
    height: 100%;
    background: $c-purple;
    z-index: $z-eshopPanel;
    top: 0;
    left: 0;
    opacity: 0;
    pointer-events: none;
    transition: $d-hover opacity, 0s visibility $d-hover;
    visibility: hidden;
    display: none;

    @include mobile {
        display: block;
    }

    &.isActive {
        opacity: 1;
        pointer-events: all;
        visibility: visible;
        transition: $d-hover opacity;
    }

    &-close {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 22px;
        top: 22px;

        svg {
            width: 100%;
            height: 100%;
            fill: $c-blue;
        }
    }

    &-content {
        padding: 56px 20px 0;
        height: 100%;
    }
}
</style>
