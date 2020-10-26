<style lang="less" scoped>
.el-header {
  padding: 0;
  background-color: #000;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.logo {
  color: #fff;
  line-height: 60px;
  font-size: 28px;
  float: left;
  img {
    height: 60px;
  }
}
.el-main {
  width: 100%;
  overflow: hidden;
  padding: 10px;
}
.box-conter {
  display: flex;
  flex-direction: row;
}
</style>
<template>
  <div>
    <el-container>
      <!-- 页面布局 -->

      <!--  -->
      <el-header>
        <!-- <Header /> -->
        <div class="logo">
          <img src="../assets/img/logo.png" />
        </div>
      </el-header>
      <div class="box-conter">
        <el-aside width="200px">
          <Header />
        </el-aside>
        <el-main>
          <!-- 内容 -->
          <router-view></router-view>
        </el-main>
      </div>
    </el-container>
  </div>
</template>
<script>
import Header from "../views/header/header";
export default {
  data() {
    return {};
  },
  components: {
    Header,
  },
  mounted() {},
  methods: {},
};
</script>