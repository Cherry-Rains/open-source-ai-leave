<template>
  <div class="container">
    <div class="header">

    </div>
    <div class="function-container">
      <div class="userIdInput" style="height: 5%;">
        <el-input
          id="user-id-input"
          placeholder="请输入用户ID"
          v-model="userId"
          clearable
        />
      <11v>
      <div class="dateSelect" style="height: 5%;background-color: antiquewhite;">
        <el-date-picker
          id="start-time"
          v-model="startTime"
          type="date"
          placeholder="起始时间"
          clearable
        />
        <el-date-picker
          id="end-time"
          v-model="endTime"
          type="date"
          placeholder="结束时间"
          clearable
        />
        <el-button @click="searchdb" :icon="Search">
          查询
        </el-button>
      </div>

      <div class="DBcontainer" style="height: auto; background-color: aqua;">
        <el-table :data="paginatedData" style="width: 100%">
          <el-table-column prop="user_id" label="用户ID" width="400px"></el-table-column>
          <el-table-column prop="session_id" label="会话ID" width="150px"></el-table-column>
          <el-table-column label="对话历史" width="200px">
            <template #default="scope">
              <el-button plain @click="showDialog(scope.row)" class="text-blue-600">查看对话</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="starttime" label="起始时间" width="250"></el-table-column>
          <el-table-column prop="endtime" label="结束时间" width="250"></el-table-column>
        </el-table>
      </div>

      <el-dialog v-model="dialogVisible" title="对话日志" width="90%" append-to-body>
        <template v-if="displayedConversation">
          <div style="max-height: 480px; overflow-y: auto;">
            <p v-for="(message, index) in displayedConversation" :key="index">
              <small>{{ message.timestamp }}</small>
              <br><strong>{{ message.role }}:</strong> {{ message.content }}
            </p>
          </div>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确定</el-button>
          </span>
        </template>
      </el-dialog>

      <div class="pagination" style="height: 10%; background-color: #f5f7fa;">
        <el-button @click="prevPage" :disabled="currentPage === 1">上一页</el-button>
        <el-button v-for="page in totalPages" :key="page" @click="setPage(page)" :type="page === currentPage ? 'primary' : 'default'">
          {{ page }}
        </el-button>
        <el-button @click="nextPage" :disabled="currentPage === totalPages">下一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue';

export default {
  setup() {
    const userId = ref('');
    const startTime = ref(null);
    const endTime = ref(null);
    const currentPage = ref(1);
    const rowsPerPage = 10;
    const filteredData = ref([]);
    const dialogVisible = ref(false);

    const fetchData = () => {
      fetch('http://localhost:11111/all-sessions')
        .then(response => response.json())
        .then(data => {
          const userIdValue = userId.value.trim().toLowerCase();
          const startTimeValue = new Date(startTime.value);
          const endTimeValue = new Date(endTime.value);
          filteredData.value = data.filter(item => {
            const itemStartTime = new Date(item.starttime);
            const itemEndTime = new Date(item.endtime);
            const matchesUserId = userIdValue === '' || item.user_id.toLowerCase().includes(userIdValue);
            const matchesStartTime = isNaN(startTimeValue.getTime()) || itemStartTime >= startTimeValue;
            const matchesEndTime = isNaN(endTimeValue.getTime()) || itemEndTime <= endTimeValue;
            return matchesUserId && matchesStartTime && matchesEndTime;
          });
        })
        .catch(error => ElMessage.error('Error fetching data: ' + error));
    };

    const searchdb = () => {
      fetchData();
    };

    const paginatedData = computed(() => {
      const startIndex = (currentPage.value - 1) * rowsPerPage;
      return filteredData.value.slice(startIndex, startIndex + rowsPerPage);
    });

    const totalPages = computed(() => Math.ceil(filteredData.value.length / rowsPerPage));

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const setPage = page => {
      currentPage.value = page;
    };

    return {
      userId,
      dialogVisible,
      startTime,
      endTime,
      currentPage,
      paginatedData,
      totalPages,
      prevPage,
      nextPage,
      setPage,
      searchdb,
      Search,
      displayedSessionId: '',
      displayedConversation: '',
    };
  },
  methods: {
    async showDialog(row) {
      this.displayedSessionId = row.session_id;
      try {
        this.displayedConversation = await this.fetchConversation(this.displayedSessionId);
        this.dialogVisible = true;
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    },
    fetchConversation(sessionId) {
      return fetch('http://localhost:11111/conversation/' + sessionId)
        .then(response => response.json())
        .then(data => {
          return data;
        })
        .catch(error => {
          throw new Error('Error fetching data: ' + error.message);
        });
    },
    handleConfirm() {
      this.dialogVisible = false;
    }
  }
};
</script>

<style scoped>
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

.header{  display: flex;
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
  top: 0;}
.function-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.userIdInput,
.dateSelect,
.DBcontainer,
.pagination {
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-table th {
  background-color: #f7fafc;
  color: #2d3748;
}

.el-button {
  border-radius: 12px;
}
</style>