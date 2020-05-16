<template>
  <div class='tag'>
    <div>标签云集</div>
    <div>
      <span v-for='(item,index) in tags'
            :key='index'>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tags: ['vue', 'js', 'http', 'css', 'vue', 'js', 'http', 'css']
    }
  }
}
</script>
<style scoped>
.tag {
  width: 300px;
  height: 300px;
  background: white;
  padding: 5px;
  -moz-box-shadow: -4px 5px 6px #0a1c12;
  -webkit-box-shadow: -4px 5px 6px #0a1c12;
  box-shadow: -4px 5px 6px #0a1c12;
}
.tag div:nth-child(1) {
  font-weight: 600;
  font-size: 20px;
  height: 30px;
  border-bottom: 1px solid #e9e9e9;
  padding-bottom: 5px;
  margin-bottom: 5px;
}
.tag div:nth-child(2) {
  display: flex;
  flex-flow: wrap;
}
.tag div:nth-child(2) span {
  padding: 5px 10px;
  border: 1px solid deeppink;
  margin: 5px;
  border-radius: 10px;
  color: deeppink;
}
</style>