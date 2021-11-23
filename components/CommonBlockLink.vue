<template>
    <component
        :is="link.url ? (link.isExternal ? 'a' : 'nuxt-link') : 'div'"
        class="CommonBlockLink"
        :href="link.url ? (link.isExternal ? link.url : undefined) : undefined"
        :target="
            link.url ? (link.isExternal ? '_blank' : undefined) : undefined
        "
        :rel="link.url ? (link.isExternal ? 'nofollow' : undefined) : undefined"
        :to="link.url ? (link.isExternal ? undefined : link.url) : undefined"
    >
        <div class="CommonBlockLink-wrapper">
            <div class="CommonBlockLink-info">
                <div
                    v-if="link.title"
                    class="CommonBlockLink-title"
                    v-text="link.title"
                ></div>
                <div
                    v-if="link.description"
                    class="CommonBlockLink-description"
                    v-text="link.description"
                ></div>
            </div>
            <div v-if="link.url" class="CommonBlockLink-arrow">
                <Arrow />
            </div>
        </div>
    </component>
</template>

<script>
import Arrow from '@/components/Arrow';

export default {
    name: 'CommonBlockLink',
    components: { Arrow },
    props: {
        link: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonBlockLink {
    $component: &;

    width: 100%;
    display: flex;

    @include hover {
        &:hover {
            & #{$component} {
                &-title {
                    color: $c-blue;
                }

                &-arrow {
                    color: $c-blue;

                    svg {
                        transform: none;
                    }
                }
            }
        }
    }

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
    }

    &-info {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        &:before {
            content: '';
            width: 40px;
            height: 2px;
            background: $c-black;
        }
    }

    &-title {
        @include title-h2;

        color: $c-black;
        margin-top: 25px;
        transition: $d-hover color;

        @include mobile {
            margin-top: 14px;
            font-size: 24px;
            line-height: (30 / 24);
            font-weight: $fw-normal;
            letter-spacing: -0.2px;
        }
    }

    &-description {
        @include text-light-same-mobile;

        color: $c-black;
        margin-top: 17px;

        @include mobile {
            margin-top: 19px;
        }
    }

    &-arrow {
        color: $c-purple;
        margin-top: 18px;
        transition: $d-hover color;

        @include mobile {
            margin-top: 15px;
        }
    }
}
</style>
