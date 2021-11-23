<template>
    <nuxt-link :to="event.link.url" class="CommonUpcomingEventsItem">
        <div class="CommonUpcomingEventsItem-wrapper">
            <div class="CommonUpcomingEventsItem-info">
                <div
                    class="CommonUpcomingEventsItem-infoTitle"
                    v-text="event.title"
                ></div>
                <div
                    class="CommonUpcomingEventsItem-infoDate"
                    v-text="`${event.date} / ${event.place}`"
                ></div>
                <div class="CommonUpcomingEventsItem-infoLink">
                    <ArrowLink :title="event.link.title" type="isPurple" />
                </div>
            </div>
            <div class="CommonUpcomingEventsItem-logo">
                <img :src="event.image" :alt="event.title" />
            </div>
        </div>
    </nuxt-link>
</template>

<script>
import ArrowLink from '@/components/ArrowLink';
export default {
    name: 'CommonUpcomingEventsItem',
    components: { ArrowLink },
    props: {
        event: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonUpcomingEventsItem {
    $component: &;

    display: flex;
    width: 100%;
    flex-direction: column;
    background: $c-white;
    border: 1px solid $c-gray--shadow;
    transition: $d-hover box-shadow;

    @include hover {
        &:hover {
            box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.2);

            #{$component} {
                &-info {
                    &Link {
                        .ArrowLink-title {
                            color: $c-blue;
                        }

                        svg {
                            fill: $c-blue;
                            transform: translate3d(-4px, 0, 0);
                        }
                    }
                }
            }
        }
    }

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 35px 40px 36px;
        align-items: center;
        justify-content: space-between;

        @include mobile {
            flex-direction: column-reverse;
            justify-content: flex-start;
            padding: 40px 20px 20px;
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        width: (480 * 100% / 680);
        align-items: flex-start;
        justify-content: flex-start;

        @include mobile {
            width: 100%;
            margin-top: 40px;
        }

        &Title {
            @include text;

            color: $c-black;

            @include mobile {
                @include text-light-same-mobile-medium;
            }
        }

        &Date {
            @include text-light-same-mobile;

            color: $c-black;
        }

        &Link {
            margin-top: 20px;
        }
    }

    &-logo {
        display: flex;
        width: 160px;

        @include mobile {
            width: (165 * 1005 / 240);
        }

        img {
            width: 100%;
        }
    }
}
</style>
