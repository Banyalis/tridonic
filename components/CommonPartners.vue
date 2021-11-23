<template>
    <div
        class="CommonPartners"
        :class="[modifier ? `CommonPartners--${modifier}` : '']"
    >
        <div class="CommonPartners-panel">
            <div
                v-if="modifier"
                class="CommonPartners-panelTitle"
                v-text="$translations.partnersTitlePopup()"
            ></div>
            <div v-if="!modifier" class="CommonPartners-panelSearch">
                <CommonSearchInput
                    v-model="searchInput"
                    :placeholder="$translations.searchByKeywords()"
                    search-id="partners"
                    type="partners"
                    @on-search-input="getSearchResults"
                />
            </div>
            <div class="CommonPartners-panelFilters">
                <div class="CommonPartners-panelFiltersButton">
                    <svg-icon name="mobile-filters-icon"></svg-icon>
                </div>
                <div class="CommonPartners-panelFiltersInner">
                    <FilterSelect
                        v-if="!modifier"
                        v-model="currentCategory"
                        :options="categories"
                    />
                    <FilterSelect
                        v-model="currentLocation"
                        :options="locations"
                    />
                </div>
            </div>
        </div>
        <div
            v-for="(item, index) in partners"
            :key="index"
            class="CommonPartners-item"
        >
            <div v-if="index < limitBy" class="CommonPartners-itemInner">
                <div class="CommonPartners-itemImage">
                    <picture>
                        <source
                            :srcset="
                                item.image + ' 1x, ' + item.image2x + ' 2x'
                            "
                        />
                        <img :src="item.image" alt="" />
                    </picture>
                </div>
                <div class="CommonPartners-itemContent">
                    <div class="CommonPartners-itemHeader">
                        <div
                            class="CommonPartners-itemTitle"
                            v-text="item.title"
                        ></div>
                        <div
                            v-if="item.category"
                            class="CommonPartners-itemCategory"
                            v-text="item.category"
                        ></div>
                    </div>
                    <p
                        class="CommonPartners-itemDescription"
                        v-text="item.description"
                    ></p>
                    <div
                        v-if="item.address || item.phone"
                        class="CommonPartners-itemInfo"
                    >
                        <div
                            v-if="item.address"
                            class="CommonPartners-itemAddress"
                            v-text="item.address"
                        ></div>
                        <!-- eslint-disable -->
                        <div
                            v-if="item.phone"
                            class="CommonPartners-itemPhone"
                            v-html="item.phone"
                        ></div>
                        <!-- eslint-enable -->
                    </div>
                </div>
                <div class="CommonPartners-itemButtons">
                    <RoundedButton
                        v-if="item.linkEmail"
                        :link="{
                            url: item.linkEmail,
                            title: $translations.partnersButtonEmail()
                        }"
                        type="isBlack"
                    ></RoundedButton>
                    <RoundedButton
                        v-if="item.linkWebsite"
                        :link="{
                            url: item.linkWebsite,
                            title: $translations.partnersButtonWebsite()
                        }"
                        type="isBlack"
                    ></RoundedButton>
                    <RoundedButton
                        v-if="item.linkEshop"
                        :link="{
                            url: item.linkEshop,
                            title: $translations.partnersButtonEshop()
                        }"
                        type="isBlack"
                    ></RoundedButton>
                </div>
            </div>
        </div>
        <div v-if="partners.length > 4" class="CommonPartners-show">
            <RoundedButton
                :text="
                    limitBy === 4
                        ? $translations.partnersButtonShow()
                        : $translations.partnersButtonLess()
                "
                type="isBlack"
                @click="toggleMore(defaultLimit, partners.length)"
            ></RoundedButton>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import CommonSearchInput from '@/components/CommonSearchInput';
import FilterSelect from '@/components/FilterSelect';
import RoundedButton from '@/components/RoundedButton';

export default {
    name: 'CommonPartners',

    components: {
        CommonSearchInput,
        FilterSelect,
        RoundedButton
    },

    props: {
        modifier: {
            type: String,
            required: false,
            default: ''
        },
        partners: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            searchInput: '',
            currentCategory: 'all',
            categories: [
                {
                    value: 'all',
                    name: 'Show All Partners'
                },
                {
                    value: 'technology',
                    name: 'Technology / Lighting Solution Partners'
                },
                {
                    value: 'wholesalers',
                    name: 'Wholesalers & Distributors'
                },
                {
                    value: 'manufacturers',
                    name: 'Partner for Luminaire Manufacturers / OEMs'
                },
                {
                    value: 'research',
                    name: 'Research & Academia Partners'
                },
                {
                    value: 'standards',
                    name: 'Standards & Regulations'
                }
            ],
            currentLocation: 'all',
            locations: [
                {
                    value: 'all',
                    name: 'Show All Locations'
                },
                {
                    value: 'europe',
                    name: 'Europe'
                },
                {
                    value: 'americas',
                    name: 'Americas'
                },
                {
                    value: 'africa',
                    name: 'Africa'
                },
                {
                    value: 'middle-east',
                    name: 'Middle East'
                },
                {
                    value: 'asia',
                    name: 'Asia'
                },
                {
                    value: 'australia',
                    name: 'Australia'
                }
            ],
            defaultLimit: 4,
            limitBy: 4
        };
    },

    computed: {
        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        searchInput(val) {
            this.getSearchResults(val);
        }
    },

    methods: {
        getSearchResults(val) {
            this.$axios
                .get(
                    `${this.$config.baseURL}/${this.language}/${this.region}/partners`,
                    {
                        params: {
                            searchValue: val
                        }
                    }
                )
                .then((response) => {
                    this.updatePartners({
                        partners: response.data.partners
                    });
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.errored = true;
                });
        },

        toggleMore(defaultLimit, partnersLength) {
            this.limitBy =
                this.limitBy === defaultLimit ? partnersLength : defaultLimit;
        },

        ...mapMutations({
            updatePartners: 'partners/update'
        })
    }
};
</script>

<style lang="scss" scoped>
.CommonPartners {
    $component: &;

    &-panel {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid $c-gray--shadow;

        @include mobile {
            align-items: center !important;
            border-bottom: none;
        }

        &Search {
            width: (360 * 100% / 1160);
            margin-bottom: -1px;

            @include mobile {
                width: 240px;
                margin-bottom: 0;
            }
        }

        &Title {
            @include title-h2;

            color: $c-black;
        }

        &Filters {
            &Button {
                display: none;

                @include mobile {
                    display: block;
                }
            }

            &Inner {
                display: flex;

                @include mobile {
                    display: none;
                }
            }
        }
    }

    &-item {
        &Inner {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            padding: 35px 0;
            border-bottom: 1px solid $c-gray--shadow;

            @include mobile {
                padding: 22px 0 40px;
                position: relative;
            }
        }

        &Image {
            width: (200 * 100% / 1160);
            text-align: center;

            @include mobile {
                position: absolute;
                top: 24px;
                width: 40px !important;
            }
        }

        &Content {
            width: (500 * 100% / 1160);

            @include mobile {
                width: 100% !important;
            }
        }

        &Header {
            @include mobile {
                margin-left: 60px;
            }
        }

        &Title {
            @include text;

            color: $c-black;

            @include mobile {
                margin-bottom: 7px;
                line-height: (20 / 18);
            }
        }

        &Category,
        &Description,
        &Address,
        &Phone {
            @include text-light;

            color: $c-gray--text;
        }

        &Description {
            margin-top: 20px;

            @include mobile {
                margin-top: 23px;
            }
        }

        &Info {
            margin-top: 20px;
        }

        &Address,
        &Phone {
            color: $c-black;
        }

        &Phone {
            & /deep/ a {
                color: $c-black;
                transition: color $d-hover ease-in-out;

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }
            }
        }

        &Buttons {
            display: flex;
            justify-content: flex-end;
            width: (340 * 100% / 1160);

            @include mobile {
                flex-direction: row !important;
                width: 100% !important;
                margin-top: 35px;
            }

            .RoundedButton {
                width: calc(50% - 10px);

                &:last-child {
                    margin-left: 20px;
                }
            }
        }
    }

    &-show {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    &--popup #{$component} {
        &-panel {
            align-items: flex-end;
            padding: 0 0 12px;
        }

        &-item {
            &Image {
                width: (120 * 100% / 760);
            }

            &Content {
                width: (440 * 100% / 760);
            }

            &Buttons {
                width: (120 * 100% / 760);
                flex-direction: column;

                .RoundedButton {
                    width: 100%;

                    @include mobile {
                        width: calc(50% - 10px);
                    }

                    &:last-child {
                        margin: 20px 0 0;

                        @include mobile {
                            margin: 0 0 0 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>
