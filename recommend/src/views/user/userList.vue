<template>
  <div>
    <el-card style='width:100%'>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
        <!-- 用户列表 -->
        <el-table :data="showData"
                 >
          <el-table-column label="创建时间"
                           width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.date.substring(0,10) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名"
                           width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.user_account}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         @click="lookOrder(scope.row)">我的订单</el-button>
              <el-button size="mini"
                         type="danger"
                         >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog
          :title="str"
          :visible.sync="dialogVisible"
          width="80%"
          >
          <!-- 订单列表 -->
            <el-table :data="showOrderData"
                  style="width: 100%" >
          <el-table-column label="订单id"
                           width="120">
            <template slot-scope="scope">
              <span>{{scope.row.orderId }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单地址"
                           width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.adress.province+scope.row.adress.city+scope.row.adress.city}}</span>
            </template>
          </el-table-column>
          <el-table-column label="收获人"
                           width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.adress.person}}</span>
            </template>
          </el-table-column>
          <el-table-column label="联系方式"
                           width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.adress.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单状态"
                           width="80">
            <template slot-scope="scope">
              <el-tag v-if='scope.row.state==0'>未支付</el-tag>
              <el-tag v-if='scope.row.state==1'>已支付</el-tag>
              <el-tag v-if='scope.row.state==2'>代收货</el-tag>
               <el-tag v-if='scope.row.state==3'>交易完成</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini"
                         type="danger"
                         v-if='scope.row.state==1' @click='send(scope.row.orderId)'>发货</el-button>
            </template>
          </el-table-column>
        </el-table>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
      </el-dialog>
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
    this.getUserList()
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
    }
  }
}
</script>
<style scoped>
.search-user {
  margin-top: 20px;
}
</style>
