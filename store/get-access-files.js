export const state = () => ({
    files: []
});

export const mutations = {
    updateFiles(state, files) {
        state.files = files;
    },

    resetFiles(state) {
        state.files = [];
    }
};
