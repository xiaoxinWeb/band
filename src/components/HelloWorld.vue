 <!--表格页代码 -->
<template>
  <div class="hello">
    <el-table
        :data="tableData"
        @row-contextmenu="rowContextmenu"
        border
        style="width: 100%">
      <el-table-column
          prop="date"
          label="日期"
          width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="address"
          label="地址">
      </el-table-column>
    </el-table>
     <context-button v-if="menuVisible" @foo="foo" ref="contextbutton" @handleOne="handleOne" @handleTwo="handleTwo" @handleThree="handleThree"></context-button>
  </div>
</template>

<script>
  import contextButton from './index'
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },  {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        menuVisible: false,
      }
    },
    components: {
      contextButton
    },
    methods: {
      rowContextmenu (row, column, event) {
        this.menuVisible = false
        this.menuVisible = true
        // 阻止右键默认行为
        event.preventDefault()
        this.$nextTick(() => {
          this.$refs.contextbutton.init(row,column,event)
          // 给子组件传值
        })
      },
      foo() { // 取消鼠标监听事件 菜单栏
        this.menuVisible = false
        document.removeEventListener('click', this.foo)
      },
      handleOne (row) {
        console.log(row)
        console.log('点击菜单一')
      },

      handleTwo () {
        console.log('点击菜单二')
      },
      handleThree () {
        console.log('点击菜单三')
      },
    }
  }
</script>