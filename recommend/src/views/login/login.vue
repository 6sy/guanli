<template>
  <div class='login'>
    <div class='login-from'>
      <!-- 标题 -->
      <p>商城管理后台管理</p>
      <!-- 表单验证 -->
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">
        <el-form-item label="账号"
                      prop="account">
          <el-input v-model="ruleForm.account"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model.number="ruleForm.password"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')"
                     style='margin-left:10px'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
/* eslint-disable */
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { validator: validatePass2, trigger: 'blur' }
        ],
        password: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      let that=this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          if(that.ruleForm.account=='root' &&that.ruleForm.password=='123456'){
            this.$message.success('登陆成功')
            this.$router.push('/userList')
            window.localStorage.setItem('token',123)
          }else{
            this.$message.error('登陆失败')
          }
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.login {
  width: 100%;
  background: url("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=898686906,2953878640&fm=26&gp=0.jpg")
    no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.login-from {
  width: 600px;
  height: 350px;
  position: fixed;
  background: rgb(179, 206, 245);
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
.login-from p {
  color: white;
  font-weight: 600;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
}
.demo-ruleForm {
  width: 400px;
}
</style>
