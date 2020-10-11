<style lang="less">
.el-input--mini .el-input__inner {
  height: 40px !important;
  line-height: 40px !important;
}
</style>
<template>
  <div>
    <el-button type="primary" @click="addBtn()">添加渠道</el-button>
    <el-table
      :data="Mydata"
      style="width: 100%"
      height="70vh"
      :default-sort="{ prop: 'deal', order: 'descending' }"
    >
      <el-table-column prop="bank" sortable label="银行" min-width="120">
      </el-table-column>
      <el-table-column prop="subbran" label="支行" min-width="120">
      </el-table-column>
      <el-table-column prop="credit" label="信贷员" min-width="120">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" min-width="120">
      </el-table-column>
      <el-table-column prop="deal" label="成交笔数" sortable min-width="120">
        <template slot-scope="{ row }">
          <el-link type="primary" :underline="false">{{ row.deal }}</el-link>
        </template>
      </el-table-column>
      <el-table-column min-width="120">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Mydata: [
        {
          bank: "中信银行",
          subbran: "嘉定支行",
          credit: "小明",
          phone: "1346682952",
          deal: "56",
        },
        {
          bank: "中信银行",
          subbran: "嘉定支行",
          credit: "小明",
          phone: "1346682952",
          deal: "1",
        },
        {
          bank: "中信银行",
          subbran: "嘉定支行",
          credit: "小明",
          phone: "1346682952",
          deal: "2",
        },
        {
          bank: "中信银行",
          subbran: "嘉定支行",
          credit: "小明",
          phone: "1346682952",
          deal: "54",
        },
        {
          bank: "中信银行",
          subbran: "嘉定支行",
          credit: "小明",
          phone: "1346682952",
          deal: "599",
        },
        {
          bank: "中信银行",
          subbran: "嘉定支行",
          credit: "小明",
          phone: "1346682952",
          deal: "00",
        },
      ],
      search: "",
    };
  },
  methods: {
    // 添加渠道跳转页面
    addBtn() {
      this.$router.push("my_bank");
    },
  },
};
</script>