<template>
    <div class="SolutionsProjectsMobileFilters">
        <div class="SolutionsProjectsMobileFilters-wrapper">
            <div class="SolutionsProjectsMobileFilters-section">
                <div
                    v-for="option in getCategoriesOptions"
                    :key="option.value"
                    class="SolutionsProjectsMobileFilters-sectionItem"
                    :class="{ isActive: activeCategory === option.value }"
                    @click="setCategoryFilter(option)"
                    v-text="option.name"
                ></div>
            </div>
            <div class="SolutionsProjectsMobileFilters-section">
                <div
                    v-for="option in getLocationsOptions"
                    :key="option.value"
                    class="SolutionsProjectsMobileFilters-sectionItem"
                    :class="{ isActive: activeLocation === option.value }"
                    @click="setLocationFilter(option)"
                    v-text="option.name"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import { isMobile } from '@/utils/utils';

export default {
    name: 'SolutionsProjectsMobileFilters',

    data() {
        return {
            activeCategory: 'allProducts',
            activeLocation: 'allLocations'
        };
    },

    computed: {
        getCategoriesOptions() {
            const options = [];

            options.push({
                name:
                    this.$translations.textShow() +
                    ' ' +
                    this.$translations.allProducts(),
                value: 'allProducts'
            });

            this.filters.categories.forEach((item) => {
                options.push(item);
            });

            return options;
        },

        getLocationsOptions() {
            const options = [];

            options.push({
                name:
                    this.$translations.textShow() +
                    ' ' +
                    this.$translations.allLocations(),
                value: 'allLocations'
            });

            this.filters.locations.forEach((item) => {
                options.push(item);
            });

            return options;
        },
        ...mapState('solutions-projects', ['filters'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);

        this.$root.$on(
            VUE_CUSTOM_EVENTS.setMobileFilterValues,
            this.setActiveFilterValues
        );

        this.$root.$emit(VUE_CUSTOM_EVENTS.solutionsProjectsFiltersMounted);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);

        this.$root.$off(
            VUE_CUSTOM_EVENTS.setMobileFilterValues,
            this.setActiveFilterValues
        );
    },

    methods: {
        setCategoryFilter(option) {
            this.activeCategory = option.value;

            this.triggerFetchNewProjects();
        },

        setLocationFilter(option) {
            this.activeLocation = option.value;

            this.triggerFetchNewProjects();
        },

        triggerFetchNewProjects() {
            this.$emit(VUE_CUSTOM_EVENTS.closeModalPopup);

            this.$root.$emit(VUE_CUSTOM_EVENTS.fetchSolutionsProjects, {
                category: this.activeCategory,
                location: this.activeLocation
            });
        },

        onResize() {
            if (!isMobile()) this.$emit(VUE_CUSTOM_EVENTS.closeModalPopup);
        },

        setActiveFilterValues({ category, location }) {
            this.activeCategory = category;
            this.activeLocation = location;
        }
    }
};
</script>

<style lang="scss">
.SolutionsProjectsMobileFilters {
    $component: &;

    display: flex;
    width: 100%;
    padding: 25px 20px 0;

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 37px;
        border-top: 1px solid rgba($c-white, 0.15);
        padding-top: 20px;

        &:first-child {
            border-top: none;
            margin-top: 0;
            padding-top: 0;
        }

        &Item {
            @include text-small;

            line-height: (20 / 18);
            width: 100%;
            display: flex;
            color: $c-white;
            margin-top: 20px;

            &:first-child {
                margin-top: 0;
            }

            &.isActive {
                color: $c-blue;
                pointer-events: none;
            }
        }
    }
}
</style>
