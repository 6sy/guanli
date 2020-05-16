<template>
  <div class='zhanshi'>
    <articleList :art-list='artList'></articleList>
    <div class='right'>
      <cardAll></cardAll>
    </div>
  </div>
</template>
<script>
import articleList from '../components/article/articleList'
import cardAll from '@/components/card/cardAll'
export default {
  components: {
    articleList,
    cardAll
  },
  data () {
    return {
      artList: [
        { img: 'https://www.yangqq.com/d/file/download/div/2014-04-17/a5d40a42129d1a1e1099d62a20bc0fc1.jpg', title: '关于响应式布局', brief: '这个特别特别特比阿斯顿我我我我我我无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无无大蛇丸多发ssssssssss放擦aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', type: 'vue', time: '2018-7-9', watcher: '10' },
        { img: '', title: '', brief: '', type: 'vue', time: '2018-7-9', watcher: '10' }]
    }
  }
}
</script>
<style scoped>
.zhanshi {
  display: flex;
  width: 1260px;
  margin: 20px auto;
}
.right {
  margin-left: 60px;
}
</style>