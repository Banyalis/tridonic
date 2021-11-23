export const state = () => ({
    navigationUtils: {},
    isNavigationUtilsOpened: false,
    isMobileNavigationUtilsOpened: false,
    activeItemId: ''
});

export const mutations = {
    openMenu(state) {
        state.isNavigationUtilsOpened = true;
        // open mobile menu also (to the case when desktop resolution
        // is changed to mobile when desktop menu opened)
        state.isMobileNavigationUtilsOpened = true;
    },

    closeMenu(state) {
        state.isNavigationUtilsOpened = false;
        state.isMobileNavigationUtilsOpened = false;
    },

    setActiveNavigationUtilsItem(state, activeItemId) {
        state.activeItemId = activeItemId;
    },

    openMobileMenu(state) {
        state.isMobileNavigationUtilsOpened = true;
        // open desktop menu also (to the case when desktop resolution
        // is changed to mobile when desktop menu opened)
        state.isNavigationUtilsOpened = true;
    },

    closeMobileMenu(state) {
        state.isMobileNavigationUtilsOpened = false;
        state.isNavigationUtilsOpened = false;
    },

    init(store, { navigationUtils }) {
        Object.assign(store, { navigationUtils });
    }
};
