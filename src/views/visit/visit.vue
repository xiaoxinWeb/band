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
  .el-textarea {
    width: 70%;
  }
  .ele-st {
    margin-top: 20px;
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
      :model="bankaddData"
      :rules="rules"
      ref="bankaddData"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="拜访备注" prop="desc">
        <el-input type="textarea" v-model="bankaddData.desc"></el-input>
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
            v-if="bankaddData.imageUrl"
            :src="bankaddData.imageUrl"
            class="avatar"
          ></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="btn-form">
        <el-button type="primary" @click="Submit('bankaddData')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    // 手机号验证

    return {
      dataList: "",
      bankaddData: {
        imageUrl: "",
        desc: "",
      },
      rules: {
        desc: [
          {
            required: true,
            message: "拜访备注不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.dataList = this.$route.query;
    console.log(this.$route.query.itemData);
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
            _this.bankaddData.imageUrl = res.data.data.imgUrl;
          }
        });
      };
    },
    Submit() {
      this.$refs.bankaddData.validate((valid) => {
        if (valid) {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            notes: this.bankaddData.desc,
            img: this.bankaddData.imageUrl,
            id: this.dataList.itemData,
            type: this.dataList.itemData2,
          };
          console.log(data);
          this.fetchGet("/staffCall", data).then((res) => {
            if (res.data.code == 0) {
              this.$router.go(-1);
            }
          });
        }
      });
    },
  },
};
</script>