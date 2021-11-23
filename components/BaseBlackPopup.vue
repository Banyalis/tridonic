<template>
    <section class="BaseBlackPopup" :class="{ isOpen: isOpenBlack }">
        <div class="BaseBlackPopup-wrapper">
            <perfect-scrollbar
                ref="scroll"
                class="BaseBlackPopup-inner"
                :options="{ suppressScrollX: true }"
            >
                <div class="BaseBlackPopup-close" @click="clickClosePopup">
                    <close-cross type="dotted-big" theme="white"></close-cross>
                </div>
                <div class="BaseBlackPopup-content">
                    <component
                        :is="typeBlack"
                        v-if="typeBlack"
                        :popup="popupBlack"
                    />
                </div>
            </perfect-scrollbar>
        </div>
    </section>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import CloseCross from '@/components/CloseCross';
import ContactsPopup from '@/components/ContactsPopup';
import CommonBlackPopup from '@/components/CommonBlackPopup';
import { mapFilters } from '@/utils/utils';
import {
    CONFIG_POPUPS_BLACK,
    KEY_CODES,
    VUE_CUSTOM_EVENTS
} from '@/utils/constants';

export default {
    name: 'BaseBlackPopup',
    components: {
        CloseCross,
        ContactsPopup,
        CommonBlackPopup
    },

    computed: {
        ...mapState('popup', [
            'isOpen',
            'isOpenBlack',
            'currentApiBlack',
            'typeBlack',
            'popupBlack',
            'rootUrl',
            'isBlackPopup'
        ]),
        ...mapState('filters', ['filterValues', 'apiEvent']),
        ...mapState('modal-popup', ['isOpened']),
        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        currentApiBlack(newValue) {
            if (newValue && this.isBlackPopup) {
                this.getData(newValue);
            }
        }
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.onKeyUp, this.onKeyUp);
        this.$root.$on(VUE_CUSTOM_EVENTS.scrollToTopPopup, this.onScrollTop);
        window.addEventListener('resize', this.onResize);
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.onKeyUp, this.onKeyUp);
        this.$root.$off(VUE_CUSTOM_EVENTS.scrollToTopPopup, this.onScrollTop);
        window.removeEventListener('resize', this.onResize);
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
                    this.resetOpeningBlackPopup();
                    this.updateBlackType(typePopup);
                    this.updateBlackPopup(response.data);
                    this.openBlackPopupAction();

                    this.hideHeader();
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
            if (
                !this.isOpenBlack ||
                this.isOpened ||
                (this.isOpenBlack && this.isOpen)
            )
                return;

            if (event.keyCode === KEY_CODES.escape) this.clickClosePopup();
        },

        getTypePopup(type) {
            return CONFIG_POPUPS_BLACK[type]?.componentName;
        },

        onResize() {
            this.updatePerfectScroll();
        },

        updatePerfectScroll() {
            const perfectScroll = this.$refs.scroll;
            if (!perfectScroll) {
                return;
            }

            perfectScroll.update();
        },

        onScrollTop() {
            const perfectScroll = this.$refs.scroll;
            if (!perfectScroll) {
                return;
            }

            perfectScroll.$el.scrollTop = 0;
        },

        ...mapMutations({
            updateBlackType: 'popup/updateBlackType',
            updateBlackPopup: 'popup/updateBlackPopup',
            setClosePopup: 'popup/setClosePopup',
            resetOpeningBlackPopup: 'popup/resetOpeningBlackPopup',
            hideHeader: 'header/hideHeader'
        }),

        ...mapActions({
            openBlackPopupAction: 'popup/openBlackPopup'
        })
    }
};
</script>

<style lang="scss" scoped>
.BaseBlackPopup {
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
    z-index: $z-popupBlack;
    will-change: opacity;
    transition: $d-hover opacity, 0s visibility $d-hover;
    max-height: 100vh;

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
        padding: 0;
        overflow: hidden;
        align-items: flex-end;

        @include mobile {
            padding: 0;
        }
    }

    &-inner {
        background: $c-white;
        position: relative;
        width: 100%;
        outline: none;
        overflow-scrolling: touch;
        display: flex;
        transition: $d-hover transform;

        transform: translateY(100%);
        min-height: 400px;
        max-height: calc(100vh - 100px);
        height: auto;
        margin: 100px 0 0;
        background: $c-black--bg;
        border-radius: 0;

        @include mobile {
            border-radius: 0;
            margin: 0;
            max-height: 100vh;
            min-height: 100vh;
        }
    }

    &-content {
        display: flex;
        position: relative;
        width: 100%;
        height: 100%;
        padding: 48px 0 80px;

        @include mobile {
            padding: 20px 0 60px;
        }
    }

    &-close {
        position: absolute;
        top: 30px;
        right: 30px;
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
        background: $c-black--bg;

        @include mobile {
            width: 40px;
            height: 40px;
            right: 10px;
            top: 10px;
            position: fixed;
        }
    }
}
</style>
