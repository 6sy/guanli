<template>
  <div>
    <el-card style='width:100%'>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button @click='addItem'>
          添加商品
        </el-button>
        </div>
          <!-- 订单列表 -->
            <el-table :data="showOrderData"
                  style="width: 100%" >
          <el-table-column label="类型"
                           width="60">
            <template slot-scope="scope">
              <el-tag>{{scope.row.s_type }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="商品描述"
                           width="280">
            <template slot-scope="scope">
              <span>{{ scope.row.s_msg}}</span>
            </template>
          </el-table-column>
            <el-table-column label="收藏人数"
                           width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.s_collect}}</span>
            </template>
          </el-table-column>

          <el-table-column label="价格"
                           width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.s_newPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="运费"
                           width="80">
            <template slot-scope="scope">
              <span>{{ scope.row.s_transport}}</span>
            </template>
          </el-table-column>adress
          <el-table-column label="发货地址"
                           width="100">
            <template slot-scope="scope">
              <span>{{ scope.row.s_adress}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态"
                           width="90">
            <template slot-scope="scope">
              <el-tag v-if='scope.row.s_vip>0'>已上架</el-tag>
              <el-tag v-else type='danger'>已下架</el-tag>
            </template>
          </el-table-column>v-else
          <el-table-column label="操作" width='90'>
            <template slot-scope="scope">
              <el-button v-if='scope.row.s_vip>0' @click='handle(0,scope.row.s_uid)' type='danger'>下架</el-button>
              <el-button v-else @click='handle(1,scope.row.s_uid)'>上架</el-button>
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
    this.getAllItem()
  },
  methods: {
    async getAllItem(){
        const result = await this.$http({
        method: 'post',
        url: 'api/shops/searchGoods',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:{s_msg:''}
      })
      if(result.data){
           console.log(result.data)
           this.showOrderData=result.data
      }
    },
    async handle(state,id){
      console.log(1)
        const result = await this.$http({
        method: 'post',
        url: 'api/shops/handle',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:this.$qs.stringify({
          state,id
        })
      })
      if(result.data.success){
        this.$message.success('操作成功')
        this.getAllItem()
      }
    },
    async addItem(){

    }
  }
}
</script>
<style scoped>
.search-user {
  margin-top: 20px;
}
</style>
