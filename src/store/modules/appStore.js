const appStore = {
    namespaced: true,
    state: {
        selectPageStore: [],
        selectPageInfo: {}
    },
    mutations: {
        SET_PUSHPAGE: (state, val) => {
            state.selectPageStore.push(val)
        },
        SET_PAGEINFO: (state, val) => {
            state.selectPageInfo = val
        },
        SET_PAGESTORE: (state, val) => {
            state.selectPageStore = val
        }
    }
}

export default appStore
