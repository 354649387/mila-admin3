//ES6写法 从vue模块加载了createApp方法  其他的方法不加载 这种加载方法称为编译时加载或静态加载
import { createApp } from 'vue'
// 其实最完整的写法是：
// import Vue from "../node_modules/vue/dist/vue.js";

import App from './App.vue'

//引入element-plus
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import 'element-plus/lib/theme-chalk/index.css'
import axios from 'axios'
import VueUeditorWrap from 'vue-ueditor-wrap';

import {createRouter, createWebHistory } from 'vue-router'

import routes from './router/index.js'

//1 导入组件或者定义路由组件
// const Admin = {template:'<p>admin-list</p>'}
// const Article = {template:'<p>article-list</p>'}
// import Admin from './components/Admin/list.vue'
// import Article from './components/Article/list.vue'
// import HelloWorld from './components/HelloWorld.vue'


//2 定义组件的路由 每个路由映射一个组件
// const routes = [
// 	//不要再给首页添加一次路由，要不然router-view会渲染两次
// 	// {path:'/',component:HelloWorld},
	
	
// 	{path:'/admin',component:Admin},
// 	{path:'/article',component:Article}
// ]

//3 创建路由并将routes路由配置传递
const router = createRouter({
	history: createWebHistory(),
	routes
})



//sudo:引入路由

//挂载节点
const app = createApp(App)

app.config.globalProperties.$axios = axios;
app.use(router);
app.use(ElementPlus,{locale});
app.use(VueUeditorWrap);

app.mount('#app')
