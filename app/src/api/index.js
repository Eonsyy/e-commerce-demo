//API进行统一管理
import requests from './ajax';
import mockRequests from './mockAjax';
//三级联动接口
//  /api/product/getBaseCategoryList  get   无参数
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'})
export const reqGetBannerlist = ()=>mockRequests.get('/banner')
export const reqFloorList = ()=>mockRequests.get('/floor')
//获取搜索页面属性信息
export const reqSearchList = (params)=>requests({url:'/list',method:'post',data:params})
//获取产品信息
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

//将产品添加到购物车中（获取更新某个产品个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post',})

//获取购物车列表数据
export const reqCartList = ()=> requests({url:"/cart/cartList",method:'get'})

//删除购物车的数据
export const reqCartById = (skuId)=> requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//修改产品的选中状态
export const reqChangeisChecked = (skuId,isChecked)=> requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

//获取注册验证码
export const reqRegisterCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

//注册用户
export const reqRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})

//登录
export const reqLoginUser = (data)=>requests({url:'/user/passport/login',data,method:'post'})

//获取登录的用户信息
export const reqUser = ()=> requests({url:'/user/passport/auth/getUserInfo',method:'get'})

//退出登录
export const reqLogout =()=>requests({url:'/user/passport/logout',method:'get'})

//获取用户地址信息
export const reqAddressInfo =()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

//获取订单交易页信息
export const reqOrderInfo =()=>requests({url:'/order/auth/trade',method:'get'})

//提交订单
export const reqSubmitOrder=(tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

//获取订单支付信息
export const reqPayInfo =(orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

//查询订单支付状态
export const reqPayState=(orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

//获取我的订单信息
export const reqOrder=(page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})