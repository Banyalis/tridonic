export const state = () => ({
    filters: []
});

export const mutations = {
    init(state, { filters }) {
        Object.assign(state, { filters });
    }
};
