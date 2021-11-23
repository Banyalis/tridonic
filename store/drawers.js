export const state = () => ({
    drawers: {}
});

export const mutations = {
    updateDrawers(state, drawers) {
        state.drawers = { ...drawers };
    },

    updateDrawerItem(state, { modifier, type, content }) {
        const stateDrawers = { ...state.drawers };

        stateDrawers[modifier].forEach((item) => {
            if (item.type === type) item.content = content;
        });

        state.drawers = { ...stateDrawers };
    }
};
