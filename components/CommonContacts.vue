<template>
    <div class="CommonContacts">
        <ul class="CommonContacts-list">
            <li
                v-for="(contact, index) in contacts"
                :key="index"
                class="CommonContacts-listItem"
            >
                <CommonContactsItem :contact="contact" />
            </li>
        </ul>
    </div>
</template>

<script>
import CommonContactsItem from '@/components/CommonContactsItem';

export default {
    name: 'CommonContacts',

    components: { CommonContactsItem },

    props: {
        contacts: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonContacts {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;

    &-list {
        @include u-noList;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;

        &Item {
            display: flex;
            width: 100%;
            flex-direction: column;
            margin-top: 20px;

            &:first-child {
                margin-top: 0;
            }
        }
    }
}
</style>
