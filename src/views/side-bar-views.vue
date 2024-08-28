<template>
  <div class="sidebar-content">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      style="position: relative;    background-color: transparent;"
    >
      <div class="sidebar-head">
        <div v-if="isCollapse" style="display: flex;flex-direction: column;">
          <el-image :src="require('../assets/images/fjr-icon-small.png')" style="width: 50px; height: 50px; margin-left: 5px;" ></el-image>
        </div>
        <div v-else>
          <el-image :src="require('../assets/images/fjr-icon.png')" style="  width: 150px;height: 70px;"></el-image>
        </div>
      </div>
      <router-link to="/conv" style="text-decoration: none; color: inherit;">
        <el-menu-item index="1" :style="{ backgroundColor: $route.path === '/conv' ? '#999' : 'transparent' }">
          <el-icon size="40" color="white"><ChatDotRound /></el-icon>
          <span v-if="!isCollapse" color="white">对话框</span>
        </el-menu-item>
      </router-link>
      <router-link to="/about" style="text-decoration: none; color: inherit;">
        <el-menu-item index="2" :style="{ backgroundColor: $route.path === '/about' ? '#999' : 'transparent' }">
          <el-icon size="40" color="white"><List /></el-icon>
          <span v-if="!isCollapse">功能列表</span>
        </el-menu-item>
      </router-link>
      <router-link to="/logs" style="text-decoration: none; color: inherit;">
        <el-menu-item index="3" :style="{ backgroundColor: $route.path === '/logs' ? '#999' : 'transparent' }">
          <el-icon size="40" color="white"><Calendar /></el-icon>
          <span v-if="!isCollapse">日志查询</span>
        </el-menu-item>
      </router-link>
      <el-menu-item index="4" >
        <el-icon size="40" color="white"><Menu /></el-icon>
        <template #title><span v-if="!isCollapse" style="margin-bottom: 0;">关于我们</span></template>
      </el-menu-item>

      <!-- 悬浮箭头按钮 -->
      <div class="collapse-button" @click="toggleCollapse">
        <el-icon size="30" style="color: black !important;">
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
        background-color: transparent  ;
        color: #fff;
        height: 10%; /* 设置固定高度 */
        position: relative; /* 确保侧边栏内容相对定位 */
      }
      .sidebar-content{
      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 10px;
      justify-content: space-between;
      align-items: center;
      background-image: linear-gradient(to bottom, #93ccdb, #7fa1bc);
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
      transition: all 0.3s ease;
      }
      .el-icon {
        color: white !important;
      }
      .el-menu-item{
      height: 70px !important; 
      display: flex;
      flex-direction: row; ;
      background-color: transparent;
      border-top: 0.3px solid rgba(155, 155, 155, 0.5); /* 微微的黑色 */
      color: white !important;
      text-size-adjust: 15px !important;
      }
      .el-menu-item.is-active {
        background-color: #999 !important;
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