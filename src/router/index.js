import { createRouter, createWebHistory } from 'vue-router';

// 导入对应的组件
import ConvComponent from '../views/HttpIndex.vue';
import  AboutComponent from '../views/about-us.vue';
import LoggerComponent from '../views/logger-views.vue';
import SystemComponent from '../views/oa-system-views.vue'

// 定义路由规则
const routes = [
  {
    path: '/conv',
    name: 'conv',
    component: ConvComponent
  },
  {
    path:'/about',
    name:'about',
    component: AboutComponent
  },
  {
    path: '/logs',
    name: 'logger',
    component: LoggerComponent
  },
  {
    path:'/oa-sys',
    name:'oa',
    component:SystemComponent
  }
  
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 导出路由实例
export default router;