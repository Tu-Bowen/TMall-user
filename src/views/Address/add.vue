<template>
  <div
    :style="{
      width: '60vw',
      'background-color': 'white',
      'margin-left': '20vw',
      padding: '20px',
    }"
  >
    <h1 class="title">添加收货地址</h1>
    <el-form
      :model="dataForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="收货人" prop="name">
        <el-input v-model="dataForm.name" :style="{ width: '25%' }"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phonenumber">
        <el-input
          v-model="dataForm.phonenumber"
          :style="{ width: '50%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="现居住地" prop="address">
        <el-input v-model="dataForm.address"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-select v-model="dataForm.remark" placeholder="添加备注">
          <el-option
            v-for="option in remark_options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="detail_address">
        <el-input v-model="dataForm.detail_address" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >创建地址</el-button
        >
        <el-button @click="resetForm('ruleForm')">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      remark_options: [{
          label:"家/宿舍",
          value:"home"
      },{
          label:"公司",
          value:"company"
      },{
          label:"快递站",
          value:"express"
      },{
          label:"学校",
          value:"school"
      },{
          label:"代收点",
          value:"collection"
      }],
      dataForm: {
        name: "",
        phonenumber: "",
        address: "",
        remark: "",
        detail_address: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
