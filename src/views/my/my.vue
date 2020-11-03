<style lang="less" scoped>
.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
.el-input--mini .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
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
.el-icon-circle-close {
  font-size: 40px;
}
.el-image {
  width: 60px;
  height: 60px;
}
.el-select {
  width: 100%;
}
.move-box {
  display: flex;
  flex-direction: column;
  width: 100%;
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
    margin: 10px 0;
    font-size: 14px;
  }
  .move-text {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dedede;
    .move-img-left {
      .van-image {
        width: 80px;
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
      .move-name {
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
.van-overlay {
  display: flex;
  justify-content: center;
  align-content: center;
  z-index: 1000;
}
@media screen and (max-width: 768px) {
  .el-form {
    min-width: 80% !important;
    background-color: #fff;
    height: max-content;
    padding: 20px 10px;
    margin: auto;
    z-index: 1000;
  }

  .v-modal {
    display: none !important;
    z-index: -1;
  }
}
</style>
<template>
  <div>
    <div class="min-width">
      <el-button type="primary" @click="addBtn()">添加银行</el-button>
      <el-table
        :data="Mydata"
        style="width: 100%"
        height="70vh"
        :row-key="getRowKeys"
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
        <el-table-column prop="bank" label="图片" min-width="120">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.bank_img"
              width="60px"
              height="60px"
              :preview-src-list="srcList"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="时间" min-width="120"> </el-table-column>
        <el-table-column prop="bank_rersonnel_name" label="银行人员名称" min-width="120">
        </el-table-column>
        <el-table-column prop="bank_name" label="银行相关名称" min-width="120">
        </el-table-column>
        <el-table-column prop="bank_rersonnel_phone" label="银行人员联系方式" min-width="160">
        </el-table-column>
         <el-table-column prop="bank_position" label="银行职位" min-width="120">
        </el-table-column>
        <el-table-column prop="staff_name" v-if="level == 1" label="负责人" min-width="160">
        </el-table-column>
        
        <el-table-column prop="deal_num" sortable label="成交笔数" min-width="120">
        </el-table-column>
        <el-table-column min-width="200"  fixed="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-popconfirm
             v-if="level == 1"
  confirmButtonText='确定'
  @onConfirm="delect(scope.row,scope.$index)"
  cancelButtonText='取消'
  icon="el-icon-info"
  iconColor="red"
  title="删除后，将删除全部自己菜单，确定要删除了吗？"
>
  <el-button slot="reference" type="text" size="small"
              >删除</el-button
            >
</el-popconfirm>
            
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >提交</el-button
            >
            <el-button type="text" size="small" @click="visit(scope.row)"
              >拜访</el-button
            >
            <el-button type="text" size="small" @click="see(scope.row)"
              >查看</el-button
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
        :total="count"
      >
      </el-pagination>
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
          <el-form-item prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择状态码">
              <el-option label="成交" value="1"></el-option>
              <el-option label="未成交" value="2"></el-option>
            </el-select>
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
      <div @click="addBtn()">
        <floatIng ref="componentref"></floatIng>
      </div>
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell v-for="(item, index) in Mydata" :key="index">
            <div class="move-box">
              <!-- 头部 -->
              <div class="move-title">
                <h3>{{ item.bank_rersonnel_name }}</h3>
                <p>{{ item.add_time }}</p>
              </div>
              <!-- 内容 -->
              <div class="move-text" @click="btn(item)">
                <!-- 左边图片 -->
                <div class="move-img-left">
                  <van-image :src="item.bank_img"> </van-image>
                </div>
                <!-- 内容 -->
                <div class="move-text-right">
                  <!-- 联系人 -->
                  <div class="move-name">
                    <div v-if="level == 1">{{ item.staff_name }}</div>
                    <div>{{ item.bank_name }}</div>
                    <span>{{item.bank_position}}</span>
                    <span>{{ item.bank_rersonnel_phone }}</span>
                    
                  </div>
                  <!-- 成交笔 -->
                  <div class="move-num">{{ item.deal_num }}</div>
                </div>
              </div>
              <!-- 提交按钮 -->
              <div class="move-btn">
                 <van-button
                  v-if="level == 1"
                  round
                  type="warning"
                  size="small"
                  @click="delect_Back(item,index)"
                  >删除</van-button
                >
                <van-button
                  round
                   style="margin: 0 0 0 10px"
                  type="danger"
                  size="small"
                  @click="handleClick2(item)"
                  >提交</van-button
                >
                <van-button
                  style="margin: 0 10px"
                  type="primary"
                  round
                  size="small"
                  @click="visit(item)"
                  >拜访</van-button
                >
                <van-button round size="small" @click="see(item)" type="info"
                  >查看</van-button
                >
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-pull-refresh>
      <van-overlay :show="show">
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
          <el-form-item prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择状态码">
              <el-option label="成交" value="1"></el-option>
              <el-option label="未成交" value="2"></el-option>
            </el-select>
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
      </van-overlay>
    </div>
  </div>
</template>
<script>
import { Toast ,Dialog} from "vant";
import floatIng from "../float/float";
export default {
  components: {
    floatIng,
  },
  data() {
    return {
      count: "",
      show: false,
      error: false,
      level: 1,
      loading: false,
      finished: false,
      isLoading: false,
      srcList: [],
      expands: [], //只展开一行放入当前行id
      getRowKeys(row) {
        //设置row-key只展示一行
        return row.id;
      },
      Mydata: [],
      id: "",
      search: "",
      dialogVisible: false,
      type: "",
      child: "",
      page: 1,
      size: 10,
      ruleForm: {
        money: "",
        remarks: "",
        clients_user: "",
        region: "",
      },
      rules: {
        money: [{ required: true, message: "请输入成交金额", trigger: "blur" }],
        region: [
          { required: true, message: "请选择状态码", trigger: "change" },
        ],
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
    // 获取初始数据
    this.srcList = [];
    this.my_data();
    this.level = localStorage.getItem("level");
  },
  methods: {
    // 添加渠道跳转页面
    visit(e) {
      console.log(e);
      this.$router.push({
        path: "/visit",
        query: { itemData: e.id, itemData2: e.type },
      });
    },
    see(e) {
      this.$router.push({
        path: "/see_visit",
        query: { itemData: e.id, itemData2: e.type },
      });
    },
    btn(e) {
      this.$router.push({
        name: "see_my",
        params: {
          item: e,
        },
      });
    },
    // 加载更多
    onLoad() {
      this.page++;
      this.size = 10;
      this.my_data(2);
    },
    addBtn() {
      this.$router.push("my_bank");
    },
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.page = 1;
        this.size = 10;
        this.srcList = [];
        this.my_data();
      }, 1000);
    },
    //获取列表数据
    my_data(e) {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
        page: this.page,
        size: this.size,
      };
      this.fetchGet("/listStaffBank", data).then((res) => {
        if (res.data.code == 0) {
          this.loading = false;
          if (res.data.data.length == 0) {
            this.finished = true;
            return;
          }
          this.Mydata = res.data.data;
          if (e == 2) {
            this.Mydata = this.Mydata.concat(res.data.data);
          }
          this.count = res.data.count;
          //    获取成功
          const ArrayList = this.Mydata;
          this.isLoading = false;
          ArrayList.forEach((item) => {
            this.srcList.push(item.bank_img);
          });
        }
      });
    },
    // 点击提交按钮
    handleClick(e) {
      console.log(e);
      this.id = e.id;
      this.type = e.type;
      this.dialogVisible = true;
      this.show = true;
    },
    handleClick2(e) {
      console.log(e);
      this.id = e.id;
      this.type = e.type;
      this.show = true;
    },
    handleClose(done) {
      this.dialogVisible = false;
      this.ruleForm.money = "";
      this.ruleForm.clients_user = "";
      this.ruleForm.remarks = "";
    },
    // 点击取消按钮
    clonequ() {
      this.dialogVisible = false;
      this.ruleForm.money = "";
      this.ruleForm.remarks = "";
      this.ruleForm.clients_user = "";
      this.show = false;
    },
    // 点击展开
    expandChange(row, expandedRows) {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
        type: row.type,
        id: row.id,
      };
      if (expandedRows.length) {
        //说明展开了
        this.expands = [];
        if (row) {
          this.expands.push(row.id); //只展开当前行id
        }
      } else {
        //说明收起了
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
    // 分页
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.my_data();
    },
    handleSizeChange(val) {
      this.size = val;
      this.my_data();
    },

    // 删除
    delect_Back(e,i){
      Dialog.confirm({
    title: '标题',
    message: '删除后，将删除全部自己菜单，确定要删除了吗?',
    })
  .then(() => {
    this.delect(e,i)
    // on confirm
  })
  .catch(() => {
    console.log("213123123")
    // on cancel
  });
    },
    // s删除
    delect(e,i){
      console.log(e)
      const data = {
            api_token: localStorage.getItem("tokenlo"),
            type: 1,
            id:e.id
          };
          this.fetchGet("/delStaffBankChannel", data).then((res) => {
            if (res.data.code == 0) {
              this.Mydata.splice(i,1)
              //    获取成功
            } else {

            }
          });
     
    },
    // 提交按钮
    determine(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            type: this.type,
            id: this.id,
            status: this.ruleForm.region,
            remarks: this.ruleForm.remarks,
            money: this.ruleForm.money,
            clients_user: this.ruleForm.clients_user,
          };
          this.fetchGet("/staffDeal", data).then((res) => {
            if (res.data.code == 0) {
              this.$router.go(0);
              this.dialogVisible = false;
              this.ruleForm.money = "";
              this.ruleForm.clients_user = "";
              this.ruleForm.remarks = "";
              this.show = false;
              //    获取成功
            } else {
            }
          });
        } else {
        }
      });
    },
  },
};
</script>