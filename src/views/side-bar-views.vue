<template>
  <div class="sidebar-content">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      style="position: relative; transition: none;    background-color: #f7f7f7;"
    >
      <div class="sidebar-head">
        <div v-if="isCollapse" style="display: flex;flex-direction: column;">
          <el-image :src="require('../assets/images/aislogo_blue.png')" style="width: 40px; height: 40px;"></el-image>
          <span  style="  font-size: 10px; /* 字体大小 */
  font-weight: bold; /* 加粗 */
  color: black; /* 字体颜色 */">LeaveMate</span>
        </div>
        <div v-else>
          <el-image :src="require('../assets/images/aislogo_blue.png')" style="width: 40px; height: 40px;"></el-image>
        </div>
      </div>

      <el-menu-item index="1">
        <router-link to="/conv" style="text-decoration: none; color: inherit;">
          <el-icon size="40"><ChatDotRound /></el-icon>
          <span v-if="!isCollapse">对话框</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/about" style="text-decoration: none; color: inherit;">
          <el-icon size="40"><List /></el-icon>
          <span v-if="!isCollapse">功能列表</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon size="40"><Calendar /></el-icon>
        <template #title><span v-if="!isCollapse">日志查询</span></template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon size="40"><Menu /></el-icon>
        <template #title><span v-if="!isCollapse">关于我们</span></template>
      </el-menu-item>

      <!-- 悬浮箭头按钮 -->
      <div class="collapse-button" @click="toggleCollapse">
        <el-icon size="30">
          <template v-if="isCollapse">
            <ArrowRight />
          </template>
          <template v-else>
            <ArrowLeft />
          </template>
        </el-icon>
      </div>
    </el-menu>
  </div>
</template>
      <script>
      import { Menu,ChatDotRound,List,Calendar,ArrowRight,ArrowLeft} from '@element-plus/icons-vue';
      export default {
        components: {
          ArrowLeft,
          ArrowRight,
          ChatDotRound,
          List,
          Calendar,
          Menu
        },
        data() {
          return {
            isCollapse: false,
          };
        },
        methods: {
          handleOpen(key, keyPath) {
            console.log(`展开面板: ${key}, 路径:`, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(`关闭面板: ${key}, 路径:`, keyPath);
          },
          handleItemClick(index) {
            console.log(`点击了菜单项: ${index}`);
          },
          toggleCollapse() {
            this.isCollapse = !this.isCollapse;
          },
        },
      };     
      </script>
      
      
      <style>
      .sidebar-head {
        display: flex;
        align-items: center;
        background-color: #f7f7f7  ;
        color: #fff;
        height: 10%; /* 设置固定高度 */
        position: relative; /* 确保侧边栏内容相对定位 */
      }
      

      .collapse-button {
        position: absolute;
        top: 50%; /* 垂直居中 */
        right: -30px; /* 外移以确保悬浮效果 */
        transform: translateY(-50%); /* 调整位置，使其垂直居中 */
        background-color: transparent;
        cursor: pointer; /* 鼠标指针样式 */
        display: flex;
        align-items: center;
        justify-content: center;
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
      
 
      
      /* 调整 el-menu 的样式 */

      </style>