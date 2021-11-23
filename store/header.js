export const state = () => ({
    header: {},
    isHeaderHidden: false
});

export const mutations = {
    init(store, { header }) {
        Object.assign(store, { header });
    },

    hideHeader(state) {
        state.isHeaderHidden = true;
    },

    showHeader(state) {
        state.isHeaderHidden = false;
    }
};
