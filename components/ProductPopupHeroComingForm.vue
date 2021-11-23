<template>
    <div class="ProductPopupHeroComingForm" :class="{ isSubmitted }">
        <div v-if="!isSubmitted" class="ProductPopupHeroComingForm-wrapper">
            <div
                class="ProductPopupHeroComingForm-title"
                v-text="`${$translations.comingTitle()} ${comingDate}`"
            ></div>
            <div
                class="ProductPopupHeroComingForm-description"
                v-text="$translations.comingDescription()"
            ></div>
            <div class="ProductPopupHeroComingForm-form">
                <common-input-field
                    v-model="emailValue"
                    :name="`email-coming-soon`"
                    :type="`email`"
                    :placeholder="$translations.yourEmail()"
                    :is-required="true"
                    modifier="isSubscribeProduct"
                    :is-light-bg="true"
                    :error="error"
                ></common-input-field>
                <div class="ProductPopupHeroComingForm-formNotes">
                    {{
                        $translations.confirmTextSubscribeProduct()
                    }}&nbsp;<nuxt-link
                        to="/"
                        v-text="$translations.privacyPolicy()"
                    ></nuxt-link>
                </div>
                <rounded-button
                    :text="$translations.signUpForUpdates()"
                    type="isPurple"
                    @click="onSubmit"
                ></rounded-button>
            </div>
        </div>
        <div
            v-else
            class="ProductPopupHeroComingForm-thanks"
            v-text="$translations.thanksSubscribeComingSoonProduct()"
        ></div>
    </div>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';

import CommonInputField from '@/components/CommonInputField';
import { isValidEmail } from '@/utils/utils';
import { ERROR_CODES_FIELD } from '@/utils/constants';

export default {
    name: 'ProductPopupHeroComingForm',

    components: { CommonInputField, RoundedButton },

    props: {
        comingDate: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            emailValue: '',
            error: undefined,
            isSubmitted: false
        };
    },
    watch: {
        emailValue() {
            this.error = undefined;
        }
    },

    methods: {
        onSubmit() {
            if (this.onValidate()) {
                this.$axios
                    .post(
                        `${this.$config.baseURL}/${this.language}/${this.region}/products/${this.$route.params.slug}/${this.$route.params.popupSlug}/subscribe`,
                        {
                            email: this.emailValue.toLowerCase().trim()
                        }
                    )
                    .then(() => {
                        this.isSubmitted = true;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.log(error);
                        this.errored = true;
                    });
            }
        },

        onValidate() {
            const isEmpty = !this.emailValue;
            const isValid = isValidEmail(this.emailValue.toLowerCase().trim());

            if (isEmpty) {
                this.error = ERROR_CODES_FIELD.isEmpty;
            } else if (!isValid) {
                this.error = ERROR_CODES_FIELD.isNotValid;
            }

            return !isEmpty && isValid;
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupHeroComingForm {
    $component: &;

    display: flex;
    width: 100%;
    position: relative;
    padding: 0 0 40px;
    flex-direction: column;

    &.isSubmitted {
        background: transparent;
    }

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &-title {
        @include text-light-same-mobile-medium;

        width: 100%;
        color: $c-black;
    }

    &-description {
        @include text-light-same-mobile;

        width: 100%;
        color: $c-gray;
    }

    &-form {
        margin-top: 20px;

        @include mobile {
            margin-top: 25px;
        }

        &Notes {
            @include text-light-same-mobile;

            color: $c-gray;
            margin-top: 20px;

            @include mobile {
                margin-top: 25px;
            }

            & a {
                @include text-light-same-mobile-medium;

                color: $c-purple;
            }
        }

        & button {
            margin-top: 20px;

            @include mobile {
                width: 100%;
                margin-top: 40px;
            }
        }
    }

    &-thanks {
        @include text;

        width: 100%;
        display: flex;
        color: $c-black;
    }
}
</style>
