<style lang="less">
    
</style>
<template>
    <div>
        <!-- pc端  -->
        <div class="min-width">
            <!-- 添加渠道 -->
             <el-button  type="primary" @click="addBtn()">添加渠道</el-button>
               <el-table
      :data="staffData"
      style="width: 100%"
      >
       <el-table-column
        prop="img"
        label="图片">
      </el-table-column>
      <el-table-column
        prop="name"
        label="渠道名称"
        >
      </el-table-column>
      <el-table-column
        prop="position"
        label="联系人职位"
        >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系人电话">
      </el-table-column>
       <el-table-column
        prop="user_name"
        label="渠道联系人">
      </el-table-column>
      <el-table-column
      label="成交笔"
      >
      <template slot-scope="scope">
            {{scope.row.deal}}
      </template>
    </el-table-column>
     </el-table>
   <el-pagination
  background
  layout="prev, pager, next"
  :total="staffData.length">
</el-pagination>
        </div>
        <!-- 移动端 -->
        <div class="max-width">2</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            channelData:[
                    {
                    img:"",
                    name:"",
                    position:"",
                    phone:"",
                    user_name:"",
                    deal:""
                    },
            ]
        }
    }
}
</script>