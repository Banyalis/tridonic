export const state = () => ({
    tooltipText: '',
    tooltipPositionX: 0,
    tooltipPositionY: 0,
    isTooltipShown: false,
    modify: ''
});

export const mutations = {
    showTooltip(
        state,
        { tooltipText, tooltipPositionX, tooltipPositionY, modify }
    ) {
        state.tooltipPositionX = tooltipPositionX;
        state.tooltipPositionY = tooltipPositionY;
        state.tooltipText = tooltipText;
        state.modify = modify || undefined;
        state.isTooltipShown = true;
    },
    hideTooltip(state) {
        state.isTooltipShown = false;
    }
};
