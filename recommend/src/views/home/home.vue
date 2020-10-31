<template>
  <div class='home' :style='{minHeight:minHeight+"px"}'>
    <div class='head' style='height:60px'>
      <span>商城后台管理系统</span></div>
    <div class='content'>
      <div class='right' ref='right' :style='{minHeight:minHeight-60+"px"}'>
        <div class='menu'>
          <div :class='["item",selectIndex==index?"selectColor":""]' v-for='(item,index) in menuList' :key='index' @click='select(index)'>
            {{item.msg}}
          </div>
        </div>
      </div>
      <div :style='{minHeight:minHeight-60+"px",width:maxWidth-150+"px"}'>
        <router-view>

        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  created(){
   this.minHeight=document.body.clientHeight
   this.maxWidth=document.body.clientWidth
  },
  mounted(){
    
  },
  data(){
    return{
      minHeight:'',
      maxWidth:'',
      menuList:[
        {msg:'用户管理'},
        {msg:'订单管理'},
        {msg:'商品管理'},
        {msg:'地址管理'}
      ],
      selectIndex:0
    }
  },
  methods:{
    select(index){
      this.selectIndex=index
      if(index==0){
        this.$router.push('/userList')
      }else if(index==1){
         this.$router.push('/order')
      } else if(index==2){
         this.$router.push('/shops')
      }else{
        this.$router.push('/adress')
      }
    }
  }
}
</script>
<style scoped>
.head{
  background: yellow;
  width:100%;
  line-height: 160px;
  text-align: center;
}
.right{
  background: cornflowerblue;
  width:150px;
}
.item{
  font-size:16px;
  color:white;
  width: 100%;
  border-bottom:0.5px solid #e3e3e3;
  padding:20px 0;
  text-align: center;
  cursor: pointer;
}
.selectColor{
  color:red
}
.content{
  display: flex;
}
.menRight{
  width:100%;
  height:100%
}
</style>