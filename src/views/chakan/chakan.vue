<style scoped>
.el-table td,
.el-table th.is-leaf {
  text-align: center;
}
</style>
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      height="70vh"
      align="center"
    >
      <el-table-column prop="group_name" label="部门名称"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row, scope.$index)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: "",
    };
  },
  mounted() {
    this.chakan();
  },
  methods: {
    chakan() {
      const data = {
        api_token: localStorage.getItem("tokenlo"),
      };
      this.fetchGet("/listGroup", data).then((res) => {
        if (res.data.code == 0) {
          //    获取成功
          console.log(res.data);
          this.tableData = res.data.data;
        }
      });
    },
    handleClick(e, i) {
      const data = {
        id: e.id,
        api_token: localStorage.getItem("tokenlo"),
      };
      this.fetchGet("/delGroup", data).then((res) => {
        if (res.data.code == 0) {
          //    获取成功
          this.tableData.splice(i, 1);
        }
      });
    },
  },
};
</script>