import { reqCartList,reqCartById,reqChangeisChecked } from "@/api"

const state ={
    cartList:[]
}

const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        commit('GETCARTLIST',result.data)
    },
    async deleteCartById({commit},skuId){
        let result = await reqCartById(skuId)
        if(result.code ==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    async changeisChecked({commit},{skuId,isChecked}){
        let result = await reqChangeisChecked(skuId,isChecked)
        if(result.code ==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckCart({dispatch,getters}){
        let PromiseAll =[]
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked==1 ? dispatch('deleteCartById',item.skuId) : ''
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    },
    //全部产品的勾选状态
    isAllCheckCart({dispatch,getters},isAll){
        let promiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let prom = dispatch('changeisChecked',{skuId:item.skuId,isChecked:isAll})
            promiseAll.push(prom)
        })
        return Promise.all(promiseAll)
    }
}

const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList
    }
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}