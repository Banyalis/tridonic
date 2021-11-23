<template>
    <div class="AlternativesPage">
        <InternalHeader :top-title="internalHeader.topTitle">
            <div class="AlternativesForm">
                <div class="AlternativesForm-label">
                    {{ $translations.enterArticleNumber() }}
                </div>
                <div class="AlternativesForm-fieldWrapper">
                    <input
                        v-for="i in 8"
                        :key="i"
                        :ref="`code-${i}`"
                        v-model="code[i]"
                        class="AlternativesForm-field"
                        type="text"
                        placeholder="0"
                        min="0"
                        max="9"
                        @input="handleInput"
                        @keydown="handleArrowKeys"
                        @keyup="handleDeleteKey"
                        @paste="handlePaste"
                    />
                </div>
                <div class="AlternativesForm-button">
                    <RoundedButton
                        :text="$translations.searchAlternatives()"
                        type="isWhiteFilled"
                        @click="handleSearch"
                    />
                </div>
            </div>
        </InternalHeader>

        <div class="AlternativesPage-content b-container">
            <div v-if="products" class="AlternativesPage-resultProducts">
                <div
                    class="AlternativesPage-resultProductsTitle"
                    v-text="$translations.titlePhasedOutProduct()"
                />
                <div class="AlternativesPage-resultProductsSections">
                    <div class="AlternativesPage-resultProductsSection">
                        <div
                            class="AlternativesPage-resultProductsSectionTitle"
                            v-text="$translations.titleReplacementProduct()"
                        />

                        <div class="AlternativesPage-resultProductsCards">
                            <div class="AlternativesPage-resultProductsCard">
                                <product-item
                                    :product="products.replacement[0]"
                                    :is-comparable="false"
                                ></product-item>
                            </div>
                        </div>
                    </div>

                    <div class="AlternativesPage-resultProductsSection">
                        <div
                            class="AlternativesPage-resultProductsSectionTitle"
                            v-text="$translations.titleAlternativeProduct()"
                        />

                        <div class="AlternativesPage-resultProductsCards">
                            <div
                                v-for="(productItem,
                                key) in products.alternatives"
                                :key="`products-alternativites-${key}`"
                                class="AlternativesPage-resultProductsCard"
                            >
                                <product-item
                                    :product="products.alternatives[key]"
                                    :is-comparable="false"
                                ></product-item>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!emptySearch" class="AlternativesPage-contentColumns">
                <div
                    v-for="(contentColumn, idx) in contentColumns"
                    :key="`content-column-${idx}`"
                    class="AlternativesPage-contentColumnsItem"
                >
                    <div class="AlternativesPage-contentColumnsItemTitle">
                        {{ contentColumn.title }}
                    </div>
                    <p class="AlternativesPage-contentColumnsItemText">
                        {{ contentColumn.text }}
                    </p>

                    <svg-icon
                        name="arrow-big-right"
                        class="AlternativesPage-contentColumnsItemIcon"
                    />
                </div>
            </div>
            <div v-if="emptySearch" class="AlternativesPage-emptySearch">
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
import RoundedButton from '@/components/RoundedButton';
import CommonEmptySearchMessage from '@/components/CommonEmptySearchMessage';
import AnchorLinks from '@/components/AnchorLinks';

import ProductItem from '@/components/ProductItem';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    layout: 'page',
    components: {
        InternalHeader,
        RoundedButton,
        CommonEmptySearchMessage,
        AnchorLinks,

        ProductItem
    },

    mixins: [mixinOpenPopup],

    async fetch({ $config: { baseURL }, store }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const language = store.state.locale.language;
        const region = store.state.locale.region;

        const [faqPage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/support/alternatives`),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/alternatives`
            )
        ]);

        store.commit('alternatives/init', faqPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    data() {
        return {
            code: []
        };
    },

    computed: {
        ...mapState('alternatives', [
            'internalHeader',
            'contentColumns',
            'products',
            'emptySearch'
        ]),
        ...mapState('anchor-links', ['anchorLinks']),
        ...mapState('locale', ['language', 'region'])
    },

    methods: {
        getIndexEl(el) {
            if (!el) {
                return -1;
            }

            let index = 0;
            do {
                index++;
            } while ((el = el.previousElementSibling));

            return index;
        },

        handlePaste(evt) {
            const paste = (event.clipboardData || window.clipboardData).getData(
                'text'
            );
            // To fired this event after input and replace text
            setTimeout(() => {
                let pasteDigits = paste.split('');
                pasteDigits = pasteDigits.map((item) => {
                    return item.replace(/[^0-9]/g, '');
                });
                pasteDigits.unshift(null);

                this.code = pasteDigits;
            }, 10);
        },

        handleInput(evt) {
            const index = this.getIndexEl(evt.target);

            let newValue = evt.target.value.replace(/[^0-9]/g, '');
            newValue = newValue.split('').pop();

            this.code[index] = newValue;

            if (newValue) {
                const nextField = evt.target.nextElementSibling;
                if (nextField === null) return;

                nextField.focus();
            }
        },

        handleArrowKeys(evt) {
            // arrow left, arrow right & backspace / delete key codes
            if ([37, 39].includes(evt.keyCode)) {
                evt.preventDefault();

                let nextPrevField = null;

                if (evt.keyCode === 37) {
                    nextPrevField = evt.target.previousElementSibling;
                } else if (evt.keyCode === 39) {
                    nextPrevField = evt.target.nextElementSibling;
                }

                if (nextPrevField === null) return;
                nextPrevField.focus();
            }
        },

        handleDeleteKey(evt) {
            // backspace / delete key codes
            let nextPrevField = null;

            if (evt.keyCode === 8) {
                nextPrevField = evt.target.previousElementSibling;
            }

            if (nextPrevField === null) return;
            nextPrevField.focus();
        },

        handleSearch() {
            const articleNumbers = this.code.filter(Boolean);

            if (articleNumbers.length === 8) {
                const articleNumber = articleNumbers.join('');

                this.$axios
                    .get(
                        `${this.$config.baseURL}/${this.language}/${this.region}/support/alternatives`,
                        {
                            params: {
                                searchValue: articleNumber
                            }
                        }
                    )
                    .then((response) => {
                        if (response.data.products) {
                            this.updateAlternatives({
                                products: response.data.products
                            });
                        } else {
                            this.emptyAlternatives({
                                emptySearch: response.data.emptySearch
                            });
                        }
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                        this.errored = true;
                    });
            }
        },

        ...mapMutations({
            updateAlternatives: 'alternatives/update',
            emptyAlternatives: 'alternatives/empty'
        })
    },

    head() {
        return {
            title: 'Alternatives & Replacements'
        };
    }
};
</script>

<style lang="scss">
.AlternativesPage {
    &-content {
        padding-top: 80px;
        padding-bottom: 120px;

        @include mobile {
            padding-top: 40px;
            padding-bottom: 60px;
        }
    }

    &-contentColumns {
        color: $c-black;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;

        @include mobile {
            flex-direction: column;
            align-items: center;
        }
    }

    &-contentColumnsItem {
        width: (360 * 100% / 1160);
        padding: 26px 0 0;
        position: relative;

        @include mobile {
            width: 100%;
        }

        &::before {
            background: $c-black;
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            height: 2px;
            width: 40px;
        }

        @include hover {
            &:hover {
                .AlternativesPage-contentColumnsItemTitle {
                    color: $c-blue;
                }

                .AlternativesPage-contentColumnsItemIcon {
                    fill: $c-blue;
                }
            }
        }

        @include mobile {
            margin-bottom: 40px;
            padding-top: 16px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    &-contentColumnsItemTitle {
        font-size: 32px;
        font-weight: $fw-normal;
        letter-spacing: -0.5px;
        line-height: calc(40 / 32);
        margin: 0 0 17px;
        transition: $d-hover color;

        @include mobile {
            font-size: 24px;
            letter-spacing: -0.2px;
            line-height: calc(30 / 24);
        }
    }

    &-contentColumnsItemText {
        font-size: 14px;
        letter-spacing: 0;
        line-height: calc(20 / 14);
        margin: 0 0 18px;

        @include mobile {
            margin: 0 0 15px;
        }
    }

    &-contentColumnsItemIcon {
        fill: $c-purple;
        height: 34px;
        width: 50px;
        transition: $d-hover fill;

        @include mobile {
            height: 20px;
            width: 32px;
        }
    }

    &-resultProducts {
        margin: 0 auto 100px;
        max-width: 840px;

        @include mobile {
            margin-bottom: 60px;
        }
    }

    &-resultProductsTitle {
        color: $c-black;
        font-size: 32px;
        letter-spacing: -0.5px;
        line-height: calc(40 / 32);
        margin: 0 auto 32px;
        text-align: center;

        @include mobile {
            font-size: 18px;
            letter-spacing: 0;
            line-height: calc(20 / 18);
        }
    }

    &-resultProductsSections {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;

        @include mobile {
            flex-direction: column;
            align-items: center;
            margin: 0 -20px;
            overflow: hidden;
        }
    }

    &-resultProductsSection {
        background: $c-gray--bg;
        border-radius: 10px;
        padding: 23px 20px 20px;
        min-width: 280px;

        @include mobile {
            margin-bottom: 20px;
            min-width: 200px;
        }
    }

    &-resultProductsSectionTitle {
        font-size: 18px;
        color: $c-black;
        letter-spacing: 0;
        margin: 0 0 17px;
        text-align: center;
        line-height: calc(20 / 18);
    }

    &-resultProductsCards {
        display: flex;
        margin: 0 auto;

        @include mobile {
            justify-content: center;
        }
    }

    &-resultProductsCard {
        width: 240px;

        @include mobile {
            width: (160 * 100vw / 320);
        }
    }
}

.AlternativesForm {
    color: #fff;
    text-align: center;
    margin: 58px auto 32px;

    @include mobile {
        margin: 25px auto;
    }

    &-label {
        font-size: 18px;
        letter-spacing: 0;
        line-height: calc(30 / 18);

        @include mobile {
            font-size: 14px;
            line-height: calc(20 / 14);
        }
    }

    &-fieldWrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        margin: 12px auto 40px;
        max-width: 940px;

        @include mobile {
            margin: 20px auto 40px;
            max-width: 360px;
        }
    }

    &-field {
        background: transparent;
        border: 0;
        border-bottom: 2px solid #fff;
        color: #fff;
        font-size: 96px;
        font-family: $family-primary;
        font-weight: $fw-light;
        letter-spacing: -2.4px;
        outline: none;
        text-align: center;
        width: 100px;

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &::-webkit-input-placeholder {
            color: rgba(255, 255, 255, 0.25);
        }

        &::-moz-placeholder {
            color: rgba(255, 255, 255, 0.25);
        }

        &:-ms-input-placeholder {
            color: rgba(255, 255, 255, 0.25);
        }

        &:-moz-placeholder {
            color: rgba(255, 255, 255, 0.25);
        }

        @include mobile {
            font-size: 24px;
            font-weight: $fw-normal;
            letter-spacing: -0.2px;
            width: 30px;
        }
    }

    &-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
