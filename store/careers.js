export const state = () => ({
    internalHeader: {},
    tabs: [],
    links: []
});

export const mutations = {
    init(state, { internalHeader, tabs, links }) {
        Object.assign(state, { internalHeader, tabs, links });
    }
};
