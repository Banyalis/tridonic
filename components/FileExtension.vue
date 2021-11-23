<template>
    <div class="FileExtension">
        <svg-icon name="file-icon"></svg-icon>
        <span>{{ extension }}</span>
    </div>
</template>

<script>
export default {
    name: 'FileExtension',
    props: {
        extension: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.FileExtension {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    svg {
        flex: 0 0 16px;
        fill: $c-white;
        transition: $d-hover fill;

        @include mobile {
            flex: 0 0 12px;
        }
    }

    span {
        @include text-light;
        margin-left: 6px;
        flex: 0;
    }
}
</style>
