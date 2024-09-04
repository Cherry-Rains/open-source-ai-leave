<template>
    <div class="container" >
        <div class="header">
            <h1 class="header-title">关于我们</h1>
        </div>
      <el-card class="box-card">
        <div  class="clearfix">
        </div>
        <div class="function-container">
          <el-timeline>
            <el-timeline-item v-for="(item, index) in versionHistory" :key="index" :timestamp="item.version" placement="top">
              <el-card>
                <h2>{{ item.version }}</h2>
                <ul>
                  <li v-for="(change, idx) in item.changes" :key="idx">
                    <el-tag type="success" v-if="change.startsWith('*')">{{ change.slice(1)}}</el-tag>
                    <span v-else>{{ change }}</span>
                  </li>
                </ul>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import { ElCard, ElTimeline, ElTimelineItem, ElTag } from 'element-plus';
  
  export default {
    name: 'AboutUs',
    components: {
      ElCard,
      ElTimeline,
      ElTimelineItem,
      ElTag,
    },
    data() {
      return {
        versionHistory: [
        {
            version: '1.3',
            changes: [
              '',
            ],
          },
          {
            version: '1.2',
            changes: [
              '* 新增 OA 系统维护功能，用户可以后台维护数据库。',
            ],
          },
          {
            version: '1.1',
            changes: [
              '将美术风格换为蓝色渐变风。',
              '* 新增了日志查询功能，便于管理员查看所有对话记录。',
            ],
          },
          {
            version: '1.0',
            changes: [
              '添加了全新的美术 UI 设计，使界面更加简洁美观。',
              '* 新增了功能列表功能，便于用户查看当前可用功能。',
            ],
          },
        ],
      };
    },
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
  .header{
    display: flex;
  align-items: center;
  justify-content: center;

  color: #444 !important;
  background-color: #FFFFFF;
  border-bottom: 2px solid #E0E0E0;
  width: 100%;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  }
  .header-title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  
  .box-card {
    width: 90%;
    margin-top: 10px;
  }
  
  .function-container {

  }
  </style>