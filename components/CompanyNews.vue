<template>
    <div class="CompanyNews">
        <common-grid-item
            v-for="(item, index) in news.items"
            :key="index"
            :item="item"
            modifier="small"
        ></common-grid-item>
        <div class="CompanyNews-notification">
            <div class="CompanyNews-notificationInner">
                <div
                    class="CompanyNews-notificationTitle"
                    v-text="news.notification.title"
                ></div>
                <p
                    class="CompanyNews-notificationText"
                    v-text="news.notification.text"
                ></p>
            </div>
            <div class="CompanyNews-notificationIcon">
                <svg-icon name="arrow-right"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
import CommonGridItem from '@/components/CommonGridItem';

export default {
    name: 'CompanyNews',

    components: {
        CommonGridItem
    },

    props: {
        news: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CompanyNews {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0 40px;

    @include mobile {
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 40px 0;
    }

    &-notification {
        @include text;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 36px 40px 23px;
        background-color: $c-white;
        color: $c-black;

        @include mobile {
            padding: 23px 20px 20px;
        }

        &Text {
            margin: 30px 0 93px;

            @include mobile {
                margin: 20px 0 37px;
            }
        }

        &Icon {
            width: 50px;
            height: 34px;

            @include mobile {
                width: 32px;
                height: 20px;
            }

            svg {
                width: 100%;
                height: 100%;
                fill: $c-purple;
            }
        }
    }
}
</style>
