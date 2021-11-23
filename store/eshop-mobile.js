export const state = () => ({
    isEshopPanelOpened: false
});

export const mutations = {
    openEshopPanel(state) {
        state.isEshopPanelOpened = true;
    },

    closeEshopPanel(state) {
        state.isEshopPanelOpened = false;
    }
};
