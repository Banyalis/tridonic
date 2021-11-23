import { DURATION_ANIMATION_POPUPS } from '@/utils/constants';

export const state = () => ({
    isOpened: false,
    modalComponent: '',
    isPurple: false
});

export const mutations = {
    openModalPopup(state, { modalComponent, isPurple }) {
        state.isOpened = true;
        state.modalComponent = modalComponent;
        state.isPurple = isPurple;
    },

    closeModalPopup(state) {
        state.isOpened = false;
    },

    clearModalPopupComponent(state) {
        state.modalComponent = '';
    }
};

export const actions = {
    openModalPopup({ commit }, { modalComponent, isPurple = false }) {
        commit('blockScroll', null, { root: true });
        commit(
            'modal-popup/openModalPopup',
            { modalComponent, isPurple },
            {
                root: true
            }
        );
    },

    closeModalPopup({ commit }) {
        commit('unblockScroll', null, { root: true });
        commit('modal-popup/closeModalPopup', null, { root: true });

        setTimeout(() => {
            commit('modal-popup/clearModalPopupComponent', null, {
                root: true
            });
        }, DURATION_ANIMATION_POPUPS);
    }
};
