<template>
    <div class="FilterCheckboxGroup">
        <div
            v-for="(checkbox, key) in checkboxGroup"
            :key="key"
            class="FilterCheckboxGroup-checkbox"
        >
            <FilterCheckbox
                :input-id="`${groupId}-${key}`"
                :title="checkbox.title"
                :count-of-products="checkbox.countOfProducts"
                :tooltip-text="checkbox.tooltip"
            ></FilterCheckbox>
        </div>
    </div>
</template>

<script>
import FilterCheckbox from '~/components/FilterCheckbox';
export default {
    name: 'FilterCheckboxGroup',
    components: { FilterCheckbox },
    props: {
        checkboxGroup: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        groupId: {
            type: Number,
            required: true
        }
    }
};
</script>

<style scoped></style>
