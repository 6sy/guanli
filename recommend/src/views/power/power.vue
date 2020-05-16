<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限分配</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 表格 -->
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="角色"
                         width="180">
          <template slot-scope="scope">
            <el-tag size="success"
                    style='background:red;color:white'>{{ scope.row.role}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权限列表"
                         width="580">
          <template slot-scope="scope">
            <div style='display:flex;flex-direction:column'>
              <div v-for='(item,index) in scope.row.power'
                   :key='index'
                   style='margin:7px'>
                <el-tag size="medium"
                        closable
                        @close="deletePower(scope.row,item)">{{ item }}</el-tag>
              </div>
              <div v-show='!scope.row.power.length'>暂无权限</div>

            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type='success'
                       @click="handleEdit(scope.$index, scope.row)">添加权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- dialog添加权限 -->
      <el-dialog title="提示"
                 :visible.sync="dialogVisible"
                 width="30%">
        <el-form>
          <el-form-item label="角色"
                        style='width:100px'>
            <el-input v-model="role"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="添加权限"
                        style='width:240px'
                        prop='type'>
            <el-select v-model="selectPower"
                       placeholder="请选择角色">
              <el-option :label="item"
                         :value="item"
                         v-for='(item,index) in power'
                         :key='index'></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="addPower">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      power: [],
      selectPower: '',
      role: ''
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    handleEdit (index, row) {
      this.dialogVisible = true
      this.power = this.shaiXuan(row.power, row.allPower)
      this.role = row.role
    },
    async getRoles () {
      const result = await this.$http({
        method: 'get',
        url: 'api/role/getRoles',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      if (result.data.success) {
        this.tableData = result.data.data
      }
    },
    async deletePower (role, power) {
      const obj = {}
      obj.role = role.role
      obj.power = power
      console.log(role, power)
      const result = await this.$http({
        method: 'post',
        url: 'api/role/deletePower',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify(obj)
      })
      if (result.data.success) {
        this.getRoles()
      }
    },
    async addPower () {
      const result = await this.$http({
        method: 'post',
        url: 'api/role/addPower',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ role: this.role, power: this.selectPower })
      })
      if (result.data.success) {
        this.getRoles()
        this.$message.success('添加权限成功')
        this.dialogVisible = false
        this.selectPower = ''
      }
    },
    // 筛选出未被添加的角色
    shaiXuan (now, all) {
      const array = all.filter(function (v) { return now.indexOf(v) === -1 })
      return array
    }
  }
}
</script>
<style scoped>
</style>
