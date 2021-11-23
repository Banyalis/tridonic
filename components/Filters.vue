<template>
    <div class="Filters">
        <div class="Filters-head">
            <div
                class="Filters-title"
                v-text="$translations.filtersTitle()"
            ></div>
            <div
                v-if="isFiltersChanged"
                class="Filters-clearAll"
                @click="clearAllFilters"
                v-text="$translations.filtersClearAll()"
            ></div>
            <div class="Filters-closeMobile" @click="closeMobileFilters">
                <svg-icon name="cross-dotted"></svg-icon>
            </div>
        </div>
        <div class="Filters-categoryList">
            <div
                v-for="(category, categoryKey) in internalFilterList"
                :ref="categoryKey"
                :key="categoryKey"
                class="Filters-category"
                :class="{
                    isCategoryChanged: isCategoryChanged(categoryKey),
                    isExpanded: category.isExpanded
                }"
            >
                <div
                    :ref="`${categoryKey}-head`"
                    class="Filters-categoryHead"
                    @click="toggleCategory(categoryKey, category)"
                >
                    <div
                        class="Filters-categoryHeadTitle"
                        v-text="category.title"
                    ></div>
                    <div
                        v-if="isCategoryChanged(categoryKey)"
                        class="Filters-filterTrash"
                        @click="clearFilters($event, categoryKey)"
                    >
                        <FilterTrash />
                    </div>
                    <div class="Filters-categoryHeadExpand">
                        <div
                            class="Filters-categoryHeadExpandLine Filters-categoryHeadExpandLine--1"
                        ></div>
                        <div
                            class="Filters-categoryHeadExpandLine Filters-categoryHeadExpandLine--2"
                        ></div>
                    </div>
                </div>
                <div
                    :ref="`${categoryKey}-content`"
                    class="Filters-categoryContent"
                >
                    <div
                        v-for="(section, sectionKey) in category.sections"
                        :key="sectionKey"
                        class="Filters-categorySection"
                    >
                        <FilterSection
                            v-model="
                                sectionValues[`${categoryKey}-${sectionKey}`]
                            "
                            :section="section"
                            :category-key="categoryKey"
                            :section-key="sectionKey"
                            :is-single="category.sections.length === 1"
                        ></FilterSection>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="isFiltersMobileChanged"
            class="Filters-mobileShowButton"
            @click="applyFiltersMobile"
        >
            <span>Show 27 products</span
            ><!-- TODO: Replace by translation text-->
            <svg-icon name="arrow-right"></svg-icon>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import FilterSection from '@/components/FilterSection';
import {
    QUERY_KEY_VALUE_SEPARATOR,
    VUE_CUSTOM_EVENTS
} from '@/utils/constants';
import FilterTrash from '@/components/FilterTrash';
import { isMobile, mapValueToQueryParams } from '@/utils/utils';

export default {
    name: 'Filters',
    components: { FilterTrash, FilterSection },
    props: {
        filterList: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            sectionValues: {},
            internalFilterList: [],
            isMobile: false,
            isMobileShowButtonActive: false,
            productsFoundCount: 0
        };
    },
    computed: {
        isFiltersChanged() {
            return Object.values(this.sectionValues).filter(
                (isSectionChanged) => !!isSectionChanged
            ).length;
        },
        isFiltersMobileChanged() {
            if (!this.isMobile) {
                return false;
            }

            if (
                !Object.values(this.filterValues[this.apiEvent]).length &&
                !!Object.values(this.previousFilterValuesMobile[this.apiEvent])
                    .length
            ) {
                return true;
            }
            return !!Object.entries(this.filterValues[this.apiEvent]).filter(
                ([filterKey, filterValue]) => {
                    const previousFilterValue = this.previousFilterValuesMobile[
                        this.apiEvent
                    ][filterKey];

                    if (!previousFilterValue) {
                        return true;
                    }

                    return previousFilterValue.value !== filterValue.value;
                }
            ).length;
        },
        ...mapState('filters', [
            'filterValues',
            'previousFilterValuesMobile',
            'isPopup',
            'apiEvent'
        ]),
        ...mapState('filters-mobile', [
            'isMobileFiltersOpened',
            'filterComponent',
            'needPreselected'
        ])
    },
    watch: {
        filterList() {
            this.mapInternalFilterList();
        },
        filterValues() {
            if (this.isMobile) {
                return;
            }

            if (!this.isPopup) {
                this.updateFilterQueryParams();
            }

            this.fetchNewItems();
        },
        isMobileFiltersOpened(newVal) {
            if (!newVal || this.filterComponent !== 'Filters') {
                return;
            }

            this.setPreviousFilterValues(this.filterValues);
            this.openFirstCategory();
        }
    },
    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
        this.mapInternalFilterList();

        if (this.needPreselected) {
            this.$root.$emit(VUE_CUSTOM_EVENTS.needPreselectedFilters);
            this.setPreviousFilterValues(this.filterValues);
        }

        if (this.isMobile) {
            return;
        }
        // this.$refs is not available in mounted() but available in next tick
        this.$nextTick(this.openFirstCategory);
    },
    methods: {
        openFirstCategory() {
            const category = this.internalFilterList[0];
            this.toggleCategory(0, category);
        },
        onResize() {
            this.isMobile = isMobile();
        },
        applyFiltersMobile() {
            if (!this.isPopup) {
                this.updateFilterQueryParams();
            }

            this.fetchNewItems();
            this.setPreviousFilterValues(this.filterValues);
            this.closeMobileFiltersAction();
        },
        fetchNewItems() {
            this.$root.$emit(this.apiEvent);
        },
        updateFilterQueryParams() {
            const queryKey = 'filter';
            const queryValue = Object.entries(
                this.filterValues[this.apiEvent]
            ).map(([key, valueObj]) => {
                return `${key}${QUERY_KEY_VALUE_SEPARATOR}${valueObj.value}`;
            });
            mapValueToQueryParams(this.$router, queryKey, queryValue);
        },
        mapInternalFilterList() {
            this.internalFilterList = this.filterList.map((category) => {
                return {
                    ...category,
                    isExpanded: false
                };
            });
        },
        isCategoryChanged(categoryKey) {
            return !!Object.entries(this.sectionValues).filter(
                ([sectionKey, sectionValue]) => {
                    return (
                        sectionKey.split('-')[0] === categoryKey.toString() &&
                        sectionValue
                    );
                }
            ).length;
        },
        toggleCategory(categoryKey, category) {
            const categoryContent = this.$refs[`${categoryKey}-content`][0];
            setTimeout(() => {
                this.$emit('resize');
            }, 200);
            if (categoryContent.style?.maxHeight) {
                categoryContent.style.maxHeight = null;
                category.isExpanded = false;

                return;
            }
            categoryContent.style.maxHeight = `${categoryContent.scrollHeight}px`;
            category.isExpanded = true;
        },
        clearFilters(event, categoryKey) {
            event.stopPropagation();
            this.$root.$emit(VUE_CUSTOM_EVENTS.clearFilters, categoryKey, null);
        },
        clearAllFilters() {
            this.$root.$emit(VUE_CUSTOM_EVENTS.clearFilters, null, null);
        },
        closeMobileFilters() {
            this.setFilterValues(this.previousFilterValuesMobile);
            this.closeMobileFiltersAction();
        },
        ...mapMutations({
            updateProducts: 'products/update',
            setPreviousFilterValues: 'filters/setPreviousFilterValues',
            setFilterValues: 'filters/setFilterValues'
        }),
        ...mapActions({
            closeMobileFiltersAction: 'filters-mobile/closeMobileFilters'
        })
    }
};
</script>

<style lang="scss" scoped>
.Filters {
    width: 100%;

    &-head {
        @include mobile {
            display: flex;
            padding: 20px 0;
            justify-content: center;
            align-items: center;
            position: sticky;
            top: 0;
            background: $c-white;
            z-index: 2;
        }
    }

    &-title {
        @include text-light-same-mobile;
    }

    &-categoryList {
        margin-top: 20px;

        @include mobile {
            margin-top: 0;
            padding-bottom: 80px;
        }
    }

    &-category {
        padding: 12px 0;
        border-bottom: 1px solid $c-gray-products--border;

        &:first-of-type {
            border-top: 1px solid $c-gray-products--border;
        }

        &.isExpanded {
            border-bottom: 1px solid $c-gray-products--border;

            .Filters-categoryHeadExpandLine {
                background: $c-purple;
            }

            .Filters-categoryHeadExpandLine--1 {
                transform: none;
            }
        }

        &.isCategoryChanged {
            border-bottom-color: $c-purple;
            border-bottom-width: 2px;

            &.isExpanded {
                border-bottom-color: $c-gray-products--border;
                border-bottom-width: 1px;
            }
        }

        &Content {
            max-height: 0;
            overflow: hidden;
            transition: $d-hover max-height;
        }

        &Section {
            margin-top: 10px;
            margin-bottom: 20px;

            &:last-of-type {
                margin-bottom: 8px;
            }
        }
    }

    &-categoryHead {
        cursor: pointer;
        position: relative;

        @include hover {
            &:hover {
                .Filters-categoryHeadExpandLine {
                    background: $c-purple;
                }

                .Filters-categoryHeadTitle {
                    color: $c-purple;
                }
            }
        }

        &Title {
            transition: $d-hover color;
            @include text-light-same-mobile-medium;
            color: $c-black;
        }

        &Expand {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            width: 10px;
            height: 10px;

            &Line {
                width: 100%;
                height: 2px;
                background: $c-gray--filters;
                position: absolute;
                left: 0;
                transform-origin: center;
                top: 50%;
                transition: $d-hover transform, $d-hover background-color;

                &--1 {
                    transform: rotate(90deg);
                }
            }
        }
    }

    &-filterTrash {
        right: 20px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        position: absolute;
    }

    &-clearAll {
        @include text-light-same-mobile-medium;
        position: absolute;
        cursor: pointer;
        right: 20px;
        top: 0;
        color: $c-purple;
        transition: $d-hover color;

        @include hover {
            &:hover {
                color: $c-blue;
            }
        }

        @include mobile {
            left: 0;
            right: auto;
            bottom: auto;
            top: auto;
        }
    }

    &-closeMobile {
        display: none;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 20px;
        right: 0;

        svg {
            fill: $c-black;
            @include m-absolute100;
        }

        @include mobile {
            display: block;
        }
    }

    &-mobileShowButton {
        @include button-show-products;
    }
}
</style>
