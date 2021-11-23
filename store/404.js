export const state = () => ({
    title: '',
    text: ''
});

export const mutations = {
    init(store, { title, text }) {
        Object.assign(store, { title, text });
    }
};
