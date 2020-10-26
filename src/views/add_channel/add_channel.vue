<style lang="less" scoped>
.el-input {
  width: 500px;
}
.el-select {
  width: 500px;
}
.avatar-uploader {
  .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
.avatar-uploader-icon {
  border: 1px dashed #999;

  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: #409eff;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
// 多媒体查询
@media screen and (max-width: 768px) {
  .el-input {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .el-button {
    width: 100%;
  }

  .btn-form {
    display: flex;
    flex-direction: column;
  }
  .el-button {
    margin-top: 40px;
  }

  .el-button + .el-button {
    margin-left: 0 !important;
  }
}
</style>
<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="渠道名称" prop="channel_name">
        <el-input
          v-model="ruleForm.channel_name"
          placeholder="请输入渠道名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人职位" prop="channel_position">
        <el-input
          v-model="ruleForm.channel_position"
          placeholder="请输入联系人职位"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司规模" prop="scale" required>
        <el-input
          v-model="ruleForm.scale"
          placeholder="请输入公司规模"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司性质" prop="nature" required>
        <el-select v-model="ruleForm.nature" placeholder="请选择公司性质">
          <el-option label="电销" value="1"></el-option>
          <el-option label="行销" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系人电话" prop="channel_phone">
        <el-input
          v-model="ruleForm.channel_phone"
          placeholder="请输入联系人电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="渠道联系人" prop="channel_user_name">
        <el-input
          v-model="ruleForm.channel_user_name"
          placeholder="请输入渠道联系人"
        ></el-input>
      </el-form-item>
      <!-- 上传图片 -->
      <el-form-item label="图片上传" prop="imageUrl">
        <el-upload
          action="http://129.204.83.203/uploadimg"
          class="avatar-uploader"
          :show-file-list="false"
          :http-request="uploadFile"
          accept="image/png,image/gif,image/jpg,image/jpeg"
        >
          <el-image
            v-if="ruleForm.imageUrl"
            :src="ruleForm.imageUrl"
            class="avatar"
          ></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="btn-form">
        <el-button type="primary" @click="Submit('ruleForm')">提交</el-button>
        <el-button @click="close()">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    // 手机号验证
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("手机号码格式不正确"));
          }
        }
      }, 100);
    };
    return {
      ruleForm: {
        channel_name: "",
        channel_phone: "",
        channel_user_name: "",
        channel_position: "",
        imageUrl: "",
        scale: "",
        nature: "",
      },
      rules: {
        channel_name: [
          {
            required: true,
            message: "渠道名称不能为空",
            trigger: "blur",
          },
        ],
        channel_phone: [
          { required: true, validator: checkPhone, trigger: "blur" },
        ],
        channel_user_name: [
          {
            required: true,
            message: "渠道联系人不能为空",
            trigger: "blur",
          },
        ],
        nature: [
          { required: true, message: "请选择公司性质", trigger: "change" },
        ],
        channel_position: [
          { required: true, message: "联系人职位不能为空", trigger: "blur" },
        ],
        scale: [
          { required: true, message: "公司规模不能为空", trigger: "blur" },
        ],
        imageUrl: [
          {
            required: true,
            message: "请上传图片",
            trigger: "blur",
          },
        ],
      },
      result: "",
    };
  },
  methods: {
    //  自定义上传图片
    uploadFile(file) {
      const _this = this;
      //  this.imageUrl = URL.createObjectURL(file.file);
      const fr = new FileReader();
      const base = "";
      fr.readAsDataURL(file.file);
      fr.onload = function () {
        const data = {
          api_token: localStorage.getItem("tokenlo"),
          fileImg: fr.result,
        };
        _this.fetchPost("/uploadimg", data).then((res) => {
          if (res.data.code == 0) {
            Toast("图片上传成功");
            _this.ruleForm.imageUrl = res.data.data.imgUrl;
          }
        });
      };
    },
    //   点击提交
    //提交
    Submit() {
      // 添加员工、
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            channel_name: this.ruleForm.channel_name,
            channel_position: this.ruleForm.channel_position,
            channel_phone: this.ruleForm.channel_phone,
            channel_user_name: this.ruleForm.channel_user_name,
            channel_img: this.ruleForm.imageUrl,
            company_nature: this.ruleForm.nature,
            company_scale: this.ruleForm.scale,
          };
          this.fetchPost("/addStaffChannel", data).then((res) => {
            if (res.data.code == 0) {
              Toast(res.data.message);
              // 添加成功返回上一页并刷新数据
              this.$router.go(-1);
            }
          });
        }
      });
    },
    // 点击关闭
    close() {
      // 不刷新页面
      this.$router.back();
    },
  },
};
</script>