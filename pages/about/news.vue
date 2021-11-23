<template>
    <div class="NewsPage">
        <InternalHeader :top-title="$translations.titleNewsPress()">
            <CommonMainItem :main="mapMainItem" />

            <div class="NewsPage-headerContact">
                <div class="NewsPage-headerContactBlock">
                    <NewsHeaderContacts
                        :contact="contact"
                        :link-press-kit="linkPressKit"
                    />
                </div>
                <div
                    class="NewsPage-headerContactBlock NewsPage-headerContactBlock--mobile"
                >
                    <CommonLinkList :list="getHeaderList" type="isNews" />
                </div>
            </div>
        </InternalHeader>

        <div class="NewsPage-list">
            <div class="NewsPage-listWrapper b-container">
                <NewsList :news="news" :filters="filters" />
            </div>
        </div>

        <AnchorLinks :anchor-links="anchorLinks" />
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import { mixinOpenPopup } from '@/utils/mixins';

import InternalHeader from '@/components/InternalHeader';
import AnchorLinks from '@/components/AnchorLinks';
import CommonMainItem from '@/components/CommonMainItem';
import NewsHeaderContacts from '@/components/NewsHeaderContacts';
import NewsList from '@/components/NewsList';
import CommonLinkList from '@/components/CommonLinkList';

export default {
    components: {
        CommonLinkList,
        NewsList,
        NewsHeaderContacts,
        CommonMainItem,
        InternalHeader,
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

        const [NewsPage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/about/news`),
            axios.get(`${baseURL}/${language}/${region}/anchor-links/news`)
        ]);

        store.commit('news/init', NewsPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        mapMainItem() {
            return {
                ...this.main,
                subTitle: this.main.type
            };
        },

        getHeaderList() {
            return [
                {
                    url: '/',
                    title: this.$translations.signUpForNewsletter()
                },
                {
                    url: this.linkPressKit,
                    title: this.$translations.downloadPressKit()
                },
                {
                    url: '/',
                    title: this.$translations.pressContact()
                }
            ];
        },

        ...mapState('news', [
            'main',
            'news',
            'filters',
            'contact',
            'linkPressKit'
        ]),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'News & Press'
        };
    }
};
</script>

<style lang="scss">
.NewsPage {
    $component: &;

    &-headerContact {
        display: flex;
        flex-direction: column;
        width: 100%;

        &Block {
            width: 100%;
            display: flex;

            @include mobile {
                display: none;
            }

            &--mobile {
                display: none;
                margin-top: 40px;

                @include mobile {
                    display: flex;
                    margin-bottom: 20px;
                }
            }
        }
    }

    &-list {
        display: flex;
        width: 100%;
        overflow: hidden;

        &Wrapper {
            display: flex;
        }
    }
}
</style>
