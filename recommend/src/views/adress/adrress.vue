<template>
  <div>
    <el-card style='width:100%'>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>地址管理</el-breadcrumb-item>
      </el-breadcrumb>
          <!-- 订单列表 -->
            <el-table :data="showOrderData"
                  style="width: 100%" >
          <el-table-column label="订单地址"
                           width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.province+scope.row.city+scope.row.city}}</span>
            </template>
          </el-table-column>
            <el-table-column label="详细地址"
                           width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.area+scope.row.careAdress}}</span>
            </template>
          </el-table-column>

          <el-table-column label="收获人"
                           width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.person}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式"
                           width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.phone}}</span>
            </template>
          </el-table-column>
        </el-table>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
    </el-card>
  </div>
</template>
<script>
/* eslint-disable */
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
      showData: [],
      // dialog标题
      str:"",
      // 订单列表
      showOrderData:[],
      userAccount:''

    }
  },
  filters: {
    transTime (val) {
      return val.slice(0, 10)
    }
  },
  created () {
    this.roles = role.roles
    this.getAllOrder()
  },
  methods: {
    // 获取角色
    async getUserList () {
      const result = await this.$http({
        method: 'get',
        url: 'api/users/getUsers',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      this.tableData = result.data.data
      this.showData = this.tableData
      console.log(this.showData)
      this.formInline.role = ''
    },
    lookOrder(item,str){
      this.str=str
      this.dialogVisible=true
      this.userAccount=item.user_account
      this.showOrderData=item.user_order
    },
    async send(id){
      console.log(id)
      let that=this
      const result = await this.$http({
        method: 'post',
        url: 'api/users/sendProduct',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:this.$qs.stringify({
          user:that.userAccount,
          id:id
        })
      })
      if(result.data.success){
        this.$message.success('发货成功')
        this.dialogVisible=false
        this.getUserList()
      }
    },
    async getAllOrder(){
        const result = await this.$http({
        method: 'get',
        url: 'api/users/getUsers',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      let list=[]
      if(result.data.success){
          let users=result.data.data
          if(users.length){
              for(let i=0;i<users.length;i++){
                  list=[...list,...users[i].user_adress]
              }
          }
      }
      this.showOrderData=list
    }
  }
}
</script>
<style scoped>
.search-user {
  margin-top: 20px;
}
</style>
