<template>
    <div class="ContactsPopupAddressesItem">
        <div class="ContactsPopupAddressesItem-wrapper">
            <div class="ContactsPopupAddressesItem-info">
                <div
                    class="ContactsPopupAddressesItem-infoTitle"
                    v-text="address.title"
                ></div>
                <div
                    v-if="address.caption"
                    class="ContactsPopupAddressesItem-infoCaption"
                    v-text="address.caption"
                ></div>
                <div
                    class="ContactsPopupAddressesItem-infoAddress"
                    v-text="address.address"
                ></div>
                <div class="ContactsPopupAddressesItem-infoPhones">
                    <div
                        v-for="(phone, index) in address.phones"
                        :key="index"
                        class="ContactsPopupAddressesItem-infoPhone"
                    >
                        <div
                            v-if="phone.type"
                            class="ContactsPopupAddressesItem-infoPhoneLabel"
                            v-text="typesPhone[phone.type]"
                        ></div>
                        <a
                            :href="`tel:${phone.url}`"
                            class="ContactsPopupAddressesItem-infoPhoneValue"
                            v-text="phone.title"
                        ></a>
                    </div>
                </div>
            </div>
            <div class="ContactsPopupAddressesItem-links">
                <div
                    v-for="(link, index) in address.links"
                    :key="index"
                    class="ContactsPopupAddressesItem-link"
                >
                    <RoundedButton :link="link" type="isWhite" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';
export default {
    name: 'ContactsPopupAddressesItem',
    components: { RoundedButton },
    props: {
        address: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            typesPhone: {
                T: this.$translations.phone(),
                F: this.$translations.fax()
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupAddressesItem {
    $component: &;

    width: 100%;
    position: relative;

    &-wrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include mobile {
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: (360 * 100% / 760);

        @include mobile {
            width: 100%;
        }

        &Title {
            @include text;

            line-height: (20 / 24);
            color: $c-white;
        }

        &Caption {
            @include text-light-same-mobile;

            color: $c-gray--text;
            margin-top: 4px;

            @include mobile {
                margin-top: 2px;
            }
        }

        &Address {
            @include text-light-same-mobile;

            color: $c-white;
            margin-top: 20px;
        }

        &Phones {
            @include text-light-same-mobile;
        }

        &Phone {
            display: flex;

            &Label {
                margin-right: 5px;
                color: $c-white;
            }

            &Value {
                color: $c-white;
                transition: $d-hover color;

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }

                @include mobile {
                    color: $c-blue;
                }
            }
        }
    }

    &-links {
        display: flex;
        width: (360 * 100% / 760);
        justify-content: space-between;
        align-items: center;

        @include mobile {
            width: 100%;
            margin-top: 20px;
        }
    }

    &-link {
        display: flex;
        width: (160 * 100% / 360);

        @include mobile {
            width: (130 * 100% / 280);
        }
    }
}
</style>
