<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.el-popper {
  z-index: 999999999999999999999 !important;
}
.van-dropdown-menu__bar {
  background-color: transparent !important;
  box-shadow: none !important;
}
.el-form-item__content {
  width: 100%;
}
</style>
