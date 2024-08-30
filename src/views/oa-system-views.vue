<template>
  <div class="container">
    <div class="header">
      <!-- 头部内容 -->
    </div>
    <div style="width: 90%">
      <div class="search-bar">
        用户ID筛选：<el-input v-model="searchUserID" placeholder="UserID"></el-input>
        用户名筛选：<el-input v-model="searchUsername" placeholder="用户名"></el-input>
      </div>
      <div class="table-sys">
        <el-table :data="filteredUsers" ref="tableRef" style="width: 100%;">
          <el-table-column prop="username" label="姓名" width="auto"></el-table-column>
          <el-table-column prop="userID" label="用户ID"></el-table-column>
          <el-table-column prop="systemName" label="OA系统用户名"></el-table-column>
          <el-table-column prop="systemPassword" label="OA系统密码"></el-table-column>
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
          {{ editingUser.userID }}
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
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveChanges">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';

export default {
  data() {
    return {
      searchUsername: '',
      searchUserID: '',
      users: [
        { userID: '001', username: 'Alice', systemName: 'alice123', systemPassword: 'pass123' },
        { userID: '002', username: 'Bob', systemName: 'bob456', systemPassword: 'pass456' },
        { userID: '003', username: 'Charlie', systemName: 'charlie789', systemPassword: 'pass789' },
      ],
      dialogVisible: false,
      editingUser: {},
    };
  },
  computed: {
    filteredUsers() {
      const { searchUsername, searchUserID, users } = this;
      return users.filter(user => {
        return user.username.includes(searchUsername) && user.userID.includes(searchUserID);
      });
    },
  },
  methods: {
    editUser(user) {
      this.editingUser = { ...user }; // Clone the user object to avoid mutating the original data.
      this.dialogVisible = true;
    },
    saveChanges() {
      this.users = this.users.map(u => u.userID === this.editingUser.userID ? this.editingUser : u);
      ElMessage.success('用户信息已更新');
      this.dialogVisible = false;
    },
    handleWindowResize() {
      this.updateTableColumnWidth();
    },
    updateTableColumnWidth() {
      // 获取表格的实际宽度
      const tableWidth = this.$refs.tableRef.$el.clientWidth;

      // 更新表格列宽
      // 假设我们只有一个列，且希望它占满整个表格宽度
      // Element Plus 的 `<el-table>` 组件本身并没有提供直接的方法来更新列宽，
      // 所以这里需要根据具体情况手动计算每列的宽度
      const columns = this.$refs.tableRef.$el.querySelectorAll('.el-table__header .el-table_1_column_1');
      columns.forEach(column => {
        column.style.width = `${tableWidth * 0.1}px`; // 假设每列占总宽度的10%
      });
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleWindowResize);
    this.updateTableColumnWidth(); // 初始化时也调用一次
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
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