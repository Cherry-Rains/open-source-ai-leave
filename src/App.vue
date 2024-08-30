<template>
  <div id="app">
    <div>
      <sidebarView class="sidebar" />
    </div>
    
    <div class="routes">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sidebarView from './views/side-bar-views.vue';

export default {
  components: {
    sidebarView,
  },
};
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  height: 100%; /* 使用视口高度 */
  width: 100%;  /* 使用视口宽度 */
  background-image: url('./assets/images/backImage.jpg'); /* 替换为你的图片路径 */
  background-size: cover; /* 使背景图像覆盖整个区域 */
  background-position: center; /* 背景图像居中 */
  background-repeat: no-repeat; /* 不重复背景图像 */
}

html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 这是一个好习惯，可以确保padding和border不会增加元素的总宽度和高度 */
}
.routes{
  width: 100%;

}
.sidebar {
  width: 10vh; /* 保持侧边栏宽度不变 */
}


</style>