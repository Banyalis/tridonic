<template>
    <div
        class="CommonUploadField"
        :class="[
            modifier ? `CommonUploadField--${modifier}` : '',
            !!error ? error : ''
        ]"
    >
        <div class="CommonUploadField-inputWrapper">
            <input
                :id="name"
                :ref="name"
                :name="name"
                type="file"
                class="CommonUploadField-input"
                @input="onInput"
            />
            <label :for="name" class="CommonUploadField-label">
                <RoundedButton
                    :text="placeholder"
                    type="isWhite"
                    @click="onClickInput"
                />
            </label>
            <div
                v-if="!!error"
                class="CommonUploadField-errored b-errored-field"
                v-text="$translations.unsupportedFile()"
            ></div>
            <div
                v-if="!!inputValue && !error"
                class="CommonUploadField-fileName"
            >
                <div
                    class="CommonUploadField-fileNameIcon"
                    @click="resetFile"
                ></div>
                <div
                    class="CommonUploadField-fileNameValue"
                    v-text="inputValue.name"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    ERROR_CODES_FIELD,
    REGEXPS,
    VUE_CUSTOM_EVENTS
} from '@/utils/constants';
import RoundedButton from '@/components/RoundedButton';

export default {
    name: 'CommonUploadField',

    components: { RoundedButton },

    model: {
        prop: 'input',
        event: VUE_CUSTOM_EVENTS.input
    },

    props: {
        name: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        modifier: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            inputValue: undefined,
            error: undefined
        };
    },

    methods: {
        onInput() {
            let fieldValue = '';
            this.inputValue = this.$refs[this.name].files[0];
            this.error = undefined;

            if (this.isValid()) {
                fieldValue = this.inputValue;
            } else {
                fieldValue = this.error;
            }

            this.$emit(VUE_CUSTOM_EVENTS.input, fieldValue);
        },

        isValid() {
            const filePath = this.$refs[this.name].value;

            if (!REGEXPS.allowedFileTypes.exec(filePath.toLowerCase())) {
                this.error = ERROR_CODES_FIELD.isNotSupported;
                this.$refs[this.name].value = '';

                return false;
            }

            return true;
        },

        resetFile() {
            this.inputValue = undefined;
            this.$refs[this.name].value = '';
            this.error = undefined;

            this.$emit(VUE_CUSTOM_EVENTS.input, this.inputValue);
        },

        onClickInput() {
            this.$refs[this.name].click();
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonUploadField {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    &-input {
        position: absolute;
        opacity: 0;
        pointer-events: none;
        visibility: hidden;

        &Wrapper {
            display: flex;
            position: relative;
            width: 100%;

            @include mobile {
                flex-direction: column;
                align-items: center;
            }
        }
    }

    &-label {
        width: 100%;

        button {
            width: 100%;
        }
    }

    &-icon {
        top: 4px;
        transform: translate3d(-100%, 0, 0);
    }

    &-errored {
        top: 50%;
        right: -30px;
        left: auto;
        transform: translate3d(100%, -50%, 0);

        @include mobile {
            @include text-light-same-mobile;

            position: relative;
            max-width: 100%;
            margin-top: 20px;
            top: auto;
            right: auto;
            left: auto;
            transform: none;
        }
    }

    &-fileName {
        @include text-light-same-mobile;

        position: absolute;
        color: $c-white;
        top: 50%;
        right: -30px;
        left: auto;
        transform: translate3d(100%, -50%, 0);
        display: flex;
        align-items: center;
        max-width: 200%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        @include mobile {
            position: relative;
            max-width: 100%;
            margin-top: 20px;
            top: auto;
            right: auto;
            left: auto;
            transform: none;
        }

        &Value {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        &Icon {
            position: relative;
            width: 14px;
            height: 14px;
            margin-right: 5px;
            flex: 0 0 14px;
            cursor: pointer;
            transform: translate3d(0, 0, 0) rotate(45deg);

            &:before,
            &:after {
                content: '';
                height: 2px;
                width: 100%;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translate3d(0, -50%, 0);
                background: $c-blue;
            }

            &:after {
                transform: translate3d(0, -50%, 0) rotate(90deg);
            }
        }
    }
}
</style>
