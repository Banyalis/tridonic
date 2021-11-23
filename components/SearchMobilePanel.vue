<template>
    <MobilePanel
        :is-opened="isSearchPanelOpened"
        class="MobilePanel-search"
        @cross-click="closeSearchPanel"
    >
        <NavigationUtilsSearch
            :popular-search-items="
                navigationUtils.searchPanel.popularSearchItems
            "
            :popular-search-items-title="
                navigationUtils.searchPanel.popularSearchItemsTitle
            "
            :is-active="isSearchPanelOpened"
        />
    </MobilePanel>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MobilePanel from '@/components/MobilePanel';
import NavigationUtilsSearch from '@/components/NavigationUtilsSearch';
import { onMediaSizeChange } from '@/utils/utils';

export default {
    name: 'SearchMobilePanel',
    components: { NavigationUtilsSearch, MobilePanel },
    computed: {
        ...mapState('navigation-utils', ['navigationUtils']),
        ...mapState('search-mobile', ['isSearchPanelOpened']),
        ...mapState(['currentMediaSize'])
    },
    watch: {
        currentMediaSize: {
            handler(newVal, oldVal) {
                onMediaSizeChange(
                    newVal,
                    oldVal,
                    undefined,
                    this.closeSearchPanel
                );
            }
        }
    },
    methods: {
        ...mapActions({
            closeSearchPanel: 'search-mobile/closeSearchPanel'
        })
    }
};
</script>

<style lang="scss" scoped></style>
