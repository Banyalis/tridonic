<template>
    <div class="NewsMobileFilters">
        <div class="NewsMobileFilters-wrapper">
            <div class="NewsMobileFilters-section">
                <div
                    v-for="option in getTypesOptions"
                    :key="option.value"
                    class="NewsMobileFilters-sectionItem"
                    :class="{ isActive: activeType === option.value }"
                    @click="setCategoryFilter(option)"
                    v-text="option.name"
                ></div>
            </div>
            <div class="NewsMobileFilters-section">
                <div
                    v-for="option in getDateOptions"
                    :key="option.value"
                    class="NewsMobileFilters-sectionItem"
                    :class="{ isActive: activeDate === option.value }"
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
    name: 'NewsMobileFilters',

    data() {
        return {
            activeType: '',
            activeDate: ''
        };
    },

    computed: {
        getTypesOptions() {
            return this.getOptions('type');
        },

        getDateOptions() {
            return this.getOptions('date');
        },

        ...mapState('news', ['filters'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);

        this.activeType = this.filters.type[0]?.value;
        this.activeDate = this.filters.date[0]?.value;

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
        getOptions(type) {
            return this.filters[type].map((item) => {
                return {
                    name: this.$translations.sortBy() + ' ' + item.name,
                    value: item.value
                };
            });
        },

        setCategoryFilter(option) {
            this.activeType = option.value;

            this.triggerFetchNewNews();
        },

        setLocationFilter(option) {
            this.activeDate = option.value;

            this.triggerFetchNewNews();
        },

        triggerFetchNewNews() {
            this.$emit(VUE_CUSTOM_EVENTS.closeModalPopup);

            this.$root.$emit(VUE_CUSTOM_EVENTS.fetchNews, {
                category: this.activeType,
                location: this.activeDate
            });
        },

        onResize() {
            if (!isMobile()) this.$emit(VUE_CUSTOM_EVENTS.closeModalPopup);
        },

        setActiveFilterValues({ category, location }) {
            this.activeType = category;
            this.activeDate = location;
        }
    }
};
</script>

<style lang="scss">
.NewsMobileFilters {
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
