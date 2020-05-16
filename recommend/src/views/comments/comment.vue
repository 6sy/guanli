<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>评论列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>

      <!-- 用户列表 -->
      <el-table :data="commentsList"
                style="width: 100%">
        <el-table-column label="作者"
                         width="180">
          <template slot-scope="scope">
            <el-tag type='success'>{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="留言内容"
                         width="480">
          <template slot-scope="scope">
            <span>{{ scope.row.text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态"
                         width="480">
          <template slot-scope="scope">
            <el-tag type='info'
                    v-show="scope.row.isOk==='N'">未审核</el-tag>
            <el-tag type='success'
                    v-show="scope.row.isOk==='yes'">已通过</el-tag>
            <el-tag type='danger'
                    v-show="scope.row.isOk==='no'">未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type='success'
                       size='mini'
                       @click="handleEdit(scope.row)">发布</el-button>
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
      commentsList: []
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async getComments () {
      const result = await this.$http({
        method: 'get',
        url: 'api/comments/getComments',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      if (result.data.success) {
        this.commentsList = result.data.data
      }
    },
    async handleEdit (row) {
      // 判断是否发布了
      if (row.isOk !== 'yes') {
        const result = await this.$http({
          method: 'post',
          url: 'api/comments/publishComment',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify({ _id: row._id })
        })
        if (result.data.success) {
          this.$message.success('发布成功')
          this.getComments()
        }
      } else {
        this.$message.error('已经发布了')
      }
    },
    async deleteEdit (row) {
      const result = await this.$http({
        method: 'post',
        url: 'api/comments/deleteComment',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ _id: row._id })
      })
      if (result.data.success) {
        this.$message.success('删除成功')
        this.getComments()
      }
    }
  }
}
</script>
<style scoped>
</style>
