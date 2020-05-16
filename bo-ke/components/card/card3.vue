<template>
  <div class='news'>
    <div class='chose'><span :class='isChose?"red":""'
            @click='getChose(1)'>热门排行</span>/<span :class='!isChose?"red":""'
            @click='getChose(2)'>最新发布</span></div>
    <div class='newsText'>
      <div v-for='(item,index) in textMes'
           :key='index'>{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    this.textMes = this.textHot
  },
  data () {
    return {
      isChose: true,
      textMes: [],
      textHot: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'bbbbbbb', 'ccccccc', 'dddddddd', 'eeeeeee'],
      textNew: ['我是你对哈佛iuoi', 'asdasbndiasd', '我是大拔丝地瓜iasdiabod', 'hdoasdhoausbgdabosduasd']
    }
  },
  methods: {
    getChose (index) {
      if (index === 1) {
        this.isChose = true
        this.textMes = this.textHot
      } else {
        this.isChose = false
        this.textMes = this.textNew
      }
    }
  }
}
</script>
<style scoped>
.news {
  width: 300px;
  height: 300px;
  background: white;
  padding: 5px;
  background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584880498709&di=d26ff236fd2fd7cc46ed6410dad46be6&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F27568388.jpeg)
    50% 50% no-repeat;
  -moz-box-shadow: -4px 5px 6px #0a1c12;
  -webkit-box-shadow: -4px 5px 6px #0a1c12;
  box-shadow: -4px 5px 6px #0a1c12;
}
.chose {
  padding-bottom: 3px;
  border-bottom: 3px solid rgb(20, 100, 219);
}
.chose span {
  padding: 3px;
  font-size: 13.8px;
  cursor: pointer;
  font-weight: 600;
}

.newsText div {
  height: 50px;
  border-bottom: 1px solid #e3e3e3;
  line-height: 50px;
  padding-left: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0.3;
}

.red {
  color: deeppink;
  opacity: 0.6;
  font-size: 20px !important;
}
</style>