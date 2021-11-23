<template>
    <div class="CompareTable">
        <div class="CompareTable-differing">
            <div
                v-for="(item, key) in comparisonData.differingData"
                :key="key"
                class="CompareTable-item"
            >
                <div
                    class="CompareTable-itemValue CompareTable-itemValue_criteria"
                    :data-count="productCount"
                    v-text="item.criteria"
                ></div>
                <div
                    v-for="(compareItem, compareItemKey) in getSafeValues(
                        item.compareData
                    )"
                    :key="compareItemKey"
                    class="CompareTable-itemValue"
                    :class="{ isSwiped }"
                    :data-count="productCount"
                    v-text="compareItem"
                ></div>
            </div>
        </div>
        <div ref="common" class="CompareTable-common">
            <div
                v-for="(item, key) in comparisonData.commonData"
                :key="key"
                class="CompareTable-item"
            >
                <div
                    class="CompareTable-itemValue CompareTable-itemValue_criteria"
                    :data-count="productCount"
                    v-text="item.criteria"
                ></div>
                <div
                    v-for="(compareItem, compareItemKey) in getSafeValues(
                        item.compareData
                    )"
                    :key="compareItemKey"
                    class="CompareTable-itemValue"
                    :class="{ isSwiped }"
                    :data-count="productCount"
                    v-text="compareItem"
                ></div>
            </div>
        </div>
        <ExpandButton
            v-if="comparisonData.commonData && comparisonData.commonData.length"
            :text="
                isCommonDataShown
                    ? $translations.compareHideCommonData()
                    : $translations.compareShowCommonData()
            "
            :is-expanded="isCommonDataShown"
            class="CompareTable-expand"
            @click="onShowCommonClick"
        ></ExpandButton>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ExpandButton from '@/components/ExpandButton';

export default {
    name: 'CompareTable',
    components: { ExpandButton },
    props: {
        productCount: {
            type: Number,
            required: true
        },
        isSwiped: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            isCommonDataShown: false,
            resizeUpdateTimeout: 250
        };
    },
    computed: {
        ...mapState('comparison', ['comparisonData'])
    },
    methods: {
        getSafeValues(values) {
            return values.slice(0, this.productCount);
        },
        onShowCommonClick() {
            this.isCommonDataShown = !this.isCommonDataShown;
            const commonDataRef = this.$refs.common;

            setTimeout(() => {
                this.$emit('resize');
            }, this.resizeUpdateTimeout);

            if (this.isCommonDataShown) {
                const commonDataHeight = commonDataRef.scrollHeight;
                commonDataRef.style.maxHeight = `${commonDataHeight}px`;
                commonDataRef.style.overflow = 'visible';

                return;
            }

            commonDataRef.style.overflow = 'hidden';
            commonDataRef.style.maxHeight = 0;
        }
    }
};
</script>

<style lang="scss" scoped>
.CompareTable {
    margin-top: 40px;
    padding: 0 (100vw / 1440 * 100);

    @include mobile {
        margin-top: 20px;
    }

    &-item {
        width: 100%;
        display: flex;
        padding: 15px 0;
        position: relative;
        border-top: 1px solid rgba($c-white, 0.1);

        &:last-of-type {
            border-bottom: 1px solid rgba($c-white, 0.1);
        }

        @include mobile {
            padding: 25px 0 15px;
        }

        &:nth-child(2n + 1) {
            background-color: rgba($c-white, 0.02);

            @include mobile {
                background-color: transparent;
            }
        }

        &Value {
            @include text-light-same-mobile;
            color: $c-white;

            &[data-count='2'] {
                flex: 0 0 (100% / 3);
            }

            &[data-count='3'] {
                flex: 0 0 (100% / 4);
            }

            @include mobile {
                transition: $d-hover transform;

                &[data-count='2'] {
                    flex: 0 0 50%;
                }

                &[data-count='3'] {
                    flex: 0 0 43.75%;
                }

                &.isSwiped {
                    transform: translate3d(-100%, 0, 0);
                }
            }

            &_criteria {
                font-weight: $fw-medium;
                flex: 0 0 (100% / 4);

                &[data-count='2'] {
                    flex: 0 0 (100% / 3);
                }

                @include mobile {
                    position: absolute;
                    left: 0;
                    top: 0;
                    padding-top: 5px;
                }
            }
        }
    }

    &-expand {
        margin: 20px 0;
    }

    &-common {
        max-height: 0;
        transition: $d-hover max-height;
        overflow: hidden;

        .CompareTable-item {
            &:first-of-type {
                border-top: none;
            }
        }
    }
}
</style>
