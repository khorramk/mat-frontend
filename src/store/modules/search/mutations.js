export default {
    setProfiles: (state, payload) => state.profiles =[...state.profiles, ...payload],
    setComponent: (state, name) => state.component = name,
    setTotalResult: (state, value) => state.totalResult = value,
    setLoading: (state, value) => state.isLoading = value,
    setSearchStatus: (state, value) => state.isSearched = value,
    setPaginationData: (state, value) => state.pagination = value,
    pushQuery: (state, value) => state.queryArr.push(value),
    setSelectedProfileInfo: (state, payload) => state.selectedProfile = payload
}