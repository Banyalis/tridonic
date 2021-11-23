<template>
    <div
        class="CommonDataTableRow"
        :class="[
            `CommonDataTableRow--${type}`,
            odd ? 'CommonDataTableRow--odd' : ''
        ]"
    >
        <component
            :is="row[0].link ? 'nuxt-link' : 'div'"
            :to="row[0].link ? row[0].link : undefined"
            class="CommonDataTableRow-row"
        >
            <div v-if="row[0].link" class="CommonDataTableRow-rowBg"></div>
            <div class="CommonDataTableRow-itemName">
                <tag
                    v-if="row[0].tag"
                    :id="row[0].tag.id"
                    :text="row[0].tag.text"
                ></tag>
                <!-- eslint-disable -->
                <component
                    :is="row[0].link ? 'nuxt-link' : 'div'"
                    v-else
                    :to="row[0].link ? row[0].link : undefined"
                    class="CommonDataTableRow-itemText"
                    v-html="row[0].text"
                ></component>
                <!-- eslint-enable -->
            </div>
            <div class="CommonDataTableRow-itemAttrs">
                <div
                    v-for="(item, index) in internalRow"
                    :key="index"
                    class="CommonDataTableRow-item"
                >
                    <tag
                        v-if="item.tag"
                        :id="item.tag.id"
                        :text="item.tag.text"
                    ></tag>
                    <!-- eslint-disable -->
                    <component
                        :is="item.link ? 'nuxt-link' : 'div'"
                        v-else
                        :to="item.link ? item.link : undefined"
                        class="CommonDataTableRow-itemText"
                        v-html="item.text"
                    ></component>
                    <!-- eslint-enable -->
                </div>
            </div>
        </component>
    </div>
</template>

<script>
import Tag from '@/components/Tag';

export default {
    name: 'CommonDataTableRow',

    components: { Tag },

    props: {
        row: {
            type: Array,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        odd: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            internalRow: []
        };
    },

    watch: {
        row() {
            this.mapInternalRow();
        }
    },

    mounted() {
        this.mapInternalRow();
    },

    methods: {
        mapInternalRow() {
            const list = this.row.filter((item, id) => id !== 0);

            if (this.type === 'information') {
                if (!list[list.length - 1].tag) list.push({ text: '' }); // set column for tag

                // set column for linkStart
                const indexPrelast = list.length - 2;
                const itemLinkStart = list[indexPrelast];

                if (itemLinkStart.linkStart)
                    list.splice(indexPrelast, 1, {
                        text:
                            itemLinkStart.linkStart.type === 'setbuilder'
                                ? this.$translations.startWithSetbuilder()
                                : this.$translations.startWithCompanionSuite(),
                        link: itemLinkStart.linkStart.link
                    });
                else list.splice(indexPrelast, 0, { text: '' });
            }

            this.internalRow = list;
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonDataTableRow {
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
        align-items: center;
        justify-content: space-between;
        border-top: 1px solid #e4e4e4;
        transition: $d-hover border-color;

        #{$component}--odd & {
            background: $c-gray--bg;
        }

        &:first-child {
            border-top: none;
        }

        &:last-child {
            border-bottom: 1px solid #e4e4e4;
        }

        @include hover {
            &:hover {
                border-color: transparent;

                &:last-child {
                    border-color: transparent;
                }

                & + #{$component}-row {
                    border-color: transparent;
                }

                & #{$component}-rowBg {
                    opacity: 1;
                }
            }
        }

        & a {
            @include text-light-same-mobile-medium;

            color: $c-purple;
            transition: $d-hover color;

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }
        }

        &Bg {
            position: absolute;
            top: -1px;
            left: -10px;
            right: -10px;
            bottom: -1px;
            background: $c-purpleBgRow;
            z-index: 1;
            opacity: 0;
            transition: $d-hover opacity;

            @include mobile {
                display: none;
            }
        }
    }

    &-item {
        display: flex;
        flex-direction: row;
        width: (120 * 100% / 850);
        min-width: 30px;
        padding: 10px 20px 10px 0;
        position: relative;
        z-index: 2;

        @include tablet {
            padding: 10px 16px 10px 0;
        }

        @include mobile {
            padding: 10px 16px 10px 0;
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

        #{$component}--technical & {
            &:last-child {
                padding-right: (10 * 100% / 850) !important;
            }
        }

        &Name {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: (280 * 100% / 1160);
            flex: 1 1 auto;
            min-width: 200px;
            z-index: 2;
        }

        &Attrs {
            width: (880 * 100% / 1160);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            z-index: 2;
        }

        &Text {
            @include text-light-same-mobile;

            display: inline;
            width: auto;
            color: $c-black;

            @include tablet {
                word-break: break-all;
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
    }

    &--popup,
    &--drivers,
    &--module,
    &--suitable {
        #{$component} {
            &-row {
                border-bottom: 1px solid #444444;
                background-color: transparent;

                &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    top: -1px;
                    left: -10px;
                    right: -10px;
                    bottom: -1px;
                    background-color: #444444;
                    opacity: 0;
                    transition: opacity $d-hover ease-in-out;
                }

                @include hover {
                    &:hover {
                        border-color: #444444;

                        &:before {
                            opacity: 1;
                        }
                    }
                }

                a {
                    color: $c-blue;

                    @include hover {
                        &:hover {
                            color: $c-white;
                        }
                    }
                }
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

                &Text {
                    color: $c-white;
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
