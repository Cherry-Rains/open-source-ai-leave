import { createRouter, createWebHistory } from 'vue-router';

// 导入对应的组件
import HomeComponent from '../views/HttpIndex.vue';
import  AboutComponent from '../views/about-us.vue';

// 定义路由规则
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeComponent
  },
  {
    path:'/about',
    name:'about',
    component: AboutComponent
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 导出路由实例
export default router;