<style lang="less" >
.top-btn {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  .el-date-editor {
    margin: 0 20px;
  }
}

.blue {
  color: red;
}
.el-select {
  width: 30%;
}
.van-dropdown-menu__bar {
  box-shadow: none;
  height: 44px;
  line-height: 44px;
}

.van-dropdown-menu__item {
  justify-content: end !important;
}

@media screen and (max-width: 768px) {
  .el-select {
    width: 100%;
  }
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-form {
      background-color: #fff;
      width: 90% !important;
      padding: 20px;
      .el-form-item__content {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .box-list {
    display: flex;
    flex-direction: row;
    margin: 5px 0;
    
    .box-text {
      display: flex;
      flex: 1;
      span {
        margin-right: 5px;
      }
    }
  }
  .quiry-box {
    margin-top: 50px;
  }

  .van-cell {
    margin: 10px 0;
  }
  .header-list {
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: fixed;
    top: 62px;
    left: 0;
    z-index: 999;
    width: 100%;
  }
  .list-box {
    display: flex;
    flex: 1;
    line-height: 40px;
    background-color: #fff;
    text-align: center;
    justify-content: center;
    align-items: center;
    span {
      margin-right: 3px;
    }
  }
  .box-btn {
    border-top: 1px solid #d7d7d7;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    padding: 10px 0;
    align-items: center;
    button {
      height: 35px;
      background-color: #ee0a24;
      color: #fff;
      padding: 10px;
    border-radius: 50px;
    }
  }
}

.inquiryleft {
  width: 100%;
  flex-wrap: wrap;
}
</style>

<template>
  <div>
    <div class="min-width">
      <!-- 开始 -->
      <div class="top-btn">
        <el-select v-model="value_type" placeholder="请选择">
          <el-option label="全部" value=""></el-option>
          <el-option label="银行" value="1"></el-option>
          <el-option label="渠道" value="2"></el-option>
        </el-select>
        <el-date-picker
          v-model="startTime"
          type="date"
          placeholder="选择开始日期"
        >
        </el-date-picker>
        <el-date-picker
          v-model="endTime"
          type="date"
          placeholder="选择结束日期"
        >
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="primary"
          >搜索</el-button
        >
      </div>
      <el-table height="70vh" :data="DataList" style="width: 100%">
        <el-table-column label="银行名称" prop="bank_name"> </el-table-column>
        <el-table-column label="渠道名称" prop="channel_name">
        </el-table-column>
        <el-table-column prop="clients_user" label="客户姓名">
        </el-table-column>
        <el-table-column prop="money" label="成交金额"> </el-table-column>
        <el-table-column prop="remarks" label="成交备注"> </el-table-column>
        <el-table-column prop="add_time" label="成交时间"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 1">成交</div>
            <div v-else>
              <el-button type="text" @click="tijiao(scope.row)">提交</el-button>
            </div>
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

      <!-- 模态框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="40%"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="clients_user">
            <el-input
              v-model="ruleForm.clients_user"
              placeholder="请输入客户姓名"
            ></el-input>
          </el-form-item>

          <el-form-item prop="money">
            <el-input
              v-model="ruleForm.money"
              placeholder="请输入成交金额"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remarks">
            <el-input
              v-model="ruleForm.remarks"
              type="textarea"
              placeholder="请输入成交备注"
            ></el-input>
          </el-form-item>

          <el-form-item class="btn">
            <el-button @click="clonequ">取 消</el-button>
            <el-button type="primary" @click="determine('ruleForm')"
              >确 定</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <div class="max-width">
      
      <!-- 头部 -->
      <div class="header-list">
          <div class="list-box"> <van-dropdown-menu>
      <van-dropdown-item  v-model="value_type"
          :options="option1"
          @change="change1"/>
      </van-dropdown-menu></div>
          <div class="list-box" @click="show = true"><span class="el-icon-date"></span>{{startTime ==''?'开始时间':startTime}}</div>
          <div class="list-box" @click="show2 = true"><span class="el-icon-date"></span>{{endTime ==''?'结束时间':endTime}}</div>
      </div>
     
 <van-calendar
        v-model="show"
        :round="false"
        position="right"
        @confirm="onConfirm"
      />
      <van-calendar
        v-model="show2"
        :round="false"
        position="right"
         @confirm="onConfirm2"

      />
      
    </div>
    <!-- 下拉刷新 -->
    <div class="quiry-box">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
  v-model="loading"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
   :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
     <van-cell v-for="(item,index) in DataList" :key="index">
       <div class="box-list">
         <div class="box-text"><span>银行名称:</span>{{item.bank_name}}</div>
         <div class="box-text"><span>成交时间:</span>{{item.add_time}}</div>
       </div>
       <div class="box-list">
         <div class="box-text"><span>渠道名称:</span>{{item.channel_name}}</div>
         <div class="box-text"><span>成交金额:</span>{{item.money}}</div>
       </div>
       <div class="box-list">
         <div class="box-text"><span>客户名称:</span>{{item.clients_user}}</div>
         <div class="box-text"><span>成交备注:</span>{{item.remarks}}</div>
       </div>
       <!-- 如果状态未未提交显示提交按钮 -->
       <div class="box-btn" v-if="item.status==2">
         <el-button type="text" @click="dblclick(item, index)"
                  >提交</el-button>
       </div>
     </van-cell>
        </van-list>
  </van-pull-refresh>
     <!--模态框  -->
     <van-overlay :show="yidong">
  <div class="wrapper" >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="clients_user">
            <el-input
              v-model="ruleForm.clients_user"
              placeholder="请输入客户姓名"
            ></el-input>
          </el-form-item>

          <el-form-item prop="money">
            <el-input
              v-model="ruleForm.money"
              placeholder="请输入成交金额"
            ></el-input>
          </el-form-item>
          <el-form-item prop="remarks">
            <el-input
              v-model="ruleForm.remarks"
              type="textarea"
              placeholder="请输入成交备注"
            ></el-input>
          </el-form-item>

          <el-form-item class="btn">
            <el-button @click="clonequ">取 消</el-button>
            <el-button type="primary" @click="determine('ruleForm')"
              >确 定</el-button
            >
          </el-form-item>
        </el-form>
  </div>
</van-overlay>
     </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      loading: false,
      refreshing:false,
      finished: false,
      startTime: "",
      endTime: "",
      yidong:false,
      date2: "",
      type: "",
      option1: [
        { text: "全部", value: "" },
        { text: "银行", value: 1 },
        { text: "渠道", value: 2 },
      ],
      show: false,
      show2: false,
      page: 1,
      size: 10,
      dialogVisible: false,
      DataList: "",
      value_type: "",
      count: "",
      id: "",
      value2: "a",

      ruleForm: {
        money: "",
        remarks: "",
        clients_user: "",
      },
      rules: {
        region: [
          { required: true, message: "请选择状态码", trigger: "change" },
        ],
        money: [{ required: true, message: "请输入成交金额", trigger: "blur" }],
        clients_user: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
        ],
        remarks: [
          { required: true, message: "请输入成交备注", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // 获取数据
    this.quiryList();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.value_type = "";
        this.startTime = "";
        this.endTime = "";
        this.page =1;
        this.size = 10;
        this.quiryList();
      }, 1000);
    },
  // 提交
  dblclick(e,index){
    this.yidong= true;
     this.ruleForm.money = e.money;
      this.ruleForm.remarks = e.remarks;
      this.ruleForm.clients_user = e.clients_user;
      this.id = e.id;
  },
    // 加载更多
    onLoad(){
      this.page++;
      this.size = 10;
      this.quiryList(2)
    },
    change1(e) {
      this.page =1;
      this.quiryList();
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      this.page = 1;
      this.show = false;
      this.startTime = this.formatDate(date);
      this.quiryList();
    },
    onConfirm2(date) {
      this.page = 1;
      this.show2 = false;
      this.endTime = this.formatDate(date);
      this.quiryList();
    },
    handleClose() {
      this.dialogVisible = false;
      this.ruleForm.money = "";
      this.ruleForm.remarks = "";
      this.ruleForm.clients_user = "";
      this.id = "";
    },
    // 获取数据

    quiryList(e) {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
        page: this.page,
        size: this.size,
        startTime: this.startTime,
        endTime: this.endTime,
        type: this.value_type,
      };
      this.fetchGet("/listDeal", data).then((res) => {
        if (res.data.code == 0) {
          if(res.data.data.length == 0){
            this.finished = true;
          }
          if(e == 2){
            this.DataList = this.DataList.concat(res.data.data)
          }else {
          this.DataList = res.data.data;

          }
        this.refreshing = false;
          
          this.count = res.data.count;
          this.DataList.forEach((element) => {
            console.log(element.channel_name);
          });
        }else {
          this.error  = true;
        }
      });
    },

    // 提交
    tijiao(e) {
      this.dialogVisible = true;
      this.ruleForm.money = e.money;
      this.ruleForm.remarks = e.remarks;
      this.ruleForm.clients_user = e.clients_user;
      this.id = e.id;
    },

    determine(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            id: this.id,
            remarks: this.ruleForm.remarks,
            money: this.ruleForm.money,
            clients_user: this.ruleForm.clients_user,
          };
          this.fetchGet("/editDeal", data).then((res) => {
            if (res.data.code == 0) {
              window.reload();
              this.dialogVisible = false;
              this.yidong = false;
              this.ruleForm.money = "";
              this.ruleForm.remarks = "";
              this.ruleForm.clients_user = "";
              this.id = "";
              //    获取成功
            } else {
              Toast(res.message);
              this.dialogVisible = true;
            }
          });
        } else {
        }
      });
    },
    // 搜索
    primary() {
      this.quiryList();
    },
    // 点击取消按钮
    clonequ() {
      this.dialogVisible = false;
      this.ruleForm.money = "";
      this.ruleForm.remarks = "";
      this.ruleForm.clients_user = "";
      this.yidong  = false;
      this.id = "";
    },
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.quiryList();
    },
    handleSizeChange(val) {
      this.size = val;
      this.quiryList();
    },
  },
};
</script>