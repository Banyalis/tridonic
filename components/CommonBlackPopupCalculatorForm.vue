<template>
    <div class="CommonBlackPopupCalculatorForm">
        <div
            v-for="(section, sectionIndex) in internalSections"
            :key="sectionIndex"
            class="CommonBlackPopupCalculatorForm-section"
        >
            <div
                v-if="section.title"
                class="CommonBlackPopupCalculatorForm-sectionHeader"
            >
                <div
                    class="CommonBlackPopupCalculatorForm-sectionTitle"
                    v-text="section.title"
                ></div>
                <div
                    v-if="section.hint"
                    class="CommonBlackPopupCalculatorForm-sectionHint"
                    v-text="section.hint"
                ></div>
            </div>
            <div
                v-for="(field, fieldIndex) in section.fields"
                :key="fieldIndex"
                class="CommonBlackPopupCalculatorForm-field"
            >
                <div class="CommonBlackPopupCalculatorForm-fieldHeader">
                    <div
                        v-if="field.isRequired"
                        class="CommonBlackPopupCalculatorForm-fieldIcon"
                        v-text="`*`"
                    ></div>
                    <div
                        class="CommonBlackPopupCalculatorForm-fieldTitle"
                        v-text="field.title"
                    ></div>
                </div>
                <div class="CommonBlackPopupCalculatorForm-fieldContent">
                    <CommonInputField
                        v-if="field.style === 'input'"
                        v-model="formValues[field.name]"
                        :name="field.name"
                        :type="field.type"
                        :placeholder="field.placeholder"
                        :is-required="field.isRequired"
                        :min="field.min"
                        :max="field.max"
                        :error="error[field.name]"
                        modifier="calculator"
                        @input="changeValue"
                    />
                    <CommonSelectField
                        v-else-if="field.style === 'select'"
                        v-model="formValues[field.name]"
                        :options="field.options"
                        :placeholder="field.placeholder"
                        :is-required="field.isRequired"
                        :error="error[field.name]"
                        modifier="calculator"
                        @input="changeValue"
                    />
                </div>
                <div
                    v-if="field.addingFields && addingFields.length"
                    class="CommonBlackPopupCalculatorForm-fieldAdding"
                >
                    <div
                        v-for="(addingField, addingFieldIndex) in addingFields"
                        :key="addingFieldIndex"
                        class="CommonBlackPopupCalculatorForm-fieldAddingItem"
                    >
                        <div class="CommonBlackPopupCalculatorForm-fieldHeader">
                            <div
                                class="CommonBlackPopupCalculatorForm-fieldTitle"
                                v-text="addingField.title"
                            ></div>
                        </div>
                        <div
                            class="CommonBlackPopupCalculatorForm-fieldContent"
                        >
                            <CommonSelectField
                                v-if="addingField.style === 'select'"
                                v-model="formValues[addingField.name]"
                                :options="addingField.options"
                                :placeholder="addingField.placeholder"
                                :error="error[addingField.name]"
                                modifier="calculator"
                                @input="changeValue"
                            />
                            <div
                                class="CommonBlackPopupCalculatorForm-fieldRemove"
                                @click="removeField"
                            >
                                <svg-icon name="cross-filled"></svg-icon>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="field.addingFields"
                    class="CommonBlackPopupCalculatorForm-fieldAdd"
                    @click="addField(field)"
                >
                    <svg-icon name="expand-icon"></svg-icon>
                    <div
                        class="CommonBlackPopupCalculatorForm-fieldAddTitle"
                        v-text="$translations.calculatorButtonAdd()"
                    ></div>
                </div>
            </div>

            <div
                v-if="section.button === true"
                class="CommonBlackPopupCalculatorForm-button"
            >
                <RoundedButton
                    type="isWhiteFilled"
                    :text="$translations.calculatorButton()"
                    @click="getResults"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { ERROR_CODES_FIELD, VUE_CUSTOM_EVENTS } from '@/utils/constants';
import CommonInputField from '@/components/CommonInputField';
import CommonSelectField from '@/components/CommonSelectField';
import RoundedButton from '@/components/RoundedButton';

export default {
    name: 'CommonBlackPopupCalculatorForm',

    components: {
        CommonInputField,
        CommonSelectField,
        RoundedButton
    },

    props: {
        sections: {
            type: Array,
            required: true
        },
        typeForm: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            addingFields: [],
            internalSections: [],
            countIncFields: 0,
            formValues: {},
            isNotValid: false,
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
        },

        sections(newSections) {
            this.setInternalSections(newSections);
        }
    },

    mounted() {
        this.setInternalSections(this.sections);
    },

    methods: {
        changeValue() {
            if (this.typeForm === 'llecalc') {
                // new fetch filter
            }

            if (this.typeForm !== 'emergency') this.getResults();
        },

        getResults() {
            this.$root.$emit(VUE_CUSTOM_EVENTS.scrollToTopPopup);
            this.isNotValid = false;

            if (this.onValidate()) {
                const filters = Object.entries(this.formValues).map(
                    ([key, value]) => {
                        return {
                            id: key,
                            value
                        };
                    }
                );

                this.$axios
                    .get(
                        `${this.$config.baseURL}/${this.language}/${this.region}/popups/${this.typeForm}`,
                        {
                            params: {
                                currentFilterValues: filters
                            }
                        }
                    )
                    .then((response) => {
                        this.updateResults(response.data);
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.log(error);
                        this.errored = true;
                    });
            }
        },

        onValidate() {
            const error = {};

            this.internalSections.filter((section) => {
                section.fields.forEach((field) => {
                    const name = field.name;

                    if (field.isRequired) {
                        const isEmpty = !this.formValues[name];

                        error[name] = this.setError(isEmpty);
                    }
                });
            });

            this.error = { ...error };

            return !this.isNotValid;
        },

        setError(isEmpty) {
            let error = '';

            if (isEmpty) {
                error = ERROR_CODES_FIELD.isEmpty;
                this.isNotValid = true;
            }

            return error;
        },

        setInternalSections(newSections) {
            this.countIncFields = newSections.filter((section) => {
                return section.fields.filter((item) => item.addingFields);
            }).length
                ? 1
                : 0;

            this.internalSections = [...newSections];
        },

        addField(field) {
            this.countIncFields++;
            this.addingFields.push(this.getNewMappedField(field));
        },

        removeField() {
            this.countIncFields--;
            this.addingFields.pop();
        },

        getNewMappedField(field) {
            return {
                title: field.title + ` / ${this.countIncFields}`,
                style: field.style,
                name: `${field.name}-${this.countIncFields}`,
                options: field.options,
                placeholder: field.placeholder,
                isRequired: !!field.isRequired
            };
        },

        ...mapMutations({
            updateResults: 'download-popups/update'
        })
    }
};
</script>

<style lang="scss" scoped>
.CommonBlackPopupCalculatorForm {
    $component: &;

    &-section {
        &:not(:first-child) {
            margin-top: 30px;
        }

        &Header {
            display: grid;
            align-items: center;
            grid-template-columns: repeat(12, 1fr);
            grid-gap: 0 30px;
            margin-bottom: 24px;
            color: $c-gray--text;

            @include mobile {
                grid-gap: 0 20px;
                margin-bottom: 20px;
            }
        }

        &Title {
            @include text;

            grid-column: 1 / span 4;

            @include mobile {
                grid-column: 1 / span 6;
            }
        }

        &Hint {
            @include text-light-same-mobile;

            grid-column: 5 / span 8;

            @include mobile {
                grid-column: 7 / span 6;
            }
        }
    }

    &-field {
        display: grid;
        align-items: center;
        grid-template-columns: repeat(12, 1fr);
        grid-gap: 0 30px;
        color: $c-white;
        font-size: 18px;
        line-height: (20 / 18);
        font-weight: $fw-normal;

        @include mobile {
            grid-gap: 0 20px;
            font-size: 14px;
            line-height: (20 / 14);
        }

        &:not(:last-child) {
            margin-bottom: 5px;
        }

        &Header {
            grid-column: 1 / span 4;
            position: relative;

            @include mobile {
                grid-column: 1 / span 6;
            }
        }

        &Icon {
            position: absolute;
            top: calc(50% + 3px);
            left: -7px;
            transform: translate3d(-100%, -50%, 0);
        }

        &Content {
            grid-column: 5 / span 8;
            position: relative;

            @include mobile {
                grid-column: 7 / span 6;
                padding-right: 15px;
            }
        }

        &Adding {
            grid-column: 1 / span 12;

            &Item {
                display: grid;
                align-items: center;
                grid-template-columns: repeat(12, 1fr);
                grid-gap: 0 30px;
                margin-top: 5px;

                @include mobile {
                    grid-gap: 0 20px;
                }
            }
        }

        &Add {
            @include text-light-same-mobile;

            display: flex;
            align-items: center;
            grid-column: 5 / span 8;
            margin-top: 9px;
            cursor: pointer;
            color: $c-blue;
            transition: color $d-hover ease-in-out;

            @include mobile {
                grid-column: 1 / span 12;
            }

            @include hover {
                &:hover {
                    color: $c-white;
                }
            }

            svg {
                width: 10px;
                height: 10px;
                fill: currentColor;
            }

            &Title {
                margin-left: 5px;
                color: currentColor;
                font-weight: $fw-medium;
            }
        }

        &Remove {
            position: absolute;
            top: 50%;
            right: -32px;
            width: 16px;
            height: 16px;
            margin-top: -8px;
            cursor: pointer;
            color: $c-blue;
            transition: color $d-hover ease-in-out;

            @include mobile {
                right: 0;
                width: 10px;
                height: 10px;
                margin-top: -5px;
            }

            @include hover {
                &:hover {
                    color: $c-white;
                }
            }

            svg {
                display: block;
                width: 100%;
                height: 100%;
                fill: currentColor;
            }
        }
    }

    &-button {
        margin-top: 40px;

        @include mobile {
            display: flex;
            justify-content: center;
            margin-top: 30px;
        }
    }
}
</style>
