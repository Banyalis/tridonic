<template>
    <div class="CommonEmptySearchMessage">
        <div class="CommonEmptySearchMessage-title">
            {{ emptySearch.title }}
        </div>
        <div v-if="emptySearch.text" class="CommonEmptySearchMessage-text">
            {{ emptySearch.text }}
        </div>
        <div class="CommonEmptySearchMessage-button">
            <RoundedButton :link="emptySearch.link" type="isBlack" />
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';

export default {
    name: 'CommonEmptySearchMessage',
    components: {
        RoundedButton
    },
    props: {
        emptySearch: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonEmptySearchMessage {
    text-align: center;
    max-width: 760px;
    margin: 95px auto;

    @include mobile {
        max-width: 280px;
    }

    &-title {
        color: $c-black;
        font-size: 24px;
        font-weight: $fw-normal;
        letter-spacing: -0.2px;
        text-align: center;
        line-height: calc(30 / 24);
        margin: 0 auto 14px;

        @include mobile {
            font-size: 18px;
            letter-spacing: 0;
            margin: 0 auto 17px;
        }
    }

    &-text {
        font-size: 14px;
        color: $c-black;
        letter-spacing: 0;
        line-height: calc(20 / 14);
        margin: 0 auto 20px;
    }

    &-button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto 0;
    }
}
</style>
