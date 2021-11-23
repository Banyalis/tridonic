export const state = () => ({
    internalHeader: {},
    slider: [],
    partners: []
});

export const mutations = {
    init(store, { internalHeader, slider, partners }) {
        Object.assign(store, { internalHeader, slider, partners });
    },

    update(state, { partners }) {
        state.partners = partners;
    }
};
