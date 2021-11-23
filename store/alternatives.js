export const state = () => ({
    internalHeader: {},
    contentColumns: [],
    products: null,
    emptySearch: null
});

export const mutations = {
    init(state, { internalHeader, form, contentColumns, products }) {
        Object.assign(state, {
            internalHeader,
            form,
            contentColumns,
            products
        });
    },

    update(state, { products }) {
        state.products = products;
        state.emptySearch = null;
    },

    empty(state, { emptySearch }) {
        state.products = null;
        state.emptySearch = emptySearch;
    }
};
