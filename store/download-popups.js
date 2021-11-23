export const state = () => ({
    results: []
});

export const mutations = {
    init(state, { results }) {
        Object.assign(state, { results });
    },

    update(state, { results }) {
        state.results = results;
    }
};
