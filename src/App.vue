<template>
  <div id="app">
  <sidebarView></sidebarView>
  <div class="routes">  <router-view></router-view>
  </div>

  </div>
</template>

<script>
import sidebarView from './views/side-bar-views.vue';
export default {
  components:{
    sidebarView
  },
  methods: {
}

}

</script>
<style>
#app{
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
html, body, #app {  
  height: 100%;  
  widows: 100%;
  margin: 0;  
  padding: 0;  
  box-sizing: border-box; /* 这是一个好习惯，可以确保padding和border不会增加元素的总宽度和高度 */  
}
.routes{
  width: 100%;
}

</style>