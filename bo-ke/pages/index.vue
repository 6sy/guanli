<template>
  <div>
    <div class='img'></div>
    <div class='zhanshi'>
      <articleList :art-list='artList'></articleList>
      <div class='right'>
        <cardAll></cardAll>
      </div>
    </div>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync='pageNum'
                     :page-size="pageSize"
                     layout="total, prev, pager, next"
                     :total="pageallNum">
      </el-pagination>
    </div>
    <ys-load-wave></ys-load-wave>
  </div>
</template>

<script>
import articleList from '@/components/article/articleList'
import cardAll from '@/components/card/cardAll'
export default {
  components: {
    articleList,
    cardAll,
  },
  data () {
    return {
      artList: [],
      pageNum: 1,
      pageSize: 5,
      pageallNum: 0
    }
  },
  created () {
    this.getAllNum()
    this.getArticle()
  },
  methods: {
    // size大小改变
    handleSizeChange (size) {
      this.pageSize = size
      this.getArticle()
    },
    // 页码改变
    handleCurrentChange (num) {
      this.pageNum = num
      this.getArticle()
    },
    // 获取文章
    async getArticle () {
      const result = await this.$http({
        method: 'post',
        url: 'api/article/getArticleV',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ num: this.pageNum, size: this.pageSize })
      })
      if (result.data.success) {
        this.artList = result.data.data.slice(0, 5)
        console.log(this.artList)
      }
    },
    // 获取文章总数
    async getAllNum () {
      const result = await this.$http({
        method: 'get',
        url: 'api/article/getAllNumV',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ num: this.pageNum, size: this.pageSize })
      })
      if (result.data.success) {
        this.pageallNum = result.data.data
      }
    }
  }
}
</script>

<style>
.img {
  width: 100%;
  height: 350px;
  background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584785893585&di=2a833d39324b4cfbf7b32215313c063f&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fb%2F55597435bb036.jpg)
    no-repeat right 0 center;
}
.zhanshi {
  display: flex;
  width: 1260px;
  margin: 20px auto;
}
.right {
  margin-left: 60px;
}
.block {
  margin-left: 300px;
  position: relative;
  display: inline-block;
  top: -50px;
  left: 18%;
}
@media screen and (max-width: 1048px) {
  .zhanshi {
    width: 100%;
  }
}
</style>
