<template>
  <!-- 商品分类导航 -->
    <div class="type-nav">
        <div class="container" @mouseleave="leaveShow" @mouseenter="enterShow">
            <h2 class="all">全部商品分类</h2>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
            <transition name='sort'>
                <div class="sort" v-show="show">
                    <div class="all-sort-list2" @click="goSearch">
                        <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId">
                            <h3 @mouseenter="changeIndex(index)" :class="{cur:currentIndex==index}">
                                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                            </h3>
                            <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
            
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
//按需引入lodash中的功能函数
import throttle from 'lodash/throttle';
    export default {
        name:'TypeNav',
        data() {
            return {
                //存储用户鼠标移上哪一个一级分类
                currentIndex:-1,
                //是否展示属性
                show:true
            }
        },
        computed:{
            ...mapState({
                //对象写法，右侧需要一个函数,当使用这个计算属性时，函数会执行一次
                categoryList:state=>state.home.categoryList
            })
        },
        mounted(){
            //判断如果不是在home页面，则隐藏二级导航
            if(this.$route.path != '/home'){
                this.show = false
            }
        },
        methods:{
            // changeIndex(index){
            //     this.currentIndex = index
            // },
            //节流操作
            changeIndex:throttle(function(index){
                this.currentIndex = index
            },50),
            
            goSearch(event){
                let element = event.target
                let {categoryname,category1id,category2id,category3id} = element.dataset
                //如果标签拥有categoryname一定是a标签
                if(categoryname){
                    //整理路由跳转的参数
                    let location = {name:'search'}
                    let query = {categoryName:categoryname}
                    if(category1id){
                        query.category1Id = category1id
                    }else if(category2id){
                        query.category2Id = category2id
                    }else{
                        query.category3Id = category3id
                    }
                    //整理完参数
                    location.query = query
                    //路由跳转
                    this.$router.push(location)
                }
            },
            leaveShow(){
                this.currentIndex = -1
                if(this.$route.path != '/home'){
                    this.show = false
                }
            },
            enterShow(){
                this.show = true
            }
        },
        
    }
</script>

<style lang="less" scoped>
.type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                        .cur{
                            background-color: skyblue;
                        }
                    }
                }
            }
            .sort-enter{
                height: 0px;
            }
            .sort-enter-to{
                height: 461px;
            }
            .sort-enter-active{
                transition: all .3s linear;
                overflow: hidden;
            }
            .sort-leave{
                height: 461px;
            }
            .sort-leave-to{
                height: 0;
            }
            .sort-leave-active{
                transition: all .3s linear;
                overflow: hidden;
            }
        }
    }
</style>