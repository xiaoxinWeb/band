<style lang="less">
</style>
<template>
  <div>
    <!--显示表格  -->
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.contact.toLowerCase().includes(search.toLowerCase()) ||
            data.position.toLowerCase().includes(search.toLowerCase()) ||
            data.phone.toLowerCase().includes(search.toLowerCase()) ||
            data.deal.toLowerCase().includes(search.toLowerCase())
        )
      "
      stripe
      border
      highlight-current-row
      style="width: 100%"
      height="70vh"
    >
      <el-table-column label="渠道名称" prop="name" min-width="180">
      </el-table-column>
      <el-table-column label="联系人" prop="contact" min-width="180">
      </el-table-column>
      <el-table-column label="职位" prop="position" min-width="180">
      </el-table-column>
      <el-table-column label="联系方式" prop="phone" min-width="180">
      </el-table-column>
      <el-table-column label="成交笔数" prop="deal" min-width="120">
      </el-table-column>
      <el-table-column min-width="180" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="tableData.length"
      prev-text="上一页"
      next-text="下一页"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "上海南颂科技有限公司",
          contact: "尤饶",
          position: "总经理",
          phone: "1381409542",
          deal: "8",
        },
        {
          name: "上海南颂科技有限公司",
          contact: "尤饶",
          position: "总经理",
          phone: "1381409542",
          deal: "8",
        },
        {
          name: "上海某某公司",
          contact: "王小明",
          position: "普工",
          phone: "1103851224",
          deal: "3",
        },
        {
          name: "上海123有限公司",
          contact: "小红",
          position: "经理",
          phone: "1381409542",
          deal: "3",
        },
        {
          name: "总结有限公司",
          contact: "经理",
          position: "总经理",
          phone: "1381409542",
          deal: "3",
        },
        {
          name: "上海南颂科技有限公司",
          contact: "尤饶",
          position: "总经理",
          phone: "1381409542",
          deal: "8",
        },
        {
          name: "上海某某公司",
          contact: "王小明",
          position: "普工",
          phone: "1103851224",
          deal: "3",
        },
        {
          name: "上海123有限公司",
          contact: "小红",
          position: "经理",
          phone: "1381409542",
          deal: "3",
        },
        {
          name: "总结有限公司",
          contact: "经理",
          position: "总经理",
          phone: "1381409542",
          deal: "3",
        },
        {
          name: "上海南颂科技有限公司",
          contact: "尤饶",
          position: "总经理",
          phone: "1381409542",
          deal: "8",
        },
        {
          name: "上海某某公司",
          contact: "王小明",
          position: "普工",
          phone: "1103851224",
          deal: "3",
        },
      ],
      search: "",
      currentPage: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>