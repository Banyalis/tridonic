<template>
    <MobilePanel
        :is-opened="isEshopPanelOpened"
        class="MobilePanel-eshop"
        @cross-click="closeEshopPanel"
    >
        <NavigationUtilsEshop :eshop-panel="navigationUtils.eshopPanel" />
    </MobilePanel>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import NavigationUtilsEshop from '@/components/NavigationUtilsEshop';
import MobilePanel from '@/components/MobilePanel';

export default {
    name: 'EshopMobilePanel',
    components: {
        MobilePanel,
        NavigationUtilsEshop
    },
    computed: {
        ...mapState('navigation-utils', ['navigationUtils']),
        ...mapState('eshop-mobile', ['isEshopPanelOpened'])
    },
    methods: {
        ...mapMutations({
            closeEshopPanel: 'eshop-mobile/closeEshopPanel'
        })
    }
};
</script>

<style scoped></style>
