<style lang="less" scoped>
   .el-input {
       width: 500px ;
   }
  .el-select {
      width: 500px;
  }
  .el-textarea {
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
            .el-textarea {
                width: 100%;
            }

    }
</style>
<template>
    <div>
        <el-form :rules="rules" ref="bankData"  :model="bankData" label-width="80px">
              <el-form-item label="类型" prop="type">
    <el-select v-model="bankData.type" placeholder="请选择类型">
      <el-option label="银行" value="1"></el-option>
      <el-option label="渠道" value="2"></el-option>
    </el-select>
  </el-form-item>
    <el-form-item label="数据id" prop="id">
    <el-input v-model="bankData.id" placeholder="请输入数据id" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"></el-input>
  </el-form-item>
   <el-form-item label="成交金额" prop="money">
    <el-input v-model="bankData.money" placeholder="请输入成交金额" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"></el-input>
  </el-form-item>
   <el-form-item label="成交备注" prop="remarks">
    <el-input type="textarea" v-model="bankData.remarks" placeholder="请输入成交备注"></el-input>
  </el-form-item>
   <el-form-item class="btn-form">
                    <el-button type="primary" @click="Submit('bankData')">提交</el-button>
                    <el-button @click="close()">关闭</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            bankData:{
                type:"",
                id:"",
                money:"",
                remarks:""
            },
            rules:{
                type:[
                    {
                        required: true, message: '请选择员工等级', trigger: 'change' 
                    }
                ],
                id:[
                    {
                        required: true, message: '数据id不能为空', trigger: 'blur'
                    }
                ],
                money:[
                    {
                required: true, message: '成交金额不能为空', trigger: 'blur'
                    }
                ],
                remarks:[
                    {
                            required: true, message: '成交备注不能为空', trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods:{
        // 提交
        Submit(){
             this.$refs.bankData.validate((valid)=>{
                if(valid){
                    const data ={
                    type:this.bankData.type,
                    id:this.bankData.id,
                    api_token:localStorage.getItem("tokenlo"),
                    remarks:this.bankData.remarks,
                    money:this.bankData.money
                }
                this.fetchGet('/staffDeal',data).then(res=>{
               if(res.data.code == 0){
                //    获取成功
                Toast(res.data.message)
                this.$router.go(-1)
               }
                 })
                }
            })
        },
        // 关闭
        close(){
             // 不刷新页面
             this.$router.back()
        }
    },
    // 
}
</script>