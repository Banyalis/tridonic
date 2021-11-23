export const state = () => ({
    isMobileFiltersOpened: false,
    filterComponent: '',
    needPreselected: false
});

export const mutations = {
    openMobileFilters(state, { filterComponent, needPreselected }) {
        state.isMobileFiltersOpened = true;
        state.filterComponent = filterComponent;
        state.needPreselected = needPreselected;
    },

    closeMobileFilters(state) {
        state.isMobileFiltersOpened = false;
        state.needPreselected = false;
    },

    clearFilterComponent(state) {
        state.filterComponent = '';
    }
};

export const actions = {
    openMobileFilters({ commit }, { filterComponent, needPreselected }) {
        commit('blockScroll', null, { root: true });
        commit(
            'filters-mobile/openMobileFilters',
            {
                filterComponent,
                needPreselected
            },
            {
                root: true
            }
        );
    },
    closeMobileFilters({ commit }) {
        commit('unblockScroll', null, { root: true });
        commit('filters-mobile/closeMobileFilters', null, { root: true });
        commit('filters-mobile/clearFilterComponent', null, { root: true });
    }
};
