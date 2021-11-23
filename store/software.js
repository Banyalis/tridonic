export const state = () => ({
    internalHeader: {},
    featuredSoftwareList: [],
    groups: {},
    firmware: {}
});

export const mutations = {
    init(state, { internalHeader, featuredSoftwareList, groups, firmware }) {
        Object.assign(state, {
            internalHeader,
            featuredSoftwareList,
            groups,
            firmware
        });
    }
};
