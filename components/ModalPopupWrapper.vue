<template>
    <div
        class="ModalPopupWrapper"
        :class="[
            isOpened ? 'isOpened' : undefined,
            isPurple ? 'isPurple' : undefined
        ]"
    >
        <div
            class="ModalPopupWrapper-background"
            @click="closeModalPopup"
        ></div>
        <div class="ModalPopupWrapper-wrapper">
            <div class="ModalPopupWrapper-close" @click="closeModalPopup">
                <CloseCross
                    type="dotted-big"
                    :theme="isPurple ? `blue` : `black`"
                ></CloseCross>
            </div>
            <div class="ModalPopupWrapper-content">
                <component
                    :is="modalComponent"
                    @close-modal-popup="closeModalPopup"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import ProductPopupPhasedOut from '@/components/ProductPopupPhasedOut';
import SolutionsProjectsMobileFilters from '@/components/SolutionsProjectsMobileFilters';
import NewsMobileFilters from '@/components/NewsMobileFilters';
import { KEY_CODES, VUE_CUSTOM_EVENTS } from '@/utils/constants';
import CloseCross from '@/components/CloseCross';

export default {
    name: 'ModalPopupWrapper',

    components: {
        CloseCross,
        ProductPopupPhasedOut,
        SolutionsProjectsMobileFilters,
        NewsMobileFilters
    },

    computed: {
        ...mapState('modal-popup', ['isOpened', 'modalComponent', 'isPurple'])
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.onKeyUp, this.onKeyUp);
    },

    methods: {
        onKeyUp(event) {
            if (!this.isOpened) return;

            if (event.keyCode === KEY_CODES.escape) this.closeModalPopup();
        },

        ...mapActions({
            closeModalPopup: 'modal-popup/closeModalPopup'
        })
    }
};
</script>

<style lang="scss" scoped>
.ModalPopupWrapper {
    $component: &;

    @include m-absolute100;

    position: fixed;
    pointer-events: none;
    display: block;
    opacity: 0;
    transition: $d-hover opacity, $d-hover transform;
    z-index: $z-modalPopup;
    overflow: hidden;

    &.isOpened {
        opacity: 1;
        pointer-events: all;
    }

    @include mobile {
        z-index: $z-mobileFilters;
    }

    &-close {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 60px;
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        z-index: $z-closePopup;
        cursor: pointer;

        @include mobile {
            width: 40px;
            height: 40px;
            right: 10px;
            top: 10px;
            margin-top: 80px;
        }
    }

    &-background {
        @include m-absolute100;

        position: fixed;
        backdrop-filter: blur(10px);
        background: $c-purple--dimmed;
    }

    &-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        max-width: 90%;
        max-height: 70%;
        min-height: 300px;
        transform: translate3d(-50%, -50%, 0) scale(0);
        transition: $d-hover transform;
        pointer-events: none;
        box-shadow: 0 20px 40px 0 rgba(0, 0, 0, 0.5);
        border-radius: 10px;
        overflow: auto;

        .isOpened & {
            transform: translate3d(-50%, -50%, 0);
            pointer-events: all;

            @include mobile {
                transform: translate3d(0, 0, 0);
            }
        }

        @include mobile {
            border-radius: 0;
            overflow-x: hidden;
            overflow-y: scroll;
            box-shadow: none;
            top: 0;
            left: 0;
            height: 100%;
            min-height: 100%;
            max-width: 100%;
            width: 100%;
            max-height: initial;
            transform: translate3d(0, 100%, 0);
        }
    }

    &-content {
        background: $c-white;
        width: 100%;
        padding: 40px;
        display: flex;
        position: relative;

        #{$component}.isPurple & {
            background: $c-purple;
        }

        @include mobile {
            padding: 0 0 40px;
            margin-top: 80px;
            min-height: calc(100% - 80px);
        }
    }
}
</style>
