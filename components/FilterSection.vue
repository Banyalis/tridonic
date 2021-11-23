<template>
    <div class="FilterSection" :class="{ isSingle }">
        <div
            v-if="section.title"
            class="FilterSection-title"
            v-text="section.title"
        ></div>
        <div
            v-if="isSectionChanged && !isSingle"
            class="FilterSection-clear"
            @click="clearSectionFilters"
        >
            <FilterTrash />
        </div>
        <div class="FilterSection-filters">
            <div
                v-for="(filter, key) in section.filterItems"
                :key="key"
                class="FilterSection-filter"
                :class="{ isSlider: filter.type === filterTypes.slider }"
            >
                <div
                    v-if="filter.type === filterTypes.checkbox"
                    class="FilterSection-checkbox"
                >
                    <FilterCheckbox
                        v-model="filterValues[filter.id]"
                        :title="filter.title"
                        :input-id="filter.id"
                        :count-of-products="filter.countOfProducts || NaN"
                        :tooltip-text="filter.tooltip"
                        :category-key="categoryKey"
                        :section-key="sectionKey"
                        :filter-id="filter.id"
                    ></FilterCheckbox>
                </div>
                <div
                    v-if="filter.type === filterTypes.slider"
                    class="FilterSection-slider"
                >
                    <FilterSlider
                        v-model="filterValues[filter.id]"
                        :min-value="filter.minValue"
                        :max-value="filter.maxValue"
                        :title="filter.title"
                        :initial-max-value="filter.maxValue"
                        :initial-min-value="filter.minValue"
                        :category-key="categoryKey"
                        :section-key="sectionKey"
                        :filter-id="filter.id"
                        :tooltip-text="filter.tooltip"
                    ></FilterSlider>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FilterCheckbox from '@/components/FilterCheckbox';
import FilterSlider from '@/components/FilterSlider';
import FilterTrash from '@/components/FilterTrash';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
export default {
    name: 'FilterSection',
    components: { FilterTrash, FilterSlider, FilterCheckbox },
    model: {
        prop: 'isChanged',
        event: 'is-changed'
    },
    props: {
        isSingle: {
            type: Boolean,
            default: true
        },
        section: {
            type: Object,
            required: true
        },
        categoryKey: {
            type: Number,
            required: true
        },
        sectionKey: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            filterTypes: {
                checkbox: 'checkbox',
                slider: 'slider'
            },
            filterValues: {}
        };
    },
    computed: {
        isSectionChanged() {
            return !!Object.values(this.filterValues).filter(
                (filterValue) => !!filterValue
            ).length;
        }
    },
    watch: {
        isSectionChanged(newVal) {
            this.$emit(VUE_CUSTOM_EVENTS.isFilterChanged, newVal);
        }
    },
    methods: {
        clearSectionFilters() {
            this.$root.$emit(
                VUE_CUSTOM_EVENTS.clearFilters,
                this.categoryKey,
                this.sectionKey
            );
        }
    }
};
</script>

<style lang="scss" scoped>
.FilterSection {
    background: $c-white;
    border-radius: 2px;
    padding: 20px;
    position: relative;

    @include mobile {
        background: $c-gray--bg;
    }

    &.isSingle {
        background: none;
        padding: 20px 0 0 0;

        .FilterSection-filter:first-of-type {
            margin-top: 0;
        }
    }

    &-title {
        @include text-light-same-mobile;
        color: $c-black;
    }

    &-filter {
        margin-top: 20px;

        &.isSlider {
            &:first-of-type {
                margin-top: 0;
            }
        }
    }

    &-clear {
        position: absolute;
        right: 21px;
        top: 22px;
        z-index: $z-filterSectionClear;
    }
}
</style>
