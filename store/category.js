export const state = () => ({
    catalog: '',
    categorySlug: '',
    productListSort: '',
    banners: {}
});

export const mutations = {
    init(state, { catalog, categorySlug, productListSort }) {
        Object.assign(state, { catalog, categorySlug, productListSort });
    },

    updateSort(state, { productListSort }) {
        state.productListSort = productListSort;
    },

    updateCategoryBanners(state, banners) {
        state.banners = banners;
    }
};
