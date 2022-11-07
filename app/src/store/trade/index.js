import { reqAddressInfo, reqOrderInfo } from "@/api"

const state = {
    //用户地址
    addressInfo: [],
    //交易清单
    orderInfo: {}
}
const actions = {
    //获取用户地址
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit('GETADDERSSINFO', result.data)
        }
    },
    //获取用户交易页清单
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }
}
const mutations = {
    GETADDERSSINFO(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const getters = {
    detailArrayList(state) {
        return state.orderInfo.detailArrayList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}