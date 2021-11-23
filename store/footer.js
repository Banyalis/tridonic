export const state = () => ({
    footer: {}
});

export const mutations = {
    init(store, { footer }) {
        Object.assign(store, { footer });
    }
};
