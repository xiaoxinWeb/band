<style scoped>
.el-input {
  width: 50%;
}
@media screen and (max-width: 768px) {
  .el-input {
    width: 100%;
  }
  .btn-form {
    display: flex;
    justify-content: center;
  }
}
</style>
<template>
  <div>
    <el-form label-width="80px" :model="Addata" :rules="rules" ref="Addata">
      <el-form-item label="部门名称" prop="bumen" required>
        <el-input
          v-model="Addata.bumen"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>

      <el-form-item class="btn-form">
        <el-button type="primary" @click="Submit('Addata')">提交</el-button>
        <el-button @click="close()">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Addata: {
        bumen: "",
      },
      rules: {
        bumen: [
          {
            required: true,
            message: "部门名称不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    Submit() {
      this.$refs.Addata.validate((valid) => {
        if (valid) {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            group_name: this.Addata.bumen,
          };
          this.fetchGet("/addGroup", data).then((res) => {
            if (res.data.code == 0) {
              this.$router.go(-1);
            }
          });
        }
      });
    },
    close() {
      this.$router.go(-1);
    },
  },
};
</script>