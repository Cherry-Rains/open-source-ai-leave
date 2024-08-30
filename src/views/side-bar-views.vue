<template>
  <div class="sidebar-content">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      style="background-color: transparent;border-color: transparent;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);width: 10vh;">
        <div class="sidebar-head" style="display: flex; flex-direction: column; align-items: center; height: 15%;justify-content: center;">
          <el-image :src="require('../assets/images/aislogo.png')" style="width: 45px; height: 45px;"></el-image>
          <span style="font-size: 12px;color: white;">AI助手</span>
          <span style="font-size: 10px;color: white;">ver:1.21</span>
          
      </div>
    <div class="side-item">
      <router-link to="/conv" style="text-decoration: none; color: inherit;">
      <el-menu-item index="1" :class="{ 'active': $route.path === '/conv' }">
        <div style="display: flex; flex-direction: column; align-items: center;">
          <el-icon size="20" color="white" style="margin-top: 20%;"><ChatDotRound /></el-icon>
          <span>对话框</span>
        </div>
      </el-menu-item>
    </router-link>

      <router-link to="/about" style="text-decoration: none; color: inherit;">
        <el-menu-item index="2" :class="{ 'active': $route.path === '/about' }">
          <el-icon size="20" color="white" style="margin-top: 20%;"><List /></el-icon>
         <span >关于我们</span>
        </el-menu-item>
      </router-link>
      <router-link to="/logs" style="text-decoration: none; color: inherit;">
        <el-menu-item index="3" :class="{ 'active': $route.path === '/logs' }">
          <el-icon size="20" color="white" style="margin-top: 20%;"><Calendar /></el-icon>
        <span >日志查询</span>
        </el-menu-item>
      </router-link>

      <router-link to="/oa-sys" style="text-decoration: none; color: inherit;">
      <el-menu-item index="4" :class="{ 'active': $route.path === '/oa-sys' }">
        <el-icon size="20" color="white" style="margin-top: 20%;"><UserFilled /></el-icon>
        <span>用户管理</span>
      </el-menu-item>

      </router-link>
  </div>
      
      <!-- 悬浮箭头按钮 -->

    </el-menu>
  </div>
</template>

<script>
import { ChatDotRound, List, Calendar, UserFilled} from '@element-plus/icons-vue';

export default {
  components: {
    ChatDotRound,
    List,
    Calendar,
    UserFilled
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

  },
};
</script>

<style scoped>
.sidebar-content {
  width: 10vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom, #93ccdb, #7fa1bc);
  box-sizing: border-box;

}



.el-menu-item {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  color: white !important;
  transition: background-color 0.3s ease;
  height: 10%;
}





.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.8); /* 悬停时的背景色 */
}

.el-menu-item.active {
  background-color: rgba(255, 255, 255, 0.3);
}


</style>