<template>
    <section class="ProductPopupDrawersCommonTables">
        <div class="ProductPopupDrawersCommonTables-header">
            <div class="ProductPopupDrawersCommonTables-headerSearch">
                <CommonSearchInput
                    v-model="searchInput"
                    :placeholder="$translations.searchByKeywords()"
                    :search-id="type"
                    @on-search-input="onSearch"
                ></CommonSearchInput>
            </div>
            <RoundedButton
                type="isBlack"
                :link="{
                    url: content.csvLink,
                    title: $translations.importAsCSV(),
                    isDownload: true
                }"
            ></RoundedButton>
        </div>
        <div class="ProductPopupDrawersCommonTables-sections">
            <div
                v-for="(table, key) in content.sections"
                :key="key"
                class="ProductPopupDrawersCommonTables-section"
            >
                <common-data-table
                    :table="table"
                    :type="type"
                ></common-data-table>
            </div>
        </div>
        <!-- eslint-disable -->
        <div
            v-if="content.notes"
            class="ProductPopupDrawersCommonTables-notes"
            v-html="content.notes"
        ></div>
        <!-- eslint-enable -->
    </section>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';
import CommonDataTable from '@/components/CommonDataTable';
import CommonSearchInput from '@/components/CommonSearchInput';

import { mapMutations, mapState } from 'vuex';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'ProductPopupDrawersCommonTables',

    components: { RoundedButton, CommonDataTable, CommonSearchInput },

    props: {
        content: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            searchInput: ''
        };
    },

    computed: {
        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        searchInput(val) {
            this.onSearch(val);
        }
    },

    methods: {
        onSearch(val) {
            this.$root.$emit(VUE_CUSTOM_EVENTS.clearTablesSorts);

            this.$axios
                .get(
                    `${this.$config.baseURL}/${this.language}/${this.region}/products/${this.$route.params.slug}/${this.$route.params.popupSlug}/data-tables/${this.type}`,
                    {
                        params: {
                            searchValue: val
                        }
                    }
                )
                .then((response) => {
                    this.updateDrawerItem({
                        modifier: 'all',
                        type: this.type,
                        content: response.data
                    });

                    setTimeout(() => {
                        this.$emit('resize');
                    }, 200);
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.log(error);
                    this.errored = true;
                });
        },

        ...mapMutations({
            updateDrawerItem: 'drawers/updateDrawerItem'
        })
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupDrawersCommonTables {
    $component: &;

    width: 100%;
    position: relative;

    @include mobile {
        padding: 0 20px;
    }

    &-header {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        margin-bottom: 36px;

        @include mobile {
            flex-direction: column;
            margin-bottom: 23px;
            justify-content: flex-start;
            align-items: center;
        }

        &Search {
            width: (280 * 100% / 1160);

            @include mobile {
                width: 100%;
            }
        }

        & a {
            @include mobile {
                width: 100%;
                max-width: 280px;
                margin-top: 20px;
            }
        }
    }

    &-sections {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
    }

    &-section {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 35px;

        @include mobile {
            margin-top: 42px;
        }

        &:first-of-type {
            margin-top: 0 !important;
        }
    }

    &-notes {
        @include text-light-same-mobile;

        color: $c-gray;
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        width: 80%;
        white-space: pre-wrap;

        @include mobile {
            width: 100%;
        }
    }
}
</style>
