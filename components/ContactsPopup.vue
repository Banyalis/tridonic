<template>
    <div class="ContactsPopup">
        <div
            v-if="!isSuccessForm"
            class="ContactsPopup-wrapper b-container"
            :class="{ isChangedCategory }"
        >
            <div class="ContactsPopup-title">
                <div class="ContactsPopup-titleBack" @click="onBack">
                    <Arrow />
                </div>
                <div
                    class="ContactsPopup-titleText"
                    v-text="$translations.contactsTitle()"
                ></div>
                <div
                    class="ContactsPopup-titleCategory"
                    v-text="activeTitle"
                ></div>
            </div>
            <div class="ContactsPopup-container">
                <div class="ContactsPopup-sidebar">
                    <ContactsPopupSidebar
                        :categories="popup.categories"
                        @change-category-contacts="changeCategory"
                    />
                </div>
                <div class="ContactsPopup-content">
                    <component
                        :is="listComponents[activeCategory.id]"
                        :content="popup[activeCategory.id]"
                    ></component>
                </div>
            </div>
        </div>
        <div
            class="ContactsPopup-thanks b-thanks"
            :class="{ isShow: isSuccessForm }"
        >
            <div class="ContactsPopup-thanksInfo b-thanks-info">
                <div
                    class="ContactsPopup-thanksText"
                    v-text="$translations.thanksTitle()"
                ></div>
                <div
                    class="ContactsPopup-thanksText"
                    v-text="$translations.thanksTextContacts()"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import ContactsPopupSidebar from '@/components/ContactsPopupSidebar';
import ContactsPopupAddresses from '@/components/ContactsPopupAddresses';
import ContactsPopupSupport from '@/components/ContactsPopupSupport';
import ContactsPopupSales from '@/components/ContactsPopupSales';
import ContactsPopupSuppliers from '@/components/ContactsPopupSuppliers';
import ContactsPopupPress from '@/components/ContactsPopupPress';
import ContactsPopupCareers from '@/components/ContactsPopupCareers';
import ContactsPopupEshop from '@/components/ContactsPopupEshop';
import Arrow from '@/components/Arrow';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'ContactsPopup',

    components: {
        Arrow,
        ContactsPopupSidebar,
        ContactsPopupAddresses,
        ContactsPopupSupport,
        ContactsPopupSales,
        ContactsPopupSuppliers,
        ContactsPopupPress,
        ContactsPopupCareers,
        ContactsPopupEshop
    },

    props: {
        popup: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isSuccessForm: false,
            activeCategory: {
                id: '',
                name: ''
            },
            activeTitle: '',
            isChangedCategory: false,
            listComponents: {
                addresses: 'ContactsPopupAddresses',
                technicalSupport: 'ContactsPopupSupport',
                sales: 'ContactsPopupSales',
                suppliers: 'ContactsPopupSuppliers',
                press: 'ContactsPopupPress',
                careers: 'ContactsPopupCareers',
                eshop: 'ContactsPopupEshop'
            }
        };
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.formSubmitted, this.onSuccessForm);
        this.updateCountries(this.popup.addresses.countries);
        this.updateAddresses(this.popup.addresses.listAddresses);
        this.activeCategory = this.popup.categories[0];
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.formSubmitted, this.onSuccessForm);
    },

    methods: {
        changeCategory(category) {
            this.$root.$emit(VUE_CUSTOM_EVENTS.scrollToTopPopup);

            this.activeCategory = category;
            this.activeTitle = category.name;
            this.isChangedCategory = true;
        },

        onBack() {
            this.$root.$emit(VUE_CUSTOM_EVENTS.scrollToTopPopup);

            this.isChangedCategory = false;

            setTimeout(() => {
                this.activeTitle = '';
            }, 200);
        },

        onSuccessForm() {
            this.$root.$emit(VUE_CUSTOM_EVENTS.scrollToTopPopup);

            this.isSuccessForm = true;
        },

        ...mapMutations({
            updateCountries: 'contacts/updateCountries',
            updateAddresses: 'contacts/updateAddresses'
        })
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopup {
    $component: &;

    width: 100%;
    position: relative;
    min-height: calc(100vh - 228px); // 100vh - 100px - 48px - 80px

    @include mobile {
        min-height: calc(100vh - 80px);
    }

    &-wrapper {
        height: 100%;

        @include mobile {
            padding-left: 0;
            padding-right: 0;
        }
    }

    &-title {
        @include title-h2;

        color: $c-white;
        position: relative;
        z-index: 2;

        @include mobile {
            width: 100%;
            background: $c-black--bg;
            padding: 15px 20px;
            position: fixed;
            top: 0;
            left: 0;
        }

        &Back {
            display: none;
            pointer-events: none;
            opacity: 0;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translate3d(0, -50%, 0) rotate(180deg);
            transition: $d-hover opacity;

            @include mobile {
                display: flex;

                #{$component}-wrapper.isChangedCategory & {
                    opacity: 1;
                    pointer-events: all;
                    z-index: 2;
                    transition: $d-hover opacity $d-hover;
                }
            }
        }

        &Text {
            transition: $d-hover opacity $d-hover / 2;

            @include mobile {
                @include title-small;

                line-height: (20 / 24);

                #{$component}-wrapper.isChangedCategory & {
                    opacity: 0;
                    transition: $d-hover opacity;
                }
            }
        }

        &Category {
            display: none;
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translate3d(0, -50%, 0);
            opacity: 0;
            pointer-events: none;
            white-space: nowrap;
            transition: $d-hover opacity $d-hover / 2, $d-hover transform,
                $d-hover left;

            @include mobile {
                display: flex;

                #{$component}-wrapper.isChangedCategory & {
                    opacity: 1;
                    left: 50%;
                    transform: translate3d(-50%, -50%, 0);
                    transition: $d-hover opacity, $d-hover transform,
                        $d-hover left;
                }
            }
        }
    }

    &-container {
        width: 100%;
        margin-top: 42px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;

        @include mobile {
            width: 100vw;
            margin-top: -20px;
            flex-wrap: nowrap;
            justify-content: flex-start;
            overflow: hidden;
        }
    }

    &-sidebar {
        width: (280 * 100% / 1160);
        transition: $d-hover transform;

        @include mobile {
            width: 100vw;
            flex: 0 0 auto;
            padding-top: 70px;
            transform: translate3d(0, 0, 0);

            #{$component}-wrapper.isChangedCategory & {
                transform: translate3d(-100%, 0, 0);
            }
        }
    }

    &-content {
        width: (760 * 100% / 1160);
        transition: $d-hover transform, 0s visibility $d-hover,
            0s height $d-hover;

        @include mobile {
            width: 100vw;
            flex: 0 0 auto;
            visibility: hidden;
            max-height: 100vh;
            transform: translate3d(0, 0, 0);
            padding: 70px 20px 0;
            height: 0;

            #{$component}-wrapper.isChangedCategory & {
                transform: translate3d(-100%, 0, 0);
                visibility: visible;
                height: auto;
                max-height: none;
                transition: $d-hover transform;
            }
        }
    }
}
</style>
