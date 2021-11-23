<template>
    <section id="base-popup" class="BasePopup" :class="{ isOpen }">
        <div class="BasePopup-wrapper">
            <div
                class="BasePopup-close"
                :style="{
                    transform: `translate3d(0, ${currentHeaderTranslate}px, 0)`
                }"
                @click="clickClosePopup"
            >
                <close-cross type="dotted-big" theme="black"></close-cross>
            </div>
            <div class="BasePopup-inner">
                <div class="BasePopup-content">
                    <component :is="type" v-if="type" :popup="popup" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import CloseCross from '@/components/CloseCross';
import ProductPopup from '@/components/ProductPopup';
import CommonDetailPopup from '@/components/CommonDetailPopup';
import SolutionsProjectsPopup from '@/components/SolutionsProjectsPopup';
import SolutionsProductsPopup from '@/components/SolutionsProductsPopup';
import ContactsPopup from '@/components/ContactsPopup';
import CommonBlackPopup from '@/components/CommonBlackPopup';
import { mapFilters } from '@/utils/utils';
import { CONFIG_POPUPS, KEY_CODES, VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'BasePopup',
    components: {
        CloseCross,
        ProductPopup,
        CommonDetailPopup,
        SolutionsProjectsPopup,
        SolutionsProductsPopup,
        ContactsPopup,
        CommonBlackPopup
    },

    computed: {
        ...mapState('popup', [
            'isOpen',
            'currentApi',
            'type',
            'popup',
            'rootUrl',
            'isBlackPopup'
        ]),
        ...mapState(['currentHeaderTranslate']),
        ...mapState('filters', ['filterValues', 'apiEvent']),
        ...mapState('modal-popup', ['isOpened']),
        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        currentApi(newValue) {
            if (newValue && !this.isBlackPopup) {
                this.getData(newValue);
            }
        }
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.onKeyUp, this.onKeyUp);
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.onKeyUp, this.onKeyUp);
    },

    methods: {
        getData(currentApi) {
            const filters =
                !!this.filterValues && !!this.apiEvent
                    ? mapFilters(this.filterValues, this.apiEvent)
                    : undefined;

            this.$axios
                .get(
                    `${this.$config.baseURL}/${this.language}/${this.region}${currentApi}`,
                    {
                        params: {
                            currentFilterValues: filters
                        }
                    }
                )
                .then((response) => {
                    const typePopup = this.getTypePopup(response.data?.type);
                    this.resetOpeningPopup();
                    this.updateType(typePopup);
                    this.updatePopup(response.data);
                    this.openPopupAction();
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.errored = true;
                    error({ statusCode: 404, message: 'Post not found' });
                });
        },

        clickClosePopup() {
            if (window.history.length <= 2 && !!this.rootUrl) {
                window.history.replaceState({}, null, this.rootUrl);
                this.$router.push({ path: this.rootUrl });
            } else {
                window.history.go(-1);
            }
        },

        onKeyUp(event) {
            if (!this.isOpen || this.isOpened || this.isOpenBlack) return;

            if (event.keyCode === KEY_CODES.escape) this.clickClosePopup();
        },

        getTypePopup(type) {
            return CONFIG_POPUPS[type]?.componentName;
        },

        ...mapMutations({
            updateType: 'popup/updateType',
            updatePopup: 'popup/updatePopup',
            resetOpeningPopup: 'popup/resetOpeningPopup'
        }),

        ...mapActions({
            openPopupAction: 'popup/openPopup'
        })
    }
};
</script>

<style lang="scss" scoped>
.BasePopup {
    $component: &;

    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    overflow-scrolling: touch;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    z-index: $z-popup;
    will-change: opacity;
    transition: $d-hover opacity, 0s visibility $d-hover;

    &.isUtils {
        max-height: 100vh;
    }

    &.isOpen {
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transition: $d-hover opacity;

        #{$component}-inner {
            transform: none;
        }

        #{$component}-close {
            opacity: 1;
            transition: $d-hover / 2 opacity $d-hover;
        }
    }

    .isFirefox & {
        &.isBlurred {
            filter: blur(5px);
        }
    }

    &-wrapper {
        width: 100%;
        position: relative;
        overflow-scrolling: touch;
        min-height: 100vh;
        display: flex;
        padding: 0 20px;

        @include mobile {
            padding: 0;
        }

        .isUtils & {
            padding: 0;
            overflow: hidden;
            align-items: flex-end;
        }
    }

    &-inner {
        background: $c-white;
        border-radius: 10px;
        position: relative;
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 120px);
        outline: none;
        overflow-scrolling: touch;
        margin: 100px 0 20px;
        display: flex;
        transform: translateY(50px);
        transition: $d-hover transform;

        @include mobile {
            margin: 60px 0 0;
            border-radius: 0;
            min-height: calc(100vh - 60px);
        }

        .isUtils & {
            transform: translateY(100%);
            min-height: 400px;
            max-height: calc(100vh - 100px);
            height: auto;
            margin: 100px 0 0;
            background: $c-black--bg;
            border-radius: 0;

            @include mobile {
                margin: 0;
                max-height: 100vh;
                min-height: 100vh;
            }
        }
    }

    &-content {
        display: flex;
        position: relative;
        width: 100%;

        .isUtils & {
            height: 100%;
            padding: 48px 0 80px;

            @include mobile {
                padding: 20px 0 60px;
            }
        }
    }

    &-close {
        position: fixed;
        right: 30px;
        top: (80px + 30px);
        border-radius: 100%;
        background: $c-white;
        width: 60px;
        height: 60px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        z-index: $z-closePopup;
        will-change: transform, opacity;
        cursor: pointer;
        opacity: 0;
        transform: translate3d(0, 0, 0);
        transition: $d-hover / 2 opacity;

        @include mobile {
            width: 40px;
            height: 40px;
            right: 10px;
            top: (60px + 10px);
        }

        .isUtils & {
            background: $c-black--bg;
            position: absolute;
            top: 30px;

            @include mobile {
                top: 10px;
                position: fixed;
            }
        }
    }
}
</style>
