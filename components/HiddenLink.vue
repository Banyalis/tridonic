<template>
    <component
        :is="isExternal ? 'a' : 'nuxt-link'"
        class="b-hidden-link"
        :href="isExternal ? url : undefined"
        :target="isExternal ? '_blank' : undefined"
        :rel="isExternal ? 'nofollow' : undefined"
        :to="isExternal ? undefined : url"
    ></component>
</template>

<script>
export default {
    name: 'HiddenLink',
    props: {
        url: {
            type: String,
            required: true
        },
        isExternal: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style scoped></style>
