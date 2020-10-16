<style lang="less">
   .list-see {
       display: flex;
       flex-direction: row;
       justify-content: space-between;
       .see-text {
           width: 50%;
           display: flex;
           flex-direction: row;
           h3{
               width: 80px;
               text-align: left;
           }
       }
   }
   .zanwu {
       display: flex;
       justify-content: center;
       align-items: center;
       width: 100%;
       height: calc(100vh - 70px);
   }
</style>
<template>
    <div>
         <van-cell 
         v-for="(item, i) in DataList" :key="i" v-if="DataList.length != 0">
         <div class="list-see">
             <div class="see-text">
                 <h3>姓名:</h3>{{item.clients_user}}
             </div>
              <div class="see-text">
                 <h3>时间:</h3>{{item.addtime}}
             </div>
             
         </div>
          <div class="list-see">
             <div class="see-text">
                 <h3>成交金额:</h3>{{item.money}}
             </div>
              <div class="see-text">
                 <h3>成交备注:</h3>{{item.remarks}}
             </div>
             
         </div>
         </van-cell>
        <div class="zanwu" v-if="DataList.length == 0">
            暂无数据
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
                list:"",
                DataList:"",
        }
    },
    mounted(){
        // 获取点击的数据
        this.list = this.$route.params.item
        // 获取数据
        this.seeData();
    },
    methods:{
        seeData(){
            const data = {
        api_token: localStorage.getItem("tokenlo"),
        type: this.list.type,
        id: this.list.id,
            }
            this.fetchGet("/listStaffDeal", data).then((res) => {
        if (res.data.code == 0) {
          console.log(res);
          //    获取成功
          this.DataList = res.data.data;
          console.log(this.DataList.length)
        }
      });
        }
    }
}
</script>