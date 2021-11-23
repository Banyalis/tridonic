export const state = () => ({
    isOpen: false,
    isOpenBlack: false,
    currentApi: '',
    currentApiBlack: '',
    isProcessing: false,
    rootUrl: '',
    type: undefined,
    typeBlack: undefined,
    isNowClosed: false,
    popup: {},
    popupBlack: {},
    isBlackPopup: false
});

export const mutations = {
    updatePopup(state, popup) {
        state.popup = popup;
    },

    updateBlackPopup(state, popup) {
        state.popupBlack = popup;
    },

    updateType(state, type) {
        state.type = type;
    },

    updateBlackType(state, type) {
        state.typeBlack = type;
    },

    updateApi(state, path) {
        state.currentApi = path;
        state.isNowClosed = true;
    },

    updateApiBlack(state, path) {
        state.currentApiBlack = path;
        state.isNowClosed = true;
    },

    updateRootUrl(state, rootUrl) {
        state.rootUrl = rootUrl;
    },

    setOpenPopup(state) {
        state.isOpen = true;
    },

    setOpenBlackPopup(state) {
        state.isOpenBlack = true;
    },

    setClosePopup(state) {
        state.isOpen = false;
    },

    setCloseBlackPopup(state) {
        state.isOpenBlack = false;
    },

    resetOpeningPopup(state) {
        state.isOpen = false;
    },

    resetOpeningBlackPopup(state) {
        state.isOpenBlack = false;
    },

    clearRootUrl(state) {
        state.rootUrl = '';
    },

    updateProcessing(state, isNow) {
        state.isProcessing = isNow;
    },

    resetIsNowClosed(state) {
        state.isNowClosed = false;
    },

    updateIsBlackPopup(state, isBlackPopup) {
        state.isBlackPopup = isBlackPopup;
    },

    resetApi(state) {
        state.currentApi = '';
    },

    resetBlackApi(state) {
        state.currentApiBlack = '';
    }
};

export const actions = {
    openPopup({ commit }) {
        commit('popup/setOpenPopup', null, { root: true });
        commit('blurContent', null, { root: true });
        commit('blockScrollForPopup', null, { root: true });
        commit('openPopup', null, { root: true });
    },

    closePopup({ commit }) {
        commit('closePopup', null, { root: true });
        commit('unblurContent', null, { root: true });
        commit('unblockScrollForPopup', null, { root: true });
        commit('popup/resetApi', null, { root: true });
    },

    openBlackPopup({ commit }) {
        commit('popup/setOpenBlackPopup', null, { root: true });
        commit('blurContent', null, { root: true });
        commit('blurPopup', null, { root: true });
        commit('blockScrollPopup', null, { root: true });
        commit('blockScrollForPopup', null, { root: true });
        commit('openPopup', null, { root: true });
    },

    closeBlackPopup({ commit }) {
        commit('closeBlackPopup', null, { root: true });
        commit('get-access-files/resetFiles', null, { root: true });
        commit('unblurContent', null, { root: true });
        commit('unblurPopup', null, { root: true });
        commit('unblockScrollForPopup', null, { root: true });
        commit('unblockScrollPopup', null, { root: true });
        commit('popup/resetBlackApi', null, { root: true });
    }
};
