<template>
    <div class="FAQPage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :has-background="false"
        />

        <div class="FAQPage-main b-container">
            <div class="FAQPage-header">
                <div class="FAQPage-search">
                    <CommonSearchInput
                        placeholder="Search by keywords"
                        search-id="faq"
                        type="faq"
                        @on-search-input="handleSearch"
                    />
                </div>

                <div class="FAQPage-headerNote">
                    <span class="FAQPage-headerNoteText">
                        {{ notes.text }}
                    </span>
                    <a class="FAQPage-headerNoteLink" :href="notes.link.url">
                        {{ notes.link.title }}
                    </a>
                </div>
            </div>

            <div v-if="!emptySearch" class="FAQPage-contentWrapper">
                <ul class="FAQPage-categories">
                    <li
                        v-for="(category, idc) in categories"
                        :key="`faq-category-${idc}`"
                        class="FAQPage-categoriesItem"
                    >
                        <nuxt-link
                            :to="category.link"
                            class="FAQPage-categoriesLink"
                            :class="{
                                isActive:
                                    category.slug === currentFAQCategorySlug
                            }"
                        >
                            {{ category.title }}
                        </nuxt-link>
                    </li>
                </ul>
                <div class="FAQPage-content">
                    <ul class="FAQList">
                        <li
                            v-for="(item, idq) in questions"
                            :key="`faq-item-${idq}`"
                            :ref="`faq-item-${idq}`"
                            class="FAQList-item"
                            :class="{
                                isOpened:
                                    !!questionsOpenState.length &&
                                    questionsOpenState[idq].isOpened
                            }"
                        >
                            <div
                                class="FAQList-itemTitleWrapper"
                                @click="toggleItem(idq, item)"
                            >
                                <div class="FAQList-itemTitle">
                                    {{ item.title }}
                                </div>
                                <div class="FAQList-itemIcon">
                                    <svg-icon name="icon-plus" />
                                </div>
                            </div>

                            <div class="FAQList-itemContent">
                                <template v-for="(block, idb) in item.content">
                                    <!-- eslint-disable -->
                                    <TextContent
                                        v-if="block.type === 'text'"
                                        :key="`text-section-${idb}`"
                                        v-html="block.html"
                                    />
                                    <!-- eslint-enable -->

                                    <CommonVideo
                                        v-if="block.type === 'video'"
                                        :key="`video-${idb}`"
                                        :video="block.video"
                                    />
                                </template>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div v-if="emptySearch" class="FAQPage-emptySearch">
                <CommonEmptySearchMessage :empty-search="emptySearch" />
            </div>
        </div>

        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapState } from 'vuex';

import InternalHeader from '@/components/InternalHeader';
import CommonSearchInput from '@/components/CommonSearchInput';
import CommonEmptySearchMessage from '@/components/CommonEmptySearchMessage';
import TextContent from '@/components/TextContent';
import CommonVideo from '@/components/CommonVideo';
import AnchorLinks from '@/components/AnchorLinks';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    layout: 'page',
    components: {
        InternalHeader,
        CommonSearchInput,
        CommonEmptySearchMessage,
        TextContent,
        CommonVideo,
        AnchorLinks
    },

    mixin: [mixinOpenPopup],

    async fetch({ $config: { baseURL }, store }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const language = store.state.locale.language;
        const region = store.state.locale.region;

        const [faqPage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/support/faq`),
            axios.get(`${baseURL}/${language}/${region}/anchor-links/faq`)
        ]);

        store.commit('faq/init', faqPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    data() {
        return {
            currentFAQCategorySlug: '/',
            questionsOpenState: []
        };
    },

    computed: {
        ...mapState('faq', [
            'internalHeader',
            'notes',
            'categories',
            'questions',
            'emptySearch'
        ]),
        ...mapState('anchor-links', ['anchorLinks']),
        ...mapState('locale', ['language', 'region'])
    },

    mounted() {
        this.resetOpenStates();
    },

    methods: {
        resetOpenStates() {
            this.questionsOpenState = this.questions.map((q, index) => {
                return {
                    isOpened: false
                };
            });
        },

        toggleItem(key, item) {
            this.resetOpenStates();
            this.questionsOpenState[key].isOpened = true;
        },

        handleSearch(val) {
            this.$axios
                .get(
                    `${this.$config.baseURL}/${this.language}/${this.region}/support/faq`,
                    {
                        params: {
                            searchValue: val
                        }
                    }
                )
                .then((response) => {
                    if (response.data.questions) {
                        this.updateFAQ({
                            questions: response.data.questions
                        });

                        this.currentFAQCategorySlug = null;
                        this.resetOpenStates();
                    } else {
                        this.emptyFAQ({
                            emptySearch: response.data.emptySearch
                        });
                    }
                })
                .catch((error) => {
                    // eslint-disable-next-line
                    console.error(error);
                    this.errored = true;
                });
        },

        ...mapMutations({
            updateFAQ: 'faq/update',
            emptyFAQ: 'faq/empty'
        })
    },

    head() {
        return {
            title: 'FAQs'
        };
    }
};
</script>

<style lang="scss">
.FAQPage {
    &-main {
        padding-bottom: 80px;

        @include mobile {
            padding-bottom: 40px;
        }
    }

    &-header {
        border-bottom: 1px solid $c-gray--divider;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;

        @include mobile {
            border-bottom: 0;
        }
    }

    &-search {
        width: (280 * 100% / 1160);
        margin-bottom: -1px;

        @include mobile {
            margin: 0;
            width: 100%;
        }
    }

    &-headerNote {
        display: flex;
        font-size: 14px;
        line-height: calc(20 / 14);
        margin-left: auto;
        margin-bottom: 10px;

        @include mobile {
            display: none;
        }
    }

    &-headerNoteText {
        color: $c-gray--text;
        letter-spacing: 0;
        margin-right: 10px;
    }

    &-headerNoteLink {
        font-weight: $fw-medium;
        color: $c-purple;
        letter-spacing: 0;
    }

    &-contentWrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }

    &-categories {
        @include u-noList;

        margin-top: 20px;
        width: (280 * 100% / 1160);

        @include mobile {
            display: none;
        }
    }

    &-categoriesItem {
        color: $c-gray--text;
        font-size: 14px;
        letter-spacing: 0;
        line-height: calc(20 / 14);
    }

    &-categoriesLink {
        border-bottom: 1px solid $c-gray-products--border;
        color: $c-gray--text;
        display: flex;
        padding: 9px 0;
        position: relative;
        text-decoration: none;

        &.isActive {
            color: $c-purple;
            font-weight: $fw-medium;

            &::after {
                background: $c-purple;
                content: '';
                height: 2px;
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
            }
        }
    }

    &-content {
        @media (min-width: $bp-tablet) {
            margin: 0;
            width: (760 * 100% / 1160);
        }

        @include mobile {
            margin: 30px auto 0;
        }
    }
}

.FAQList {
    &-item {
        border-bottom: 1px solid $c-gray-products--border;

        &.isOpened .FAQList-itemContent {
            max-height: 999px;
        }
    }

    &-itemTitleWrapper {
        color: $c-black;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;

        @include hover {
            &:hover {
                color: $c-blue;

                .FAQList-itemIcon {
                    transform: scale(1);
                }

                .FAQList-itemIcon svg {
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        }

        @include mobile {
            padding: 10px 0;
        }
    }

    &-itemTitle {
        font-size: 24px;
        letter-spacing: -0.2px;
        line-height: calc(30 / 24);
        margin-right: 20px;
        transition: $d-hover color;

        @include mobile {
            font-size: 14px;
            font-weight: $fw-medium;
            letter-spacing: 0;
            line-height: calc(20 / 14);
        }
    }

    &-itemIcon {
        flex-shrink: 0;
        margin: auto 0;
        height: 40px;
        width: 40px;
        position: relative;
        overflow: hidden;
        transform: scale(0.7);

        transition: $d-hover transform;

        @include mobile {
            height: 26px;
            width: 26px;
        }

        svg {
            fill: currentColor;
            height: 40px;
            width: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1.43);

            transition: $d-hover transform, $d-hover fill;

            @include mobile {
                height: 26px;
                width: 26px;
            }
        }
    }

    &-itemContent {
        overflow: hidden;
        max-height: 0;
        transition: 0.2s max-height;

        .CommonVideo {
            margin-bottom: 30px;

            @include mobile {
                margin-bottom: 20px;
            }
        }
    }
}
</style>
