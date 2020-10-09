<style lang="less">
    
</style>
<template>
    <div>
        <!-- pc端  -->
        <div class="min-width">
            <!-- 添加渠道 -->
             <el-button  type="primary" @click="addBtn()">添加渠道</el-button>
               <el-table
      :data ="channelData"
      style="width: 100%"
      >
       <el-table-column
        label="图片">
        <template slot-scope="scope">
          <el-image :src="scope.row.channel_img" width="100px" height="100px">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="channel_name"
        label="渠道名称"
        >
      </el-table-column>
      <el-table-column
        prop="channel_position"
        label="联系人职位"
        >
      </el-table-column>
      <el-table-column
        prop="channel_phone"
        label="联系人电话">
      </el-table-column>
       <el-table-column
        prop="channel_user_name"
        label="渠道联系人">
      </el-table-column>
      <el-table-column
      label="成交笔"
      >
      <template slot-scope="scope">
           <el-button type="text">{{scope.row.deal_num}}</el-button>
      </template>
    </el-table-column>
     </el-table>
   <el-pagination
  background
  layout="prev, pager, next"
  :total="channelData.length">
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
            channelData:""
        }
    },
    mounted(){
        this.DataList();
    },
    methods:{
        DataList(){
          const data = {
             api_token:localStorage.getItem("tokenlo"),
                page:1,
                size:10
          }
          this.fetchGet('/listStaffChannel',data).then(res=>{
               if(res.data.code == 0){
                //    获取成功
                this.channelData = res.data.data
               }
            })
        },
        // 添加渠道跳转页面
        addBtn(){
          this.$router.push('add_channel');
        },
    }
}
</script>