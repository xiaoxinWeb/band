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
        <el-form label-width="80px" :model="Addata" :rules="rules" ref="Addata">
            <el-form-item label="员工账号" prop="num" required>
                <el-input  v-model="Addata.num" placeholder="请输入员工账号"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名" prop="name" required>
                <el-input   v-model="Addata.name"  placeholder="请输入员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="员工手机" prop="phone" required>
                <el-input    v-model="Addata.phone"  placeholder="请输入员工手机"></el-input>
            </el-form-item>
            
            <el-form-item label="员工等级" prop="level"  required>
                <el-select  v-model="Addata.level" placeholder="请选择员工等级">
                <el-option label="总账户"  value="1"></el-option>
                <el-option label="业务员" value="2"></el-option>
                </el-select>
                </el-form-item> 
                <el-form-item class="btn-form">
                    <el-button type="primary" @click="Submit('Addata')">提交</el-button>
                    <el-button @click="close()">关闭</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    
    data(){
       // 手机号验证
		var checkPhone = (rule, value, callback) => {
		    const phoneReg = /^1[3|4|5|6|7|8][0-9]{9}$/
		    if (!value) {
		      return callback(new Error('电话号码不能为空'))
		    }
		    setTimeout(() => {
		      
		      if (!Number.isInteger(+value)) {
		        callback(new Error('请输入数字值'))
		      } else {
		        if (phoneReg.test(value)) {
		          callback()
		        } else {
		          callback(new Error('手机号码格式不正确'))
		        }
		      }
            }, 100)
        }
        return{
            Addata:{
                num:"",
                phone:"",
                name:"",
                level:'',
            },
            rules:{
                num:[
                    {
                    required: true, message: '员工账号不能为空', trigger: 'blur'
                     }
                   ],
                   name:[
                       {
                           required: true, message: '员工姓名不能为空', trigger: 'blur'
                       }
                   ],
                   phone:[
                       {
                           required: true,validator: checkPhone, trigger: 'blur',

                       }
                   ],
                    level: [
                        { required: true, message: '请选择员工等级', trigger: 'change' }
                     ],
            }
        }
    },
    
    methods:{
        close(){
              // 不刷新页面
             this.$router.back()
        },
        //提交
        Submit(){
            // 添加员工、
            this.$refs.Addata.validate((valid)=>{
                if(valid){
                    const data ={
                    staff_num:this.Addata.num,
                    staff_name:this.Addata.name,
                    api_token:localStorage.getItem("tokenlo"),
                    staff_phone:this.Addata.phone,
                    staff_level:this.Addata.level
                }
                this.fetchPost('/addstaff',data).then(res=>{
                    if(res.data.code == 0){
                        // 添加成功并返回上一页 刷新上一页数据
                        Toast("添加成功");
                       this.$router.go(-1)
                    }
                })
                }
            })
        }
    }
}
</script>