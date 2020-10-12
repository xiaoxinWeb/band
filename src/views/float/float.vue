<style lang="less">
      // 浮动按钮
    .floating {
            width: 50px;
            height: 50px;
            background-color: rgb(86, 119, 252);
            color: #fff;
            position: fixed;
            right: 20px;
            border-radius: 50%;
            bottom: 10%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99;
            
    }
    .floating i {
        font-size: 28px;
        font-weight: 600;
    }

</style>
<template>
    <div>
         <div class="floating">
         <i class="el-icon-plus"></i>
     </div>
    </div>
</template>
<script>
export default {
    methods:{
      
    }
}
</script>