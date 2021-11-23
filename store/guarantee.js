export const state = () => ({
    internalHeader: {},
    content: []
});

export const mutations = {
    init(state, { internalHeader, content }) {
        Object.assign(state, { internalHeader, content });
    }
};
