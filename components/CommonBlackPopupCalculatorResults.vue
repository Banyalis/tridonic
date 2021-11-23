<template>
    <div class="CommonBlackPopupCalculatorResults">
        <div
            v-for="(item, index) in results"
            :key="index"
            class="CommonBlackPopupCalculatorResults-item"
            :class="[
                item.modifier
                    ? `CommonBlackPopupCalculatorResults-item--${item.modifier}`
                    : ''
            ]"
        >
            <div
                class="CommonBlackPopupCalculatorResults-itemTitle"
                :class="[
                    item.type === 'product'
                        ? `CommonBlackPopupCalculatorResults-itemTitle--product`
                        : ''
                ]"
                v-text="item.title"
            ></div>
            <div class="CommonBlackPopupCalculatorResults-itemContent">
                <div
                    v-if="item.type === 'table'"
                    class="CommonBlackPopupCalculatorResults-table"
                >
                    <CommonDataTable
                        v-for="(table, key) in item.sections"
                        :key="key"
                        :table="table"
                        :type="item.style"
                    />
                    <div
                        v-if="item.table"
                        class="CommonBlackPopupCalculatorResults-tablePanel"
                    >
                        <div
                            v-for="(panelItem, panelItemIndex) in item.table
                                .panel"
                            :key="panelItemIndex"
                            class="CommonBlackPopupCalculatorResults-tablePanelItem"
                            v-text="panelItem.title"
                        ></div>
                    </div>
                    <!-- eslint-disable -->
                    <div
                        v-if="item.table"
                        class="CommonBlackPopupCalculatorResults-tableNote"
                        v-html="item.table.note"
                    ></div>
                    <!-- eslint-enable -->
                </div>
                <div
                    v-if="item.type === 'product'"
                    class="CommonBlackPopupCalculatorResults-product"
                >
                    <div class="CommonBlackPopupCalculatorResults-productImage">
                        <picture>
                            <source
                                :srcset="
                                    item.product.image +
                                    ' 1x, ' +
                                    item.product.image2x +
                                    ' 2x'
                                "
                            />
                            <img :src="item.product.image" alt="" />
                        </picture>
                    </div>
                    <div
                        class="CommonBlackPopupCalculatorResults-productContent"
                    >
                        <div
                            class="CommonBlackPopupCalculatorResults-productTitle"
                            v-text="item.product.title"
                        ></div>
                        <div
                            class="CommonBlackPopupCalculatorResults-productDescription"
                        >
                            <div
                                v-for="(listItem, listItemIndex) in item.product
                                    .description"
                                :key="listItemIndex"
                                class="CommonBlackPopupCalculatorResults-productDescriptionItem"
                            >
                                <div
                                    class="CommonBlackPopupCalculatorResults-productDescriptionItemTitle"
                                    v-text="listItem.title"
                                ></div>
                                <!-- eslint-disable -->
                                <div
                                    class="CommonBlackPopupCalculatorResults-productDescriptionItemValue"
                                    v-html="listItem.value"
                                ></div>
                                <!-- eslint-enable -->
                            </div>
                        </div>
                        <!-- eslint-disable -->
                        <div
                            class="CommonBlackPopupCalculatorResults-productNote"
                            v-html="item.product.note"
                        ></div>
                        <!-- eslint-enable -->
                    </div>
                </div>
                <div
                    v-if="item.type === 'schema'"
                    class="CommonBlackPopupCalculatorResults-schema"
                >
                    <picture>
                        <source
                            :srcset="
                                item.image + ' 1x, ' + item.image2x + ' 2x'
                            "
                        />
                        <img :src="item.image" alt="" />
                    </picture>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CommonDataTable from '@/components/CommonDataTable';

export default {
    name: 'CommonBlackPopupCalculatorResults',

    components: {
        CommonDataTable
    },

    props: {
        results: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonBlackPopupCalculatorResults {
    $component: &;

    &-item {
        padding: 28px 40px 39px;
        border-radius: 10px;
        background-color: #242424;

        @include mobile {
            padding: 20px 10px 19px;
        }

        &:not(:last-child) {
            margin-bottom: 20px;
        }

        &--row {
            display: flex;
            justify-content: space-between;

            @include mobile {
                flex-direction: column;
                justify-content: flex-start;
            }

            #{$component}-itemContent {
                width: (760 * 100% / 1240);

                @include mobile {
                    width: 100%;
                }
            }
        }

        &Title {
            @include title-small;

            margin-bottom: 5px;
            color: $c-white;

            @include mobile {
                margin-bottom: 8px;
            }

            &--product {
                text-align: center;

                @include mobile {
                    margin-bottom: 39px;
                }
            }
        }
    }

    &-table {
        &Panel {
            @include text-light-same-mobile;

            display: flex;
            margin-top: 10px;

            @include mobile {
                margin-top: 5px;
            }

            &Item {
                color: $c-white;
                font-weight: $fw-bold;

                &:first-child {
                    width: (660 * 100% / 760);
                }

                &:last-child {
                    width: (100 * 100% / 760);
                }
            }
        }

        &Note {
            @include text-light-same-mobile;

            margin-top: 35px;
            color: $c-gray--text;

            @include mobile {
                margin-top: 30px;
            }
        }
    }

    &-product {
        display: flex;

        @include mobile {
            flex-direction: column;
        }

        &Image {
            @include mobile {
                text-align: center;
            }
        }

        &Content {
            margin-left: 80px;
            color: $c-white;

            @include mobile {
                margin: 50px 0 0;
            }
        }

        &Title {
            @include text;

            line-height: (20 / 24);

            @include mobile {
                line-height: (20 / 18);
            }
        }

        &Description {
            margin: 24px 0 20px;

            @include mobile {
                margin: 17px 0 20px;
            }

            &Item {
                @include text-light-same-mobile;

                display: flex;

                &Title {
                    min-width: 110px;
                }

                &Value {
                    margin-left: 50px;

                    @include mobile {
                        margin-left: 30px;
                    }
                }

                &::v-deep a {
                    color: $c-blue;
                    transition: color $d-hover ease-in-out;

                    @include hover {
                        &:hover {
                            color: $c-white;
                        }
                    }
                }
            }
        }

        &Note {
            @include text-light-same-mobile;

            color: $c-gray--text;
        }
    }
}
</style>
