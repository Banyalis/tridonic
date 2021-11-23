export const state = () => ({
    language: '',
    region: '',
    languageObject: {}
});

export const mutations = {
    init(state, { language, region }) {
        Object.assign(state, { language, region, languageObject: {} });
    },
    setCurrentLanguageObject(state, languageObject) {
        state.languageObject = languageObject;
    }
};
