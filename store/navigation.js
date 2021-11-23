export const state = () => ({
    isNavigationOpened: false,
    isSubNavigationOpened: false,
    isMobileNavigationOpened: false,
    isMobileSubNavigationOpened: false,
    subNavigationItemId: '',
    mobileSubNavigationItemId: '',
    activeItemId: ''
});

export const mutations = {
    openMenu(state) {
        state.isNavigationOpened = true;
        // open mobile menu also (to the case when desktop resolution
        // is changed to mobile when desktop menu opened)
        state.isMobileNavigationOpened = true;
    },

    closeMenu(state) {
        state.isNavigationOpened = false;
        state.isMobileNavigationOpened = false;
    },

    setActiveNavigationItem(state, activeItemId) {
        state.activeItemId = activeItemId;
    },

    setSubNavigationItemId(state, subNavigationItemId) {
        state.subNavigationItemId = subNavigationItemId;
    },

    openSubMenu(state) {
        state.isSubNavigationOpened = true;
    },

    closeSubMenu(state) {
        state.isSubNavigationOpened = false;
    },

    openMobileMenu(state) {
        state.isMobileNavigationOpened = true;
        // open desktop menu also (to the case when desktop resolution
        // is changed to mobile when desktop menu opened)
        state.isNavigationOpened = true;
    },

    closeMobileMenu(state) {
        state.mobileSubNavigationItemId = '';
        state.isMobileSubNavigationOpened = false;
        state.isMobileNavigationOpened = false;
        state.isNavigationOpened = false;
    },

    openMobileSubMenu(state) {
        state.isMobileSubNavigationOpened = true;
    },

    closeMobileSubMenu(state) {
        state.isMobileSubNavigationOpened = false;
    },

    setMobileSubNavigationItemId(state, mobileSubNavigationItemId) {
        state.mobileSubNavigationItemId = mobileSubNavigationItemId;
    }
};
