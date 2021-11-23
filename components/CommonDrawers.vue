<template>
    <section
        class="CommonDrawers"
        :class="[modifier ? `CommonDrawers--${modifier}` : '']"
    >
        <div class="CommonDrawers-items">
            <div
                v-for="(item, key) in drawers[modifier]"
                :ref="key"
                :key="key"
                class="CommonDrawers-item"
                :class="{
                    isExpanded:
                        !!expandedDrawersList.length &&
                        expandedDrawersList[key].isExpanded
                }"
            >
                <div
                    class="CommonDrawers-itemTitleWrapper"
                    @click="toggleItem(key, expandedDrawersList[key])"
                >
                    <div v-if="item.image" class="CommonDrawers-itemImage">
                        <img :src="item.image" alt="" />
                    </div>
                    <div class="CommonDrawers-itemTitleInner">
                        <div
                            class="CommonDrawers-itemTitle"
                            v-text="item.title"
                        ></div>
                        <div
                            v-if="item.position"
                            class="CommonDrawers-itemPosition"
                            v-text="item.position"
                        ></div>
                    </div>
                    <div class="CommonDrawers-itemIcon">
                        <div class="CommonDrawers-itemIconInner">
                            <div
                                v-for="i in 2"
                                :key="i"
                                class="CommonDrawers-itemIconLine"
                            >
                                <div
                                    v-for="id in 7"
                                    :key="id"
                                    class="CommonDrawers-itemIconLineDot"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div :ref="`${key}-content`" class="CommonDrawers-itemContent">
                    <div
                        :ref="`${key}-contentInner`"
                        class="CommonDrawers-itemContentInner"
                    >
                        <component
                            :is="contentComponents[item.type]"
                            v-if="item.content"
                            :content="item.content"
                            :type="item.type"
                            @resize="onResize"
                        ></component>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ProductPopupDrawersOverview from '@/components/ProductPopupDrawersOverview';
import ProductPopupDrawersCommonTables from '@/components/ProductPopupDrawersCommonTables';
import ProductPopupDrawersCommonDataTable from '@/components/ProductPopupDrawersCommonDataTable';
import ProductPopupDrawersDownloads from '@/components/ProductPopupDrawersDownloads';
import ProductPopupDrawersProducts from '@/components/ProductPopupDrawersProducts';
import ProductPopupDrawersFaqs from '@/components/ProductPopupDrawersFaqs';
import CompanyEmployee from '@/components/CompanyEmployee';
import CompanyTeam from '@/components/CompanyTeam';

import { mapState } from 'vuex';
import {
    VUE_CUSTOM_EVENTS,
    DURATION_ANIMATION_POPUPS
} from '@/utils/constants';

export default {
    name: 'CommonDrawers',

    components: {
        ProductPopupDrawersOverview,
        ProductPopupDrawersCommonTables,
        ProductPopupDrawersCommonDataTable,
        ProductPopupDrawersDownloads,
        ProductPopupDrawersProducts,
        ProductPopupDrawersFaqs,
        CompanyEmployee,
        CompanyTeam
    },

    props: {
        contentComponents: {
            type: Object,
            required: true
        },
        modifier: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            expandedDrawersList: []
        };
    },

    computed: {
        ...mapState('popup', ['popup']),
        ...mapState('drawers', ['drawers'])
    },

    watch: {
        popup() {
            this.drawers &&
                setTimeout(() => {
                    this.expandedDrawersList = [];
                    this.mapInternalDrawerList();
                    this.onResize();
                }, DURATION_ANIMATION_POPUPS / 2);
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();

        this.$root.$on(VUE_CUSTOM_EVENTS.getNewDrawers, this.updateDrawerList);

        this.mapInternalDrawerList();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);

        this.$off(VUE_CUSTOM_EVENTS.getNewDrawers, this.updateDrawerList);
    },

    methods: {
        mapInternalDrawerList() {
            this.expandedDrawersList = this.drawers[this.modifier]?.map(() => {
                return {
                    isExpanded: false
                };
            });
        },

        updateDrawerList() {
            this.mapInternalDrawerList();

            const itemContent = document.querySelector(
                '.CommonDrawers-itemContent'
            );

            if (itemContent) itemContent.style.maxHeight = null;
        },

        toggleItem(refId, drawer) {
            const drawerContent = this.$refs[`${refId}-content`][0];
            const stylesDrawerContentInner = window.getComputedStyle(
                this.$refs[`${refId}-contentInner`][0]
            );

            if (drawerContent.style?.maxHeight) {
                drawerContent.style.maxHeight = null;
                drawer.isExpanded = false;

                return;
            }

            this.setMaxHeightItem(drawerContent, stylesDrawerContentInner);
            drawer.isExpanded = true;
        },

        setMaxHeightItem(drawerContent, stylesDrawerContentInner) {
            const paddingsDrawerContentInner =
                Number(
                    stylesDrawerContentInner
                        .getPropertyValue('padding-top')
                        .slice(0, -2)
                ) +
                Number(
                    stylesDrawerContentInner
                        .getPropertyValue('padding-bottom')
                        .slice(0, -2)
                );

            drawerContent.style.maxHeight = `${
                drawerContent.scrollHeight + paddingsDrawerContentInner
            }px`;
        },

        onResize() {
            this.expandedDrawersList.forEach((item, id) => {
                const drawerContent = this.$refs[`${id}-content`][0];

                if (item.isExpanded) {
                    const stylesDrawerContentInner = window.getComputedStyle(
                        this.$refs[`${id}-contentInner`][0]
                    );

                    this.setMaxHeightItem(
                        drawerContent,
                        stylesDrawerContentInner
                    );
                } else if (drawerContent?.style?.maxHeight) {
                    drawerContent.style.maxHeight = null;
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonDrawers {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &--employee,
    &--team {
        #{$component}-item {
            align-items: center;

            &:first-child {
                border-top: none;

                #{$component}-itemTitleWrapper {
                    padding: 0 0 20px;
                }
            }

            &:last-child {
                border-bottom: none;

                #{$component}-itemTitleWrapper {
                    padding: 20px 0 0;
                }
            }

            &.isExpanded {
                border-top-color: $c-gray-products--border;

                #{$component}-itemTitleWrapper {
                    border-top-color: transparent;
                }
            }

            &Image {
                width: 40px;
                height: 40px;
                margin-right: 20px;
                border-radius: 100%;
                position: relative;
                overflow: hidden;

                img {
                    @include m-absoluteObjectFit();
                }
            }

            &Title {
                padding: 0;

                @include mobile {
                    margin-bottom: 8px;
                    line-height: (20 / 18);
                }

                &Wrapper {
                    padding: 20px 0;
                }

                &Inner {
                    display: grid;
                    grid-template-columns: 1fr 0.5fr;
                    align-items: center;
                    flex: 1;

                    @include mobile {
                        grid-template-columns: repeat(1, 1fr);
                    }
                }
            }

            &Position {
                @include text-light;

                margin-right: 45px;
                color: #909096;

                @include mobile {
                    margin-right: 0;
                }
            }

            &Icon {
                position: relative;
                top: inherit;
                right: inherit;
                transform: none;
            }

            &Content {
                margin-left: 0;

                &Inner {
                    padding: 20px 0 40px;
                }
            }
        }
    }

    &-items {
        display: flex;
        width: 100%;
        flex-direction: column;
    }

    &-item {
        display: flex;
        width: 100%;
        flex-direction: column;
        position: relative;
        border-top: 1px solid $c-gray-products--border;
        transition: $d-hover border-color;

        &:last-child {
            border-bottom: 1px solid $c-gray-products--border;

            & #{$component}-itemContentInner {
                padding-bottom: 0;
            }

            @include mobile {
                border-bottom: none;
            }
        }

        &.isExpanded {
            border-top-color: $c-black;
            border-bottom-color: transparent;

            @include mobile {
                border-top-color: $c-gray-products--border;
            }
        }

        &TitleWrapper {
            display: flex;
            position: relative;
            width: 100%;
            flex-direction: row;
            align-items: center;
            cursor: pointer;
            border-top: 1px solid transparent;
            transition: $d-hover border-color;

            .isExpanded & {
                border-top-color: $c-black;

                @include mobile {
                    border-top-color: $c-gray-products--border;
                }
            }

            @include hover {
                &:hover {
                    & #{$component}-itemTitle {
                        color: $c-blue;
                    }

                    & #{$component}-itemIconLineDot {
                        background: $c-blue;

                        &:first-child,
                        &:last-child {
                            transform: translate3d(0, 0, 0) !important;
                            opacity: 1 !important;
                            transition: $d-hover background, $d-hover transform,
                                $d-hover opacity;
                        }
                    }
                }
            }

            @include mobile {
                border-top: none;
            }
        }

        &Title {
            @include title-small;

            color: $c-black;
            padding: 7px 0 13px;
            transition: $d-hover color;

            @include mobile {
                padding: 12px 20px 20px;
            }
        }

        &Icon {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            width: 40px;
            height: 40px;

            @include mobile {
                right: 20px;
                width: 26px;
                height: 26px;
            }

            &Inner {
                position: relative;
                display: flex;
                width: 100%;
                height: 100%;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }

            &Line {
                position: absolute;
                display: flex;
                width: 100%;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                transition: $d-hover transform;

                &:last-child {
                    transform: translate3d(-50%, -50%, 0) rotate(90deg);

                    & #{$component}-itemIconLineDot:nth-of-type(4) {
                        opacity: 0 !important;
                    }

                    .isExpanded & {
                        & #{$component}-itemIconLineDot {
                            opacity: 0 !important;
                            transition: $d-hover background, $d-hover transform,
                                $d-hover opacity !important;

                            &:nth-child(2),
                            &:nth-child(6) {
                                transition-delay: $d-hover / 3 !important;
                            }

                            &:nth-child(3),
                            &:nth-child(5) {
                                transition-delay: $d-hover / 3 * 2 !important;
                            }
                        }
                    }
                }

                &Dot {
                    display: flex;
                    width: 4px;
                    height: 4px;
                    border-radius: 100%;
                    background: $c-black;
                    transition: $d-hover background, $d-hover transform;

                    &:first-child {
                        transform: translate3d(150%, 0, 0);
                        opacity: 0;
                        transition: $d-hover background, $d-hover transform,
                            $d-hover opacity $d-hover;

                        @include mobile {
                            transform: translate3d(200%, 0, 0);
                        }
                    }

                    &:last-child {
                        transform: translate3d(-150%, 0, 0);
                        opacity: 0;
                        transition: $d-hover background, $d-hover transform,
                            $d-hover opacity $d-hover;

                        @include mobile {
                            transform: translate3d(-200%, 0, 0);
                        }
                    }

                    &:nth-child(2),
                    &:nth-child(6) {
                        transition: $d-hover background, $d-hover transform,
                            $d-hover opacity $d-hover / 3;
                    }

                    &:nth-child(3),
                    &:nth-child(5) {
                        transition: $d-hover background, $d-hover transform,
                            $d-hover opacity $d-hover / 3 * 2;
                    }

                    @include mobile {
                        width: 2px;
                        height: 2px;
                    }
                }
            }
        }

        &Content {
            width: calc(100% + 40px);
            margin-left: -20px;
            padding: 0 20px;
            display: flex;
            overflow: hidden;
            max-height: 0;
            transition: $d-hover max-height;

            @include mobile {
                width: 100%;
                margin: 0;
                padding: 0;
            }

            &Inner {
                width: 100%;
                display: flex;
                padding: 25px 0 80px;

                @include mobile {
                    padding: 0 0 40px;
                }
            }
        }
    }
}
</style>
