import { reqCategoryList,reqFloorList,reqGetBannerlist } from "@/api";
const state = {
    categoryList:[],
    bannerList:[],
    floorList:[]
}

const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}){
        let result = await reqCategoryList()
        if(result.code==200){
            commit("CATEGORYLIST",result.data)
        }
    },

    async getBannerList({commit}){
        let result = await reqGetBannerlist()
        if(result.code == 200){
            commit("GETBANNERLIST",result.data)
        }
        
    },

    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code == 200){
            commit("GETFLOORLIST",result.data)
        }
    }
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}