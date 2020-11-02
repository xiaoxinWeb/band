<style lang="less" scoped>
.el-table__expanded-cell {
  .el-form-item {
    width: 100%;
    .el-form-item__content {
      width: 100%;
      .list-name {
        display: flex;
        margin: 10px 0;
        justify-content: space-between;
        width: 100%;
        span {
          display: flex;
          flex: 1;
        }
        .el-button--text {
          display: flex;
          flex: 1;
        }
      }
    }
  }
}
.el-input {
  width: 80%;
}
.el-select {
  width: 80% !important;
}
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.el-select {
  width: 100%;
}

.activeList {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #000;
  line-height: 30px;
   width: 80%;
  margin: 10px 0 ;
}
.delect {
  color: red;
}
.el-dialog__wrapper {
  width: 80%;
}

@media screen and (max-width: 768px) {
  .el-message-box {
    width: 80% !important;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 90%;
    margin: auto;
  }
  .el-input {
    width: 60% !important;
  }
  .el-select {
    width: 60% !important;
  }
  .el-form {
    background-color: #fff;
    padding: 20px 10px;
  }
}
.right-text {
  color: red;
  margin-right: 10px;
}
.list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}

.left-delect {
  margin-right: 30px;
  color: red;
}
.van-icon {
  position: absolute;
  right: 0;
  top: 5px;
}
</style>
<template>
  <div>
    <div class="min-width">
      <el-button type="primary" @click="addBtn()">添加银行</el-button>
      <el-table :data="tableData" style="width: 100%" height="70vh">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <span v-for="(item, index) in props.row.parent">
                  <div class="list-name">
                    <span>{{ item.bank_name }}</span>
                    <el-button
                      type="text"
                      @click="delect(index, item.id, props.row.parent)"
                      >删除</el-button
                    >
                  </div>
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="银行名称">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.bank_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" style="text-aligin: right">
          <template slot-scope="scope">
            <span style="color: red" @click="delect2(scope.row)">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="count"
      >
      </el-pagination>
      <el-dialog class="model" :visible.sync="centerDialogVisible" width="60%">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="银行id">
            <el-select v-model="ruleForm.region" placeholder="请选择银行id">
              <el-option value="" label="请选择ID" />
              <el-option
                v-for="val in selectList"
                :key="val.id"
                :value="val.id"
                :label="val.bank_name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="银行名称" prop="bank_name">
            <el-input v-model="ruleForm.bank_name"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
            >
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <!-- 弹出框 -->

    <!-- 移动端  -->
    <div class="max-width">
 <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
   @load="onLoad"
>
<van-pull-refresh  v-model="isLoading" @refresh="onRefresh">
 <van-cell v-for="(item,index) in tableData" :mode="item" :key="index" >
   <div >
     <!-- 左边内容 -->
     <div class="list-item">
     <div class="left-item">
       {{item.bank_name}}
     </div>
     <div class="left-delect" @click="delect2(item)">
       删除
     </div>
     </div>
     <!-- 图标 -->
     <van-icon :name="item.istrue?'arrow-up':'arrow-down'" @click="isActive(item,index)"  v-if="item.parent.length !=0"/>
            <div class="activeList" v-for="(item2,i) in item.parent" :key = "i"  v-show="item.istrue">
                <span>{{ item2.bank_name }}</span>
            <span class="delect" @click="delect(idx, item2.id, item.parent)"
              >删除</span
            >
            </div>
   </div>
   </van-cell>
   </van-pull-refresh>
</van-list>
      <!-- <van-collapse v-model="activeNames" accordion>
        <van-collapse-item
          v-for="(item, index) in tableData"
          :title="item.bank_name"
          :name="index"
        >
          <div class="activeList" v-for="(item2, idx) in item.parent">
            <span>{{ item2.bank_name }}</span>
            <span class="delect" @click="delect(idx, item2.id, item.parent)"
              >删除</span
            >
          </div>
        </van-collapse-item>
      </van-collapse> -->
      <div @click="addBtn2()">
        <floatIng ref="componentref"></floatIng>
      </div>
      <van-overlay :show="show">
        <div class="wrapper" @click.stop>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="银行id">
              <el-select v-model="ruleForm.region" placeholder="请选择银行id">
                <el-option value="" label="请选择ID" />
                <el-option
                  v-for="val in selectList"
                  :key="val.id"
                  :value="val.id"
                  :label="val.bank_name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="银行名称" prop="bank_name">
              <el-input v-model="ruleForm.bank_name"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >确定</el-button
              >
              <el-button @click="resetForm('ruleForm')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import floatIng from "../float/float";
export default {
  components: {
    floatIng,

  },
  data() {
    return {
      tableData: "",
      isActive_false:false,
      finished:false,
      selectList: "",
      loading:false,
      isLoading:false,
      show: false,
      activeNames: ["1"],
      page: 1,
      size: 10,
      count: "",
      ruleForm: {
        bank_name: "",
        region: "",
      },
      centerDialogVisible: false,
      rules: {
        bank_name: [
          { required: true, message: "请输入银行名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // 获取列表
    this.Banklist();
    // 获取一级菜单数据
    this.btnsectClick();
  },
  methods: {
    // 点击展开收起 
    isActive(item,index){
      item.istrue = !item.istrue
        //  this.tableData = this.tableData
    },
    // 获取一级菜单数据
    btnsectClick() {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
      };
      this.fetchGet("/listOneBank", data).then((res) => {
        if (res.data.code == 0) {
          this.selectList = res.data.data;
          //    获取成功
        } else {
          Toast(res.data.message);
        }
      });
    },
    // 加载数据
 
    addBtn2() {
      this.show = true;
    },
    resetForm(formName) {
      this.centerDialogVisible = false;
      this.$refs[formName].resetFields();
      this.ruleForm.region = "";
      this.show = false;
    },
    // 添加银行
    addBtn() {
      this.centerDialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            bank_name: this.ruleForm.bank_name,
            p_id: this.ruleForm.region,
          };
          this.fetchGet("/addBank", data).then((res) => {
            if (res.data.code == 0) {
              this.centerDialogVisible = false;
              this.$refs[formName].resetFields();
              this.Banklist();
              this.ruleForm.region = "";
              this.show = false;
            } else {
              Toast(res.data.message);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 刷新 
    onRefresh(){
      this.page = 1;
      this.Banklist();

    },
    onLoad(){
      this.page ++;
      this.Banklist(2);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    Banklist(e) {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
        page: this.page,
        size: this.size,
      };
      this.fetchGet("/listBank", data).then((res) => {
        if (res.data.code == 0) {
          this.loading = false
          this.isLoading = false;
          if (e == 2) {
            if (res.data.data.length == 0) {
              this.finished = true;
            } else {
              this.tableData = this.tableData.concat(res.data.data);
              this.finished = false;
            }
            return;
          }
          this.tableData = res.data.data;
          this.count = res.data.count;
          //    获取成功
        }
      });
    },
    delect3(item){

    },
    // 删除
    delect2(item) {
      console.log(item);
      this.$confirm("删除后也会删除子级里面所以支行")
        .then((_) => {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            id: item.id,
          };
          this.fetchGet("/delBank", data).then((res) => {
            if (res.data.code == 0) {
              this.$router.go(0);
              //    获取成功
            } else {
              Toast(res.data.message);
            }
          });
        })
        .catch((_) => {});
    },
    delect(i, id, its) {
      console.log(i, id, its);
      const data = {
        api_token: localStorage.getItem("tokenlo"),
        id: id,
      };

      console.log(its);
      this.fetchGet("/delBank", data).then((res) => {
        if (res.data.code == 0) {
          console.log(res);
          Toast("删除成功");
          its.splice(i, 1);
          //    获取成功
        } else {
          Toast(res.data.message);
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.Banklist();
    },
    handleSizeChange(val) {
      this.size = val;
      this.Banklist();
    },
  },
};
</script>