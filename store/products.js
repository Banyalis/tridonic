export const state = () => ({
    products: []
});

export const mutations = {
    init(state, { products }) {
        Object.assign(state, { products });
    },

    update(state, products) {
        state.products = products;
    }
};
