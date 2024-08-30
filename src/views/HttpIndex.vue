<template>

  
    <div class="conv-container">
      <div class="header">
      <img style="width:30px;height:30px;margin-left:10px" src="../assets/images/aislogo_blue.png" alt="Logo" />
      <div style="margin-left: 10px;">
        <strong><span style="margin-left: 20px; font-size: 16px;margin-left: 0;margin-left: 3px;">AI助手</span></strong>
        <div style="display: flex;flex-direction: row;  text-align: center;align-items: center;justify-content: center;">
          <span style="margin-left: 5px; font-size: 12px;;">ver 1.2</span>
        </div> 
      </div>     
    </div>
      <div class="data-div">
      <div id="chat-box">
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="message-container"
          :class="{'user-message': message.isUser, 'system-message': !message.isUser}"
        >
          <template v-if="message.isUser">
            <div class="user-message-content">
              <div>
                <div class="timestampUser">用户 {{ message.timestamp }}</div>
                <div class="message-text" style="color: white;">{{ message.text }}</div>
              </div>
              <img :src="userAvatar" class="avatar" />
            </div>
          </template>


          <template v-else>
            <div class="system-message-content">
              <img :src="systemAvatar" class="avatar" />
              <div>
                <div class="timestamp">LeaveMate {{ message.timestamp }}</div>
                <div class="message-text"><span v-if="message.isLoading">
                <el-icon class="is-loading" :size="40">
                  <Loading />
                </el-icon>
              </span>
              <span v-else>{{ message.text }}</span></div>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="input-container">
        <el-button size="large" @click="clearAllMessages" circle >
        <el-image :src="require('../assets/images/cleanMessage.png')" style="width: 30px;height: 30px;" ></el-image>
      </el-button>
      <el-input
        v-model="textarea"
        maxlength="399"
        type="textarea"
        placeholder="请在此处输入您想输入的内容..."
        @keydown.enter="sendMessage"
        style="margin-right: 10px; margin-left: 10px;border-radius: 8px;" 
      />
      <el-button v-if="!isLoading" @click="sendMessage"  size="large" style="margin-right: 5px;" circle>
        <el-image :src="require('../assets/images/send.png')" style="width: 30px;height: 30px;"></el-image>
      </el-button>
      <el-image v-else :src="require('../assets/images/loading-icon.png')" class="loading-icon"><Loading /></el-image>


    </div>
    <div class="footer-note">
      服务生成的所有内容均由人工智能模型生成，其生成内容的准确性和完整性无法保证，不代表我们的态度或观点
    </div>
    </div>
    </div>




</template>


<script>
import { ref, onMounted } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'

export default {
  name: 'AiAssistant',
  components: {
    Loading,
  },
  setup() {
    const textarea = ref('');
    const messages = ref([]);
    const isLoading = ref(false);
    const userId = generateUserId(); // 生成随机的 userId
    const userAvatar = require('../assets/images/user.png'); // 用户头像路径
    const systemAvatar = require('../assets/images/aislogo_blue.png'); // 系统头像路径

    function generateUserId() {
      // 生成一个随机的用户 ID
      return Math.random().toString(36).substring(2, 10);
    }

    onMounted(() => {
      const timestamp = new Date().toLocaleTimeString(); // 获取当前时间戳
      messages.value.push({
        text: "用户您好！我是InCar公司的AI助手LeaveMate，请问有什么可以帮您的？",
        isUser: false,
        timestamp,
      });
    });

    const sendMessage = async () => {
      if (textarea.value.trim()) {
        isLoading.value = true; // 开始加载
        const timestamp = new Date().toLocaleTimeString(); // 获取当前时间戳
        // 添加用户消息
        messages.value.push({ text: textarea.value, isUser: true, timestamp });
        textarea.value='';
        try {
          // 调用接口
          const response = await fetch('http://10.0.13.248:11111/wechatService', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              text: textarea.value,
              userId: userId,
            }),
          });

          // 检查响应状态
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          
          // 更新系统回复的时间戳
          const systemTimestamp = new Date().toLocaleTimeString(); // 新的时间戳

          // 添加系统回复
          messages.value.push({ text: data.content, isUser: false, timestamp: systemTimestamp });
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        } finally {
          isLoading.value = false; // 结束加载
        }

        // 清空输入框
        textarea.value = '';
      }
    };

    const clearAllMessages = () => {
      // 清空消息数组
      messages.value = [];
      ElMessage({
      showClose: true,
      message: '已清除历史记录！',
      type: 'success',
    })
    };

    return {
      textarea,
      messages,
      isLoading,
      sendMessage,
      clearAllMessages,
      userId,
      userAvatar,
      systemAvatar,
    };
  },
};
</script>
<style scoped>

.conv-container{
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
.user-message-content{
  display: flex;
  align-items: flex-start; /* 头像和文本垂直对齐 */
  justify-content: flex-end; /* 使内容靠右侧 */
  margin-left: auto; /* 从右侧开始排布 */
  text-align: right; /* 使文本右对齐 */
  max-width: 90%;
}
.system-message-content {
  max-width: 90%;
  display: flex;
  align-items: center;
}

.common-layout{
  background-color: #f9fbff;
  width: 100%;
  height: 100%;
}

.dialog{
  height: 100%;
  background: pink;
}

.footer-note {
  display: flex;                     /* 使用 Flexbox */
  flex-direction: column;            /* 设置主轴方向为垂直 */
  align-items: center;               /* 水平居中 */
  justify-content: center;           /* 垂直居中 */
  font-size: 12px;
  color: #8a8a8a;
  padding: 10px;
  border-top: 2px solid #92cada;
  width: 100%;
  margin: 0 auto;                   /* 保证整体居中 */
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
#chat-box {
  flex-grow: 1;
  overflow-y: auto;
  border-radius: 8px;

  padding: 10px;
  background-color: rgba(255, 255, 255, 1.0); /* 半透明白色 */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 可选：添加阴影 */
  height: 70vh;
}
.data-div {
  font-size: 17px ;
  display: flex;
  flex-direction: column;
  width: 95%;            /* 设置宽度 */
  border-radius: 8px;    /* 可选：圆角 */
  font-family: 'Microsoft YaHei', sans-serif; /* 设置字体为微软雅黑 */
}
.message-container {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
.right-avatar {
  margin-left: auto; /* 将用户头像推到右侧 */
  margin-right: 0;  /* 清除右边距 */
}
.message-content {
  max-width: 90%;
}
.timestamp {
  font-size: 12px;
  color: #999;
  margin-bottom: 5px;
}
.timestampUser{
  font-size: 10px;
  color: #999;
  margin-bottom: 5px;
  margin-right: 15px;
}
.user-message .message-text {
  text-align: left;
  padding: 5px;
  background-color: #E0DFFF;
  padding: 10px;
  border-radius: 15px;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: black !important;
  border-radius: 8px;
}
.message-text {
  word-wrap: break-word; /* 允许单词换行 */
  white-space: pre-wrap; /* 保持空格，换行 */
  max-width: 100%; /* 确保不超出容器 */
}
.system-message .message-text {
  background-color: #F7F7F7;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}


.input-container {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}    

.loading-icon{
  animation: spin 1s linear infinite; /* 设置旋转动画 */
  width: 35px; /* 根据需要调整图标的大小 */
  height: 35px; /* 根据需要调整图标的大小 */
  padding: 5px;
}
@keyframes spin {
  from {
    transform: rotate(0deg); /* 初始旋转角度 */
  }
  to {
    transform: rotate(360deg); /* 完成旋转角度 */
  }
}
</style>