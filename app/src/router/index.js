//配置路由js文件
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter)

import routes from './routes';

import store from '@/store';

//重写push、replace方法，解决编程式路由跳转到当前路由（参数不变），多次执行会抛出NavigationDuplicated的警告错误
//1.先保存原来的push、replace方法
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//2.重写push、replace
//第一个参数（location）：告诉原来方法，传递哪些参数
//第二个参数（resolve）：成功回调
//第三个参数（reject）：失败回调
//call||apply区别
//相同点：都可以调用函数一次，都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

//配置路由
let router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {y:0}    //跳转页面后，滚动条回到y:0的位置
    }
})

//全局路由守卫
// router.beforeEach( async(to,from,next)=>{
//     let name = store.state.user.userInfo.name
//     //用户已经登录，store中有token
//     let token = store.state.user.token
//     if(token){
//         //用户登录后想去登录页面
//         if(to.path=='/login' ||to.path=='/register'){
//             //返回首页
//             next('/')
//         }else{
//             //登录后前往其他页面
//             if(name){
//                 //通过判断是否有用户名，判断是获取到用户信息
//                 next()
//             }else{
//                 //没有用户信息则派发action，获取用户信息
//                 try {
//                 await store.dispatch('getUserInfo')
//                     //获取用户信息成功后放行
//                     next()
//                 } catch (error) {
//                     //token失效,清除本地信息,使用退出登录action，进行清除
//                     await store.dispatch('userLogout')
//                     //前往登录页面进行登录
//                     next('/login')
//                 }
//             }
//         }
//     }else{
//         //用户未登录
//         let toPath = to.path
//         if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
//             next('login?redirect='+toPath)
//         }else{
//             next()
//         }
//     }
// })

export default router