<template>
  <div class='login'>
    <div class='login-from'>
      <!-- 标题 -->
      <p>六六的后台管理</p>
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
                     style='margin-left:60px'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
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
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const result = await this.$http({
            method: 'post',
            url: 'api/user/login',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: this.$qs.stringify(this.ruleForm)
          })
          if (result.data.success) {
            this.$message.success('登录成功')
            const token = result.headers['my-token']
            const role = result.data.data.type
            const user = result.data.data.account
            localStorage.setItem('role', role)
            localStorage.setItem('my-token', token)
            localStorage.setItem('user', user)
            this.$router.push('/home')
          } else {
            this.$message.error('密码错误')
            this.$refs[formName].resetFields()
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
  background: url("F:\\boke\\recommend\\src\\assets\\img\\beijing.jpg")
    no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.login-from {
  width: 600px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  top: 300px;
  background: wheat;
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
  margin: 0 auto;
}
</style>
