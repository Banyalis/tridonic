<template>
    <div
        class="CommonBlackPopup b-container"
        :class="[`CommonBlackPopup--${popup.type}`]"
    >
        <div
            v-if="popup.title"
            class="CommonBlackPopup-title"
            v-text="popup.title"
        ></div>
        <div class="CommonBlackPopup-inner">
            <CommonBlackPopupSidebar
                :sidebar="popup.sidebar"
                @change-category-privacy="changeCategory"
            />
            <CommonBlackPopupContent
                :content="popup.content"
                :category="activeCategory"
                :type-popup="popup.type"
            />
        </div>
        <div
            class="CommonBlackPopup-thanks b-thanks"
            :class="{ isShow: isSuccessForm }"
        >
            <div class="CommonBlackPopup-thanksInfo b-thanks-info">
                <div
                    class="CommonBlackPopup-thanksText"
                    v-text="$translations.thanksTitle()"
                ></div>
                <div
                    class="CommonBlackPopup-thanksText"
                    v-text="getThanksText"
                ></div>
            </div>
        </div>
        <CommonBlackPopupFooter
            v-if="results && results.length"
            :results="results"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import CommonBlackPopupSidebar from '@/components/CommonBlackPopupSidebar';
import CommonBlackPopupContent from '@/components/CommonBlackPopupContent';
import CommonBlackPopupFooter from '@/components/CommonBlackPopupFooter';

export default {
    name: 'CommonBlackPopup',

    components: {
        CommonBlackPopupSidebar,
        CommonBlackPopupContent,
        CommonBlackPopupFooter
    },

    props: {
        popup: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            activeCategory: {
                id: '',
                title: ''
            },
            isSuccessForm: false,
            inputEmail: ''
        };
    },

    computed: {
        getThanksText() {
            let thanksText = this.$translations.thanksTextNewsletter();

            if (this.popup.type === 'getAccess') {
                thanksText = this.$translations.thanksTextGetAccess();

                thanksText += ` ${this.inputEmail}`;
            }

            return thanksText;
        },

        getLoadedFiles() {
            return this.files.length ? this.files : [];
        },

        ...mapState('download-popups', ['results']),
        ...mapState('get-access-files', ['files'])
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.formSubmitted, this.onSuccessForm);
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.formSubmitted, this.onSuccessForm);
    },

    methods: {
        changeCategory(item) {
            this.$root.$emit(VUE_CUSTOM_EVENTS.scrollToTopPopup);
            this.activeCategory = item;
        },

        onSuccessForm(type, fields) {
            this.isSuccessForm = true;

            if (type === 'getAccess' && fields.email)
                this.inputEmail = fields.email;
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonBlackPopup {
    $component: &;

    &--newsletter,
    &--getAccess {
        min-height: 560px;

        @include mobile {
            min-height: calc(100vh - 80px);
        }
    }

    &-thanks {
        &Info {
            #{$component}--newsletter & {
                max-width: 600px;
            }

            #{$component}--getAccess & {
                max-width: 410px;
            }
        }
    }

    &-title {
        @include title-small;

        margin-bottom: 42px;
        color: $c-white;

        @include mobile {
            margin-bottom: 40px;
        }
    }

    &-inner {
        display: flex;
        justify-content: space-between;

        @include mobile {
            flex-direction: column;
        }
    }
}
</style>
