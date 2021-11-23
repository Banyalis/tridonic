<template>
    <div
        class="CommonBlackPopupList"
        :class="[list.modifier ? `CommonBlackPopupList--${list.modifier}` : '']"
    >
        <div
            v-for="(item, index) in list.items"
            :key="index"
            class="CommonBlackPopupList-item"
        >
            <div class="CommonBlackPopupList-itemHeader">
                <div
                    class="CommonBlackPopupList-itemTitle"
                    v-text="item.title"
                ></div>
                <div
                    v-if="item.caption"
                    class="CommonBlackPopupList-itemCaption"
                    v-text="item.caption"
                ></div>
            </div>
            <div class="CommonBlackPopupList-itemContent">
                <!-- eslint-disable -->
                <div
                    v-if="item.text"
                    class="CommonBlackPopupList-itemText"
                    v-html="item.text"
                ></div>
                <!-- eslint-enable -->
                <div
                    v-else-if="item.documents"
                    class="CommonBlackPopupList-itemDocuments"
                >
                    <NuxtLink
                        v-for="(document, documentIndex) in item.documents"
                        :key="documentIndex"
                        :to="document.link"
                        class="CommonBlackPopupList-itemDocumentsItem"
                    >
                        <svg-icon name="file-icon"></svg-icon>
                        <div
                            class="CommonBlackPopupList-itemDocumentsItemTitle"
                            v-text="document.title"
                        ></div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonBlackPopupList',

    props: {
        list: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonBlackPopupList {
    $component: &;

    &--documents #{$component}-item {
        align-items: center;

        @include mobile {
            grid-template-columns: 1fr 1fr;
            align-items: flex-start;
        }

        &Title {
            font-weight: $fw-medium;
        }
    }

    &-item {
        @include text-light-same-mobile;

        display: grid;
        grid-template-columns: 0.5fr 1.5fr;
        padding: 10px 0;
        border-bottom: 1px solid rgba($c-white, 0.15);
        color: $c-white;

        @include mobile {
            grid-template-columns: 0.8fr 1.2fr;
            grid-gap: 0 20px;
            padding: 15px 0;
        }

        &:first-child {
            padding: 0 0 10px;

            @include mobile {
                padding: 0 0 15px;
            }
        }

        &:last-child {
            padding: 10px 0 0;
            border-bottom: none;

            @include mobile {
                padding: 15px 0 0;
            }
        }

        &Caption {
            color: $c-gray--text;
        }

        &Text {
            font-weight: $fw-medium;

            & /deep/ a {
                color: $c-blue;
                transition: color $d-hover ease-in-out;

                @include hover {
                    &:hover {
                        color: $c-white;
                    }
                }
            }
        }

        &Documents {
            display: flex;

            @include mobile {
                flex-direction: column;
            }

            &Item {
                display: flex;
                align-items: center;

                &:not(:last-child) {
                    margin-right: 54px;

                    @include mobile {
                        margin: 0 0 20px;
                    }
                }

                @include hover {
                    &:hover #{$component}-itemDocumentsItemTitle {
                        color: $c-blue;
                    }
                }

                svg {
                    width: 16px;
                    height: 20px;
                    fill: $c-blue;
                }

                &Title {
                    margin-left: 9px;
                    color: $c-white;
                    font-weight: $fw-medium;
                    transition: color $d-hover ease-in-out;
                }
            }
        }
    }
}
</style>
