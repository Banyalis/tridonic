<template>
    <div class="DownloadsPage">
        <InternalHeader :top-title="internalHeader.topTitle">
            <div class="Sorts">Sorts</div>
        </InternalHeader>

        <div class="DownloadsPage-main b-container">
            <div class="DownloadsPage-mainHeader">
                <div class="DownloadsPage-mainHeaderSearch">
                    <CommonSearchInput
                        placeholder="Search by keywords"
                        search-id="download-center"
                    />
                </div>
                <RoundedButton type="isBlack" text="Download Selected" />
            </div>

            <div class="DownloadsPage-mainContent">
                <CommonDownloads :downloads="downloads.content.files" />
            </div>

            <div class="DownloadsPage-pagination">
                <Pagination
                    :page-count="pagination.pageCount"
                    :active-page-number="currentPage"
                />
            </div>
        </div>

        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

import InternalHeader from '@/components/InternalHeader';
import CommonSearchInput from '@/components/CommonSearchInput';
import CommonDownloads from '@/components/CommonDownloads';
import RoundedButton from '@/components/RoundedButton';
import Pagination from '@/components/Pagination';
import AnchorLinks from '@/components/AnchorLinks';

export default {
    layout: 'page',
    components: {
        InternalHeader,
        CommonSearchInput,
        RoundedButton,
        CommonDownloads,
        Pagination,
        AnchorLinks
    },

    async fetch({ $config: { baseURL }, store }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const language = store.state.locale.language;
        const region = store.state.locale.region;

        const [downloadsPage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/support/downloads`),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/support-downloads`
            )
        ]);

        store.commit('downloads/init', downloadsPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    data() {
        return {
            currentPage: 1
        };
    },

    computed: {
        ...mapState('downloads', ['internalHeader', 'downloads', 'pagination']),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'Download center'
        };
    }
};
</script>

<style lang="scss">
.DownloadsPage {
    &-main {
        padding-top: 20px;
        padding-bottom: 80px;
    }

    &-mainHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 40px;

        &Search {
            width: (280 * 100% / 1160);
        }
    }

    &-pagination {
        margin: 40px auto 0;
    }
}
</style>
