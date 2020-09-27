<style lang="less" scoped>

    .logo {
        color: #fff;
        line-height: 60px;
        font-size: 28px;
        margin-left: 30px;  
        float: left;       
    }
   .right-logo {
       color: #fff;
   }
   .right-termain {
        position: absolute;
       right: 10px;
       color: #fff;
       z-index:99;
       line-height: 60px;
       i{
           font-size: 28px;
           line-height: 60px;
           cursor: pointer;
       }
   }
    
    .right-show {
        display: block !important;
    }
      
      .el-menu-demo  {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 61px);
      }
</style>
<template>

    <div>
        <!-- logo -->
        <!-- -->
        <!-- pc端菜单 -->
        <div class="right-logo all" :class="!show?'right-show':''" v-show="show">
            <el-menu 
  :default-active="activeIndex"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#000"
  text-color="#fff"
  :router="true"
  active-text-color="#ffd04b">
  <el-menu-item index="/staff">员工列表</el-menu-item>
  <el-menu-item index="/channel">获客渠道</el-menu-item>
  <el-menu-item index="3">查看所有银行</el-menu-item>
  <el-menu-item index="/my">我的银行</el-menu-item>
</el-menu>
        </div>
        <!-- 移动端菜单 -->
        <div class="right-termain hidden-sm-and-up">
            <i class="el-icon-s-unfold" @click="show = !show"></i>
        </div>
           
    </div>
</template>
<script>
export default {
    data() {
      return {
          show:true,
        activeIndex: '/staff',
      };
      
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

    }
  }
</script>