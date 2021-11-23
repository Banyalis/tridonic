<template>
    <div class="CommonBlackPopupSubscribeForm">
        <ContactsPopupForm
            :type-form="type"
            :radios="getRadios"
            :fields="getFields"
            :selects="getSelects"
            :checkboxes="getCheckboxes"
            :accessed-files="getAccessedFiles"
            @form-submitted="formSubmitted"
        />
    </div>
</template>

<script>
import ContactsPopupForm from '@/components/ContactsPopupForm';
import { TYPES_FIELDS, VUE_CUSTOM_EVENTS } from '@/utils/constants';
import { mapState } from 'vuex';

export default {
    name: 'CommonBlackPopupSubscribeForm',

    components: {
        ContactsPopupForm
    },

    props: {
        type: {
            type: String,
            required: true
        },
        countries: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            form: {
                newsletter: {
                    radios: [
                        {
                            id: 'gender-mr',
                            name: 'gender',
                            placeholder: this.$translations.titleMr(),
                            value: 'mr',
                            isRequired: true
                        },
                        {
                            id: 'gender-mrs',
                            name: 'gender',
                            placeholder: this.$translations.titleMrs(),
                            value: 'mrs',
                            isRequired: true
                        }
                    ],
                    fields: [
                        {
                            name: TYPES_FIELDS.name,
                            type: TYPES_FIELDS.text,
                            placeholder: this.$translations.placeholderName(),
                            isRequired: true
                        },
                        {
                            name: TYPES_FIELDS.surname,
                            type: TYPES_FIELDS.text,
                            placeholder: this.$translations.placeholderSurname(),
                            isRequired: true
                        },
                        {
                            name: TYPES_FIELDS.email,
                            type: TYPES_FIELDS.email,
                            placeholder: this.$translations.textEmail(),
                            isRequired: true
                        },
                        {
                            name: TYPES_FIELDS.company,
                            type: TYPES_FIELDS.text,
                            placeholder: this.$translations.placeholderCompany(),
                            isRequired: true
                        }
                    ],
                    selects: [
                        {
                            name: TYPES_FIELDS.country,
                            options: [],
                            placeholder: this.$translations.countryTitle(),
                            isRequired: true
                        }
                    ]
                },
                getAccess: {
                    checkboxes: [
                        {
                            name: 'softwareSubscribe',
                            placeholder: this.$translations.placeholderSoftwareUpdate()
                        }
                    ]
                }
            },
            internalDataOptions: {
                [TYPES_FIELDS.country]: {
                    placeholder: this.$translations.countryTitle()
                }
            }
        };
    },

    computed: {
        getRadios() {
            return this.form.newsletter.radios?.map((radio) => {
                return radio;
            });
        },

        getFields() {
            return this.form.newsletter.fields?.map((field) => {
                return field;
            });
        },

        getSelects() {
            return this.form.newsletter.selects?.map((select) => {
                select.options = this.getOptions(select.name);

                return select;
            });
        },

        getCheckboxes() {
            return this.type === 'getAccess' && this.isHasSoftware()
                ? this.form[this.type].checkboxes?.map((checkbox) => {
                      return checkbox;
                  })
                : [];
        },

        getAccessedFiles() {
            return this.files.length ? this.files : [];
        },

        ...mapState('get-access-files', ['files'])
    },

    methods: {
        getOptions(name) {
            const placeholder = this.internalDataOptions[name].placeholder;

            const options = [
                {
                    id: placeholder,
                    name: placeholder,
                    disabled: true
                }
            ].concat(this.countries);

            return this.mappedOptions(options);
        },

        mappedOptions(options) {
            return options.map((option) => {
                const mappedOption = {
                    name: option.name,
                    value: option.id
                };

                if (option.disabled) mappedOption.disabled = option.disabled;

                return mappedOption;
            });
        },

        formSubmitted(type, fields) {
            this.$root.$emit(VUE_CUSTOM_EVENTS.formSubmitted, type, fields);
        },

        isHasSoftware() {
            return !!this.files.filter((file) => file.isSoftware).length;
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonBlackPopupSubscribeForm {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;

    @include mobile {
        margin-top: 30px;
    }
}
</style>
