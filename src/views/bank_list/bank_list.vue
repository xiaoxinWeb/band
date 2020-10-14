
<style lang="less">
    .icon-text {
        margin-left: 30px;
    }
</style>
<template>
    <div>
  <div class="custom-tree-container">
  <div class="block">
    
    <el-tree
      :data="dataList"
      >
      <span class="custom-tree-node" slot-scope="{ node, dataList }">
        <span>{{dataList }}</span>
        <span class="icon-text">
         <i class="el-icon-plus" @click="add(dataList)"></i>
          <i class="el-icon-delete" @click="remove(node,dataList)"></i>
        </span>
      </span>
    </el-tree>
  </div>
</div>
</div>
</template>
<script>
 let id = 1000;

  export default {
    data() {
      return {
        dataList: '',
      }
    },
    mounted(){
        // 获取数据
        this.Listdata();
    },
    methods: {

        // 获取数据
        Listdata(){
            const data = {
                api_token: localStorage.getItem("tokenlo"),
                page:1,
                size:10
            }
                 this.fetchGet("/listBank", data).then((res) => {
        if (res.data.code == 0) {
                this.dataList = JSON.parse(JSON.stringify(res.data.data))
                }
             });
        },

        // 添加 
        add(data){
            const childList = {
                id:'2',
                label:"课程2",
                children:[]
            }
            if(!data.children){
                this.$set(data, 'children', []);
            }
            data.children.push(childList)
        },
        // 删除 
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
    }
  };
</script>