
<style lang="less" scoped>
    .main {
        width:100%;
        height:100vh;
        background: linear-gradient(0deg, #5689FE, #7DB4FF);
        display: flex;
        justify-content: center;
        align-items: center;
        .box-login {
            background-color: #fff;
            display: flex;
            flex-direction: column;
            position: relative;
            padding: 40px 20px;
            h3 {
                color:#5794FFFF;
                line-height: 60px;
                font-size: 26px;
                font-family:' 59--Regular';
                
            }
            p {
                color:#9289A6FF;
                line-height: 49px;
                font-size: 15px;
            }
            .el-form-item__content {
                button {
                    width: 100%;
                }
            }
        }
        
    }
    .el-form {
            min-width:400px;
        }
    
    
    
</style>
<template>
<!-- 登录页面 -->
    <div>
        <div class="main all">
                    <el-link href="#"  :underline="false">
                    </el-link>
                <!-- </div>  -->
                <div class="box-login">
                    <h3>
                        欢迎登录
                    </h3>
                    <p>请使用您本人的账号密码登录</p>
                     <el-form :model="form" ref="form" :rules="rules">
                      <el-form-item  prop="account">
                        <el-input placeholder="请输入账号" class="ipt"
                       v-model="form.account"
                        ></el-input>  
                        </el-form-item> 
                        <el-form-item prop="pwd">
                            <el-input placeholder="请输入密码"
                            show-password
                             class="ipt"
                            v-model="form.pwd"></el-input>
                        </el-form-item>
                        <el-form-item>
                            
                            <el-button type="primary"
                            @click="login('form')"
                            :loading="btnLoading"
                            >登录</el-button>
                        </el-form-item>
                  </el-form>
                </div>
      

        </div>
    </div>

</template>
<script>
import { Toast } from 'vant';
export default {
        data(){
            return {
            form:{
                account:"",
                pwd:""
            },
            btnLoading:false,
            rules:{
                account:[
                    {required: true, message: '请输入账号', trigger: 'blur' }
                ],
                pwd:[
                    {required: true, message: '请输入密码', trigger: 'blur' }
               ]
            }
            }
        },
        methods:{
            // 登录按钮
            login(){
                // 按钮加载
                this.$refs.form.validate((valid)=>{
                         if (valid) {
                             const data = {
                                 name:this.form.account,
                                password:this.form.pwd
                             }
                           this.fetchPost('/login',data).then(res=>{
                               if(res.data.code == 0){
                             this.btnLoading = false;
                             localStorage.setItem("tokenlo", res.data.data.api_token)
                              localStorage.setItem("level", res.data.data.level)
                              console.log(res.data.data.level)
                                //    登录成功
                        this.$router.push('staff');

                               }else {
                                   Toast(res.data.message);
                               }
                               console.log(res)
                           })
                         }else {
                             
                         }
                })
            },
            
        },
       
  
}
</script>