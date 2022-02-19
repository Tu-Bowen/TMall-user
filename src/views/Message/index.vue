<template>
  <div style="width:60vw;margin-left:20vw;">
    <el-tabs type="border-card">
      <el-tab-pane label="用户信息">
          <userinfo></userinfo>
      </el-tab-pane>
      <el-tab-pane label="消息">配置管理</el-tab-pane>
      <el-tab-pane label="修改密码">修改密码</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import userinfo from './components/Userinfo';
export default {
    components:{
        userinfo
    }
};
</script>

<style>
</style>