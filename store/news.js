export const state = () => ({
    main: {},
    news: {},
    filters: {},
    contact: {},
    linkPressKit: ''
});

export const mutations = {
    init(state, { main, news, filters, contact, linkPressKit }) {
        Object.assign(state, {
            main,
            news,
            filters,
            contact,
            linkPressKit
        });
    },

    updateNews(state, newsPage) {
        if (newsPage.news) state.news = { ...newsPage.news };

        if (newsPage.filters) state.filters = { ...newsPage.filters };
    }
};
