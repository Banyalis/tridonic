<template>
    <div class="CommonBlackPopupContent">
        <CommonBlackPopupCalculatorForm
            v-if="content.type === 'calculator'"
            :sections="content.sections"
            :type-form="typePopup"
        />
        <CommonBlackPopupList
            v-else-if="content.type === 'list'"
            :list="content.list"
        />
        <CommonBlackPopupSubscribeForm
            v-if="content.type === 'newsletter' || content.type === 'getAccess'"
            :type="content.type"
            :countries="content.countries"
        />
        <!-- eslint-disable -->
        <TextContent
            v-else-if="content.type === 'text'"
            class="CommonBlackPopupContent-text"
            v-html="getContentText"
        />
        <!-- eslint-enable -->
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CommonBlackPopupCalculatorForm from '@/components/CommonBlackPopupCalculatorForm';
import CommonBlackPopupList from '@/components/CommonBlackPopupList';
import CommonBlackPopupSubscribeForm from '@/components/CommonBlackPopupSubscribeForm';
import TextContent from '@/components/TextContent';

export default {
    name: 'CommonBlackPopupContent',

    components: {
        CommonBlackPopupCalculatorForm,
        CommonBlackPopupList,
        CommonBlackPopupSubscribeForm,
        TextContent
    },

    props: {
        content: {
            type: Object,
            required: true
        },
        category: {
            type: Object,
            default: undefined
        },
        typePopup: {
            type: String,
            default: undefined
        }
    },

    computed: {
        getContentText() {
            return this.category?.id
                ? this.content.text[this.category.id]
                : this.content.text;
        },

        ...mapState('locale', ['language', 'region'])
    }
};
</script>

<style lang="scss" scoped>
.CommonBlackPopupContent {
    $component: &;

    width: (760 * 100% / 1160);

    @include mobile {
        width: 100%;
    }

    &-text {
        color: $c-white;

        & /deep/ strong {
            color: $c-white;
        }
    }
}
</style>
