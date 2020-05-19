<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item>创建内容</el-breadcrumb-item>
      </el-breadcrumb>
      <el-divider></el-divider>
      <el-button type='success'
                 @click='dialogVisible=true'>创建文章</el-button>
      <el-divider></el-divider>
      <!-- table -->
      <el-table :data="tableData"
                style="width: 100%">
        <el-table-column label="作者"
                         width="180">
          <template slot-scope="scope">
            <el-tag size="success">{{ scope.row.author}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="文章标题"
                         width="780">
          <template slot-scope="scope">
            <div style='display:flex;flex-direction:column'>
              {{scope.row.title}}
            </div>
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
            <el-button type='success'
                       size='mini'
                       @click="pulishEdit(scope.row)">发布</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 创建dialog -->
      <el-dialog title="创建文章"
                 :visible.sync="dialogVisible"
                 width="40%">
        <!-- 表单 -->
        <el-form label-width="80px"
                 :model="form"
                 label-position='top'
                 :rules='rules'
                 ref='form'>
          <el-form-item label="标题 :"
                        prop='title'>
            <el-input v-model="form.title"
                      placeholder="不多于20字"></el-input>
          </el-form-item>
          <el-form-item label="描述 :"
                        prop='describle'>
            <el-input v-model="form.describle"
                      placeholder="不多于30字"></el-input>
          </el-form-item>
          <el-form-item label="标签 :"
                        prop='type'>
            <el-select v-model="form.type"
                       placeholder="选择标签">
              <el-option :label="item"
                         :value="item"
                         v-for='(item,index) in types'
                         :key='index'></el-option>
            </el-select>
          </el-form-item>
          <div class='art-img'>
            <img :src="form.img"
                 alt="">
            <input type="file"
                   v-show='false'
                   ref='iptFiles'
                   @change='tirggerFile($event)'
                   accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
            <el-button type='success'
                       @click='selectImg'>选择照片</el-button>
          </div>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary"
                     @click="submitHeadart('form')">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
import obj from '../../assets/js/mock'
export default {
  data () {
    var checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('标题不能为空'))
      } else {
        callback()
      }
    }
    var checkDescrible = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('描述不能为空'))
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
      tableData: [],
      dialogVisible: false,
      form: {
        title: '',
        describle: '',
        type: '',
        img: 'http://47.57.165.173:4000/vue.jpg',
        text: '',
        author: localStorage.getItem('user')
      },
      types: [],
      rules: {
        title: [
          { validator: checkTitle, trigger: 'blur' }
        ],
        describle: [
          { validator: checkDescrible, trigger: 'blur' }
        ],
        type: [{ validator: checkType, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.types = obj.types
    console.log(this.types)
    this.getArticleList()
  },
  methods: {
    handleEdit (row) {
      this.$router.push({ name: 'writeArticle', params: { id: row.id } })
    },
    async deleteEdit (row) {
      const result = await this.$http({
        method: 'post',
        url: 'api/article/deleteArticle',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ id: row.id })
      })
      console.log(result)
      if (result.data.success) {
        this.$message.success('删除成功')
        this.getArticleList()
      }
    },
    async pulishEdit (row) {
      const result = await this.$http({
        method: 'post',
        url: 'api/article/publishArticle',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ id: row.id })
      })
      console.log(result)
      if (result.data.success) {
        this.$message.success('发布成功')
        this.getArticleList()
      }
    },
    selectImg () {
      this.$refs.iptFiles.click()
    },
    // 上传文件
    tirggerFile (e) {
      var file = event.target.files[0]
      var formData = new FormData()
      formData.append('file', file)
      this.$http({
        url: 'http://47.57.165.173:4000/api/article/uploadImg',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        this.form.img = 'http://47.57.165.173:4000/' + url.data.url
      })
    },
    // 提交表单，创建文章
    submitHeadart (form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
          const result = await this.$http({
            method: 'post',
            url: 'api/article/addArticle',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            data: this.$qs.stringify(this.form)
          })
          if (result.data.success) {
            const id = result.data.data.id
            this.dialogVisible = false
            this.$refs[form].resetFields()
            this.$message.success('创建成功')
            this.$router.push({ name: 'writeArticle', params: { id: id } })
          }
        }
      })
    },
    async getArticleList () {
      const result = await this.$http({
        method: 'get',
        url: 'api/article/getArticleList',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      this.tableData = result.data.data
    }
  }
}
</script>
<style scoped>
.art-img img {
  width: 300px;
  height: 180px;
}
.art-img .el-button {
  position: relative;
  left: -300px;
  top: 70px;
}
</style>
