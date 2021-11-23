<template>
    <section class="ProductPopupDrawersDownloads">
        <div class="ProductPopupDrawersDownloads-header">
            <div class="ProductPopupDrawersDownloads-headerSearch">
                <CommonSearchInput
                    v-model="searchInput"
                    :placeholder="$translations.searchByKeywords()"
                    :search-id="type"
                    @on-search-input="onSearch"
                ></CommonSearchInput>
            </div>
            <RoundedButton
                type="isPurple"
                :class="{ isShown: !!countSelected }"
                :text="`${$translations.downloadSelected()} / ${countSelected}`"
                @click="onDownload"
            ></RoundedButton>
        </div>
        <div class="ProductPopupDrawersDownloads-table">
            <common-downloads
                :downloads="content.files"
                @on-select-files="onSelectFiles"
            ></common-downloads>
        </div>
    </section>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';
import CommonSearchInput from '@/components/CommonSearchInput';

import { mapMutations, mapState } from 'vuex';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import CommonDownloads from '@/components/CommonDownloads';

export default {
    name: 'ProductPopupDrawersDownloads',

    components: {
        CommonDownloads,
        RoundedButton,
        CommonSearchInput
    },

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
            countSelected: 0,
            files: [],
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
                    `${this.$config.baseURL}/${this.language}/${this.region}/products/${this.$route.params.slug}/${this.$route.params.popupSlug}/data-tables/downloads`,
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

        onSelectFiles(files) {
            this.countSelected = files.length;
            this.files = [...files];

            setTimeout(() => {
                this.$emit('resize');
            }, 200);
        },

        onDownload() {
            let isHasLocked = false;
            const lockedFiles = [];

            this.files.forEach((file) => {
                if (file.isLocked) {
                    lockedFiles.push(file);
                    isHasLocked = true;
                } else {
                    window.open(file.link, '_self');
                }
            });

            if (isHasLocked) {
                this.updateFiles(lockedFiles);
                this.$router.push('/get-access');
            }
        },

        ...mapMutations({
            updateDrawerItem: 'drawers/updateDrawerItem',
            updateFiles: 'get-access-files/updateFiles'
        })
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupDrawersDownloads {
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

        & button {
            opacity: 0;
            pointer-events: none;

            &.isShown {
                opacity: 1;
                pointer-events: all;
                display: initial;
            }

            @include mobile {
                width: 100%;
                max-width: 280px;
                margin-top: 20px;
                display: none;
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
        flex-direction: row;
        width: 80%;
        white-space: pre-wrap;

        @include mobile {
            width: 100%;
        }
    }
}
</style>
