<template>
    <div class="FilterTrash">
        <svg-icon class="FilterTrash-icon" name="filter-trash"></svg-icon>
        <svg-icon
            class="FilterTrash-icon_hovered"
            name="filter-trash-hovered"
        ></svg-icon>
    </div>
</template>

<script>
export default {
    name: 'FilterTrash'
};
</script>

<style lang="scss" scoped>
.FilterTrash {
    width: 16px;
    height: 18px;
    cursor: pointer;

    &-icon,
    &-icon_hovered {
        @include m-absolute100;
        transition: $d-hover opacity;
    }

    &-icon_hovered {
        opacity: 0;
    }

    @include hover {
        &:hover {
            .FilterTrash-icon_hovered {
                opacity: 1;
            }

            .FilterTrash-icon {
                opacity: 0;
            }
        }
    }
}
</style>
