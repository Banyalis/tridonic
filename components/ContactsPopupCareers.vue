<template>
    <div class="ContactsPopupCareers" :class="{ isHidden }">
        <div
            class="ContactsPopupCareers-list ContactsPopupCareers-list--contacts"
        >
            <div
                v-for="(contact, index) in popupBlack.careers.contacts"
                :key="index"
                class="ContactsPopupCareers-listItem"
            >
                <ContactsPopupContactItem :contact="contact" />
            </div>
        </div>
        <div class="ContactsPopupCareers-list ContactsPopupCareers-list--links">
            <div
                v-for="(link, index) in popupBlack.careers.linksText"
                :key="index"
                class="ContactsPopupCareers-listItem"
            >
                <ContactsPopupLinkItem :link="link" />
            </div>
        </div>
    </div>
</template>

<script>
import ContactsPopupContactItem from '@/components/ContactsPopupContactItem';
import { mapState } from 'vuex';
import ContactsPopupLinkItem from '@/components/ContactsPopupLinkItem';

export default {
    name: 'ContactsPopupCareers',

    components: { ContactsPopupLinkItem, ContactsPopupContactItem },

    data() {
        return {
            isHidden: true
        };
    },

    computed: {
        ...mapState('popup', ['popupBlack'])
    },

    mounted() {
        setTimeout(() => {
            this.isHidden = false;
        }, 60);
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupCareers {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    transform: translate3d(0, 0, 0);
    transition: $d-hover opacity, $d-hover transform;

    @include mobile {
        margin-top: 10px;
    }

    &.isHidden {
        opacity: 0;
        transform: translate3d(0, 50px, 0);
    }

    &-list {
        width: 100%;
        display: flex;
        flex-direction: column;

        &--contacts {
            margin-top: 30px;

            @include mobile {
                margin-top: 0;
            }
        }

        &--links {
            margin-top: 40px;

            @include mobile {
                margin-top: 20px;
            }
        }

        &Item {
            width: 100%;
            margin-top: 40px;
            padding-top: 40px;
            border-top: 1px solid rgba($c-white, 0.15);

            &:first-child {
                margin-top: 0 !important;
            }

            @include mobile {
                padding-top: 23px !important;
                margin-top: 20px !important;
            }

            #{$component}-list--links & {
                margin-top: 35px;
            }
        }
    }
}
</style>
