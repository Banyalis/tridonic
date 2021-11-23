<template>
    <form
        method="post"
        class="ContactsPopupForm"
        :class="[
            isSubmitted ? 'isSubmitted' : '',
            modifier ? `ContactsPopupForm--${modifier}` : '',
            typeForm ? `ContactsPopupForm--${typeForm}` : ''
        ]"
    >
        <div class="ContactsPopupForm-fields">
            <div v-if="radios.length" class="ContactsPopupForm-radios">
                <div
                    v-if="radios[0].isRequired"
                    class="ContactsPopupForm-radiosRequired b-required-icon"
                    v-text="`*`"
                ></div>
                <div class="ContactsPopupForm-radiosWrapper">
                    <div
                        v-for="(radio, index) in radios"
                        :key="`${radio.name}-${index}`"
                        class="ContactsPopupForm-radio"
                    >
                        <CommonRadioInput
                            :id="radio.id"
                            v-model="formValues[radio.name]"
                            :title="radio.placeholder"
                            :name="radio.name"
                            :value="radio.value"
                            :error="error[radio.name]"
                        />
                    </div>
                    <div
                        v-if="!!error[radios[0].name]"
                        class="ContactsPopupForm-radiosErrored b-errored-field"
                        v-text="$translations.requiredField()"
                    ></div>
                </div>
            </div>
            <div
                v-for="field in fields"
                :key="field.name"
                class="ContactsPopupForm-field"
                :class="[`ContactsPopupForm-field--${field.name}`]"
            >
                <CommonInputField
                    v-model="formValues[field.name]"
                    :name="field.name"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    :is-required="field.isRequired"
                    :error="error[field.name]"
                />
            </div>
            <div
                v-for="(select, index) in selects"
                :key="`${select.name}-${index}`"
                class="ContactsPopupForm-field"
                :class="[`ContactsPopupForm-field--${select.name}`]"
            >
                <CommonSelectField
                    v-model="formValues[select.name]"
                    :options="select.options"
                    :placeholder="select.placeholder"
                    :is-required="select.isRequired"
                    :error="error[select.name]"
                />
            </div>
            <div
                v-if="message"
                class="ContactsPopupForm-field ContactsPopupForm-field--message"
            >
                <CommonTextAreaField
                    v-model="formValues[message.name]"
                    :name="message.name"
                    :placeholder="message.placeholder"
                    :is-required="message.isRequired"
                    :error="error[message.name]"
                />
            </div>
            <div
                v-if="fileField"
                class="ContactsPopupForm-field ContactsPopupForm-field--file"
            >
                <CommonUploadField
                    v-model="formValues[fileField.name]"
                    :name="fileField.name"
                    :placeholder="fileField.placeholder"
                />
            </div>
            <div
                v-if="checkboxes.length"
                class="ContactsPopupForm-field ContactsPopupForm-field--checkbox"
            >
                <CommonCheckboxField
                    v-for="(checkbox, index) in checkboxes"
                    :key="`${checkbox.name}-${index}`"
                    v-model="formValues[checkbox.name]"
                    :name="checkbox.name"
                    :placeholder="checkbox.placeholder"
                />
            </div>
        </div>
        <div class="ContactsPopupForm-submit">
            <div
                class="ContactsPopupForm-submitButton"
                :class="{ isNotValid }"
                @click="onSubmit"
            >
                <div
                    class="ContactsPopupForm-submitButtonText"
                    v-text="$translations.textSubmit()"
                ></div>
                <div class="ContactsPopupForm-submitButtonArrow">
                    <Arrow />
                </div>
            </div>
            <div class="ContactsPopupForm-submitNotes">
                {{ `${$translations.textSubmitNotes()} ` }}
                <nuxt-link
                    to="/privacy"
                    v-text="$translations.privacyPolicy()"
                ></nuxt-link>
            </div>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex';
import CommonRadioInput from '@/components/CommonRadioInput';
import CommonInputField from '@/components/CommonInputField';
import CommonSelectField from '@/components/CommonSelectField';
import CommonTextAreaField from '@/components/CommonTextAreaField';
import CommonUploadField from '@/components/CommonUploadField';
import Arrow from '@/components/Arrow';
import { isValidEmail } from '@/utils/utils';
import {
    ERROR_CODES_FIELD,
    TYPES_FIELDS,
    VUE_CUSTOM_EVENTS
} from '@/utils/constants';
import CommonCheckboxField from '@/components/CommonCheckboxField';

export default {
    name: 'ContactsPopupForm',

    components: {
        CommonCheckboxField,
        Arrow,
        CommonUploadField,
        CommonTextAreaField,
        CommonSelectField,
        CommonInputField,
        CommonRadioInput
    },

    props: {
        typeForm: {
            type: String,
            required: true
        },
        radios: {
            type: Array,
            default: () => []
        },
        fields: {
            type: Array,
            required: true
        },
        selects: {
            type: Array,
            default: () => []
        },
        message: {
            type: Object,
            default: undefined
        },
        fileField: {
            type: Object,
            default: undefined
        },
        checkboxes: {
            type: Array,
            default: () => []
        },
        accessedFiles: {
            type: Array,
            default: () => []
        },
        modifier: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            isSubmitted: false,
            isNotValid: false,
            formValues: {},
            error: {}
        };
    },

    computed: {
        ...mapState('locale', ['language', 'region'])
    },

    watch: {
        formValues: {
            handler(formValues) {
                Object.entries(formValues).forEach(([key]) => {
                    this.error[key] = undefined;
                });
            },
            deep: true
        }
    },

    methods: {
        onSubmit() {
            this.$root.$emit(VUE_CUSTOM_EVENTS.scrollToTopPopup);
            this.isNotValid = false;

            if (this.onValidate()) {
                this.sendForm();
            }
        },

        async sendForm() {
            const data = new FormData();

            Object.entries(this.formValues).forEach(([key, value]) => {
                if (value) data[key] = value;
            });

            if (this.accessedFiles.length)
                data.accessedFiles = [...this.accessedFiles];

            const requestForm = await this.$axios.post(
                `${this.$config.baseURL}/${this.language}/${this.region}/${this.typeForm}`,
                { data }
            );

            if (requestForm.data) this.isSubmitted = true;

            this.$emit(
                VUE_CUSTOM_EVENTS.formSubmitted,
                this.typeForm,
                this.formValues
            );
        },

        onValidate() {
            const error = {};

            if (this.radios[0].isRequired) {
                const name = this.radios[0].name;
                const isEmpty = !this.formValues[name];

                error[name] = this.setError(isEmpty, name);
            }

            this.fields.forEach((field) => {
                const name = field.name;
                if (field.isRequired || name === TYPES_FIELDS.email) {
                    const isEmpty = !this.formValues[name];

                    error[name] = this.setError(isEmpty, name);
                }
            });

            this.selects.forEach((select) => {
                if (select.isRequired) {
                    const name = select.name;
                    const isEmpty =
                        !this.formValues[name] ||
                        this.formValues[name] === select.placeholder;

                    error[name] = this.setError(isEmpty, name);
                }
            });

            if (this.message) {
                const name = this.message.name;
                const isEmpty = !this.formValues[name];

                error[name] = this.setError(isEmpty, name);
            }

            if (this.fileField) {
                const name = this.fileField.name;
                const isNotSupported =
                    this.formValues[name] === ERROR_CODES_FIELD.isNotSupported;

                error[name] = this.setError(isNotSupported, name);
            }

            this.error = { ...error };

            return !this.isNotValid;
        },

        setError(isEmpty, name) {
            let error = '';

            if (isEmpty) {
                if (name === TYPES_FIELDS.file)
                    error = ERROR_CODES_FIELD.isNotSupported;
                else error = ERROR_CODES_FIELD.isEmpty;

                this.isNotValid = true;
            } else if (name === TYPES_FIELDS.email) {
                const isValid = isValidEmail(
                    this.formValues[name].toLowerCase().trim()
                );

                if (!isValid) {
                    error = ERROR_CODES_FIELD.isNotValid;
                    this.isNotValid = true;
                }
            }

            return error;
        }
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupForm {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;

    &-fields {
        width: 100%;
        position: relative;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
    }

    &-radios {
        width: 100%;
        display: flex;
        color: $c-white;
        position: relative;

        &Wrapper {
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            position: relative;
        }

        &Errored {
            left: 0;
            right: auto;
            top: -10px;

            @include mobile {
                top: -7px;
            }
        }
    }

    &-radio {
        display: flex;
        margin-right: 45px;

        @include mobile {
            margin-right: 35px;
        }

        &:last-child {
            margin-right: 0 !important;
        }
    }

    &-field {
        display: flex;
        color: $c-white;
        margin-top: 50px;
        width: 100%;

        @include mobile {
            margin-top: 17px;
            width: 100% !important;
        }

        &--checkbox {
            margin-top: 40px;

            @include mobile {
                margin-top: 40px;
            }
        }

        #{$component}--support &,
        #{$component}--sales &,
        #{$component}--suppliers & {
            &--name,
            &--surname,
            &--email,
            &--phone,
            &--city,
            &--country {
                width: (360 * 100% / 760);
            }

            &--message {
                margin-top: 70px;

                @include mobile {
                    margin-top: 40px;
                }
            }

            &--file {
                width: (240 * 100% / 760);
                margin-top: 40px;
            }
        }

        #{$component}--newsletter &,
        #{$component}--getAccess & {
            &--name,
            &--surname,
            &--company,
            &--country {
                width: (360 * 100% / 760);
            }
        }
    }

    &-submit {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: 50px;

        @include mobile {
            margin-top: 40px;
            flex-direction: column-reverse;
            justify-content: flex-start;
            align-items: center;
        }

        &Button {
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            color: $c-blue;
            cursor: pointer;

            @include mobile {
                margin-top: 40px;
            }

            @include hover {
                &:hover {
                    #{$component}-submitButtonArrow /deep/ svg {
                        transform: none;
                    }
                }
            }

            &Text {
                @include title-small;

                @include mobile {
                    line-height: (20 / 24);
                }
            }

            &Arrow {
                margin-left: 10px;
            }
        }

        &Notes {
            @include text-light-same-mobile;

            color: $c-gray--text;

            @include mobile {
                width: (184 * 100% / 280);
                text-align: center;
            }

            & /deep/ a {
                color: $c-white;
                font-weight: $fw-medium;
                transition: $d-hover color;

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }
            }
        }
    }
}
</style>
