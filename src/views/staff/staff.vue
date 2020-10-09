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
        prop="staff_num"
        label="员工账号"
        >
      </el-table-column>
      <el-table-column
        prop="staff_name"
        label="员工姓名"
        >
      </el-table-column>
      <el-table-column
        prop="staff_phone"
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
  :total="count"
 
  >
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
   @load="onLoad"
    :offset="10"
>
  <van-cell v-for="(item,i) in staffData" :key="i"   :title="item.staff_name">
      <div class="staffList">
          <!-- 左边 -->
          <div class="staffLeft">
              <div class="staffNum">{{item.staff_num}}</div>
              <div class="staffPhone">{{item.staff_phone}}</div>
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
            count:"",
            loading:false,
            isLoading:false,
            page:1,
            size:10,
            staffData:[
            ],
            finished:false,
            error:false
        }
    },
    mounted(){
        //获取列表数据
      this.tableList()
    },
    methods:{
      
        // 获取列表数据
        tableList(e){
            const data = {
                api_token:localStorage.getItem("tokenlo"),
                page:this.page,
                size:this.size
            }
            this.fetchGet('/liststaff',data).then(res=>{
               if(res.data.code == 0){
                //    获取成功
                this.count = res.data.count
                if(e == 2){
                this.staffData = this.staffData.concat(res.data.data);
                }else {
                  this.staffData = res.data.data
                }
               }
            })
        },
         // 上拉加载更多
    onLoad(){
      this.page++;
     this.tableList(2);
    },
        delect(index,e){
            
            // 静态删除
            const data = {
                 api_token:localStorage.getItem("tokenlo"),
                 id:e.id
            }
            this.fetDelect('/delstaff',data).then(res=>{
                console.log(res)
            //     this.staffData.splice(index,1)
            //  Toast('删除成功');
            //  this.staffData = this.staffData
            // console.log(e,index);
            })
            
           
        },
        // 上拉刷新
         onRefresh() {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
        this.page = 1;
        this.tableList();
      }, 1000);
    },

    // 添加用户
    addBtn(){
        // 添加增加页面
         this.$router.push('add');
    },
    addBtn2(){
        this.$refs.componentref.addBtn("12323");
    },

    },
}
</script>