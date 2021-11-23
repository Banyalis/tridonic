export const state = () => ({
    isSearchPanelOpened: false
});

export const mutations = {
    openSearchPanel(state) {
        state.isSearchPanelOpened = true;
    },

    closeSearchPanel(state) {
        state.isSearchPanelOpened = false;
    }
};

export const actions = {
    openSearchPanel({ commit }) {
        commit('blurContent', null, { root: true });
        commit('blurPopup', null, { root: true });
        commit('blurBlackPopup', null, { root: true });
        commit('blockScroll', null, { root: true });
        commit('search-mobile/openSearchPanel', null, { root: true });
    },

    closeSearchPanel({ commit, state }) {
        if (!state.isSearchPanelOpened) {
            return;
        }
        commit('unblurContent', null, { root: true });
        commit('unblurPopup', null, { root: true });
        commit('unblurBlackPopup', null, { root: true });
        commit('unblockScroll', null, { root: true });
        commit('search-mobile/closeSearchPanel', null, { root: true });
    }
};
