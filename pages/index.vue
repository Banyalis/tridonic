<template>
    <section class="Home"></section>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    name: 'HomePage',
    components: {},

    mixins: [mixinOpenPopup],

    async fetch({ $config: { baseURL }, store }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const resHome = await axios.get(`${baseURL}/home`);
        store.commit('home/init', resHome.data);
    },
    computed: {
        ...mapState('home', ['missionStatement', 'heroImage'])
    }
};
</script>
<style lang="scss">
.Home {
    min-height: 200vh; // to make home scrollable for test until home page exist
}
</style>
