<style lang="less" scoped>
    .top-btn {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
    .el-date-editor{
        margin: 0 20px;
    }
    }
  
    .blue {
        color: red;
    }
</style>

<template>
    <div>
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
      placeholder="选择开始日期">
    </el-date-picker>
     <el-date-picker
      v-model="endTime"
      type="date"
      placeholder="选择结束日期">
    </el-date-picker>
    <el-button type="primary" icon="el-icon-search" @click="primary">搜索</el-button>
            </div>
             <el-table
              height="70vh"
      :data="DataList"
      style="width: 100%">
      <el-table-column
        label="银行名称"
        width="300">
        <template slot-scope="scope">
              <div>
                  {{scope.row.channel_name== undefined?scope.row.bank_name:scope.row.channel_name}}
                  </div>
               
      </template>
      </el-table-column>
      <el-table-column
        prop="clients_user"
        label="客户姓名"
        width="300">
      </el-table-column>
      <el-table-column
        prop="money"
        label="成交金额">
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="成交备注">
      </el-table-column>
       <el-table-column
        prop="add_time"
        label="成交时间">
      </el-table-column>
        <el-table-column
        label="状态">
          <template slot-scope="scope">
              <div :class="scope.row.status==1?'red':'blue'">
                  {{scope.row.status== 1?'成交':'未成交'}}
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
      :total="300">
    </el-pagination>
    
    </div>
</template>
<script>
export default {
data(){
    return{
        startTime:"",
        endTime:"",
        page:1,
        size:10,
        DataList:"",
        value_type:""
    }

},
mounted(){
// 获取数据
    this.quiryList()
},
methods:{
    // 获取数据
    quiryList(){
        const data = {
             api_token: localStorage.getItem("tokenlo"),
             page:this.page,
             size:this.size,
             startTime:this.startTime,
             endTime:this.endTime,
             type:this.value_type
        }
             this.fetchGet("/listDeal", data).then((res) => {
        if (res.data.code == 0) {
               this.DataList = res.data.data
               this.DataList.forEach(element => {
                  console.log(element.channel_name)
               });
                }
             });
    },
    // 搜索
    primary(){
        this.quiryList();
    },
      // 分页
    handleCurrentChange(val){
      this.page = val;
      this.quiryList();
    },
    handleSizeChange(val){
      this.size = val;
      this.quiryList();
    },
    
}
}
</script>