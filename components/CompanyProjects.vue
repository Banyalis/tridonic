<template>
    <div class="CompanyProjects">
        <common-grid-item
            v-for="(item, index) in projects"
            :key="index"
            :item="item"
        ></common-grid-item>
    </div>
</template>

<script>
import CommonGridItem from '@/components/CommonGridItem';

export default {
    name: 'CompanyProjects',

    components: {
        CommonGridItem
    },

    props: {
        projects: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CompanyProjects {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 63px 40px;

    @include mobile {
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 40px 0;
    }
}
</style>
