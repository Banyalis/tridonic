<template>
    <div class="CompanyPage">
        <InternalHeader
            :top-title="internalHeader.topTitle"
            :main-title="internalHeader.mainTitle"
            :has-indent="true"
        />
        <div class="CompanyPage-video">
            <CommonVideo :poster="video.poster" :video="video.video" />
        </div>
        <div class="CompanyPage-container">
            <CompanyFacts :facts="facts"></CompanyFacts>
            <div class="CompanyPage-titleWrapper">
                <div
                    class="CompanyPage-title"
                    v-text="$translations.companyProjectsTitle()"
                ></div>
            </div>
            <CompanyProjects :projects="projects"></CompanyProjects>
        </div>
        <div class="CompanyPage-substrate CompanyPage-substrate--history">
            <div class="CompanyPage-container">
                <div class="CompanyPage-titleWrapper">
                    <div
                        class="CompanyPage-title"
                        v-text="$translations.companyHistoryTitle()"
                    ></div>
                </div>
                <CompanyHistory :history="history"></CompanyHistory>
            </div>
        </div>
        <div class="CompanyPage-container">
            <div
                v-if="drawers.employee"
                class="CompanyPage-titleWrapper CompanyPage-titleWrapper--drawers"
            >
                <div
                    class="CompanyPage-title"
                    v-text="$translations.companyEmployeeTitle()"
                ></div>
            </div>
            <CommonDrawers
                v-if="drawers.employee"
                :content-components="contentComponents"
                modifier="employee"
            ></CommonDrawers>
            <div
                v-if="team && drawers.team"
                class="CompanyPage-titleWrapper CompanyPage-titleWrapper--team CompanyPage-titleWrapper--drawers"
            >
                <div
                    class="CompanyPage-title"
                    v-text="$translations.companyTeamTitle()"
                ></div>
            </div>
            <CommonDrawers
                v-if="team && drawers.team"
                :content-components="contentComponents"
                modifier="team"
            ></CommonDrawers>
        </div>
        <div class="CompanyPage-substrate CompanyPage-substrate--news">
            <div class="CompanyPage-container">
                <div class="CompanyPage-titleWrapper">
                    <div
                        class="CompanyPage-title"
                        v-text="$translations.companyNewsTitle()"
                    ></div>
                </div>
                <CompanyNews :news="news"></CompanyNews>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';
import InternalHeader from '@/components/InternalHeader';
import CommonVideo from '@/components/CommonVideo';
import CompanyFacts from '@/components/CompanyFacts';
import CompanyProjects from '@/components/CompanyProjects';
import CompanyHistory from '@/components/CompanyHistory';
import CommonDrawers from '@/components/CommonDrawers';
import CompanyNews from '@/components/CompanyNews';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    name: 'CompanyPage',

    components: {
        InternalHeader,
        CommonVideo,
        CompanyFacts,
        CompanyProjects,
        CompanyHistory,
        CommonDrawers,
        CompanyNews
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
        const resCompany = await axios.get(
            `${baseURL}/${language}/${region}/about/company`
        );

        store.commit('company/init', resCompany.data);
    },

    data() {
        return {
            contentComponents: {
                employee: 'CompanyEmployee',
                team: 'CompanyTeam'
            }
        };
    },

    computed: {
        ...mapState('company', [
            'internalHeader',
            'video',
            'facts',
            'projects',
            'history',
            'employee',
            'team',
            'news'
        ]),
        ...mapState('drawers', ['drawers'])
    },

    mounted() {
        this.setDrawers();
    },

    methods: {
        setDrawers() {
            const drawers = { employee: [], team: [] };

            drawers.employee = this.employee;

            if (this.team?.length) {
                drawers.team = this.team;
            }

            this.updateDrawers(drawers);
        },

        ...mapMutations({
            updateDrawers: 'drawers/updateDrawers'
        })
    }
};
</script>

<style lang="scss" scoped>
.CompanyPage {
    $component: &;

    &-video {
        max-width: 1360px;
        margin: -160px auto 0;
        padding: 0 20px;

        @include mobile {
            margin: 0;
            padding: 0;
        }
    }

    &-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
    }

    &-title {
        @include title-bordered-h2;

        color: $c-black;

        &Wrapper {
            display: flex;
            justify-content: center;
            margin-bottom: 45px;

            &--drawers {
                margin-bottom: 59px;
            }

            &--team {
                margin: 168px 0 59px;

                @include mobile {
                    margin: 100px 0 40px;
                }
            }

            @include mobile {
                margin-bottom: 40px;
            }
        }
    }

    &-substrate {
        border-top: 1px solid #e4e4e4;
        background-color: $c-gray--bg;

        &--history {
            margin: 103px 0 68px;
            padding: 68px 0 55px;
            border-bottom: 1px solid #e4e4e4;

            @include mobile {
                margin: 40px 0 38px;
                padding: 43px 0;
                overflow: hidden;
            }
        }

        &--news {
            margin-top: 102px;
            padding: 68px 0 103px;

            @include mobile {
                margin-top: 58px;
                padding: 43px 0 80px;
            }
        }
    }
}
</style>
