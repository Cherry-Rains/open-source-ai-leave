<template>
   <transition name="el-zoom-in-top">
  <div class="container" style="display: flex; flex-direction: column; height: 96vh;">

    <div class="header">
      <!-- 头部内容 -->
    </div>
      <div class="search-bar" style="margin-top: 20px; margin-bottom: 20px; display: flex; justify-content: center; align-items: center;">
        <el-input v-model="searchUserID" placeholder="请输入用户ID" style="width: 300px; margin-right: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" clearable></el-input>
        <el-input v-model="searchUsername" placeholder="请输入用户名" style="width: 300px; margin-right: 10px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" clearable></el-input>
        <el-button @click="fetchData()">查询</el-button>
        <el-button type="primary" @click="showAddUser"><el-icon style="margin-right: 3px;"><Plus /></el-icon>新增用户</el-button>
      </div>
      <div class="table-sys" style="flex: 1; display: flex; justify-content: center;">
        <el-table :data="filteredUsers" ref="tableRef" style="width: 1210px; height: 500px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);" header-align="center" >
          <el-table-column prop="username" label="姓名" flex="1"></el-table-column>
          <el-table-column prop="wxId" label="用户ID" flex="1"></el-table-column>
          <el-table-column prop="oaUsername" label="OA系统用户名" flex="1"></el-table-column>
          <el-table-column prop="oaPassword" label="OA系统密码" flex="1"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150px">
            
            <template #default="scope">
              <div style="display: flex;">
                <el-button size="small" type="danger" @click="deleteUser(scope.row)" style="margin-right: 10px;">删除</el-button>
                <el-button size="small" type="primary" @click="editUser(scope.row)">编辑</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
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
          {{ editingUser.wxId }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><Avatar /></el-icon>
              姓名
            </div>
          </template>
          <el-input v-model="editingUser.username"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="OA系统用户名">
          <el-input v-model="editingUser.oaUsername"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="OA系统密码">
          <el-input v-model="editingUser.oaPassword" type="password"></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddUser">取消</el-button>
          <el-button type="primary" @click="saveChanges">保存</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogAddUser" title="新增用户信息">
      <el-descriptions class="margin-top"
                       :column="2"
                       :size="large"
                       :border="true">
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon><Avatar /></el-icon>
              用户Id
            </div>
            
          </template>
          <el-input v-model="editingUser.wxId"></el-input>
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
          <el-input v-model="editingUser.oaUsername"></el-input>
        </el-descriptions-item>
        <el-descriptions-item label="OA系统密码">
          <el-input v-model="editingUser.oaPassword" type="password"></el-input>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelAddUser">取消</el-button>
          <el-button type="primary" @click="addSaves">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</transition>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { ElMessage,ElMessageBox } from 'element-plus';
import {Plus} from '@element-plus/icons-vue'
import axios from 'axios';
import { API_BASE_URL } from '@/config';
export default {
  setup() {
    const searchUsername = ref('');
    const searchUserID = ref('');
    const users = ref([]);
    const dialogVisible = ref(false);
    const editingUser = ref({});
    const dialogAddUser = ref(false);

    const fetchData = () => {
      axios.get(`${API_BASE_URL}/api/log/user/list`)
        .then(response => {
          users.value = response.data.data;  // 直接使用 response.data
          ElMessage.success('加载后台数据成功!');
        })
        .catch(error => {
          ElMessage.error('Error fetching data: ' + error);
        });
    };
  
    const saveData = ()=>{
      axios.post(`${API_BASE_URL}/api/log/user/save`, editingUser.value)
        .then(() =>{
          ElMessage.success('用户数据更新成功!');
        })
        .catch(error => {
          ElMessage.error('Error fetching data: ' + error);
        });
    };
    const showAddUser=()=>{
      dialogAddUser.value=true;
    }

    const filteredUsers = computed(() => {
      return users.value.filter(user => {
        const username = user.username || '';
        const userId = user.wxId || '';
        return (
          username.includes(searchUsername.value) &&
          userId.includes(searchUserID.value)
        );
      });
    });

    const editUser = (user) => {
      editingUser.value = { ...user };
      dialogVisible.value = true;
    };


   const deleteUser = (user) => {
  ElMessageBox.confirm(
    `确定要删除用户 ${user.username} 吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    const ids = [user.id]; // 直接使用 wxId，不需要转换为 Number 类型
    axios.delete(`${API_BASE_URL}/api/log/user/delete?ids=${ids.join(',')}`)
      .then(() => {
        // 从 users 列表中移除已删除的用户
        users.value = users.value.filter(u => u.wxId !== user.wxId);
        ElMessage.success('用户删除成功!');
      })
      .catch(error => {
        ElMessage.error('Error deleting user: ' + error);
      });
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

    const saveChanges = () => {
      users.value = users.value.map(u => u.wxId === editingUser.value.wxId ? editingUser.value : u);
      saveData();
      ElMessage.success('用户信息已更新');
      dialogVisible.value = false;
      
    };

    const cancelAddUser = () => {
      dialogAddUser.value = false;
      Object.assign(editingUser, {
        wxId: '',
        username: '',
        oaUsername: '',
        oaPassword: ''
      });
    };
    const addSaves = ()=>{
      dialogAddUser.value=false;
      axios.post(`${API_BASE_URL}/api/log/user/save`, editingUser.value)
        .then(response => {
          console.log(response.data);
          dialogAddUser.value = false;
          // 清空表单
          Object.assign(editingUser.value, {
            id:'',
            wxId: '',
            username: '',
            oaUsername: '',
            oaPassword: ''
          });
          // 可以在这里处理成功后的逻辑，比如刷新数据等
          ElMessage.success('用户信息新增成功');
        })
        .catch(error => {
          console.error(error);
        });
    };





    onMounted(() => {

      
    });

    onBeforeUnmount(() => {
      
    });

    return {
      searchUsername,
      searchUserID,
      filteredUsers,
      dialogVisible,
      dialogAddUser,
      editingUser,
      editUser,
      deleteUser,
      saveChanges,
      fetchData,
      showAddUser,
      addSaves,
      cancelAddUser
    };
  },
  components:{
    Plus
  }
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