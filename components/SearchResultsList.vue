<template>
    <div class="SearchResultsList">
        <div
            v-for="(item, index) in results"
            :key="index"
            class="SearchResultsList-item"
        >
            <search-results-item :item="item"></search-results-item>
        </div>
    </div>
</template>

<script>
import SearchResultsItem from '@/components/SearchResultsItem';

export default {
    name: 'SearchResultsList',

    components: {
        SearchResultsItem
    },

    props: {
        results: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.SearchResultsList {
    &-item {
        &:not(:last-child) {
            margin-bottom: 24px;
        }
    }
}
</style>
