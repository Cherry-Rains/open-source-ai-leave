<template>
       <div class="sidebar-content">
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
  <div class="sidebar-head">
    <div v-if="isCollapse">
    <el-image :src="require('./assets/images/aislogo_blue.png')" style="width: 40px; height: 40px;"></el-image>
  </div>
  <div v-else>
    <el-image :src="require('./assets/images/aislogo_blue.png')" style="width: 40px; height: 40px;"></el-image>
  </div>
  </div>

  <el-button @click="toggleCollapse" style="width: 100%;">
    <template v-if="isCollapse">
        <el-icon><Expand /></el-icon>
      </template>
      <template v-else>
        <el-icon><Fold /></el-icon>
      </template>
  </el-button>

    <el-menu-item index="1">
      
      <router-link to="/conv" style="text-decoration: none; color: inherit;">
        <el-icon><ChatDotRound /></el-icon><span v-if="!isCollapse">对话框</span></router-link> 
    </el-menu-item>
    <el-menu-item index="2" >
      
      <router-link to="/about" style="text-decoration: none; color: inherit;"><el-icon><List /></el-icon><span v-if="!isCollapse">功能列表</span></router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><Calendar /></el-icon>
      <template #title><span v-if="!isCollapse">日志查询</span></template>
    </el-menu-item>
  </el-menu>
  </div>
  </template>
  
  <script>
  import { ChatDotSquare } from '@element-plus/icons-vue';
  
  export default {
    components: {
      ChatDotSquare,
    },
  };
  </script>
  
  <style scoped>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    background-color: #545c64;
    overflow-y: auto;
    z-index: 1000;
  }
  
  .sidebar-head {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #303133;
    color: #fff;
    height: 60px; /* 设置固定高度 */
  }
  
  .sidebar-item {
    flex-grow: 1;
    height: calc(100% - 60px); /* 减去头部的高度 */
  }
  
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 100%; /* 确保菜单占据 100% 的高度 */
  }
  
  /* 使图标和文本垂直排列 */
  .menu-item-content {
    display: flex;
    flex-direction: column; /* 使内容垂直排列 */
    align-items: center; /* 水平居中 */
  }
  
  .menu-item-content .el-icon {
    margin-right: 0; /* 移除默认的右边距 */
  }
  
  .menu-item-content span {
    margin-top: 4px; /* 调整文本与图标的间距 */
  }
  
  /* 调整 el-menu-item 的高度 */
  .el-menu-item {
    height: 40px; /* 设置固定高度 */
    display: flex;
    flex-direction: column;
    justify-content: center; /* 垂直居中 */
  }
  
  /* 调整 el-menu 的样式 */
  .el-menu {
    height: 100%; /* 确保 el-menu 占据 sidebar-item 的全部高度 */
  }
  </style>