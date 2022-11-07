import { reqSearchList } from "@/api"

//search组件的vuex
const state = {
    searchList:{}
}

const actions = {
    async getSearchList({commit},params={}){
        let result = await reqSearchList(params)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}

const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}

const getters = {
    goodsList(state){
        if(state.searchList != {}) return state.searchList.goodsList||[]
    },
    trademarkList(state){
        if(state.searchList != {}) return state.searchList.trademarkList||[]
    },
    attrsList(state){
        if(state.searchList != {}) return state.searchList.attrsList||[]
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}