<template>
    <div class="SolutionsList">
        <div class="SolutionsList-wrapper">
            <div
                v-for="(item, index) in list"
                :key="index"
                class="SolutionsList-item"
            >
                <SolutionsItem :item="item"></SolutionsItem>
            </div>
        </div>
    </div>
</template>

<script>
import SolutionsItem from '@/components/SolutionsItem';
export default {
    name: 'SolutionsList',

    components: { SolutionsItem },

    props: {
        list: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss">
.SolutionsList {
    $component: &;

    display: flex;
    width: 100%;

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;

        @include mobile {
            align-items: center;
        }
    }

    &-item {
        width: 100%;
        display: flex;
        margin-top: 40px;

        @include mobile {
            max-width: 640px;
        }

        &:first-child {
            margin-top: 0;
        }
    }
}
</style>
