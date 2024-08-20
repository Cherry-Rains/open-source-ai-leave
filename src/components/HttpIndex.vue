<template>
    <div class="sidebar">
    <div class="icon">
        <img style="width:50px;height:50px" src="image/aislogo.png" alt="Logo">
        <h1 style="font-size: 12px;color : white">AI助手</h1>
        <h1 style="font-size: 12px;color : white">ver:1.0</h1>
    </div>
    <div id="sideitem" style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        <div class="sidebar-item selected" data-item="conversation" onclick="showConversation()">
            <img style="width:30px;height:30px" src="image/sidebar-conv.png" alt="对话窗">
            <span>对话窗</span>
        </div>
        <div class="sidebar-item" data-item="function" onclick="navigateToFunction()">
            <img style="width:30px;height:30px" src="image/sidebar_func.png" alt="功能列表">
            <span>功能列表</span>
        </div>
        <div class="sidebar-item" data-item="logger" onclick="navigateToLogger()">
            <img style="width:30px;height:30px" src="image/logger.png" alt="查询日志" >
            <span>查询日志</span>
        </div>
    </div>
    <div class="sidebar-item" data-item="aboutUs" style="margin-bottom: 20px;" onclick="showAbout()">
        <img style="width:30px;height:30px" src="image/sidebar_about.png" alt="关于">
        <span>关于</span>
    </div>
</div>
</template>