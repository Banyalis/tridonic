<template>
    <div class="NavigationMenuAdditionalLinks">
        <div v-if="title" class="NavigationMenuAdditionalLinks-title">
            {{ title }}
        </div>
        <div class="NavigationMenuAdditionalLinks-list">
            <ArrowLink
                v-for="(link, key) in linkList"
                :key="key"
                class="NavigationMenuAdditionalLinks-link"
                :title="link.title"
                :url="link.url"
            ></ArrowLink>
        </div>
    </div>
</template>

<script>
import ArrowLink from '@/components/ArrowLink';

export default {
    name: 'NavigationMenuAdditionalLinks',
    components: { ArrowLink },
    props: {
        title: {
            type: String,
            default: null
        },
        linkList: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.NavigationMenuAdditionalLinks {
    padding-left: 60px;
    margin-top: auto;

    @include mobile {
        padding: 0;
    }

    &-title {
        @include text-light;
        font-weight: $fw-medium;
        color: $c-white;
    }

    &-list {
        margin-top: 20px;
    }

    &-link {
        margin-top: 25px;

        &:first-child {
            margin-top: 0;
        }
    }
}
</style>
