<template>
    <div class="CompanyFacts">
        <div
            v-for="(item, index) in facts"
            :key="index"
            class="CompanyFacts-item"
        >
            <div class="CompanyFacts-itemTitle" v-text="item.title"></div>
            <div class="CompanyFacts-itemCount" v-text="item.count"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CompanyFacts',

    props: {
        facts: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CompanyFacts {
    display: flex;
    justify-content: space-between;
    margin: 80px 0 108px;

    @include mobile {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 28px 40px;
        margin: 40px 0 71px;
    }

    &-item {
        width: 100%;
        max-width: 200px;
        padding-top: 24px;
        border-top: 1px solid $c-black;
        color: $c-black;

        @include mobile {
            max-width: 100%;
            padding-top: 9px;
        }

        &Title {
            @include text-light;

            margin-bottom: 15px;

            @include mobile {
                margin-bottom: 0;
            }
        }

        &Count {
            font-size: 96px;
            line-height: (60 / 96);
            letter-spacing: -3px;
            font-weight: $fw-light;

            @include mobile {
                font-size: 48px;
                line-height: (60 / 48);
                letter-spacing: -1.5px;
            }
        }
    }
}
</style>
