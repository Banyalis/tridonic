export const state = () => ({
    internalHeader: {},
    tutorials: {},
    pagination: {}
});

export const mutations = {
    init(state, { internalHeader, tutorials, pagination }) {
        Object.assign(state, { internalHeader, tutorials, pagination });
    },

    update(state, { tutorials, pagination }) {
        state.tutorials = tutorials;
        state.pagination = pagination;
    }
};
