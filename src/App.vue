<template>
  <div id="app">
  <router-view class="main"></router-view>  
  <Chat v-if="SocketIO"></Chat>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Chat from '@/common/Chat.vue';
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState(['SocketIO'])
  },
  components:{
    Chat
    } 
};
</script>

<style lang='scss'>
@import 'assets/style/index.scss';
#app{
  height: 100%;
  background-color: #ededed;
  height: 100vh;
}
.main{
  background-color: #ededed;
  overflow: hidden;
  width: 100%;
}
</style>
