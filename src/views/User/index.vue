<template>
  <div class="layout-container">
    <m-header :style="{ position: 'fixed', top: '0', 'z-index': '100' }">
      <div slot="nav"></div>
    </m-header>
    <el-menu
      :style="{
        position: 'fixed',
        top: '100px',
        width: '100%',
        'z-index': '50',
      }"
      :default-active="defaultTab"
      class="el-menu-demo"
      mode="horizontal"
      @select="tabSelect"
    >
      <el-menu-item index="message">个人信息</el-menu-item>
      <el-menu-item index="order">订单管理</el-menu-item>
      <el-menu-item index="cart">购物车</el-menu-item>
      <el-submenu index="address">
        <template slot="title">地址管理</template>
        <el-menu-item index="edit">编辑地址</el-menu-item>
        <el-menu-item index="add">添加地址</el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view :style="{ 'margin-top': '200px'}"></router-view>
  </div>
</template>

<script>
import MHeader from "../../common/MHeader";
export default {
  data() {
    return {
      defaultTab: "message",
    };
  },
  components: {
    MHeader,
  },
  methods: {
    tabSelect(key,keyPath) {
      console.log(keyPath)
      let urlpath = `/user`
      keyPath&&keyPath.forEach(item=>{
        urlpath+=`/`+item
      })
      this.$router.push({ path: urlpath });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";

.w {
  padding-top: 40px;
}

.content {
  display: flex;
  height: 100%;
}

.account-sidebar {
  width: 210px;
  border-radius: 6px;
  .avatar {
    padding-top: 20px;
    border-radius: 10px;
    text-align: center;
    img {
      width: 168px;
      height: 168px;
    }
    h5 {
      font-size: 18px;
      line-height: 48px;
      font-weight: 700;
    }
  }
  .account-nav {
    padding-top: 15px;
    li {
      position: relative;
      height: 48px;
      border-top: 1px solid #ebebeb;
      line-height: 48px;
      &:hover {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98afee;
          line-height: 50px;
          color: #fff;
        }
      }
      a {
        display: block;
      }
      &.current {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98afee;
          line-height: 50px;
          color: #fff;
        }
      }
    }
  }
}

.account-content {
  margin-left: 20px;
  flex: 1;
}
</style>