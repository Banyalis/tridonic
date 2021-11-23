<template>
    <div class="NavigationUtilsIntl">
        <div
            v-for="(intl, key) in intlList"
            :key="key"
            class="b-navigation-main-content-item NavigationUtilsIntl-item"
            :class="{ isActive: activeIntlId === intl.id }"
            @click="updateLang(intl)"
        >
            {{ intl.title }}
        </div>
    </div>
</template>

<script>
import { updateLang } from '@/utils/utils';

export default {
    name: 'NavigationUtilsIntl',
    props: {
        intlList: {
            type: Array,
            required: true,
            default: () => {
                return [];
            }
        },
        activeIntlId: {
            type: String,
            required: true,
            default: ''
        }
    },
    methods: {
        updateLang(newIntl) {
            updateLang(newIntl, this.$cookies);
        }
    }
};
</script>

<style lang="scss" scoped>
.NavigationUtilsIntl {
    &-item {
        cursor: pointer;

        &.isActive {
            pointer-events: none;
            color: $c-purple--light;
        }
    }
}
</style>
