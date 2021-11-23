<template>
    <div class="ContactsPopupSales" :class="{ isHidden }">
        <ContactsPopupForm
            type-form="sales"
            :radios="radios"
            :fields="fields"
            :selects="getSelects"
            :message="message"
            :file-field="fileField"
            @form-submitted="formSubmitted"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ContactsPopupForm from '@/components/ContactsPopupForm';
import { TYPES_FIELDS, VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'ContactsPopupSales',

    components: {
        ContactsPopupForm
    },

    data() {
        return {
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
                    name: TYPES_FIELDS.phone,
                    type: TYPES_FIELDS.phone,
                    placeholder: this.$translations.phone(),
                    isRequired: false
                },
                {
                    name: TYPES_FIELDS.company,
                    type: TYPES_FIELDS.text,
                    placeholder: this.$translations.placeholderCompany(),
                    isRequired: true
                },
                {
                    name: TYPES_FIELDS.address,
                    type: TYPES_FIELDS.text,
                    placeholder: this.$translations.placeholderAddress(),
                    isRequired: false
                },
                {
                    name: TYPES_FIELDS.city,
                    type: TYPES_FIELDS.text,
                    placeholder: this.$translations.placeholderCity(),
                    isRequired: false
                }
            ],
            selects: [
                {
                    name: TYPES_FIELDS.country,
                    options: [],
                    placeholder: this.$translations.countryTitle(),
                    isRequired: true
                }
            ],
            message: {
                name: TYPES_FIELDS.message,
                placeholder: this.$translations.placeholderMessage(),
                isRequired: true
            },
            fileField: {
                name: TYPES_FIELDS.file,
                placeholder: this.$translations.textUploadFile()
            },
            isHidden: true,
            internalDataOptions: {
                [TYPES_FIELDS.country]: {
                    placeholder: this.$translations.countryTitle(),
                    dbObject: 'countries'
                }
            }
        };
    },

    computed: {
        getSelects() {
            return this.selects.map((select) => {
                select.options = this.getOptions(select.name);

                return select;
            });
        },

        ...mapState('popup', ['popupBlack'])
    },

    mounted() {
        setTimeout(() => {
            this.isHidden = false;
        }, 60);
    },

    methods: {
        getOptions(name) {
            const placeholder = this.internalDataOptions[name].placeholder;
            const initOptions = this.internalDataOptions[name].dbObject;

            const options = [
                {
                    id: placeholder,
                    name: placeholder,
                    disabled: true
                }
            ].concat(this.popupBlack.sales[initOptions]);

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

        formSubmitted() {
            this.$root.$emit(VUE_CUSTOM_EVENTS.formSubmitted);
        }
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupSales {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    transform: translate3d(0, 0, 0);
    transition: $d-hover opacity, $d-hover transform;

    @include mobile {
        margin-top: 30px;
    }

    &.isHidden {
        opacity: 0;
        transform: translate3d(0, 50px, 0);
    }
}
</style>
