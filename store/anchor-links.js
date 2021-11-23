export const state = () => ({
    anchorLinks: {
        title: '',
        links: []
    }
});

export const mutations = {
    init(state, { anchorLinks }) {
        Object.assign(state, { anchorLinks });
    }
};
