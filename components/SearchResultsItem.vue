<template>
    <div class="SearchResultsItem">
        <HiddenLink
            :is-external="item.link.isExternal"
            :url="item.link.url"
        ></HiddenLink>
        <div class="SearchResultsItem-content">
            <div
                class="SearchResultsItem-category"
                v-text="item.category"
            ></div>
            <div class="SearchResultsItem-title" v-text="item.title"></div>
            <p class="SearchResultsItem-text" v-text="item.text"></p>
            <div v-if="item.extension" class="SearchResultsItem-extension">
                <FileExtension :extension="item.extension"></FileExtension>
            </div>
        </div>
        <div class="SearchResultsItem-image">
            <picture>
                <source :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'" />
                <img :src="item.image" alt="" />
            </picture>
        </div>
    </div>
</template>

<script>
import HiddenLink from '@/components/HiddenLink';
import FileExtension from '@/components/FileExtension';

export default {
    name: 'SearchResultsItem',

    components: {
        HiddenLink,
        FileExtension
    },

    props: {
        item: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.SearchResultsItem {
    $component: &;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #e4e4e4;
    position: relative;

    @include hover {
        &:hover #{$component}-title {
            color: $c-blue;
        }
    }

    &-content {
        width: 720px;
    }

    &-category {
        @include text-light;

        color: #909096;
    }

    &-title {
        @include text;

        margin: 11px 0 19px;
        color: $c-black;
        transition: color $d-hover ease-in-out;
    }

    &-text {
        @include text-light;

        color: $c-gray--dark;
    }

    &-extension {
        margin-top: 15px;

        .FileExtension {
            justify-content: flex-start;

            & /deep/ svg {
                fill: $c-purple;
            }

            & /deep/ span {
                color: $c-purple;
                font-weight: $fw-medium;
            }
        }
    }

    &-image {
        width: 160px;
        height: 160px;
    }
}
</style>
