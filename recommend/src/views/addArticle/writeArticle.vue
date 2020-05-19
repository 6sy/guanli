<template>
  <div class="mavonEditor">

    <mavon-editor :toolbars="markdownOption"
                  v-model="handbook"
                  @save='saveMd'
                  @change='changeMd'
                  ref='md'
                  @imgAdd="imgAdd"
                  @imgDel="imgDel" />
    <el-button type='success'
               class='save'
               @click='btnSave'>保存</el-button>
    <el-button type='success'
               class='goback'
               @click='btnGoBack'>返回</el-button>

    <div v-html='value'
         class='art1'></div>

  </div>
</template>
<script>
import '../../assets/css/mark.less'
export default {
  data () {
    return {
      markdownOption: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: false, // 下一步
        trash: false, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
        boxShadow: false
      },
      handbook: '',
      value: ''
    }
  },
  created () {
    console.log(this.$route)
    this.getArticleText()
  },
  methods: {
    async getArticleText () {
      const result = await this.$http({
        method: 'post',
        url: 'api/article/getOneArticle',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ id: this.$route.params.id })
      })
      if (result.data.success) {
        this.handbook = result.data.data.textMd
        this.value = result.data.data.text
      }
    },
    async saveMd (value, render) {
      console.log(value)
    },
    changeMd (value, render) {
      this.value = render
    },
    imgAdd (pos, file) {
      var formData = new FormData()
      formData.append('file', file)
      this.$http({
        url: 'http://47.57.165.173:4000/api/article/uploadImg',
        method: 'post',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        this.$refs.md.$img2Url(pos, 'http://47.57.165.173:4000/' + url.data.url)
      })
    },
    imgDel () {
      console.log(2)
    },
    async btnSave () {
      const result = await this.$http({
        method: 'post',
        url: 'api/article/updateArticle',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ id: Number(this.$route.params.id), data: { text: this.value, textMd: this.handbook } })
      })
      if (result.data.success) {
        this.$message.success('保存成功')
      } else {
        this.$message.error('保存失败')
      }
    },
    btnGoBack () {
      this.$router.push('/addArticle')
    }
  }
}
</script>

<style scoped>
.mavonEditor {
  height: 100%;
}
.mavonEditor img {
  display: block;
}
.save {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 1100px;
  width: 150px;
}
.goback {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 1400px;
  width: 150px;
}
</style>
