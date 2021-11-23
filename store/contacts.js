export const state = () => ({
    countries: [],
    currentCountryValue: '',
    listAddresses: {}
});

export const mutations = {
    updateCountries(state, countries) {
        state.countries = [...countries];
    },
    updateCountry(state, country) {
        state.currentCountryValue = country;
    },

    updateAddresses(state, listAddresses) {
        state.listAddresses = [...listAddresses];
    }
};
