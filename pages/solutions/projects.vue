<template>
    <div class="ProjectsPage">
        <InternalHeader
            :top-title="$translations.titleProjects()"
            :has-background="true"
        >
            <CommonMainItem :main="mapMainItem" />
        </InternalHeader>

        <div class="ProjectsPage-list">
            <div class="ProjectsPage-listWrapper b-container">
                <SolutionsProjectsCategoriesList
                    :categories="listCategories"
                    :filters="filters"
                />
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
import SolutionsProjectsCategoriesList from '@/components/SolutionsProjectsCategoriesList';
import CommonMainItem from '@/components/CommonMainItem';

export default {
    components: {
        CommonMainItem,
        SolutionsProjectsCategoriesList,
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

        const [ProjectsPage, anchorLinks] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/solutions/projects`),
            axios.get(
                `${baseURL}/${language}/${region}/anchor-links/solutions-projects`
            )
        ]);

        store.commit('solutions-projects/init', ProjectsPage.data);
        store.commit('anchor-links/init', { anchorLinks: anchorLinks.data });
    },

    computed: {
        mapMainItem() {
            return {
                ...this.main,
                subTitle:
                    this.main.location.city + ' / ' + this.main.location.country
            };
        },

        ...mapState('solutions-projects', [
            'main',
            'listCategories',
            'filters'
        ]),
        ...mapState('anchor-links', ['anchorLinks'])
    },

    head() {
        return {
            title: 'Solutions Projects'
        };
    }
};
</script>

<style lang="scss">
.ProjectsPage {
    $component: &;

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
