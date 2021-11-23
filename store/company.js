export const state = () => ({
    internalHeader: {},
    video: {},
    facts: [],
    projects: [],
    history: [],
    employee: [],
    team: [],
    news: {}
});

export const mutations = {
    init(
        store,
        {
            internalHeader,
            video,
            facts,
            projects,
            history,
            employee,
            team,
            news
        }
    ) {
        Object.assign(store, {
            internalHeader,
            video,
            facts,
            projects,
            history,
            employee,
            team,
            news
        });
    }
};
