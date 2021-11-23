export const state = () => ({
    missionStatement: '',
    heroImage: ''
});

export const mutations = {
    init(state, { missionStatement, heroImage }) {
        Object.assign(state, { missionStatement, heroImage });
    }
};
