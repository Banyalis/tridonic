export const state = () => ({
    internalHeader: {},
    listSolutions: []
});

export const mutations = {
    init(state, { internalHeader, listSolutions }) {
        Object.assign(state, { internalHeader, listSolutions });
    }
};
