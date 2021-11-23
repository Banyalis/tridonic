export const state = () => ({
    products: [],
    isComparisonOverlayOpened: false,
    comparisonData: {},
    isComparisonHidden: false
});

export const mutations = {
    addProduct(state, product) {
        state.products.push(product);
    },

    removeProduct(state, productId) {
        state.products = state.products.filter(
            (currentProduct) => currentProduct.id !== productId
        );
    },

    clearProducts(state) {
        state.products = [];
    },

    openOverlay(state, data) {
        if (data) {
            state.comparisonData = data;
        }
        state.isComparisonOverlayOpened = true;
    },

    closeOverlay(state, isDataClearNeeded) {
        state.isComparisonOverlayOpened = false;
        if (!isDataClearNeeded) {
            return;
        }

        state.comparisonData = {};
    },

    setIsHidden(state, isHidden) {
        state.isComparisonHidden = isHidden;
    }
};

export const actions = {
    openOverlay({ commit }, data) {
        commit('blurContent', null, { root: true });
        commit('blockScroll', null, { root: true });
        commit('comparison/openOverlay', data, { root: true });
    },

    closeOverlay({ commit }, isDataClearNeeded = true) {
        commit('unblurContent', null, { root: true });
        commit('unblockScroll', null, { root: true });
        commit('comparison/closeOverlay', isDataClearNeeded, { root: true });
    }
};
