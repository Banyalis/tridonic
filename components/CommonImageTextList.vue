<template>
    <div class="CommonImageText">
        <ul class="CommonImageText-list">
            <li
                v-for="item in imageTextList"
                :key="item.id"
                class="CommonImageText-listItem CommonImageTextItem"
            >
                <div class="CommonImageTextItem-desc">
                    <h3 class="CommonImageTextItem-title">
                        {{ item.title }}
                    </h3>
                    <p class="CommonImageTextItem-text">
                        {{ item.text }}
                    </p>

                    <ArrowLink
                        v-if="item.link"
                        :url="item.link.url"
                        :title="item.link.title"
                        type="isPurple"
                    />
                </div>
                <div class="CommonImageTextItem-image">
                    <img :src="item.image" alt="" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import ArrowLink from '@/components/ArrowLink';

export default {
    name: 'CommonImageText',
    components: {
        ArrowLink
    },
    props: {
        imageTextList: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonImageText {
    color: $c-black;

    &-list {
        @include u-noList;
    }
}

.CommonImageTextItem {
    border-bottom: 1px solid $c-gray--shadow;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 39px 0;

    &:last-child {
        border-bottom: 0;
    }

    @include mobile {
        border-bottom: 0;
        flex-direction: column-reverse;
        padding: 35px 0;
    }

    &:first-child {
        padding-top: 0 !important;
    }

    &-desc {
        margin-right: 35px;

        @include mobile {
            margin-right: 0;
        }
    }

    &-title {
        color: $c-black;
        font-size: 24px;
        font-weight: $fw-normal;
        letter-spacing: -0.2px;
        line-height: calc(30 / 24);
        margin: 0;

        @include mobile {
            font-size: 18px;
            letter-spacing: 0;
            line-height: calc(20 / 18);
        }
    }

    &-text {
        color: $c-gray--dark;
        font-size: 18px;
        letter-spacing: 0;
        line-height: calc(30 / 18);
        margin: 12px 0 17px;

        @include mobile {
            font-size: 14px;
            line-height: calc(20 / 14);
            margin: 2px 0 20px;
        }
    }

    &-image {
        @include m-aspectRatio(360, 240);

        min-width: 360px;

        @include mobile {
            min-width: 280px;
            margin-bottom: 23px;
        }

        img {
            @include m-absoluteObjectFit();
        }
    }
}
</style>
