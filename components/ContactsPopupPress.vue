<template>
    <div class="ContactsPopupPress" :class="{ isHidden }">
        <div class="ContactsPopupPress-list">
            <div
                v-for="(contact, index) in popupBlack.press"
                :key="index"
                class="ContactsPopupPress-listContact"
            >
                <ContactsPopupContactItem :contact="contact" />
            </div>
        </div>
    </div>
</template>

<script>
import ContactsPopupContactItem from '@/components/ContactsPopupContactItem';
import { mapState } from 'vuex';

export default {
    name: 'ContactsPopupPress',

    components: { ContactsPopupContactItem },

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
.ContactsPopupPress {
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
        margin-top: 30px;

        @include mobile {
            margin-top: 0;
        }

        &Contact {
            width: 100%;
            margin-top: 40px;
            padding-top: 40px;
            border-top: 1px solid rgba($c-white, 0.15);

            &:first-child {
                margin-top: 0 !important;
            }

            @include mobile {
                padding-top: 23px;
                margin-top: 20px;
            }
        }
    }
}
</style>
