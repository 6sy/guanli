<template>
  <div>
    <el-card style='width:100%'>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-button @click='dialogVisible=true' style='marginTop:10px'>
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
        <el-dialog
          :title="str"
          :visible.sync="dialogVisible"
          width="80%"
          >
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="类型">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="商品描述">
              <el-input v-model="form.msg"></el-input>
            </el-form-item>
            <el-form-item label="发货地址">
              <el-input v-model="form.adress"></el-input>
            </el-form-item>
             <el-form-item label="当前价钱">
              <el-input v-model="form.nowPrice"></el-input>
            </el-form-item>
            <el-form-item label="原钱">
              <el-input v-model="form.oldPrice"></el-input>
            </el-form-item>
            <el-form-item label="首页照片">
              <el-input v-model="form.img_one"></el-input>
            </el-form-item>
            <el-form-item label="运费">
              <el-input v-model="form.transport"></el-input>
            </el-form-item>
            <el-form-item label="轮播图照片1">
              <el-input v-model="form.swiper[0]"></el-input>
            </el-form-item>
            <el-form-item label="轮播图照片2">
              <el-input v-model="form.swiper[1]"></el-input>
            </el-form-item>
            <el-form-item label="颜色1">
              <el-input v-model="form.color[0]"></el-input>
            </el-form-item>
            <el-form-item label="颜色2">
              <el-input v-model="form.color[1]"></el-input>
            </el-form-item>
            <el-form-item label="尺寸1">
              <el-input v-model="form.size[0]"></el-input>
            </el-form-item>
            <el-form-item label="尺寸2">
              <el-input v-model="form.size[1]"></el-input>
            </el-form-item>
             <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
          </el-form>
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
      userAccount:'',
      // 添加商品
      form:{
         type:"",
         msg:"",
         adress:'',
         nowPrice:"",
         oldPrice:"",
         img_one:"",
        transport:"",
        swiper:[],
        color:[],
        size:[],
      }
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
    async onSubmit(){
     const result = await this.$http({
        method: 'post',
        url: 'api/shops/addShop',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data:this.$qs.stringify(this.form)
      })
      if(result.data.success){
        this.$message.success('添加成功')
        this.getAllItem()
        this.dialogVisible=false
      }else{
        this.$message.error('添加失败')
        this.dialogVisible=false
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
