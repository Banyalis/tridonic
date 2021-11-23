<template>
    <div class="TextContentWrapper">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'TextContentWrapper'
};
</script>

<style lang="scss">
.TextContentWrapper {
    margin: 0 auto;
    max-width: 840px;
    padding: 0 40px;
    position: relative;

    @include mobile {
        padding: 0 20px;
    }
}
</style>
