import { reqLoginUser,reqUser, reqRegister, reqRegisterCode, reqLogout } from "@/api"

const state = {
    code: '',
    token:localStorage.getItem('TOKEN'),
    userInfo:{}
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqRegisterCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //注册用户
    async registerUser({commit},user){
        let result = await reqRegister(user)
        console.log(result);
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //登录
    async loginUser({commit},user){
        let result = await reqLoginUser(user)
        if(result.code == 200){
            commit('LOGINUSER',result.data.token)
            localStorage.setItem('TOKEN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //获取登录的用户信息
    async getUserInfo({commit}){
        let result = await reqUser()
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
        }
    },
    //退出登录
    async userLogout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }

}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    LOGINUSER(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo =userInfo
    },
    //退出登录，清除用户数据
    CLEAR(state){
        state.userInfo={}
        state.token=''
        localStorage.removeItem('TOKEN')
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}