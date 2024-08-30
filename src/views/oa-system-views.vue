fetchData<template>
  <div class="container">
    <div class="header">
      <!-- 头部内容 -->
    </div>
    <div style="width: 90%">
      <div class="search-bar">
        用户ID筛选：<el-input v-model="searchUserID" placeholder="userId"></el-input>
        用户名筛选：<el-input v-model="searchUsername" placeholder="用户名"></el-input>
        <el-button @click="fetchData()"></el-button>
      </div>
      <div class="table-sys">
        <el-table :data="filteredUsers" ref="tableRef" style="width: 100%;">
          <el-table-column prop="username" label="姓名" width="auto"></el-table-column>
          <el-table-column prop="userId" label="用户ID"></el-table-column>
          <el-table-column prop="oaAccount" label="OA系统用户名"></el-table-column>
          <el-table-column prop="oaPassword" label="OA系统密码"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="编辑用户信息">
      <el-descriptions class="margin-top"
                       :column="2"
                       :size="large"
                       :border="true">
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              用户Id
            </div>
          </template>
          {{ editingUser.userId }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              姓名
            </div>
          </template>
          <el-input v-model="editingUser.username"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="OA系统用户名">
          <el-input v-model="editingUser.oaAccount"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="OA系统密码">
          <el-input v-model="editingUser.oaPassword" type="password"></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveChanges">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ElMessage } from 'element-plus';

export default {
  setup() {
    const searchUsername = ref('');
    const searchUserID = ref('');
    const users = ref([]);
    const dialogVisible = ref(false);
    const editingUser = ref({});
    const fetchData = () => {
      fetch('http://10.0.13.223:10700/api/users')
        .then(response => response.json())
        .then(data=>{
          users.value=data;
          ElMessage.success('加载后台数据成功!')
        })
        .catch(error => ElMessage.error('Error fetching data: ' + error));
    };


    const filteredUsers = computed(() => {
      return users.value.filter(user => {
        return user.username.includes(searchUsername.value) && user.userId.includes(searchUserID.value);
      });
    });

    const editUser = (user) => {
      editingUser.value = { ...user };
      dialogVisible.value = true;
    };

    const saveChanges = () => {
      users.value = users.value.map(u => u.userId === editingUser.value.userId ? editingUser.value : u);
      ElMessage.success('用户信息已更新');
      dialogVisible.value = false;
    };





    onMounted(() => {
      fetchData(); // 初始化时加载数据
      
    });

    onBeforeUnmount(() => {
      
    });

    return {
      searchUsername,
      searchUserID,
      filteredUsers,
      dialogVisible,
      editingUser,
      editUser,
      saveChanges,
      fetchData
    };
  },
};
</script>
<style scoped>
.search-bar {
  display: flex;
  justify-content: center;
  width: 100%;
}
.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FAFAFA;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px;
  overflow: hidden; /* 隐藏多余内容 */
  background-color: rgba(255, 255, 255, 0.7); /* 半透明白色 */
  height: 96vh;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #444 !important;
  background-color: #FFFFFF;
  border-bottom: 2px solid #E0E0E0;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
}
</style>