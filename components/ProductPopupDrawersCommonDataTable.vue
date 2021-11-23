<template>
    <section class="ProductPopupDrawersCommonDataTable">
        <div class="ProductPopupDrawersCommonDataTable-table">
            <product-popup-common-data
                :properties="content.properties"
            ></product-popup-common-data>
            <!-- eslint-disable -->
            <div
                v-if="content.notes"
                class="ProductPopupDrawersCommonDataTable-tableNotes"
                v-html="content.notes"
            ></div>
            <!-- eslint-enable -->
        </div>
        <div class="ProductPopupDrawersCommonDataTable-info">
            <div class="ProductPopupDrawersCommonDataTable-infoMarks">
                <div
                    class="ProductPopupDrawersCommonDataTable-infoMarksTitle"
                    v-text="$translations.approvalMarks()"
                ></div>
                <div class="ProductPopupDrawersCommonDataTable-infoMarksItems">
                    <div
                        v-for="(mark, key) in content.marks"
                        :ref="[`mark-${key}`]"
                        :key="key"
                        class="ProductPopupDrawersCommonDataTable-infoMarksItem"
                        @mouseenter="onTooltipMouseEnter(key, mark.info)"
                        @mouseleave="onTooltipMouseLeave(key, mark.info)"
                        @click="onTooltipClick(key, mark.info)"
                    >
                        <img :src="mark.icon" />
                    </div>
                </div>
            </div>
            <div class="ProductPopupDrawersCommonDataTable-infoTypes">
                <div
                    class="ProductPopupDrawersCommonDataTable-infoTypesTitle"
                    v-text="$translations.luminaireTypes()"
                ></div>
                <div class="ProductPopupDrawersCommonDataTable-infoTypesItems">
                    <div
                        v-for="(type, key) in content.types"
                        :key="key"
                        class="ProductPopupDrawersCommonDataTable-infoTypesItem"
                    >
                        <div
                            class="ProductPopupDrawersCommonDataTable-infoTypesItemIcon"
                        >
                            <img :src="type.icon" />
                        </div>
                        <div
                            class="ProductPopupDrawersCommonDataTable-infoTypesItemName"
                            v-text="type.name"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ProductPopupCommonData from '@/components/ProductPopupCommonData';
import { mapMutations } from 'vuex';
import { isElementParentOf, isMobile } from '@/utils/utils';

export default {
    name: 'ProductPopupDrawersCommonDataTable',

    components: { ProductPopupCommonData },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    methods: {
        onTooltipMouseEnter(key, text) {
            if (isMobile()) {
                return;
            }
            const tooltip = this.$refs[`mark-${key}`][0];
            const leftPosition = tooltip.getBoundingClientRect().x;
            const topPosition = tooltip.getBoundingClientRect().y;
            this.showTooltip({
                tooltipText: text,
                tooltipPositionX: leftPosition,
                tooltipPositionY: topPosition,
                modify: 'markCommonData'
            });
        },

        onTooltipClick(key, text) {
            if (!isMobile()) {
                return;
            }

            window.addEventListener('touchstart', this.onTouchStart);
            const leftPosition = 20;
            const topPosition = this.$refs[
                `mark-${key}`
            ][0].getBoundingClientRect().y;
            this.showTooltip({
                tooltipText: text,
                tooltipPositionX: leftPosition,
                tooltipPositionY: topPosition,
                modify: 'markCommonData'
            });
        },

        onTouchStart(event) {
            const tooltipBubble = document.getElementById('tooltip-bubble');

            if (
                tooltipBubble.isEqualNode(event.target) ||
                isElementParentOf(tooltipBubble, event.target)
            ) {
                return;
            }

            this.hideTooltip();
            window.removeEventListener('touchstart', this.onTouchStart);
        },

        onTooltipMouseLeave() {
            if (isMobile()) {
                return;
            }

            this.hideTooltip();
        },

        ...mapMutations({
            showTooltip: 'tooltip/showTooltip',
            hideTooltip: 'tooltip/hideTooltip'
        })
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupDrawersCommonDataTable {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex: 0 0 auto;

    @include mobile {
        flex-direction: column;
        justify-content: flex-start;
        padding: 0 20px;
    }

    &-table {
        width: (760 * 100% / 1160);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 20px;
        flex: 0 0 auto;

        @include mobile {
            width: 100%;
            margin-top: 0;
        }

        &Notes {
            @include text-light-same-mobile;

            color: $c-gray;
            margin-top: 40px;
            display: flex;
            flex-direction: column;
            width: 80%;
            white-space: pre-wrap;

            @include mobile {
                width: 100%;
                margin-top: 25px;
            }
        }
    }

    &-info {
        width: (360 * 100% / 1160);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 0 0 auto;

        @include mobile {
            width: 100%;
        }

        &Marks {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: $c-gray--bg;
            padding: 16px 20px 60px;

            @include mobile {
                margin-top: 35px;
                padding: 18px 20px 25px;
            }

            &Title {
                @include text;

                color: $c-black;
                width: 100%;
            }

            &Items {
                width: (310 * 100% / 320);
                margin-top: 15px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-start;

                @include mobile {
                    width: (230 * 100% / 240);
                }
            }

            &Item {
                width: auto;
                max-width: 60px;
                display: flex;
                position: relative;
                margin: 20px (15 * 100% / 310) 0;

                @include mobile {
                    margin: 20px (15 * 100% / 230) 0;
                }
            }
        }

        &Types {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: $c-gray--bg;
            padding: 16px 20px 40px;
            margin-top: 40px;
            border-radius: 5px;

            @include mobile {
                margin-top: 20px;
                padding: 18px 20px 40px;
            }

            &Title {
                @include text;

                color: $c-black;
                width: 100%;
            }

            &Items {
                width: (310 * 100% / 320);
                margin-top: 34px;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
            }

            &Item {
                width: 100%;
                display: flex;
                position: relative;
                flex-direction: row;
                align-items: flex-end;
                justify-content: space-between;
                margin-top: 20px;

                &:first-child {
                    margin-top: 0;
                }

                &Icon {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    flex: 0 0 20px;
                    position: relative;

                    img {
                        @include m-absoluteObjectFit();
                    }
                }

                &Name {
                    @include text-small;

                    width: (280 * 100% / 320);
                    display: flex;
                    line-height: (20 / 18);
                    color: $c-black;
                }
            }
        }
    }
}
</style>
