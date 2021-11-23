export const state = () => ({
    products: [
        {
            id: '',
            name: '',
            tagLine: '',
            image: '',
            url: ''
        }
    ]
});

export const mutations = {
    init(store, { products }) {
        Object.assign(store, { products });
    }
};
