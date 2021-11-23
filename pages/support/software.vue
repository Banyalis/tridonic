<template>
    <div class="SoftwarePage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :main-title="internalHeader.mainTitle"
        />

        <SoftwareList :list="featuredSoftwareList" />

        <SoftwareGroup
            v-for="(group, id) in groups"
            :key="id"
            :title="group.title"
            :list="group.list"
        />

        <FirmwareList :title="firmware.title" :list="firmware.list" />

        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { mixinOpenPopup } from '@/utils/mixins';

import InternalHeader from '@/components/InternalHeader';
import SoftwareList from '@/components/SoftwareList';
import SoftwareGroup from '@/components/SoftwareGroup';
import FirmwareList from '@/components/FirmwareList';
import AnchorLinks from '@/components/AnchorLinks';

export default {
    layout: 'page',

    components: {
        InternalHeader,
        SoftwareList,
        SoftwareGroup,
        FirmwareList,
        AnchorLinks
    },

    mixins: [mixinOpenPopup],

    async fetch({ $config: { baseURL }, store }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const language = store.state.locale.language;
        const region = store.state.locale.region;

        const [softwarePage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/support/software`),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/support-software`
            )
        ]);

        store.commit('software/init', softwarePage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        ...mapState('software', [
            'internalHeader',
            'featuredSoftwareList',
            'groups',
            'firmware'
        ]),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'Software'
        };
    }
};
</script>

<style lang="scss">
.SoftwarePage {
    overflow: hidden;

    .InternalHeader {
        padding-bottom: 269px;

        @include mobile {
            padding-bottom: 98px;
        }
    }

    .SoftwareListWrapper {
        margin-top: -240px;

        @include mobile {
            margin-top: -70px;
        }
    }
}
</style>
