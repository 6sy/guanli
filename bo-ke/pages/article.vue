<template>
  <div class="zhanshi">

    <div v-html='value'
         class='art'
         ref='addtitle'>
    </div>
    <div class='right'>
      <cardAll></cardAll>
    </div>
  </div>
</template>
<script>
import '../assets/css/mark.less'
import cardAll from '@/components/card/cardAll'
export default {
  components: {
    cardAll
  },
  data () {
    return {
      value: '',
      title: '',

    };
  },
  mounted () {
    this.getArticle()
    this.addLook()
    this.addArticleLook()
  },
  methods: {
    async getArticle () {
      const result = await this.$http({
        method: 'post',
        url: 'api/article/getOneArticle',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ id: this.$route.params.id })
      })
      if (result.data.success) {
        this.value = result.data.data.text
        this.title = result.data.data.title
        const h1 = `<h2 style='text-align:center'>${this.title}</h2>`
        this.value = h1 + this.value

      }
    },
    async addLook () {
      console.log(this.translateDate())
      const result = await this.$http({
        method: 'post',
        url: 'api/look/addLookV',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ date: this.translateDate() })
      })
    },
    async addArticleLook () {
      const result = await this.$http({
        method: 'post',
        url: 'api/article/addArticleLookV',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ id: this.$route.params.id })
      })
    },
    // 获取日期
    translateDate () {
      const year = new Date().getFullYear()
      const month = new Date().getUTCMonth() + 1
      const day = new Date().getDate()
      const date = year + '-' + month + '-' + day
      return date
    }
  }
}
</script>

<style lang='less' scoped>
.zhanshi {
  display: flex;
  width: 1260px;
  margin: 20px auto;
}
.right {
  margin-left: 60px;
}
.art {
  width: 840px;
  background: white;
  padding: 10px;
  border-radius: 15px;
  -moz-box-shadow: -4px 5px 6px #0a1c12;
  -webkit-box-shadow: -4px 5px 6px #0a1c12;
  box-shadow: -4px 5px 6px #0a1c12;
}
</style>