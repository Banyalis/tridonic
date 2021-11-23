export const state = () => ({
    internalHeader: null,
    notes: null,
    categories: [],
    questions: [],
    emptySearch: null
});

export const mutations = {
    init(state, { internalHeader, notes, categories, questions }) {
        Object.assign(state, { internalHeader, notes, categories, questions });
    },

    update(state, { questions }) {
        state.questions = questions;
        state.emptySearch = null;
    },

    empty(state, { emptySearch }) {
        state.emptySearch = emptySearch;
    }
};
