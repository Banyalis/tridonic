<template>
    <div class="ContactsPopupAddresses" :class="{ isHidden }">
        <div class="ContactsPopupAddresses-filter">
            <CommonSelectField v-model="currentCountry" :options="getOptions" />
        </div>
        <div
            class="ContactsPopupAddresses-list"
            :class="{ isActive: isAddressListShown }"
        >
            <div
                v-for="(address, index) in listAddresses"
                :key="index"
                class="ContactsPopupAddresses-listAddress"
            >
                <ContactsPopupAddressesItem :address="address" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import CommonSelectField from '@/components/CommonSelectField';
import ContactsPopupAddressesItem from '@/components/ContactsPopupAddressesItem';
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'ContactsPopupAddresses',

    components: { ContactsPopupAddressesItem, CommonSelectField },

    data() {
        return {
            country: '',
            isAddressListShown: false,
            isHidden: true
        };
    },

    computed: {
        currentCountry: {
            set(value) {
                this.setCountry(value);
            },
            get() {
                return this.country;
            }
        },

        getOptions() {
            return this.countries.map((option) => {
                const mappedOption = {
                    name: option.name,
                    value: option.id
                };

                if (option.disabled) mappedOption.disabled = option.disabled;

                return mappedOption;
            });
        },

        ...mapState('contacts', [
            'countries',
            'currentCountryValue',
            'listAddresses'
        ]),
        ...mapState('locale', ['language', 'region'])
    },

    mounted() {
        this.country = this.currentCountryValue || this.countries[0].id;

        this.isAddressListShown = true;

        setTimeout(() => {
            this.isHidden = false;
        }, 60);
    },

    methods: {
        setCountry(countryValue) {
            this.$root.$emit(VUE_CUSTOM_EVENTS.scrollToTopPopup);

            this.isAddressListShown = false;
            this.country = countryValue;
            this.updateCountry(countryValue);

            this.fetchAddresses();
        },

        async fetchAddresses() {
            const addressesListResponse = await this.$axios.get(
                `${this.$config.baseURL}/${this.language}/${this.region}/contacts/addresses`,
                {
                    params: {
                        country: this.country
                    }
                }
            );

            if (!addressesListResponse) return;

            this.isAddressListShown = true;

            this.updateAddresses(addressesListResponse.data);
        },

        ...mapMutations({
            updateCountry: 'contacts/updateCountry',
            updateAddresses: 'contacts/updateAddresses'
        })
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupAddresses {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    transform: translate3d(0, 0, 0);
    transition: $d-hover opacity, $d-hover transform;

    @include mobile {
        margin-top: 20px;
    }

    &.isHidden {
        opacity: 0;
        transform: translate3d(0, 50px, 0);
    }

    &-filter {
        width: (360 * 100% / 760);

        @include mobile {
            width: 100%;
        }
    }

    &-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        opacity: 0;
        transform: translate3d(0, 50px, 0);
        transition: none;

        @include mobile {
            margin-top: 0;
        }

        &.isActive {
            opacity: 1;
            transition-duration: $d-hover;
            transition-property: opacity, transform;
            transform: translate3d(0, 0, 0);
        }

        &Address {
            width: 100%;
            margin-top: 35px;
            padding-top: 40px;
            border-top: 1px solid rgba($c-white, 0.15);

            @include mobile {
                padding-top: 23px;
                margin-top: 20px;

                &:first-child {
                    margin-top: 0;
                    border-top: none;
                }
            }
        }
    }
}
</style>
