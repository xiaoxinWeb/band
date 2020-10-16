<style lang="less" scoped>
   .el-input {
       width: 500px ;
   }
  .el-select {
      width: 500px;
  }
   .avatar-uploader{
       .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  
  }

   } 
  .avatar-uploader-icon {
    border: 1px dashed #999;

    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar-uploader-icon:hover {
    border-color: #409EFF;

  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
   // 多媒体查询
    @media screen and (max-width: 768px){
            .el-input {
                width: 100%;
            }
             .el-select {
			 width: 100%;
			}
			.ele-st {
				margin-top: 20px;
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
       <el-form  :model="bankaddData"  :rules="rules" ref="bankaddData" label-width="100px" class="demo-ruleForm">
           <el-form-item label="银行ID" prop="selectList2">
				<!-- <el-input v-model="bankaddData.bank_id" placeholder="请输入银行ID"></el-input> -->
				<el-select v-model="bankaddData.selectList1" placeholder="请选择" prop="selectList" @change="select">
					<el-option v-for="item in bankaddData.selectList" :key="item.id" :label="item.bank_name" :value="item.id"></el-option>
				</el-select>
				<el-select v-model="bankaddData.selectList2" placeholder="请选择" class="ele-st">
					<el-option v-for="item in bankaddData.selectListA" :key="item.id" :label="item.bank_name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
             <el-form-item label="银行联系人" prop="bank_rersonnel_name">
             <el-input v-model="bankaddData.bank_rersonnel_name" placeholder="请输入银行联系人"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="bank_rersonnel_phone">
             <el-input v-model="bankaddData.bank_rersonnel_phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
           
            <!-- 上传图片 -->
            <el-form-item label="图片上传"  prop="imageUrl">
                <el-upload
  action="http://129.204.83.203/uploadimg"
  class="avatar-uploader"
   :show-file-list="false"
  :http-request="uploadFile"
 accept="image/png,image/gif,image/jpg,image/jpeg"
  >
 <el-image v-if="bankaddData.imageUrl" :src="bankaddData.imageUrl" class="avatar"></el-image>
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
            </el-form-item>
             <el-form-item class="btn-form">
                    <el-button type="primary" @click="Submit('bankaddData')">提交</el-button>
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
		 const rulesloginId = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback('手机号信息有误')
      } else {
        callback()
      }
    }
        return{
            bankaddData:{
                    bank_id:"",
                    bank_rersonnel_name:"",
                    bank_rersonnel_phone:"",
					imageUrl:"",
					selectList: '',
				selectListA: '',
				selectList1: '',
				selectList2: ''
            },
            rules:{
				selectList2: [
					{
						required: true,
						message: '请选择银行ID',
						trigger: 'blur'
					}
				],
                 
                   bank_rersonnel_phone:[
					    {  required: true, message: '手机号不能为空', trigger: 'blur'},
                        {  alidator: rulesloginId,trigger: 'blur',}
                   ],
                   bank_rersonnel_name:[
                        {
                    required: true, message: '银行联系人不能为空', trigger: 'blur'
                     }
                   ],
                   
                   imageUrl:[
                         {
                    required: true, message: '请上传图片', trigger: 'blur'
                     }
                   ]

            },
            result:"",
        }
	},
	mounted(){
		this.menu();
	},
    methods:{
     select() {
			this.bankaddData.selectListA = '';
			this.bankaddData.selectList2 = '';
			const data = {
				api_token: localStorage.getItem('tokenlo'),
				id: this.bankaddData.selectList1
			};
			this.fetchGet('/listTwoBank', data).then(res => {
				if (res.data.code == 0) {
					this.bankaddData.selectListA = res.data.data;
				}
			});
		},
		menu() {
			const data = {
				api_token: localStorage.getItem('tokenlo')
			};
			this.fetchGet('/listOneBank', data).then(res => {
				if (res.data.code == 0) {
					this.bankaddData.selectList = res.data.data;
				}
			});
		},
    //  自定义上传图片
      uploadFile(file){
          const _this  = this;
        //  this.imageUrl = URL.createObjectURL(file.file);
            const fr = new FileReader();
            const base = "";
             fr.readAsDataURL(file.file);
             fr.onload = function() {
                const data = {
                    api_token:localStorage.getItem("tokenlo"),
                     fileImg:fr.result
             }
                _this.fetchPost('/uploadimg',data).then(res=>{
                    if(res.data.code == 0){
                        Toast("图片上传成功")
                        _this.bankaddData.imageUrl = res.data.data.imgUrl
                    } 
                })
            };
             
      },
    //   点击提交
      //提交
        Submit(){
            // 添加员工、
            this.$refs.bankaddData.validate((valid)=>{
                if(valid){
                    const data = {
                        api_token:localStorage.getItem("tokenlo"),
                        bank_id: this.bankaddData.selectList2,
                        bank_rersonnel_name:this.bankaddData.bank_rersonnel_name,
                        bank_rersonnel_phone:this.bankaddData.bank_rersonnel_phone,
                        bank_img:this.bankaddData.imageUrl
                    }
                    this.fetchPost('/addStaffBank',data).then(res=>{
                    if(res.data.code == 0){
                        Toast(res.data.message);
                        // 添加成功返回上一页并刷新数据
                        this.$router.go(-1)
                    } 
                })
                }
            })
        },
        // 点击关闭
        close(){
            // 不刷新页面
             this.$router.back()
        }
   
    }
}
</script>