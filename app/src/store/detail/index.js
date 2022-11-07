import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api"
import { getUUID } from "@/utils/uuid_token"

const state = {
    goodsInfo: {
        skuInfo: {
            skuImageList: [
                {
                    imgUrl: ''
                }
            ]
        }
    },
    //游客临时身份
    uuid_token: getUUID()
}
const actions = {
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}
const getters = {
    categoryView(state) {
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || {}
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}