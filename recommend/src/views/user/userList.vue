<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 搜索用户 -->
      <div class='search-user'>
        <span style='font-weight:600'>用户搜索</span>
        <el-divider></el-divider>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline"
                 style=' margin-left:20%'>
          <el-form-item label="用户名">
            <el-input v-model="formInline.account"
                      placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="formInline.role"
                       placeholder="角色">
              <el-option :label="item"
                         :value="item"
                         v-for='(item,index) in roles'
                         :key='index'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="onSubmit">查询</el-button>
            <el-button type="success"
                       @click="addrole">创建角色</el-button>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <!-- 用户列表 -->
        <el-table :data="showData"
                  style="width: 100%">
          <el-table-column label="创建时间"
                           width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.time|transTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名"
                           width="480">
            <template slot-scope="scope">
              <span>{{ scope.row.account }}</span>
            </template>
          </el-table-column>
          <el-table-column label="角色"
                           width="380">
            <template slot-scope="scope">
              <el-tag :type='tagsType(scope.row.type)'><span>{{ scope.row.type }}</span></el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 创建用户 -->
        <el-dialog title="创建用户"
                   :visible.sync="dialogVisible"
                   width="30%">
          <!-- 表单 -->
          <el-form ref="form"
                   :model="form"
                   label-width="80px"
                   :rules='rules'>
            <el-form-item label="用户名"
                          prop='account'>
              <el-input v-model="form.account"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop='password'>
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="选择角色"
                          style='width:240px'
                          prop='type'>
              <el-select v-model="form.type"
                         placeholder="请选择角色">
                <el-option :label="item"
                           :value="item"
                           v-for='(item,index) in roles'
                           :key='index'></el-option>
              </el-select>
            </el-form-item>

          </el-form>
          <span slot="footer"
                class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="addRoleOk('form')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
import role from '../../assets/js/mock.js'

export default {

  data () {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        callback()
      }
    }
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var checkType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('角色不能为空'))
      } else {
        callback()
      }
    }
    return {
      // 角色等级
      roles: [],
      // 搜索表单
      formInline: {
        account: '',
        role: ''
      },
      // 创建用户表单
      form: {
        account: '',
        password: '',
        type: ''
      },
      // 创建用户表单验证
      rules: {
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        type: [{ validator: checkType, trigger: 'blur' }]
      },
      // dialog
      dialogVisible: false,
      tableData: [],
      // 展示的数据
      showData: []
    }
  },
  filters: {
    transTime (val) {
      return val.slice(0, 10)
    }
  },
  created () {
    this.roles = role.roles
    this.getUserList()
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row)
    },
    async handleDelete (index, row) {
      const result = await this.$http({
        method: 'post',
        url: 'api/user/deleteUser',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify(row)
      })
      if (result.data.success) {
        this.getUserList()
        this.$message.success('删除角色成功')
      }
    },
    // 搜索
    onSubmit () {
      console.log(this.formInline.account)
      if (this.formInline.account) {
        // role user都有输入
        if (this.formInline.role) {
          this.showData = this.tableData.filter((item) => {
            return this.formInline.account === item.account && this.formInline.role === item.type
          })
        } else {
          this.showData = this.tableData.filter((item) => {
            return this.formInline.account === item.account
          })
        }
      } else {
        if (this.formInline.role) {
          this.showData = this.tableData.filter((item) => {
            return this.formInline.role === item.type
          })
        } else {
          this.showData = this.tableData
        }
      }
    },
    // 添加角色
    addrole () {
      this.dialogVisible = true
    },
    // 添加角色确定
    addRoleOk (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          const result = await this.$http({
            method: 'post',
            url: 'api/user/register',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: this.$qs.stringify(this.form)
          })
          if (result.data.success) {
            this.$message.success('添加用户成功')
            Object.assign(this.$data.form, this.$options.data().form)
            this.getUserList()
            this.dialogVisible = false
          }
        }
      })
    },
    // 获取角色
    async getUserList () {
      const result = await this.$http({
        method: 'get',
        url: 'api/user/getUsers',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      this.tableData = result.data.data
      this.showData = this.tableData
      this.formInline.role = ''
    },
    // tag颜色
    tagsType (type) {
      if (type === '站长') {
        return 'success'
      } else if (type === '管理员') {
        return 'info'
      } else {
        return 'warning'
      }
    }
  }
}
</script>
<style scoped>
.search-user {
  margin-top: 20px;
}
</style>
