<template>
    <section class="ProductPopupArticlesFilters">
        <div class="ProductPopupArticlesFilters-filtersTitle">
            <div
                v-if="!!filterList.length"
                class="ProductPopupArticlesFilters-filtersTitleOpen"
                @click="toggleFilters"
            >
                Filter the
                {{
                    currentItems !== countArticles || isFiltersChanged
                        ? `(${currentItems} of ${countArticles})`
                        : countArticles
                }}
                articles
                <!-- TODO: replace text -->
            </div>
            <div class="ProductPopupArticlesFilters-filtersTitleText">
                {{
                    !!filterList.length
                        ? ''
                        : $translations.articlesTitleFamilyPopup()
                }}&nbsp;{{ $translations.pluralizedFilterArticleText() }}
            </div>
        </div>
        <div
            v-if="!!filterList.length"
            class="ProductPopupArticlesFilters-wrapper"
        >
            <div
                class="ProductPopupArticlesFilters-clear"
                :class="{
                    isShow: currentItems !== countArticles || isFiltersChanged
                }"
            >
                <RoundedButton
                    type="isBlack"
                    :text="$translations.filtersResetAll()"
                    @click="resetAllFilters"
                ></RoundedButton>
            </div>
            <div
                ref="articlesFilters"
                class="ProductPopupArticlesFilters-filters"
                :class="{ isExpanded: isExpanded }"
            >
                <div
                    ref="articlesFiltersInner"
                    class="ProductPopupArticlesFilters-filtersInner"
                >
                    <div
                        v-for="(category, categoryKey) in filterList"
                        :key="categoryKey"
                        class="ProductPopupArticlesFilters-filtersCategory"
                    >
                        <div
                            v-for="(section, sectionKey) in category.sections"
                            :key="sectionKey"
                            class="ProductPopupArticlesFilters-filtersSection"
                        >
                            <div
                                class="ProductPopupArticlesFilters-filtersSectionTitle"
                                v-text="
                                    !!section.title
                                        ? section.title
                                        : filterList[categoryKey].title
                                "
                            ></div>
                            <div
                                class="ProductPopupArticlesFilters-filtersSectionItems"
                            >
                                <div
                                    v-for="(input,
                                    inputKey) in section.filterItems"
                                    :key="inputKey"
                                    class="ProductPopupArticlesFilters-filtersSectionItem"
                                >
                                    <input
                                        :id="input.id"
                                        v-model="inputValues[input.id]"
                                        type="checkbox"
                                        class="ProductPopupArticlesFilters-filtersSectionItemCheckbox"
                                        @change="
                                            onInputChange(
                                                categoryKey,
                                                sectionKey,
                                                input.id,
                                                inputValues[input.id]
                                            )
                                        "
                                    />
                                    <label
                                        :for="input.id"
                                        class="ProductPopupArticlesFilters-filtersSectionItemLabel"
                                        v-text="input.title"
                                    ></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';
import { mapActions, mapMutations, mapState } from 'vuex';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import { isMobile, mapFilters } from '@/utils/utils';

export default {
    name: 'ProductPopupArticlesFilters',

    components: { RoundedButton },

    props: {
        filterList: {
            type: Array,
            required: true
        },
        countArticles: {
            type: Number,
            required: true
        },
        currentItems: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            isExpanded: false,
            inputValues: {},
            isMobileLayout: false
        };
    },

    computed: {
        isFiltersChanged() {
            return Object.values(this.inputValues).filter(
                (isSectionChanged) => !!isSectionChanged
            ).length;
        },
        ...mapState('locale', ['language', 'region']),
        ...mapState('filters', [
            'filterValues',
            'isPopup',
            'apiEvent',
            'previousFilterValuesMobile'
        ])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();

        this.$root.$on(
            VUE_CUSTOM_EVENTS.fetchPopupFamilyArticles,
            this.fetchNewArticles
        );

        this.$root.$on(
            VUE_CUSTOM_EVENTS.needPreselectedFilters,
            this.mapFilterPreselected
        );

        !this.isMobileLayout && this.mapFilterPreselected();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);

        this.$root.$off(
            VUE_CUSTOM_EVENTS.fetchPopupFamilyArticles,
            this.fetchNewArticles
        );
    },

    methods: {
        toggleFilters() {
            if (this.isMobileLayout) {
                this.openMobileFilters({
                    filterComponent: 'Filters',
                    needPreselected: !this.isFiltersMobileChanged()
                });
            } else {
                const filters = this.$refs.articlesFilters;
                const filtersInner = this.$refs.articlesFiltersInner;

                setTimeout(() => {
                    this.$emit('resize');
                }, 200);

                if (filters.style?.maxHeight) {
                    filters.style.maxHeight = null;
                    this.isExpanded = false;

                    return;
                }

                filters.style.maxHeight = `${filtersInner.scrollHeight}px`;
                this.isExpanded = true;
            }
        },

        onInputChange(categoryKey, sectionKey, filterId, inputModel) {
            this.updateFilterValue({
                categoryKey,
                sectionKey,
                filterId,
                filterValue: inputModel || null
            });
            this.$emit(VUE_CUSTOM_EVENTS.isFilterChanged, inputModel);
        },

        resetAllFilters() {
            this.resetAllFilterValues();
            this.inputValues = {};
        },

        fetchNewArticles() {
            const filters = mapFilters(this.filterValues, this.apiEvent);
            this.$axios
                .get(
                    `${this.$config.baseURL}/${this.language}/${this.region}/products/${this.$route.params.slug}/${this.$route.params.popupSlug}`,
                    {
                        params: {
                            currentFilterValues: filters
                        }
                    }
                )
                .then((response) => {
                    this.updatePopup(response.data);
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.errored = true;
                });
        },

        onResize() {
            this.isMobileLayout = isMobile();

            const filters = this.$refs.articlesFilters;
            const filtersInner = this.$refs.articlesFiltersInner;

            if (this.isExpanded) {
                filters.style.maxHeight = `${filtersInner.scrollHeight}px`;
            } else if (filters?.style?.maxHeight) {
                filters.style.maxHeight = null;
            }
        },

        mapFilterPreselected() {
            this.filterList.forEach((category, categoryId) => {
                category.sections.forEach((section, sectionId) => {
                    section.filterItems.forEach((input) => {
                        if (input.isPreselected) {
                            if (!this.isMobileLayout)
                                this.inputValues[input.id] = true;

                            this.onInputChange(
                                categoryId,
                                sectionId,
                                input.id,
                                true
                            );
                        }
                    });
                });
            });
        },

        isFiltersMobileChanged() {
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

        ...mapMutations({
            updateFilterValue: 'filters/updateFilterValue',
            resetAllFilterValues: 'filters/resetAllFilterValues',
            updatePopup: 'popup/updatePopup'
        }),

        ...mapActions({
            openMobileFilters: 'filters-mobile/openMobileFilters'
        })
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupArticlesFilters {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &-wrapper {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    &-clear {
        display: none;
        margin-top: 32px;
        transition: $d-hover opacity;

        &.isShow {
            display: flex;
        }
    }

    &-filters {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        max-height: 0;
        transition: $d-hover max-height;
        overflow: hidden;

        &.isExpanded {
            margin-bottom: 8px;
        }

        &Inner {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
        }

        &Title {
            @include title-small;

            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            @include mobile {
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
            }

            &Open {
                color: $c-purple;
                display: flex;
                cursor: pointer;
                border-bottom: 1px dashed $c-purple;
                transition: $d-hover color, $d-hover border-color;

                @include hover {
                    &:hover {
                        color: $c-blue;
                        border-color: $c-blue;
                    }
                }
            }

            &Text {
                color: $c-gray;
                display: flex;
            }
        }

        &Category {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            flex: 0 0 auto;
        }

        &Section {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            border-top: 1px solid #e4e4e4;
            flex: 0 0 auto;
            margin-top: 20px;

            &Title {
                @include text-small;

                color: $c-black;
                display: flex;
                width: (200 * 100% / 1160);
                flex: 0 0 auto;
                margin-top: 25px;
            }

            &Items {
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                width: (950 * 100% / 1160);
                flex: 1 1 auto;
            }

            &Item {
                display: flex;

                &Checkbox {
                    display: none;
                }

                &Label {
                    @include text-light-medium;

                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    color: $c-gray;
                    width: 140px;
                    padding: 10px 0;
                    cursor: pointer;
                    margin-left: 20px;
                    margin-top: 20px;
                    border-radius: 30px;
                    border: 1px solid $c-gray--borderOutline;
                    transition: $d-hover color, $d-hover border-color,
                        $d-hover background;

                    @include hover {
                        &:hover {
                            color: $c-white;
                            background: $c-purple;
                            border-color: $c-purple;
                        }
                    }

                    #{$component}-filtersSectionItemCheckbox:checked + & {
                        color: $c-white;
                        background: $c-purple;
                        border-color: $c-purple;
                    }
                }
            }
        }
    }
}
</style>
