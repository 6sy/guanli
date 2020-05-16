<template>
  <el-card>
    <div class='top'>
      <span>今日访问量:{{todayMes.looks}}</span>
      <span>总访问量:30</span>
    </div>
    <div id='main'></div>
  </el-card>

</template>
<script>

export default {
  mounted () {
    this.getToday()
    setInterval(this.show, 1000)
  },
  data () {
    return {
      todayLooks: 0,
      totalLooks: 0,
      // 今日的数据
      todayMes: {
        id: 5,
        date: '',
        looks: 0
      },
      // 所有数据
      allData: [],
      // 表格上的日期
      weekDate: [],
      // 表格上的浏览量
      weekData: [],
      switch: false
    }
  },
  methods: {
    show () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: '访问量'
        },
        tooltip: {},
        xAxis: {
          data: this.weekDate
        },
        yAxis: {},
        series: [{
          name: '访问量',
          type: 'line',
          data: this.weekData
        }]
      })
      this.createNewDay()
    },
    // 获取数据
    async getData () {
      const result = await this.$http({
        method: 'post',
        url: 'api/look/getData',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ id: this.todayMes.id })
      })
      if (result.data.success) {
        const lookdata = []
        const weekdata = []
        // 获取所有数据
        this.allData = result.data.data
        // 获取今日
        this.todayMes.looks = this.allData[this.allData.length - 1].looks
        this.allData.forEach(item => {
          const arr = item.date.split('-')[2]
          lookdata.push(item.looks)
          weekdata.push(arr)
        })
        // 一周数据
        this.weekData = lookdata
        // 一周日期
        this.weekDate = weekdata
      }
    },
    // 创建新的一天
    async createNewDay () {
      // 新的一天
      if (new Date().getMinutes() === 38 && new Date().getHours() === 0 && new Date().getSeconds() === 50) {
        const result = await this.$http({
          method: 'post',
          url: 'api/look/createLook',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          data: this.$qs.stringify({ id: this.todayMes.id, date: this.translateDate(), looks: 0 })
        })
        if (result.data.success) {
          this.getToday()
          this.getData()
          console.log(true)
        }
      } else {
        this.getData()
      }
    },
    // 获取日期
    translateDate () {
      const year = new Date().getFullYear()
      const month = new Date().getUTCMonth() + 1
      const day = new Date().getDate()
      const date = year + '-' + month + '-' + day
      return date
    },
    // 获取当天数据
    async getToday () {
      const result = await this.$http({
        method: 'get',
        url: 'api/look/getToday',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      if (result.data.success) {
        this.todayMes = result.data.data
      }
    }
  }
}
</script>
<style scoped>
#main {
  width: 100%;
  height: 800px;
}
.top {
  display: flex;
  justify-content: space-evenly;
}
.top span {
  flex: 1;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
}
</style>
