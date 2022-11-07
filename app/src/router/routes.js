//引入路由组件
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
import myOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';

export default [
    {
        path:"/center",
        component:Center,
        meta:{show:true},
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'groupOrder',
                component:groupOrder
            },
            //重定向
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:"/paysuccess",
        component:PaySuccess,
        meta:{show:true}
    },
    {
        path:"/pay",
        component:Pay,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/trade",
        component:Trade,
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path:"/shopcart",
        component:ShopCart,
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        name:'addcartsuccess',
        component:()=>import('@/pages/AddCartSuccess'),
        meta:{show:true}
    },
    {
        path:"/detail/:skuId",
        component:()=>import('@/pages/Detail'),
        meta:{show:true}
    },
    {
        path:"/home",
        //路由懒加载，不访问时，不缓存，更高效,代码简洁
        component:()=>import('@/pages/Home'),
        meta:{show:true}
    },
    {
        name:"search",
        path:"/search/:keyword?",
        component:()=>import('@/pages/Search'),
        meta:{show:true}
    },
    {
        path:"/login",
        component:()=>import('@/pages/Login'),
        meta:{show:false}
    },
    {
        path:"/register",
        component:()=>import('@/pages/Register'),
        meta:{show:false}
    },
    //重定向，在项目启动时，访问/立马重定向首页home
    {
        path:"*",
        redirect:"/home",
    }
]