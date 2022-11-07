//二次封装axios
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";

//引入detail的store
import store from '@/store';


//1.利用axios对象的方法create，去创建一个axios实例
//2.requests就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基本路径，发请求的时候，路径当中会出现api
    baseURL: "/api",
    //代表请求超时的时间5s
    timeout: 5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有headers请求头属性
    // if (store.state.detail.uuid_token) {
    //     config.headers.userTempId = store.state.detail.uuid_token
    // }
    //判断是否登录，跟据token是否存在
    //vuex仓库中存储不持久
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    //token存储在本地存储中
    // let token = localStorage.getItem('TOKEN')
    // if(token){
    //     config.headers.token = token
    // }
    //进度条开始
    nprogress.start()
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来后，响应拦截器可以检测到
    //进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))  //终止promise链
})

//对外暴露
export default requests