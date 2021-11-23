import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export const state = () => ({
    filterList: {
        [VUE_CUSTOM_EVENTS.fetchCatalogProducts]: {},
        [VUE_CUSTOM_EVENTS.fetchPopupFamilyArticles]: {}
    },
    filterValues: {
        [VUE_CUSTOM_EVENTS.fetchCatalogProducts]: {},
        [VUE_CUSTOM_EVENTS.fetchPopupFamilyArticles]: {}
    },
    previousFilterValuesMobile: {
        [VUE_CUSTOM_EVENTS.fetchCatalogProducts]: {},
        [VUE_CUSTOM_EVENTS.fetchPopupFamilyArticles]: {}
    },
    isPopup: false,
    apiEvent: ''
});

export const mutations = {
    init(state, { filterList }) {
        Object.assign(state, { filterList });
    },

    updateFilterValue(
        state,
        { categoryKey, sectionKey, filterId, filterValue }
    ) {
        const newFilterValues = { ...state.filterValues };

        if (filterValue === null) {
            delete newFilterValues[state.apiEvent][filterId];

            state.filterValues = newFilterValues;

            return;
        }

        newFilterValues[state.apiEvent][filterId] = {
            categoryKey,
            sectionKey,
            value: filterValue
        };

        state.filterValues = newFilterValues;
    },

    updateFilterList(state, filterList) {
        const stateFilterList = { ...state.filterList };
        stateFilterList[state.apiEvent] = filterList;

        state.filterList = stateFilterList;
    },

    resetAllFilterValues(state) {
        const stateFilterValues = { ...state.filterValues };
        stateFilterValues[state.apiEvent] = {};
        state.filterValues = { ...stateFilterValues };

        const statePreviousFilterValuesMobile = {
            ...state.previousFilterValuesMobile
        };
        statePreviousFilterValuesMobile[state.apiEvent] = {};
        state.previousFilterValuesMobile = {
            ...statePreviousFilterValuesMobile
        };
    },

    setPreviousFilterValues(state, previousFilterValues) {
        const statePreviousFilterValuesMobile = {
            ...state.previousFilterValuesMobile
        };

        statePreviousFilterValuesMobile[state.apiEvent] = {
            ...previousFilterValues[state.apiEvent]
        };

        state.previousFilterValuesMobile = statePreviousFilterValuesMobile;
    },

    setFilterValues(state, filterValues) {
        const stateFilterValues = { ...state.filterValues };
        stateFilterValues[state.apiEvent] = filterValues[state.apiEvent];

        state.filterValues = stateFilterValues;
    },

    setIsPopup(state, isPopup) {
        state.isPopup = isPopup;
    },

    updateApiEvent(state, apiEvent) {
        state.apiEvent = apiEvent;
    }
};
