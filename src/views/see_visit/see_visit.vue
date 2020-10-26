<style scoped>
.el-image {
  width: 60px;
  height: 60px;
}

.header-cell {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  line-height: 30px;
  font-weight: 600;
}
.van-image {
  width: 80px;
  height: 80px;
}
.botm-img {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
.left-text {
  margin-left: 10px;
}
.van-cell {
  margin-top: 10px;
}
</style>
<template>
  <div>
    <div class="min-width">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="img" label="图片">
          <template slot-scope="scope">
            <el-image
              :src="scope.row.img"
              :preview-src-list="srcList"
              width="60px"
              height="60px"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="staff_name" label="姓名" v-if="level == 1">
        </el-table-column>
        <el-table-column prop="notes" label="拜访备注"> </el-table-column>
        <el-table-column prop="addtime" label="时间"> </el-table-column>
      </el-table>
    </div>
    <!-- 移动端 -->
    <div class="max-width">
      <van-cell v-for="(item, i) in tableData" :key="i">
        <!-- 头部 -->
        <div class="header-cell">
          <div v-if="level == 1">{{ item.staff_name }}</div>
          <div>{{ item.addtime }}</div>
        </div>
        <div>
          <div class="botm-img">
            <van-image :src="item.img"> </van-image>
            <div class="left-text">{{ item.notes }}</div>
          </div>
        </div>
      </van-cell>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: "",
      tableData: "",
      srcList: [],
      level: 1,
    };
  },
  mounted() {
    this.dataList = this.$route.query;
    this.level = localStorage.getItem("level");
    const data = {
      api_token: localStorage.getItem("tokenlo"),
      id: this.dataList.itemData,
      type: this.dataList.itemData2,
    };
    console.log(data);
    this.fetchGet("/listStaffcall", data).then((res) => {
      if (res.data.code == 0) {
        this.tableData = res.data.data;
        this.tableData.forEach((item) => {
          this.srcList.push(item.img);
        });
      }
    });
  },
};
</script>