<template>
  <div>
    <el-card>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <!-- 用户列表 -->
      <el-table :data="showData"
                style="width: 100%">
        <el-table-column label="作者"
                         width="180">
          <template slot-scope="scope">
            <el-tag type='success'>{{ scope.row.author }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="标题"
                         width="480">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type='success'
                       size='mini'
                       @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type='danger'
                       size='mini'
                       @click="deleteEdit(scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showData: []
    }
  },
  created () {
    this.getArticleList()
  },
  methods: {
    handleEdit (row) {
      if (row.author === localStorage.getItem('user')) {
        this.$router.push({ name: 'writeArticle', params: { id: row.id } })
      } else {
        this.$message.error('没有权限访问')
      }
    },
    async deleteEdit (row) {
      if (row.author === localStorage.getItem('user')) {
        const result = await this.$http({
          method: 'post',
          url: 'api/article/editArticle',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify({ id: row.id })
        })
        console.log(result)
        if (result.data.success) {
          this.$message.success('已加入草稿箱,在创建内容处可查看')
          this.getArticleList()
        }
      } else {
        this.$message.error('没有权限访问')
      }
    },

    async getArticleList () {
      const result = await this.$http({
        method: 'get',
        url: 'api/article/publishArticle',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      console.log(result)
      if (result.data.success) {
        this.showData = result.data.data
      }
    }
  }
}
</script>
<style scoped>
</style>
