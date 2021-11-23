export const state = () => ({
    internalHeader: {},
    preview: '',
    blocks: [],
    projects: []
});

export const mutations = {
    init(state, { internalHeader, preview, blocks, projects }) {
        Object.assign(state, { internalHeader, preview, blocks, projects });
    }
};
