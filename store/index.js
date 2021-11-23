import axios from 'axios';

export const state = () => ({
    isContentBlurred: false,
    isPopupBlurred: false,
    isBodyScrollLocked: false,
    isContentScrollLocked: false,
    isOpenPopup: false,
    savedScrollPosition: 0,
    savedScrollPositionPopup: 0,
    currentMediaSize: 0,
    currentHeaderTranslate: 0,
    blurredContentCount: 0,
    blockedScrollCount: 0,

    isPopupScrollLocked: false,
    savedScrollPositionPopupBlack: 0,
    isBlackPopupBlurred: false,
    isOpenBlackPopup: false
});

export const mutations = {
    blurContent(state) {
        if (state.isOpenPopup || state.isOpenBlackPopup) {
            return;
        }
        state.blurredContentCount++;
        state.isContentBlurred = true;
    },

    unblurContent(state) {
        if (state.isOpenPopup || state.isOpenBlackPopup) {
            return;
        }
        state.blurredContentCount--;
        if (state.blurredContentCount > 0) {
            return;
        }
        state.isContentBlurred = false;
    },

    blurPopup(state) {
        if (!state.isOpenPopup) {
            return;
        }
        state.isPopupBlurred = true;
    },

    unblurPopup(state) {
        if (!state.isOpenPopup) {
            return;
        }
        state.isPopupBlurred = false;
    },

    blurBlackPopup(state) {
        if (!state.isOpenBlackPopup) {
            return;
        }
        state.isBlackPopupBlurred = true;
    },

    unblurBlackPopup(state) {
        if (!state.isOpenBlackPopup) {
            return;
        }
        state.isBlackPopupBlurred = false;
    },

    blockScroll(state) {
        state.blockedScrollCount++;
        state.savedScrollPosition = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.height = '100%';
        document.body.style.width = '100%';
        document.body.style.top = `${-state.savedScrollPosition}px`;
        state.isBodyScrollLocked = true;
    },

    unblockScroll(state) {
        state.blockedScrollCount--;
        if (state.blockedScrollCount > 0) {
            return;
        }
        document.body.style.position = '';
        document.body.style.height = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, state.savedScrollPosition);
        state.isBodyScrollLocked = false;
    },

    blockScrollForPopup(state) {
        const mainContent = document.getElementById('main-content');

        if (!state.isContentScrollLocked) {
            state.savedScrollPositionPopup = window.scrollY;
            mainContent.style.position = 'fixed';
            mainContent.style.width = '100%';
            mainContent.style.left = '0px';
            mainContent.style.top = `${-state.savedScrollPositionPopup}px`;
        }

        state.isContentScrollLocked = true;
        window.scrollTo(0, 0);
    },

    unblockScrollForPopup(state) {
        const mainContent = document.getElementById('main-content');

        if (state.isContentScrollLocked && !state.isOpenPopup) {
            mainContent.style.position = '';
            mainContent.style.width = '';
            mainContent.style.left = '';
            mainContent.style.top = '';
            state.isContentScrollLocked = false;
            window.scrollTo(0, state.savedScrollPositionPopup);
        }
    },

    blockScrollPopup(state) {
        const basePopup = document.getElementById('base-popup');

        if (!state.isPopupScrollLocked) {
            state.savedScrollPositionPopupBlack = window.scrollY;
            basePopup.style.position = 'fixed';
            basePopup.style.width = '100%';
            basePopup.style.left = '0px';
            basePopup.style.top = `${-state.savedScrollPositionPopupBlack}px`;
        }

        state.isPopupScrollLocked = true;
        window.scrollTo(0, 0);
    },

    unblockScrollPopup(state) {
        const basePopup = document.getElementById('base-popup');

        if (state.isPopupScrollLocked) {
            basePopup.style.position = '';
            basePopup.style.width = '';
            basePopup.style.left = '';
            basePopup.style.top = '';
            state.isPopupScrollLocked = false;
            window.scrollTo(0, state.savedScrollPositionPopupBlack);
        }
    },

    setMediaSize(state, size) {
        state.currentMediaSize = size;
    },

    updateHeaderTranslate(state, translate) {
        state.currentHeaderTranslate = translate;
    },

    openPopup(state) {
        state.isOpenPopup = true;
    },

    closePopup(state) {
        state.isOpenPopup = false;
    },

    openBlackPopup(state) {
        state.isOpenBlackPopup = true;
    },

    closeBlackPopup(state) {
        state.isOpenBlackPopup = false;
    }
};

export const actions = {
    async nuxtServerInit({ commit, state }, context) {
        const { $config, $prmsLocaleInfo } = context;
        const baseURL = $config.baseURL;

        // We're using a promise here, because `nuxtServerInit` doesn't wait for plugin-promises to be resolved
        const { language, region } = await $prmsLocaleInfo;

        commit('locale/init', { language, region });
        const [footer, navigation, navigationUtils] = await Promise.all([
            axios.get(`${baseURL}/${language}/${region}/footer`),
            axios.get(`${baseURL}/${language}/${region}/navigation`),
            axios.get(`${baseURL}/${language}/${region}/navigation-utils`),
            axios.get(`${baseURL}/${language}/${region}/translations`)
        ]);
        commit('footer/init', { footer: footer.data });
        commit('header/init', { header: navigation.data });
        commit('navigation-utils/init', {
            navigationUtils: navigationUtils.data
        });

        const currentLanguage = _getCurrentLanguageObject(
            language,
            region,
            navigationUtils.data.intlPanel.intlList
        );

        commit('locale/setCurrentLanguageObject', currentLanguage);
    }
};

function _getCurrentLanguageObject(languageCode, regionCode, intlList = []) {
    return intlList.find(
        (intl) => intl.language === languageCode && intl.region === regionCode
    );
}
