import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router';

//按需引入element-ui
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//三级联动 --- 全局组件使用
import TypeNav from "./components/TypeNav";
Vue.component(TypeNav.name,TypeNav)
import Carousel from './components/Carousel';
Vue.component(Carousel.name,Carousel)
import Pagination from './components/Pagination';
Vue.component(Pagination.name,Pagination)

//vuex插件引入
import store from './store';

//引入mock模拟数据
import '@/mock/mockServe';

//引入swiper样式
import "swiper/css/swiper.css"

//全局引入api
import * as API from '@/api';

//图片懒加载插件
import VueLazyload from 'vue-lazyload'
import imgUrl from '@/assets/images/1.gif';
Vue.use(VueLazyload,{
  //懒加载默认图片
  loading:imgUrl
})

import '@/plugins/validate';

new Vue({
  render: h => h(App),
  //注册路由：底下的写法KV一致省略V【router小写的】
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  //注册仓库：组件实例的身上会多一个属性store
  store
}).$mount('#app')
