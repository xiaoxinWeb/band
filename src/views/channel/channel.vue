<style lang="less"> 
.el-image {
  width: 60px;
  height: 60px;
}
.el-pagination {
  display: flex;
  justify-content: center;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.neirong {
  display: flex;
  flex-direction: column;
  .el-form-item__label {
    font-weight: 600;
  }
}

.list {
  border-bottom: 1px solid #d7d7d7;
}
.list p {
  line-height: 40px;
  display: flex;
  flex-direction: row;
  span {
    width: 80px;
    text-align: left;
    display: block;
    font-weight: 600;
  }
}
.el-image-viewer__close {
  color: #fff;
}
.el-icon-circle-close{
  font-size: 40px;
}
.el-pagination {
  margin-top: 30px;
}


// 移动端盒子
.van-cell {
  margin: 10px 0;
}
.move-box {
  display: flex;
  flex-direction: column;
  width:100%;
  .move-title {
    display: flex;
    justify-content: space-between;
    h3 {
      font-weight: 600;
      font-size: 16px;
    }
  }
  .move-btn {
    display: flex;
    justify-content: flex-end;
    margin:10px 0;
    font-size: 14px;
  }
  .move-text {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dedede;
    .move-img-left {
        .van-image  {
          width:80px;
          height: 80px;
        }
    }
    .move-text-right {
      display: flex;
      flex-direction: row;
      width: 100%;
      margin-left: 10px;
      align-items: center;
      justify-content: space-between;
      .move-name{
        display: flex;
        flex-direction: column;
        span {
          line-height: 30px;
        }
        .move-num {
          font-weight: 600;
        }
      }
    }
  }
}

// 移动端模态框
.van-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding-top: 20px;
}
.wrapper {
  background-color: #fff;
  width: 80%;
    padding: 20px;
}
</style>
<template>
  <div>
    <!-- pc端  -->
    <div class="min-width">
      <!-- 添加渠道 -->
      <el-button type="primary" @click="addBtn()">添加渠道</el-button>
      <el-table
        :data="channelData"
        tooltip-effect="dark"
        style="width: 100%"
        height="70vh"
        :row-key='getRowKeys'
      :expand-row-keys="expands"
        @expand-change="expandChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div class="list" v-for="item in child">
              <p><span>成交金额:</span>{{ item.money }}</p>
              <p><span>时间:</span>{{ item.addtime }}</p>
              <p><span>成交备注:</span>{{ item.remarks }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="160">
          <template slot-scope="scope">
            <el-image :src="scope.row.channel_img" width="6px" height="60px" :preview-src-list="srcList">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="时间" min-width="120"> </el-table-column>
        <el-table-column prop="channel_name" label="渠道名称" min-width="120">
        </el-table-column>
        <el-table-column prop="channel_position" label="联系人职位" min-width="180">
        </el-table-column>
        <el-table-column prop="channel_phone" label="联系人电话" min-width="180">
        </el-table-column>
        <el-table-column prop="channel_user_name" label="渠道联系人" min-width="120">
        </el-table-column>
        <el-table-column prop="deal_num" sortable label="成交笔" min-width="120">
          
        </el-table-column>
        <el-table-column fixed="right" label="操作"  min-width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >提交</el-button
            >
          </template>
        </el-table-column>
      </el-table>
         <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="count">
    </el-pagination>
    </div>

    <!-- 模态框 -->
    <el-dialog
      title="提交信息"
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
    <!-- 移动端 -->
    <div class="max-width"> 
    
        <!-- 模态框 -->
        <van-overlay :show="dialogVisible" >
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
  <van-pull-refresh v-model="refreshing"  @refresh="onRefresh">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onloadlist"
  >

    <van-cell 
    v-for="(item, i) in channelData" :key="i">
            <div class="move-box">
              <!-- 头部 -->
              <div class="move-title">
                <h3>{{item.channel_name}}</h3>
                <p>
                  {{item.add_time}}
                  </p>
                </div>
                <!-- 内容 -->
                <div class="move-text"  @click="btn(item)">
                  <!-- 左边图片 -->
                  <div class="move-img-left">
                    <van-image :src="item.channel_img" >
                </van-image>
                  </div>
                  <!-- 内容 -->
                  <div class="move-text-right">
                    <!-- 联系人 -->
                    <div class="move-name">
                      <span>{{item.channel_user_name}}</span>
                      <span>{{item.channel_position}}</span>
                      <span>{{item.channel_phone}}</span>
                    </div>
                    <!-- 成交笔 -->
                    <div class="move-num">
                      {{item.deal_num}}
                      </div>
                  </div>
                </div>
                <!-- 提交按钮 -->
                <div class="move-btn">
                  <van-button round type="danger" size="small" @click="handleClick(item)">提交</van-button>
                  </div>
              </div>

      </van-cell>
  </van-list>
</van-pull-refresh>
      <!-- 浮动按钮 -->
      <div @click="addBtn()">
        <floatIng ref="componentref"></floatIng>
      </div>

      <!-- 移动端展示 -->
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
       list: [],
      loading: false,
      finished: false,
      refreshing: false,
          expands: [], //只展开一行放入当前行id
          isLoading:false,
          getRowKeys (row) { //设置row-key只展示一行
            return row.id
          },
      count:0,
      channelData: "",
      child: "",
      dialogVisible: false,
      type: "",
      id: "",
      page:1,
      size:10,
      srcList:[],
      ruleForm: {
        money: "",
        remarks: "",
        clients_user: "",
      },
      rules: {
        money: [{ required: true, message: "请输入成交金额", trigger: "blur" }],
        clients_user: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
        ],
        remarks: [
          { required: true, message: "请输入成交备注", trigger: "blur" },
        ],
      },
      loading:false,
      finished:false
    };
  },
  mounted() {
    this.DataList();
  },
  methods: {
// 下拉刷新
onRefresh(){
     setTimeout(() => {
        
        this.page = 1;
        this.DataList();
      }, 1000);
},

// 上拉加载


    // 点击展开
    expandChange(row,expandedRows) {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
        type: row.type,
        id: row.id,
          };
        if (expandedRows.length) {//说明展开了
        this.expands = [];
        if (row) {
            this.expands.push(row.id);//只展开当前行id
        }
          } else {//说明收起了
        this.expands = [];
          }
      this.fetchGet("/listStaffDeal", data).then((res) => {
        if (res.data.code == 0) {
          console.log(res);
          //    获取成功
          this.child = res.data.data;
        }
      });
    },
    DataList(e) {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
        page: this.page,
        size: this.size,
      };
      this.fetchGet("/listStaffChannel", data).then((res) => {
        if (res.data.code == 0) {
          if(e == 2){
               this.refreshing = false;
          this.loading = false;

          if(res.data.data.length == 0){
              this.finished = true;
          }else {
          this.channelData = this.channelData.concat(res.data.data);
           this.finished = false;
          }
            return 
          }
          //    获取成功
          this.refreshing = false;
          this.loading = false;
          this.channelData = res.data.data;
          const ArrayList= this.channelData
          this.count = res.data.count
          ArrayList.forEach(item => {
            this.srcList.push(item.channel_img)
          });
          
          
        }
      });
    },
    // 添加渠道跳转页面
    addBtn() {
      this.$router.push("add_channel");
    },

    btn(e){
      this.$router.push({name:'see',params:{
          item:e
      }});
    },

    // 点击提交按钮
    handleClick(e) {
      console.log(e);
      this.id = e.id;
      this.type = e.type;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.ruleForm.money = "";
              this.ruleForm.remarks = "";
              this.ruleForm.clients_user = ""
    },
    // 点击取消按钮
    clonequ(){
this.dialogVisible = false;
 this.ruleForm.money = "";
  this.ruleForm.remarks = "";
   this.ruleForm.clients_user = ""
    },
    determine(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            type: this.type,
            id: this.id,
            remarks: this.ruleForm.remarks,
            money: this.ruleForm.money,
            clients_user: this.ruleForm.clients_user,
          };
          this.fetchGet("/staffDeal", data).then((res) => {
            if (res.data.code == 0) {
              Toast(res.data.message);
              this.dialogVisible = false;
              this.ruleForm.money = "";
              this.ruleForm.remarks = "";
              this.ruleForm.clients_user = ""
              //    获取成功
            } else {
              Toast(res.data.message);
              this.dialogVisible = true;
            }
          });
        } else {
        }
      });
    },

    // 分页
      // 分页
    handleCurrentChange(val){
      this.page = val;
      this.DataList();
    },
    handleSizeChange(val){
      this.size = val;
      this.DataList();
    },
    
     onloadlist() {
        this.page++;
      this.DataList(2);
    },
  },
};
</script>