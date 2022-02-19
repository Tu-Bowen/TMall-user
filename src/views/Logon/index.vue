<template>
  <div class="login">
    <div class="box">
      <span>注册用户账号</span>
      <el-form
        :model="userLogon"
        status-icon
        :rules="rules"
        ref="logonForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="user">
          <el-input
            type="text"
            v-model="userLogon.user"
            autocomplete="off"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="userLogon.pass"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('logonForm')" :style="{'position':'absolute','left':'0'}"
            >注册</el-button
          >
          <router-link to="/login" class="loginbtn">登录</router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Logon } from "@/api/logon.js"; 
export default {
  data() {
    let validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      userLogon: {
        user: "",
        pass: "",
      },
      rules: {
        user: [{ validator: validateUser, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
      cart: [],
    };
  },
  methods: {
    submitForm(logonForm) {
    //    console.log(this.$refs[LogonForm].validate)
      this.$refs[logonForm].validate(async (valid) => {
        if (valid) {
          //发送登录请求
          let res = await Logon(this.userLogon);
          console.log(res)
          if (res.status == 200) {
            this.$router.push({ path: "/login" });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.loginbtn{
    position: absolute;
}
.login {
  position: relative;
  overflow: visible;
  background: #ededed;
  .box {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    position: absolute;
    top: 200px;
    left: 50%;
    padding: 50px 50px 50px 10px;
    margin-left: -225px;
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 18px 20px -10px rgba(0, 0, 0, 0.04),
      0 10px 20px -10px rgba(0, 0, 0, 0.04);
    text-align: center;
    form {
      margin-top: 30px;
    }
    span {
      color: #333;
      font-weight: 400;
    }
  }
}
</style>