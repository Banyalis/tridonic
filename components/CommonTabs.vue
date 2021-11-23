<template>
    <div class="CommonTabs">
        <div ref="tabImageWrapper" class="CommonTabs-image">
            <img
                ref="tabImage"
                :src="tabs[activeTab].image"
                :alt="tabs[activeTab].title"
                :class="{ showImage }"
            />
        </div>
        <div class="CommonTabs-info">
            <div ref="infoInner" class="CommonTabs-infoInner">
                <div ref="tabs" class="CommonTabs-infoTabs">
                    <div class="CommonTabs-infoTabsOutter">
                        <div class="CommonTabs-infoTabsInner">
                            <div
                                v-for="(tab, index) in tabs"
                                :key="index"
                                class="CommonTabs-infoTab"
                                :class="{ isActive: activeTab === index }"
                                @click="onChangeTab($event, index)"
                                v-text="tab.title"
                            ></div>
                        </div>
                    </div>
                </div>
                <!-- eslint-disable -->
                <div
                    class="CommonTabs-infoText"
                    v-html="tabs[activeTab].text"
                ></div>
                <!-- eslint-enable -->
            </div>
        </div>
    </div>
</template>

<script>
import { DURATION_ANIMATION_POPUPS } from '@/utils/constants';

export default {
    name: 'CommonTabs',

    props: {
        tabs: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            activeTab: 0,
            heightImage: 0,
            showImage: true
        };
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
    },

    destroyed() {
        window.addEventListener('resize', this.onResize);
    },

    methods: {
        matchHeightImage() {
            this.$refs.tabImageWrapper.style.height =
                this.$refs.tabImage.clientHeight + 'px';
        },

        onChangeTab(event, index) {
            this.showImage = false;
            this.activeTab = index;

            setTimeout(() => {
                this.matchHeightImage();
                this.$emit('resize');
                this.showImage = true;
            }, DURATION_ANIMATION_POPUPS);

            const element = event.target;
            const sizeInfo = this.$refs.infoInner.getBoundingClientRect();
            const stylesInfo = window.getComputedStyle(this.$refs.infoInner);
            const paddingInfo = Number(
                stylesInfo.getPropertyValue('padding-left').slice(0, -2)
            );
            const scrollLeftTabs = this.$refs.tabs.scrollLeft;

            this.$refs.tabs.scrollLeft =
                element.getBoundingClientRect().left -
                sizeInfo.left -
                paddingInfo +
                scrollLeftTabs -
                sizeInfo.width / 2 +
                element.getBoundingClientRect().width / 2 +
                10;
        },

        onResize() {
            this.matchHeightImage();
        }
    }
};
</script>

<style lang="scss">
.CommonTabs {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-anchor: none;

    &-image {
        width: 100%;
        position: relative;
        will-change: height;
        overflow: hidden;
        transition: $d-hover height;
        background: $c-gray;
        display: flex;
        flex-direction: row;
        align-items: center;

        img {
            width: 100%;
            position: relative;
            opacity: 0;

            &.showImage {
                opacity: 1;
                transition: $d-hover / 2 opacity;
            }
        }
    }

    &-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: $c-gray--bg;

        &Inner {
            width: 100%;
            max-width: 840px;
            display: flex;
            flex-direction: column;
            padding: 36px 40px 55px;
            align-items: center;
            position: relative;

            @include mobile {
                padding: 25px 20px 35px;
            }

            &:after,
            &:before {
                content: '';
                width: 60px;
                pointer-events: none;
                height: 45px;
                position: absolute;
                top: 36px;
                z-index: 2;

                @include mobile {
                    display: none;
                }
            }

            &:after {
                right: 0;
                background: linear-gradient(
                    to left,
                    $c-gray--bg 40%,
                    rgba($c-gray--bg, 0) 100%
                );
            }

            &:before {
                left: 0;
                background: linear-gradient(
                    to right,
                    $c-gray--bg 40%,
                    rgba($c-gray--bg, 0) 100%
                );
            }
        }

        &Tabs {
            width: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            overflow-x: auto;
            overflow-y: hidden;
            overflow-scrolling: touch;
            scroll-behavior: smooth;
            max-width: calc(100% + 80px);
            padding: 0 40px;

            @include mobile {
                padding: 0 20px;
                max-width: calc(100% + 40px);
            }

            /* Works on Firefox */
            & {
                scrollbar-width: none;
                scrollbar-color: transparent transparent;
            }

            /* Works on Chrome, Edge, and Safari */
            &::-webkit-scrollbar {
                width: 0;
                display: none;
            }

            &::-webkit-scrollbar-track {
                background: transparent;
                display: none;
            }

            &::-webkit-scrollbar-thumb {
                background-color: transparent;
                width: 0;
                display: none;
            }

            &Outter {
                width: auto;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                flex-wrap: nowrap;
                justify-content: center;
                padding-right: 20px;
            }

            &Inner {
                width: auto;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                flex-wrap: nowrap;
                justify-content: center;
                border-bottom: 1px solid $c-gray--shadow;
            }
        }

        &Tab {
            @include text;

            display: flex;
            padding: 0 30px 14px;
            color: $c-gray--text;
            position: relative;
            cursor: pointer;
            white-space: pre;

            transition: $d-hover color;

            @include mobile {
                @include text-light-same-mobile-medium;

                white-space: nowrap;
                padding: 0 20px 14px;
            }

            &:after {
                content: '';
                width: 100%;
                height: 2px;
                display: block;
                bottom: -2px;
                left: 0;
                position: absolute;
                background: $c-purple;
                opacity: 0;
            }

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }

            &.isActive {
                color: $c-black;

                &:after {
                    opacity: 1;
                }
            }
        }

        &Text {
            @include text-light-same-mobile;

            width: 100%;
            display: flex;
            margin-top: 24px;
            color: $c-black;
            flex-direction: column;

            p {
                margin: 0 0 30px;

                @include mobile {
                    margin-bottom: 20px;
                }

                &:last-child {
                    margin-bottom: 0 !important;
                }

                a {
                    color: $c-purple;
                    text-decoration: underline;

                    @include hover {
                        &:hover {
                            color: $c-blue;
                            text-decoration: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
