<template>
    <div class="FilterCheckbox">
        <input
            :id="filterId"
            v-model="inputModel"
            type="checkbox"
            class="FilterCheckbox-input"
            @change="onInputChange"
        />
        <label
            class="FilterCheckbox-label"
            :for="filterId"
            v-text="title"
        ></label>
        <div
            v-if="countOfProducts"
            class="FilterCheckbox-count"
            v-text="countOfProducts"
        ></div>
        <TooltipIcon
            v-if="tooltipText"
            class="FilterCheckbox-tooltip"
            :class="{ withProductCount: !!countOfProducts }"
            :text="tooltipText"
        ></TooltipIcon>
    </div>
</template>

<script>
import TooltipIcon from '@/components/TooltipIcon';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import { mapMutations, mapState } from 'vuex';
import { getFilterValueFromQueryById } from '@/utils/utils';

export default {
    name: 'FilterCheckbox',
    components: { TooltipIcon },
    model: {
        prop: 'isChanged',
        event: VUE_CUSTOM_EVENTS.isFilterChanged
    },
    props: {
        title: {
            type: String,
            required: true
        },
        filterId: {
            type: String,
            required: true
        },
        countOfProducts: {
            type: Number,
            required: true
        },
        tooltipText: {
            type: String,
            default: ''
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
            inputModel: false
        };
    },
    computed: {
        ...mapState('filters', ['filterValues', 'apiEvent']),
        ...mapState('filters-mobile', ['needPreselected'])
    },
    mounted() {
        this.setValueFromQuery();
        this.$root.$on(VUE_CUSTOM_EVENTS.clearFilters, this.clearFilter);
        this.needPreselected && this.preSelected();
    },
    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.clearFilters, this.clearFilter);
    },
    methods: {
        setValueFromQuery() {
            const filterValue = getFilterValueFromQueryById(
                this.$router,
                this.filterId
            );

            if (filterValue === null) {
                return;
            }

            this.inputModel = true;

            this.onInputChange();
        },
        onInputChange() {
            this.updateFilterValue({
                categoryKey: this.categoryKey,
                sectionKey: this.sectionKey,
                filterId: this.filterId,
                filterValue: this.inputModel || null
            });
            this.$emit(VUE_CUSTOM_EVENTS.isFilterChanged, this.inputModel);
        },
        clearFilter(categoryKey, sectionKey) {
            if (categoryKey !== null && categoryKey !== this.categoryKey) {
                return;
            }

            if (sectionKey !== null && sectionKey !== this.sectionKey) {
                return;
            }
            this.inputModel = false;
            this.onInputChange();
        },
        preSelected() {
            Object.entries(this.filterValues[this.apiEvent]).forEach(
                ([filterKey, filterValue]) => {
                    if (this.filterId === filterKey) {
                        this.inputModel = filterValue;

                        this.$emit(
                            VUE_CUSTOM_EVENTS.isFilterChanged,
                            filterValue
                        );
                    }
                }
            );
        },
        ...mapMutations({
            updateFilterValue: 'filters/updateFilterValue'
        })
    }
};
</script>

<style lang="scss" scoped>
.FilterCheckbox {
    position: relative;
    display: flex;
    align-items: flex-start;

    @include hover {
        &:hover {
            .FilterCheckbox-tooltip {
                opacity: 1;
            }
        }
    }

    &-input {
        position: absolute;
        opacity: 0;
    }

    &-label {
        padding: 1px 25px 0;
        transition: $d-hover color;
        color: $c-black;
        cursor: pointer;
        display: inline-block;
        width: 100%;
        @include text-light-same-mobile;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            width: 20px;
            height: 20px;
            top: 0;
            transition: $d-hover color;
            border-radius: 2px;
            border: 1px solid;
            color: $c-filterSliderLine;
        }

        &::after {
            content: '';
            position: absolute;
            background: $c-purple;
            opacity: 0;
            border-radius: 1px;
            transition: $d-hover opacity;
            width: 12px;
            height: 12px;
            left: 4px;
            top: 50%;
            transform: translate3d(0, -50%, 0);
        }
    }

    @include hover {
        &-input:hover + &-label,
        &-input:checked:hover + &-label {
            color: $c-purple;

            &:before {
                border: 2px solid;
                color: $c-purple;
            }
        }
    }

    &-input:checked + &-label {
        color: $c-black;

        &:after {
            opacity: 1;
        }

        &:before {
            border-width: 1px;
        }
    }

    &-count {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        @include text-light-same-mobile;
        color: $c-gray;
    }

    &-tooltip {
        position: absolute;
        right: 0;
        opacity: 0;
        transition: $d-hover opacity;

        &.withProductCount {
            right: 30px;
        }

        @include mobile {
            opacity: 1;
        }
    }
}
</style>
