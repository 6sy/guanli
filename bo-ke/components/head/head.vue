<template>
  <div class='head'>
    <div>
      <p><span style='color:#E6A23C'>六六</span>的博客</p>
    </div>
    <ul>
      <li v-for='(item,index) in header'
          :key='index'
          @click='choseIndex(index)'>
        <span :class='currrentIndex==index?"chose":""'>{{item}}</span>
      </li>
    </ul>
    <div><input type="text"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      header: ['网站首页', '个人简历', '博客文章', '生活', '天文', '留言'],
      currrentIndex: 0
    }
  },
  methods: {
    choseIndex (index) {
      this.currrentIndex = index
      if (index === 0) {
        this.$router.push('/')
        return
      }
      else if (index === 1) {
        window.open('')
      } else if (index === 2) {
        this.$router.push('/blogs')
        return
      }
      else if (index === 3) {
        this.$router.push('/living')
        return
      }
      else if (index === 4) {
        this.$router.push('/tianwen')
        return
      } else if (index === 5) {
        this.$router.push('/coments')
      }
    }
  }
}
</script>
<style scoped>
.head {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: 15px;
  padding-top: 10px;
  color: white;
  background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584785318890&di=2c6a1f0fa8fd50d1867df149f1f16fac&imgtype=0&src=http%3A%2F%2Fimg3.100bt.com%2Fupload%2Fttq%2F20130310%2F1362899114090.jpg);
}
.head div {
  text-align: center;
}
.head div:nth-child(1) {
  flex: 3;
}
.head div:nth-child(1) p {
  font-size: 20px;
  animation-name: fadein;
  animation-duration: 2s;
  animation-timing-function: ease;
}
ul {
  display: flex;
  flex: 3;
}
ul li {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
ul li span:hover {
  border-radius: 100%;
  box-shadow: 2px 4px 3px 5px deeppink;
  opacity: 0.9;
}
ul li span {
  padding-bottom: 6px;
}
.head div:nth-child(3) {
  flex: 2;
}
.head div:nth-child(3) input {
  width: 200px;
  height: 23px;
  position: relative;
  top: -3px;

  -webkit-appearance: none;
  outline: none;
  border: none;
  background: #e3e3e3;
  border-radius: 10px;
  padding: 0 13px;
}
.chose {
  color: deeppink;
  animation-name: color;
  animation-duration: 0.5s;
}
@keyframes color {
  from {
    color: black;
    font-size: 15px;
  }
  to {
    color: deeppink;
    font-size: 20px;
  }
}

@keyframes fadein {
  0% {
    opacity: 0;
    margin-left: -200px;
  }
  25% {
    opacity: 0.5;
    margin-left: -75px;
  }
  50% {
    opacity: 0.7;
    margin-left: -50px;
  }
  70% {
    opacity: 0.85;
    margin-left: -25px;
  }

  100% {
    opacity: 1;
    margin-left: 0px;
  }
}
</style>
