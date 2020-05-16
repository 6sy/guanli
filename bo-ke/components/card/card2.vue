<template>
  <div class='profile'>
    <!-- 头像 -->
    <div class='imghead'><img src=""
           alt=""></div>
    <p class='p1'>做一个较真的程序员</p>
    <div class='mes'>
      <!-- 网站信息 -->
      <div v-for='(item,index) in netMes'
           :key='index'
           :class='index===2?"border":""'>
        <p style='color:black;letter-spacing:2px'>{{item.msg}}</p>
        <p style='margin-top:10px;color:deeppink;opacity:0.5;font-size:18px'>{{item.num}}</p>
      </div>
    </div>
    <!-- 个人信息 -->
    <div class='attentionMe'>--关注我--</div>
    <div class='attention'>
      <div title="微信"><span class='iconfont icon-weixin'
              style='color:green'></span></div>
      <div title="掘金"><span class='iconfont icon-juejin'
              style='color:blue'></span></div>
      <div title='github'><span class='iconfont icon-git'></span></div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      netMes: [{
        msg: '原创',
        num: '10'
      }, {
        msg: '浏览量',
        num: '1500'
      }, {
        msg: '评论',
        num: '73'
      }]

    }
  }
}
</script>
<style scoped>
.profile {
  width: 300px;
  height: 300px;
  padding: 5px;
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif !important;
  background: white;
  font-size: 15px;
  -moz-box-shadow: -4px 5px 6px #0a1c12;
  -webkit-box-shadow: -4px 5px 6px #0a1c12;
  box-shadow: -4px 5px 6px #0a1c12;
}
.imghead {
  width: 80px;
  height: 80px;
  border: 1px solid red;
  margin: 10px auto;
  border-radius: 100%;
}
.profile .p1 {
  text-align: center;
  color: deeppink;
  animation-name: toColor;
  animation-duration: 1.2s;
  animation-iteration-count: infinite;
}
.mes {
  display: flex;
  margin-top: 15px;
  border-bottom: 1px solid #e9e9e9;
}
.mes div {
  color: white;
  flex: 1;
  text-align: center;
  border-right: 1px solid #e9e9e9;
}
.attentionMe {
  color: rgb(98, 169, 235);
  padding-top: 10px;
  animation-name: toMove;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: linear;
}
.attention {
  display: flex;
  margin-top: 10px;
}
.attention div {
  flex: 1;
  font-size: 40px;
  text-align: center;
  cursor: pointer;
}
.attention div span {
  font-size: 40px;
  border-radius: 100%;
  overflow: hidden;
}
.border {
  border: none !important;
}
@keyframes toColor {
  from {
    color: black;
    opacity: 0.2;
  }
  to {
    color: deeppink;
    opacity: 1;
  }
}
@keyframes toMove {
  from {
    margin-left: 0;
  }
  to {
    margin-left: 220px;
  }
}
</style>