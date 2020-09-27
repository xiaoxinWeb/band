<style lang="less">
  
    .staffList {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .van-cell {
        display: block;
        margin: 10px 0;
    }
    .staffLeft {
        text-align: left;
    }
    .van-cell__title {
        font-weight: 600;
    }
    .delect {
        color: red;
    }
    .el-pagination {
        margin-top: 20px;
        text-align: center;
    }
</style>
<template>
    <div>
        <!-- 按钮显示添加用户 -->
        <div class="min-width">
            <el-button  type="primary" @click="addBtn()">添加用户</el-button>
      <!-- pc端表格显示用户 -->
       <el-table
      :data="staffData"
      style="width: 100%"
      >
      <el-table-column
        prop="num"
        label="员工账号"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="员工姓名"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="员工手机号">
      </el-table-column>
      <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
        <el-button
        class="delect"
          @click="delect(scope.$index,scope.row,staffData)"
          type="text"
          size="small">
          删除
        </el-button>
      </template>
    </el-table-column>
     </el-table>
   <el-pagination
  background
  layout="prev, pager, next"
  :total="staffData.length">
</el-pagination>
  </div>
     <!-- 移动端联系人 -->
     <div class="max-width">
         <!-- 浮动按钮 -->
         <div @click="addBtn2()">
          <floatIng ref="componentref"></floatIng>
          </div>
         <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
         <van-list
  :finished="finished"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  finished-text="没有更多了"
>
  <van-cell v-for="(item,i) in staffData" :key="i"   :title="item.name">
      <div class="staffList">
          <!-- 左边 -->
          <div class="staffLeft">
              <div class="staffNum">{{item.num}}</div>
              <div class="staffPhone">{{item.phone}}</div>
          </div>
          <!-- 右边删除 -->
          <div class="staffRight">
              <div class="delect" @click="delect(item.id,i)">删除</div>
          </div>
      </div>
  </van-cell>
   
</van-list>
  </van-pull-refresh>
<!-- 上拉刷新 -->


     </div>
    </div>
</template>
<script>
import { Toast } from 'vant';
import floatIng from '../float/float'
export default {
    components:{
floatIng
    },
    data(){
        return{
            isLoading:false,
            staffData:[
                {
                    id:"1",
                    num:"admin",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"5",
                    num:"admin4",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"5",
                    num:"admin4",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"5",
                    num:"admin4",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"5",
                    num:"admin4",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"5",
                    num:"admin4",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"5",
                    num:"admin4",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"5",
                    num:"admin4",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"5",
                    num:"admin4",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"41",
                    num:"admi1n",
                    name:"管理员",
                    phone:"13233208961"
                },{
                    id:"3",
                    num:"admin2",
                    name:"管理员",
                    phone:"13233208961"
                },
                {
                    id:"2",
                    num:"admin3",
                    name:"管理员",
                    phone:"13233208961"
                }
            ],
            finished:false,
            error:false
        }
    },
    methods:{
        delect(e,index){
            // 静态删除
            this.staffData.splice(index,1)
             Toast('删除成功');
             this.staffData = this.staffData
            console.log(e,index);
           
        },
        // 上拉刷新
         onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        console.log(1233)
      }, 1000);
    },
    // 添加用户
    addBtn(){
        // 添加增加页面
         this.$router.push('add');
    },
    addBtn2(){
        console.log(123)
        this.$refs.componentref.addBtn("12323");
    }
    }
}
</script>