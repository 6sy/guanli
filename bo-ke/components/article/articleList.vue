<template>
  <div>
    <div class='article'
         v-for='(item,index) in artList'
         :key='index'
         @click='goArticle(item.id)'>
      <!-- 图片，标题 -->
      <div>
        <img :src="item.img"
             alt="">
        <div class='content'>
          <!-- 标题 -->
          <p>{{item.title}}</p>
          <!-- 简介 -->
          <p>{{item.brief}}</p>
        </div>
      </div>
      <!-- 描述信息 -->
      <div class='des'>
        <p><span>{{item.type}}</span><span class='iconfont icon-shijian'
                style='margin-right:1px;color:green'></span><span style='color:red'>{{item.time}}</span><span class='iconfont icon-liulan'
                style='margin-right:1px'></span><span style='color:red;margin-left:5px'>{{item.looks}}</span></p>
        <p>阅读原文</p>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {

  },
  props: ['artList', 'allNum'],
  methods: {
    goArticle (id) {
      this.$router.push({ name: 'article', params: { id } })
    }
  },
  filters: {
    formDate (dateForm) {
      if (dateForm === "") {
        return "";
      } else {
        var dateee = new Date(dateForm).toJSON();
        var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        return date;
      }
    }
  },
  watch: {

  }
}
</script>
<style scoped>
.article {
  width: 840px;
  height: 160px;
  background: white;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 15px;
  -moz-box-shadow: -4px 5px 6px #0a1c12;
  -webkit-box-shadow: -4px 5px 6px #0a1c12;
  box-shadow: -4px 5px 6px #0a1c12;
}
.article img {
  width: 240px;
  height: 120px;
}
.article div:nth-child(1) {
  display: flex;
}
.content {
  margin-left: 20px;
}
.content p:nth-child(1) {
  height: 40px;
  font-weight: 600;
  line-height: 40px;
}
.content p:nth-child(2) {
  height: 40px;
  color: #909399;
}
.des {
  display: flex;
  margin-top: 20px;
  height: 30px;
}
.des p {
  flex: 1;
  font-size: 13.8px;
}
.des p:nth-child(2) {
  text-align: right;
}
.des p:nth-child(1) span {
  margin-right: 18px;
}
.des p:nth-child(1) span:nth-child(1) {
  background: pink;
  padding: 2px 4px;
  color: white;
  border-radius: 5px;
}
.des p:nth-child(2) {
  color: rgb(86, 228, 21);
}
</style>