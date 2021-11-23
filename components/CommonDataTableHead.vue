<template>
    <div class="CommonDataTableHead" :class="[`CommonDataTableHead--${type}`]">
        <div
            v-if="hasCategories"
            class="CommonDataTableHead-row CommonDataTableHead-row--categories"
        >
            <div class="CommonDataTableHead-itemName"></div>
            <div class="CommonDataTableHead-itemAttrs">
                <div
                    v-for="(item, index) in internalCategories"
                    :key="index"
                    class="CommonDataTableHead-item"
                >
                    <!-- eslint-disable -->
                    <div
                        v-if="item.currentCategory"
                        class="CommonDataTableHead-itemText"
                        v-html="item.currentCategory"
                    ></div>
                    <!-- eslint-enable -->
                </div>
            </div>
        </div>
        <div class="CommonDataTableHead-row CommonDataTableHead-row--general">
            <div class="CommonDataTableHead-itemName">
                <!-- eslint-disable -->
                <div
                    class="CommonDataTableHead-itemText"
                    v-html="head[0].text"
                ></div>
                <!-- eslint-enable -->
            </div>
            <div class="CommonDataTableHead-itemAttrs">
                <div
                    v-for="(item, index) in internalHead"
                    :key="index"
                    class="CommonDataTableHead-item"
                    :class="{ hasCategory: item.category }"
                >
                    <!-- eslint-disable -->
                    <div
                        class="CommonDataTableHead-itemText"
                        v-html="item.text"
                    ></div>
                    <!-- eslint-enable -->
                </div>
            </div>
        </div>
        <div class="CommonDataTableHead-row">
            <div class="CommonDataTableHead-itemName">
                <div
                    v-if="hasSortable"
                    class="CommonDataTableHead-itemSort"
                    :class="{ isActive: activeIndex === 0 }"
                >
                    <div class="CommonDataTableHead-itemSortIcon">
                        <svg-icon
                            v-if="head[0].isSortable"
                            name="arrows-sorting"
                            @click="toggleSorting(0)"
                        ></svg-icon>
                    </div>
                </div>
            </div>
            <div class="CommonDataTableHead-itemAttrs">
                <div
                    v-for="(item, index) in internalHead"
                    :key="index"
                    class="CommonDataTableHead-item"
                >
                    <div
                        v-if="hasSortable"
                        class="CommonDataTableHead-itemSort"
                        :class="{ isActive: activeIndex === index + 1 }"
                    >
                        <div class="CommonDataTableHead-itemSortIcon">
                            <svg-icon
                                v-if="item.isSortable"
                                name="arrows-sorting"
                                @click="toggleSorting(index + 1)"
                            ></svg-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'CommonDataTableHead',

    props: {
        head: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            activeIndex: 0,
            internalHead: [],
            internalCategories: []
        };
    },

    computed: {
        hasSortable() {
            return !!this.head.filter((item) => item.isSortable).length;
        },

        hasCategories() {
            return !!this.head.filter((item) => item.category).length;
        }
    },

    watch: {
        head() {
            this.mapInternalHead();
            this.mapInternalCategories();
        }
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.clearTablesSorts, this.resetSorted);

        this.mapInternalHead();
        this.mapInternalCategories();
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.clearTablesSorts, this.resetSorted);
    },

    methods: {
        mapInternalHead() {
            const list = this.head.filter((item, id) => id !== 0);

            if (this.type === 'information') {
                list.push({ text: '' }); // set column for linkStart
                list.push({ text: '' }); // set column for tag
            }

            this.internalHead = list;
        },

        mapInternalCategories() {
            if (!this.hasCategories) return;

            let prevCategory = '';

            this.internalCategories = this.internalHead.map((item) => {
                if (item.category) {
                    if (item.category !== prevCategory) {
                        prevCategory = item.category;
                        item.currentCategory = prevCategory;
                    } else {
                        item.currentCategory = '';
                    }
                }

                return item;
            });
        },

        toggleSorting(index) {
            this.activeIndex = index;

            this.$emit(VUE_CUSTOM_EVENTS.onSortedTable, index);
        },

        resetSorted() {
            this.activeIndex = 0;
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonDataTableHead {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &-row {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: 1px solid #e4e4e4;

        &:first-child:not(#{$component}-row--general) {
            border-bottom: none;
        }

        &:last-child {
            @include mobile {
                display: none;
            }
        }
    }

    &-item {
        display: flex;
        flex-direction: column;
        width: (120 * 100% / 850);
        min-width: 30px;

        @include mobile {
            min-width: 80px;
        }

        #{$component}--information &:nth-last-child(2) {
            min-width: 114px;
            width: auto;
            padding-right: 0;
        }

        #{$component}--information &:last-child {
            min-width: 86px;
            width: auto;
            padding-right: 0;
            justify-content: flex-end;
        }

        #{$component}-row--general & {
            justify-content: flex-end;
            padding-top: 4px;
        }

        #{$component}-row--categories & {
            align-items: flex-end;
            flex-wrap: nowrap;
            flex-direction: row;
        }

        &.hasCategory {
            border-top: 1px solid #e4e4e4;
        }

        &Name {
            display: flex;
            flex-direction: column;
            width: (280 * 100% / 1160);
            flex: 1 1 auto;
            min-width: 200px;
        }

        &Attrs {
            width: (880 * 100% / 1160);
            display: flex;
            flex-direction: row;
            align-items: stretch;
            justify-content: flex-end;
        }

        &Text {
            @include text-light;

            display: inline;
            width: 100%;
            padding-bottom: 15px;
            padding-right: 20px;

            @include tablet {
                word-break: break-all;
            }

            @include mobile {
                padding-right: 16px;
            }

            #{$component}-row--categories & {
                white-space: nowrap;
            }

            & /deep/ a {
                color: $c-purple;
                font-weight: $fw-medium;
                transition: $d-hover color;

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }
            }
        }

        &Sort {
            display: flex;
            width: 100%;
            padding: 12px 0 12px 6px;

            &Icon {
                display: flex;
                width: 11px;
                height: 17px;

                & svg {
                    width: 100%;
                    height: 100%;
                    fill: $c-gray;
                    cursor: pointer;
                    transition: $d-hover fill;

                    @include hover {
                        &:hover {
                            fill: $c-purple;
                        }
                    }
                }
            }

            &.isActive &Icon svg {
                fill: $c-purple;
            }
        }
    }

    &--popup,
    &--drivers,
    &--module,
    &--suitable {
        border-bottom: 1px solid #444444;
        color: $c-gray--text;

        #{$component} {
            &-row {
                border-bottom: none;
            }

            &-item {
                &Name {
                    flex: none;
                    width: (100 * 100% / 1160);
                    min-width: auto;

                    @include mobile {
                        min-width: 100px;
                    }
                }

                &Attrs {
                    justify-content: space-between;
                    width: (1060 * 100% / 1160);

                    #{$component}-item {
                        width: (150 * 100% / 1160);
                        min-width: auto;

                        @include mobile {
                            min-width: 120px;
                        }

                        &:first-child {
                            width: (300 * 100% / 1160);

                            @include mobile {
                                min-width: 300px;
                            }
                        }
                    }
                }
            }
        }
    }

    &--drivers #{$component}-item {
        &Name {
            width: (80 * 100% / 760);

            @include mobile {
                min-width: 80px;
            }
        }

        &Attrs {
            width: (680 * 100% / 760);

            #{$component}-item {
                width: (120 * 100% / 760);

                @include mobile {
                    min-width: 100px;
                }

                &:first-child {
                    width: (220 * 100% / 760);

                    @include mobile {
                        min-width: 220px;
                    }
                }
            }
        }
    }

    &--module #{$component}-item {
        &Name {
            width: (70 * 100% / 760);

            @include mobile {
                min-width: 70px;
            }
        }

        &Attrs {
            width: (690 * 100% / 760);

            #{$component}-item {
                width: (110 * 100% / 760);

                @include mobile {
                    min-width: 110px;
                }

                &:first-child {
                    width: (110 * 100% / 760);

                    @include mobile {
                        min-width: 110px;
                    }
                }

                &:nth-child(2) {
                    width: (250 * 100% / 760);

                    @include mobile {
                        min-width: 250px;
                    }
                }
            }
        }
    }

    &--suitable #{$component}-item {
        &Name {
            width: (120 * 100% / 760);
        }

        &Attrs {
            width: (640 * 100% / 760);

            #{$component}-item:first-child {
                width: 100%;
            }
        }
    }
}
</style>
