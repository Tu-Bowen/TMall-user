<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息 {{ infoedit ? "编辑" : "" }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          v-if="!infoedit"
          @click="changeeditinfo()"
          >编辑</el-button
        >
      </div>
      <div v-if="!infoedit">
        <div>
          <el-avatar
            :size="80"
            :src="userinfo.image"
            style="margin-left: 50%; transform: translateX(-50%)"
          ></el-avatar>
        </div>
        <el-descriptions title="用户信息" :column="1">
          <el-descriptions-item label="用户名">{{
            userinfo.name || "网络发生错误"
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            userinfo.phonenumber || "网络发生错误"
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div v-else>
        <el-form ref="form" :model="edit" label-width="80px">
          <el-form-item label="用户头像上传">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              action="http://localhost:3000/image/userimage"
              :show-file-list="false"
              :auto-upload="false"
              :on-change="imagePreview"
              :data="uploadparams"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload"
            >
              <img
                v-if="edit.avaterimage"
                :src="edit.avaterimage"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="edit.name" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="edit.phonenumber" style="width: 50%"></el-input>
          </el-form-item>
          <el-form-item>
            <div v-if="infoedit">
              <el-button type="danger" size="mini" @click="saveEdit">
                保存
              </el-button>
              <el-button type="primary" size="mini" @click="canceleditinfo">
                取消
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getUserinfo, editUserinfo } from "@/api/userinfo.js";
import { getStore } from "@/utils/storage";
export default {
  data() {
    return {
      userinfo: {},
      infoedit: false,
      edit: {
        name: "",
        phonenumber: "",
        avaterimage: "",
      },
      uploadparams: {
        userid: getStore("id"),
        username: getStore("user"),
      },
    };
  },
  methods: {
    imagePreview(event) {
      // 获取上传图片的本地URL，用于上传前的本地预览
      var URL = null;
      if (window.createObjectURL != undefined) {
        // basic
        URL = window.createObjectURL(event.raw);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        URL = window.URL.createObjectURL(event.raw);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        URL = window.webkitURL.createObjectURL(event.raw);
      }
      // 转换后的地址为 blob:http://xxx/7bf54338-74bb-47b9-9a7f-7a7093c716b5
      this.edit.avaterimage = URL;
    },
    getInfo() {
      getUserinfo({ params: { userid: getStore("id") } }).then(
        (userinfores) => {
          if (!userinfores.data.cannot) {
            this.userinfo = userinfores.data.info;
          }
        }
      );
    },
    changeeditinfo() {
      this.infoedit = !this.infoedit;
    },
    canceleditinfo() {
      this.edit = {
        name: "",
        phonenumber: "",
        avaterimage: "",
      };
      this.infoedit = !this.infoedit;
    },
    saveEdit() {
      this.$refs.upload.submit();
      if (this.edit.name != "" || this.edit.phonenumber != "") {
        editUserinfo({
          userid: getStore("id"),
          name: this.edit.name || getStore("user"),
          phonenumber: this.edit.phonenumber || getStore("phonenumber"),
        }).then(res=>{
          console.log(res)
          if(!res.data.cannot){
            this.$message({
              message:"用户信息修改成功",
              type:"success"
            })
          }else{
            this.$message.error("用户信息修改失败")
          }
          this.canceleditinfo()
        });
      }
    },
    uploadSuccess(file,res){
      console.log('上传成功')
      console.log(file)
      console.log(res)
      this.$message({
        message:"用户头像修改成功",
        type:"success"
      })
    },
    uploadError(){
      this.$message.error("用户头像修改失败")
    },
    beforeUpload(){
      console.log('图片开始上传')
    }
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 80px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>