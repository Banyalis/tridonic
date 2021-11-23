export const state = () => ({
    main: {},
    listCategories: [],
    filters: {}
});

export const mutations = {
    init(state, { main, listCategories, filters }) {
        Object.assign(state, { main, listCategories, filters });
    },

    updateProjects(state, projectsPage) {
        if (projectsPage.main) state.main = { ...projectsPage.main };

        if (projectsPage.listCategories)
            state.listCategories = [...projectsPage.listCategories];

        if (projectsPage.filters) state.filters = { ...projectsPage.filters };
    }
};
