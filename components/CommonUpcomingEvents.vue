<template>
    <div class="CommonUpcomingEvents">
        <ul class="CommonUpcomingEvents-list">
            <li
                v-for="(event, index) in events"
                :key="index"
                class="CommonUpcomingEvents-listItem"
            >
                <CommonUpcomingEventsItem :event="event" />
            </li>
        </ul>
    </div>
</template>

<script>
import CommonUpcomingEventsItem from '@/components/CommonUpcomingEventsItem';

export default {
    name: 'CommonUpcomingEvents',

    components: { CommonUpcomingEventsItem },

    props: {
        events: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonUpcomingEvents {
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
