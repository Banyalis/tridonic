<template>
    <section class="ProductPopupCommonData">
        <div class="ProductPopupCommonData-table">
            <div class="ProductPopupCommonData-tableWrapper">
                <div
                    v-for="(property, key) in properties"
                    :key="key"
                    class="ProductPopupCommonData-tableRow"
                    :class="[
                        key % 2 === 0
                            ? 'ProductPopupCommonData-tableRow--odd'
                            : ''
                    ]"
                >
                    <!-- eslint-disable -->
                    <div
                        class="ProductPopupCommonData-tableRowName"
                        v-html="property.name"
                    ></div>
                    <div
                        class="ProductPopupCommonData-tableRowValue"
                        v-html="property.value"
                    ></div>
                    <!-- eslint-enable -->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ProductPopupCommonData',

    props: {
        properties: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupCommonData {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex: 0 0 auto;

    &-table {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 0 0 auto;

        &::-webkit-scrollbar {
            width: 0;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
        }

        &::-webkit-scrollbar-button {
            background-color: transparent;
        }

        &::-webkit-scrollbar-corner {
            background-color: transparent;
        }

        &Wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            flex: 0 0 auto;
        }

        &Row {
            width: 100%;
            position: relative;
            display: flex;
            flex: 0 0 auto;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #e4e4e4;
            transition: $d-hover border-color;

            &--odd {
                background: $c-gray--bg;
            }

            &:last-child {
                border-bottom: 1px solid #e4e4e4;
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

            &Name {
                @include text-light-same-mobile;

                display: flex;
                width: (360 * 100% / 760);
                color: $c-black;
                z-index: 2;
                padding: 10px 0;

                @include mobile {
                    width: (140 * 100% / 280);
                }
            }

            &Value {
                @include text-light-same-mobile-medium;

                display: flex;
                width: (360 * 100% / 760);
                color: $c-black;
                z-index: 2;
                padding: 10px 0;

                @include mobile {
                    flex-direction: row;
                    align-items: flex-end;
                    justify-content: flex-end;
                    text-align: right;
                    width: (120 * 100% / 280);
                }
            }
        }
    }
}
</style>
