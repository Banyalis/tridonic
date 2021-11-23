export const state = () => ({
    internalHeader: {},
    downloads: {},
    pagination: {}
});

export const mutations = {
    init(state, { internalHeader, downloads, pagination }) {
        Object.assign(state, { internalHeader, downloads, pagination });
    }
};
