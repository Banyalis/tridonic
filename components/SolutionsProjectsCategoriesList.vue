<template>
    <div class="SolutionsProjectsCategoriesList">
        <div class="SolutionsProjectsCategoriesList-wrapper">
            <div class="SolutionsProjectsCategoriesList-header">
                <div class="SolutionsProjectsCategoriesList-headerSearch">
                    <CommonSearchInput
                        v-model="searchInput"
                        :placeholder="$translations.searchByKeywords()"
                        search-id="solutionsProjectsSearch"
                        @on-search-input="onSearch"
                    />
                </div>
                <div class="SolutionsProjectsCategoriesList-headerFilters">
                    <div
                        class="SolutionsProjectsCategoriesList-headerFiltersProducts"
                    >
                        <FilterSelect
                            v-model="activeCategory"
                            :options="getCategoriesOptions"
                        />
                    </div>
                    <div
                        class="SolutionsProjectsCategoriesList-headerFiltersLocations"
                    >
                        <FilterSelect
                            v-model="activeLocation"
                            :options="getLocationsOptions"
                        />
                    </div>
                </div>
                <div
                    class="SolutionsProjectsCategoriesList-headerFiltersIcon"
                    @click="openMobileFilters"
                >
                    <svg-icon name="mobile-filters-icon" />
                </div>
            </div>
            <div
                v-if="!isFiltered"
                class="SolutionsProjectsCategoriesList-list"
            >
                <div
                    v-for="(category, index) in categories"
                    :key="`${category.title}-${index}`"
                    class="SolutionsProjectsCategoriesList-listCategory"
                    :style="{ transitionDelay: `${0.05 * index}s` }"
                    :class="{ isActive: isItemShown }"
                >
                    <SolutionsProjectsCategory :category="category" />
                </div>
            </div>
            <div
                v-else
                class="SolutionsProjectsCategoriesList-list SolutionsProjectsCategoriesList-list--isFiltered"
            >
                <!-- TODO: replace text -->
                <div
                    class="SolutionsProjectsCategoriesList-listTitle"
                    v-text="getCountResults + ` results`"
                ></div>
                <div class="SolutionsProjectsCategoriesList-listProjects">
                    <div
                        v-for="(project, index) in getProjects"
                        :key="index"
                        class="SolutionsProjectsCategoriesList-listProject"
                        :style="{ transitionDelay: `${0.05 * index}s` }"
                        :class="{ isActive: isItemShown }"
                    >
                        <SolutionsProjectsCategoryItem :project="project" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SolutionsProjectsCategory from '@/components/SolutionsProjectsCategory';
import CommonSearchInput from '@/components/CommonSearchInput';
import { mapActions, mapMutations, mapState } from 'vuex';
import FilterSelect from '@/components/FilterSelect';
import SolutionsProjectsCategoryItem from '@/components/SolutionsProjectsCategoryItem';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'SolutionsProjectsCategoriesList',

    components: {
        SolutionsProjectsCategoryItem,
        FilterSelect,
        CommonSearchInput,
        SolutionsProjectsCategory
    },

    props: {
        categories: {
            type: Array,
            required: true
        },
        filters: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isItemShown: false,
            searchInput: '',
            activeCategory: 'allProducts',
            activeLocation: 'allLocations',
            activeSearch: '',
            startValuesFilter: {
                products: 'allProducts',
                locations: 'allLocations'
            }
        };
    },

    computed: {
        getCategoriesOptions() {
            const options = [];

            options.push(this.getActiveValueFilter('products'));

            this.filters.categories.forEach((item) => {
                options.push(this.getMappedOption(item));
            });

            return options;
        },

        getLocationsOptions() {
            const options = [];

            options.push(this.getActiveValueFilter('locations'));

            this.filters.locations.forEach((item) => {
                options.push(this.getMappedOption(item));
            });

            return options;
        },

        isFiltered() {
            return (
                !!this.activeSearch ||
                this.activeCategory !== 'allProducts' ||
                this.activeLocation !== 'allLocations'
            );
        },

        getCountResults() {
            let count = 0;

            this.categories.forEach((category) => {
                count += category.projects.length;
            });

            return count;
        },

        getProjects() {
            const projects = [];

            this.categories.forEach((category) => {
                category.projects.forEach((project) => {
                    projects.push(project);
                });
            });

            return projects;
        },
        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        searchInput(val) {
            this.onSearch(val);
        },
        activeLocation() {
            this.fetchNewProjects();
        },
        activeCategory() {
            this.fetchNewProjects();
        }
    },

    mounted() {
        this.isItemShown = true;

        this.$root.$on(
            VUE_CUSTOM_EVENTS.fetchSolutionsProjects,
            this.mobileFetchNewProjects
        );

        this.$root.$on(
            VUE_CUSTOM_EVENTS.solutionsProjectsFiltersMounted,
            this.setMobileFilterValues
        );
    },

    destroyed() {
        this.$root.$off(
            VUE_CUSTOM_EVENTS.fetchSolutionsProjects,
            this.mobileFetchNewProjects
        );

        this.$root.$off(
            VUE_CUSTOM_EVENTS.solutionsProjectsFiltersMounted,
            this.setMobileFilterValues
        );
    },

    methods: {
        getActiveValueFilter(type) {
            const translate =
                type === 'locations'
                    ? this.$translations.allLocations()
                    : this.$translations.allProducts();

            return {
                name: this.$translations.textShow() + ' ' + translate,
                value: this.startValuesFilter[type]
            };
        },

        getMappedOption(item) {
            return {
                name: this.$translations.textShow() + ' ' + item.name,
                value: item.value
            };
        },

        onSearch(val) {
            this.activeSearch = val;

            this.fetchNewProjects();
        },

        openMobileFilters() {
            this.openModalPopup({
                modalComponent: 'SolutionsProjectsMobileFilters',
                isPurple: true
            });
        },

        async fetchNewProjects() {
            const params = {};

            this.isItemShown = false;

            if (this.activeSearch) params.searchValue = this.activeSearch;

            params.currentFilterValues = this.mapActiveFilters();

            const projectsListResponse = await this.$axios.get(
                `${this.$config.baseURL}/${this.language}/${this.region}/solutions/projects`,
                { params }
            );

            if (!projectsListResponse) return;

            this.isItemShown = true;

            this.updateProjects(projectsListResponse.data);
        },

        mapActiveFilters() {
            return [
                {
                    id: 'category',
                    value: this.activeCategory
                },
                {
                    id: 'location',
                    value: this.activeLocation
                }
            ];
        },

        mobileFetchNewProjects({ category, location }) {
            this.activeCategory = category;
            this.activeLocation = location;

            this.fetchNewProjects();
        },

        setMobileFilterValues() {
            this.$root.$emit(VUE_CUSTOM_EVENTS.setMobileFilterValues, {
                category: this.activeCategory,
                location: this.activeLocation
            });
        },

        ...mapMutations({
            updateProjects: 'solutions-projects/updateProjects'
        }),

        ...mapActions({
            openModalPopup: 'modal-popup/openModalPopup'
        })
    }
};
</script>

<style lang="scss">
.SolutionsProjectsCategoriesList {
    $component: &;

    display: flex;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 24px;

    @include mobile {
        margin-top: 30px;
        margin-bottom: 75px;
    }

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        border-bottom: 1px solid $c-gray--shadow;

        @include mobile {
            border-bottom: none;
            align-items: flex-start;
        }

        &Search {
            display: flex;
            margin-bottom: -1px;
            width: (360 * 100% / 1160);

            @include mobile {
                width: calc(100% - 40px);
                margin-bottom: 0;
            }
        }

        &Filters {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            padding-bottom: 9px;

            @include mobile {
                padding-bottom: 0;
            }

            &Products {
                display: flex;

                @include mobile {
                    display: none;
                }
            }

            &Locations {
                display: flex;
                margin-left: 34px;

                @include mobile {
                    display: none;
                }
            }

            &Icon {
                display: none;
                width: 20px;
                height: 18px;
                margin-top: 2px;

                @include mobile {
                    display: flex;
                }
            }
        }
    }

    &-list {
        width: 100%;
        display: flex;
        margin-top: 27px;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        @include mobile {
            margin-top: 18px;
        }

        &--isFiltered {
            align-items: center;
        }

        &Title {
            @include title-bordered-h2;

            color: $c-black;
        }

        &Projects {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: flex-start;
            margin-top: 40px;

            @include mobile {
                margin-top: 20px;
            }
        }

        &Project {
            width: (360 * 100% / 1160);
            margin-left: (40 * 100% / 1160);
            display: flex;
            opacity: 0;
            transition: none;

            @include mobile {
                width: 100%;
                margin-left: 0 !important;
                margin-top: 20px;
            }

            &.isActive {
                opacity: 1;
                transition-duration: $d-productShow;
                transition-property: opacity;
            }

            &:first-child {
                margin-top: 0;
            }

            &:nth-child(3n + 1) {
                margin-left: 0;
            }

            &:nth-child(n + 4) {
                margin-top: 40px;

                @include tablet {
                    margin-top: 30px;
                }

                @include mobile {
                    margin-top: 20px;
                }
            }
        }

        &Category {
            display: flex;
            margin-top: 11px;
            width: 100%;
            opacity: 0;
            transition: none;

            &.isActive {
                opacity: 1;
                transition-duration: $d-productShow;
                transition-property: opacity;
            }

            &:first-child {
                margin-top: 0 !important;
            }

            @include mobile {
                margin-top: 33px;
            }
        }
    }
}
</style>
