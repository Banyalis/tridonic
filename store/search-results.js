export const state = () => ({
    prompts: [],
    categories: [],
    results: [],
    pagination: {}
});

export const mutations = {
    init(state, { categories, results, pagination }) {
        Object.assign(state, { categories, results, pagination });
    },

    setPrompts(state, prompts) {
        state.prompts = [...prompts];
    },

    clearPrompts(state) {
        state.prompts = [];
    },

    update(state, { categories, results, pagination }) {
        state.categories = categories;
        state.results = results;
        state.pagination = pagination;
    }
};
