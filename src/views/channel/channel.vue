<style lang="less" scoped>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  div {
    button {
      color: #409eff;
    }
  }
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
.el-pagination {
  margin-top: 30px;
}

.block {
  color: #070707;
}
.red {
  color: red !important;
}
// 移动端盒子
.van-cell {
  margin: 10px 0;
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
.el-select-dropdown {
  z-index: 99999 !important;
}
@media screen and (max-width: 768px) {
  .el-select {
    margin-bottom: 21px;
    width: 100%;
  }

  .v-modal {
    display: none !important;
  }
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
        :row-key="getRowKeys"
        :expand-row-keys="expands"
        @expand-change="expandChange"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div
              class="list"
              v-for="(item, index) in child"
              :class="item.status == 1 ? 'block' : 'red'"
            >
              <div>
                <p><span>成交金额:</span>{{ item.money }}</p>
                <p><span>时间:</span>{{ item.addtime }}</p>
                <p><span>成交备注:</span>{{ item.remarks }}</p>
                <p v-if="!iptshow">12321222</p>
              </div>
              <div v-if="item.status == 2">
                <el-button type="text" @click="dblclick(item, index)"
                  >提交</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="图片" min-width="160">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.channel_img"
              width="6px"
              height="60px"
              :preview-src-list="srcList"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="时间" min-width="120">
        </el-table-column>
        <el-table-column prop="channel_name" label="渠道名称" min-width="120">
        </el-table-column>
        <el-table-column
          prop="channel_position"
          label="联系人职位"
          min-width="180"
        >
        </el-table-column>

        <el-table-column prop="company_scale" label="公司规模" min-width="180">
        </el-table-column>
        <el-table-column label="公司性质" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.company_nature == 1 ? "电销" : "行销" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="channel_phone"
          label="联系人电话"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          prop="channel_user_name"
          label="渠道联系人"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="负责人"
          min-width="120"
          v-if="level == 1"
        >
        </el-table-column>
        <el-table-column
          prop="deal_num"
          sortable
          label="成交笔"
          min-width="120"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" min-width="200">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >提交</el-button
            >
             <el-popconfirm v-if="level == 1"
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
            <el-button
              type="text"
              size="small"
              style="margin 0 10px"
              @click="visit(scope.row)"
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
    </div>

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
        <el-form-item prop="user_phone">
          <el-input
            v-model="ruleForm.user_phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="region">
          <el-select
            v-model="ruleForm.region"
            style="width: 100%"
            placeholder="请选择状态码"
          >
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
    <!-- 模态框 -->
    <el-dialog
      :visible.sync="dialogVisible2"
      :before-close="handleClose"
      width="40%"
    >
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2">
        <el-form-item prop="clients_user2">
          <el-input
            v-model="ruleForm2.clients_user2"
            placeholder="请输入客户姓名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="money2">
          <el-input
            v-model="ruleForm2.money2"
            placeholder="请输入成交金额"
          ></el-input>
        </el-form-item>
        <el-form-item prop="user_phone2">
          <el-input
            v-model="ruleForm2.user_phone2"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="remarks2">
          <el-input
            v-model="ruleForm2.remarks2"
            type="textarea"
            placeholder="请输入成交备注"
          ></el-input>
        </el-form-item>

        <el-form-item class="btn">
          <el-button @click="clonequ">取 消</el-button>
          <el-button type="primary" @click="determine2('ruleForm2')"
            >确 定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 移动端 -->
    <div class="max-width">
      <!-- 模态框 -->
      <van-overlay :show="dialogVisible">
        <div class="wrapper">
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
            <el-form-item prop="user_phone">
              <el-input
                v-model="ruleForm.user_phone"
                placeholder="请输入手机号"
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
        </div>
      </van-overlay>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onloadlist"
        >
          <van-cell v-for="(item, i) in channelData" :key="i">
            <div class="move-box">
              <!-- 头部 -->
              <div class="move-title">
                <h3>{{ item.channel_name }}</h3>
                <p>
                  {{ item.add_time }}
                </p>
              </div>
              <!-- 内容 -->
              <div class="move-text" @click="btn(item)">
                <!-- 左边图片 -->
                <div class="move-img-left">
                  <van-image :src="item.channel_img"> </van-image>
                </div>
                <!-- 内容 -->
                <div class="move-text-right">
                  <!-- 联系人 -->
                  <div class="move-name">
                    <span>{{ item.channel_user_name }}</span>
                    <span>{{ item.channel_position }}</span>
                    <span>{{ item.channel_phone }}</span>
                  </div>
                  <div class="move-name">
                    <span v-if="level == 1">{{ item.staff_name }}</span>
                    <span>{{
                      item.company_nature == 1 ? "电销" : "行销"
                    }}</span>
                    <span>{{ item.company_scale }}</span>
                  </div>
                  <!-- 成交笔 -->
                  <div class="move-num">
                    {{ item.deal_num }}
                  </div>
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
                style="margin: 0 0 0 10px"
                  round
                  type="danger"
                  size="small"
                  @click="handleClick(item)"
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
      <!-- 浮动按钮 -->
      <div @click="addBtn()">
        <floatIng ref="componentref"></floatIng>
      </div>

      <!-- 移动端展示 -->
    </div>
  </div>
</template>
<script>
import { Toast ,Dialog} from "vant";
import floatIng from "../float/float";
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
export default {
  components: {
    floatIng,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      dialogVisible2: false,
      level: "1",
      refreshing: false,
      expands: [], //只展开一行放入当前行id
      isLoading: false,
      getRowKeys(row) {
        //设置row-key只展示一行
        return row.id;
      },
      count: 0,
      channelData: "",
      child: "",
      dialogVisible: false,
      type: "",
      id: "",
      iptshow: "fasle",
      page: 1,
      size: 10,
      srcList: [],
      ruleForm: {
        money: "",
        remarks: "",
        clients_user: "",
        region: "",
        user_phone: "",
      },
      ruleForm2: {
        money2: "",
        remarks2: "",
        clients_user2: "",
        user_phone2: "",
      },
      id2: "",
      rules: {
        user_phone: [
          { required: true, validator: checkPhone, trigger: "blur" },
        ],
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
      rules2: {
        user_phone2: [
          { required: true, validator: checkPhone, trigger: "blur" },
        ],
        region2: [
          { required: true, message: "请选择状态码", trigger: "change" },
        ],
        money2: [
          { required: true, message: "请输入成交金额", trigger: "blur" },
        ],
        clients_user2: [
          { required: true, message: "请输入客户姓名", trigger: "blur" },
        ],
        remarks2: [
          { required: true, message: "请输入成交备注", trigger: "blur" },
        ],
      },
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.DataList();
    this.level = localStorage.getItem("level");
    console.log(this.level);
  },
  methods: {
    dblclick(e, i) {
      console.log(e);
      this.dialogVisible2 = true;
      this.id2 = e.id;
      this.ruleForm2.money2 = e.money;
      this.ruleForm2.clients_user2 = e.clients_user;
      this.ruleForm2.remarks2 = e.remarks;
      this.ruleForm2.user_phone2 = e.user_phone;
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
      const data = {
            api_token: localStorage.getItem("tokenlo"),
            type: 2,
            id:e.id
          };
          this.fetchGet("/delStaffBankChannel", data).then((res) => {
            if (res.data.code == 0) {
               this.channelData.splice(i,1)
              //    获取成功
            } else {

            }
          });
     
    },
    // 点击拜访
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
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.page = 1;
        this.DataList();
      }, 1000);
    },

    // 上拉加载

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
    DataList(e) {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
        page: this.page,
        size: this.size,
      };
      this.fetchGet("/listStaffChannel", data).then((res) => {
        if (res.data.code == 0) {
          if (e == 2) {
            this.refreshing = false;
            this.loading = false;

            if (res.data.data.length == 0) {
              this.finished = true;
            } else {
              this.channelData = this.channelData.concat(res.data.data);
              this.finished = false;
            }
            return;
          }
          //    获取成功
          this.refreshing = false;
          this.loading = false;
          this.channelData = res.data.data;
          const ArrayList = this.channelData;
          this.count = res.data.count;
          ArrayList.forEach((item) => {
            this.srcList.push(item.channel_img);
          });
        }
      });
    },
    // 添加渠道跳转页面
    addBtn() {
      this.$router.push("add_channel");
    },

    btn(e) {
      this.$router.push({
        name: "see",
        params: {
          item: e,
        },
      });
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
      this.dialogVisible2 = false;
      this.ruleForm.money = "";
      this.ruleForm.remarks = "";
      this.ruleForm.clients_user = "";
      this.ruleForm2.money2 = "";
      this.ruleForm2.remarks2 = "";
      this.ruleForm2.clients_user2 = "";
      this.id2 = "";
      this.ruleForm2.user_phone2 = "";
    },
    // 点击取消按钮
    clonequ() {
      this.dialogVisible = false;
      this.dialogVisible2 = false;
      this.ruleForm.money = "";
      this.ruleForm.remarks = "";
      this.ruleForm.clients_user = "";
      this.ruleForm2.money2 = "";
      this.ruleForm2.remarks2 = "";
      this.ruleForm2.clients_user2 = "";
      this.id2 = "";
      this.ruleForm.region = "";
      this.ruleForm.region2 = "";
      this.ruleForm.user_phone = "";
    },
    determine2(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          const data = {
            api_token: localStorage.getItem("tokenlo"),
            id: this.id2,
            remarks: this.ruleForm2.remarks2,
            money: this.ruleForm2.money2,
            clients_user: this.ruleForm2.clients_user2,
            user_phone: this.ruleForm2.user_phone2,
          };
          this.fetchGet("/editDeal", data).then((res) => {
            if (res.data.code == 0) {
              this.$router.go(0);
              this.dialogVisible2 = false;
              this.ruleForm2.money2 = "";
              this.ruleForm2.remarks2 = "";
              this.ruleForm2.clients_user2 = "";
              this.ruleForm.region = "";
              this.ruleForm.region2 = "";
              this, (this.ruleForm2.user_phone2 = "");
              //    获取成功
            } else {
            }
          });
        } else {
        }
      });
    },
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
            user_phone: this.ruleForm.user_phone,
          };
          this.fetchGet("/staffDeal", data).then((res) => {
            if (res.data.code == 0) {
              this.$router.go(0);
              this.dialogVisible = false;
              this.ruleForm.money = "";
              this.ruleForm.remarks = "";
              this.ruleForm.clients_user = "";
              this.ruleForm.region = "";
              this.ruleForm.region2 = "";
              this.ruleForm.user_phone = "";
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

    // 分页
    // 分页
    handleCurrentChange(val) {
      this.page = val;
      this.DataList();
    },
    handleSizeChange(val) {
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