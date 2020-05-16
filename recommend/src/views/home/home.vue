<template>
  <div class='home'>
    <el-container>
      <el-header>欢迎您:{{user}}</el-header>
      <el-container>
        <el-aside width="190px">
          <el-menu :default-openeds="['1', '2','3','4']"
                   width="160px">
            <el-submenu v-for='(item,index) in menuList'
                        :key='index'
                        :index='index+1+""'>
              <template slot="title"><i class="el-icon-message"></i>{{item.msg}}</template>
              <el-menu-item v-for='(item1,index1) in item.children'
                            :key='index1'
                            :class='[currentIndex===item1.path?"red":"",power.indexOf(item1.path)===-1?"disable":""]'
                            @click='goNew(item1.path,!(power.indexOf(item1.path)===-1))'
                            :index='item1.path'>{{item1.msg}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuList: [
        { msg: '用户管理', children: [{ msg: '用户列表', path: '/userList' }, { msg: '权限分配', path: '/power' }] },
        { msg: '内容管理', children: [{ msg: '文章列表', path: '/articleList' }, { msg: '评论列表', path: '/commentList' }, { msg: '创建内容', path: '/addArticle' }] },
        { msg: '浏览管理', children: [{ msg: '浏览记录', path: '/lookNote' }, { msg: '视图分析', path: '/viewAnalyse' }] },
        { msg: '日志', children: [{ msg: '日志记录', path: '/journalNotes' }] }
      ],
      currentIndex: '/userList',
      user: '',
      role: '',
      power: []
    }
  },
  created () {
    this.currentIndex = this.$route.fullPath
    // 存储
    this.role = localStorage.getItem('role')
    this.getPower()
    this.user = localStorage.getItem('user')
  },
  computed: {
    isDisable (path) {
      console.log(path)
      path = path.slice(1)
      return this.power.indexOf(path) === -1
    }
  },
  methods: {
    goNew (rote, isPower) {
      // 有权限
      if (isPower) {
        this.currentIndex = rote
        this.$router.push(rote)
      } else {
        this.$message.error('没有权限访问')
      }
    },
    async getPower () {
      const result = await this.$http({
        method: 'post',
        url: 'api/role/getPower',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify({ role: this.role })
      })
      if (result.data.success) {
        this.power = result.data.data
        // 转换power
        this.power = this.translatePoawer(this.power)
        console.log(this.power)
      }
    },
    translatePoawer (power) {
      const arr = []
      console.log(power)
      power.forEach(item => {
        if (item === '用户管理') {
          arr.push('/userList')
          return true
        } else if (item === '权限分配') {
          arr.push('/power')
          return true
        } else if (item === '文章管理') {
          arr.push('/articleList')
          arr.push('/commentList')
          return true
        } else if (item === '写作') {
          arr.push('/addArticle')
          return true
        } else if (item === '浏览管理') {
          arr.push('/lookNote')
          arr.push('/viewAnalyse')
          return true
        } else if (item === '日志管理') {
          arr.push('/journalNotes')
          return true
        }
      })
      console.log(arr)
      return arr
    }
  }
}
</script>
<style scoped>
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  width: 100%;
  height: 55px;
  text-align: center;
  background: darkcyan;
  color: white;
  font-size: 18px;
  line-height: 55px;
  font-weight: 600;
  letter-spacing: 2px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: darkgray;
  color: #333;
  overflow: hidden;
}

.el-main {
  background-color: #e9eef3;
}
.red {
  color: red !important;
}
.disable {
  color: #e9e9e9 !important;
}
</style>
