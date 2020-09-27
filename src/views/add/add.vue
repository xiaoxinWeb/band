<style lang="less" scoped>
   .el-input {
       width: 500px ;
   }
  .el-select {
      width: 500px;
  }
   // 多媒体查询
    @media screen and (max-width: 768px){
            .el-input {
                width: 100%;
            }
             .el-select {
             width: 100%;
            }
            .el-button {
                width: 100%;
            }
            
            .btn-form {
                display: flex;
                flex-direction: column;
              
            }
            .el-button {
                margin-top:40px;
            }
            
            .el-button+.el-button {
                margin-left: 0 !important;
            }

    }
</style>
<template>
    <div>
        <!-- 添加用户 -->
        <el-form label-width="80px" model="Addata" :rules="rules" ref="Addate"   required inline-message hide-required-asterisk>
            <el-form-item label="员工账号" prop="num">
                <el-input placeholder="请输入员工账号"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="name">
                <el-input  placeholder="请输入员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="员工手机" prop="phone">
                <el-input placeholder="请输入员工手机"></el-input>
            </el-form-item>
            
            <el-form-item label="员工等级" prop="level">
                <el-select  placeholder="请选择员工等级">
                <el-option label="区域一" ></el-option>
                <el-option label="区域二" ></el-option>
                </el-select>
                </el-form-item> 
                <el-form-item class="btn-form">
                    <el-button type="primary">提交</el-button>
                    <el-button @click="close()">关闭</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        return{
            Addata:{
                num:"",
                phone:"",
                name:"",
                level:[

                ],
            }
        }
    },
    methods:{
        close(){
             this.$router.go(-1);
        }
    }
}
</script>