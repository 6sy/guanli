<template>
  <div class='comments'>
    <!-- 左边区域 -->
    <div>
      <h3>欢迎来到六六的留言榜</h3>
      <!-- 警示 -->
      <div class='alert'>
        <p>公告：</p>
        <p>1.本站未开通文章评论，有什么问题请在此留言。</p>
        <p>2.禁止发不文明词汇，否则要关小黑屋哦</p>
        <p>3.有需要的请加微信联系哦</p>
      </div>
      <!-- 留言 -->
      <div class='liuyanban'>
        <p>留言板</p>
        <div class='inputs'>
          <p>您的姓名:<input type="text"
                   v-model='msg.name'></p>
          <p>联系方式:<input type="text"
                   v-model='msg.phone'></p>
        </div>
        <textarea name=""
                  id=""
                  cols="38"
                  rows="8"
                  placeholder="留言内容"
                  v-model='msg.text'></textarea>
        <div class='comit'>
          <div></div>
          <div><button @click='uploadComment'>提交</button></div>
        </div>
      </div>
      <!-- 全部留言 -->
      <div class='allComment'>
        <div class='commentItem'
             v-for='(item,index) in commentsList'
             :key='index'>
          <img :src="item.img"
               alt="">
          <div>
            <p class='p1'><span style='font-size:15px'>{{item.name}}:</span><span>{{item.time}}</span></p>
            <p class='p2'>{{item.text}}</p>
          </div>
        </div>
      </div>
    </div>
    <cardAll class='right'></cardAll>
  </div>
</template>
<script>
import cardAll from '@/components/card/cardAll'
export default {
  components: {
    cardAll
  },
  data () {
    return {
      commentsList: [],
      msg: {
        name: '',
        phone: '',
        text: '',
      }
    }
  },
  created () {
    this.getComment()
  },
  methods: {
    // 上传留言
    async uploadComment () {
      console.log(this.msg)
      const result = await this.$http({
        method: 'post',
        url: 'api/comments/upload',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        data: this.$qs.stringify(this.msg)
      })
      if (result.data.success) {
        this.getComment()
      }
    },
    // 获取留言
    async  getComment () {
      const result = await this.$http({
        method: 'get',
        url: 'api/comments/getCommentsV',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      console.log(result.data.data)
      this.commentsList = result.data.data
    }
  }
}
</script>
<style lang="less" scoped>
.comments {
  display: flex;
  width: 1260px;
  margin: 20px auto;
  position: relative;
}
.right {
  margin-left: 60px;
}
.comments div:nth-child(1) {
  width: 840px;
  padding: 10px;
  background: white;
  h3 {
    color: deeppink;
    text-align: center;
    letter-spacing: 1.2px;
  }
  .alert {
    font-size: 16px;
    color: #e3e3e3;
    text-align: center;
    margin-top: 12px;
    letter-spacing: 1.1px;
  }
  .liuyanban > p {
    font-weight: 600;
    font-size: 18px;
    border-bottom: 3px solid black;
  }
  textarea {
    font-size: 20px;
    list-style: none;
    outline: none;
    padding: 10px;
    margin: 10px 200px;
  }
  .inputs {
    letter-spacing: 1px;
    margin: 15px;
    display: flex;
    justify-content: space-around;
    input {
      padding: 1px 6px;
      outline: none;
      border: none;
      border: 1px solid #e9e9e9;
      border-radius: 10px;
      height: 25px;
      margin-left: 3px;
    }
  }
  .comit {
    display: flex;
    height: 50px;
    border-bottom: 1px solid #e9e9e9;
    div {
      flex: 1;
      button {
        border: none;
        outline: none;
        border-radius: 5px;
        margin-left: 230px;
        height: 30px;
        width: 50px;
        background: darkslategrey;
        color: white;
      }
    }
  }
  .allComment {
    box-sizing: border-box;
    width: 100%;
    padding: 15px 100px;
    .commentItem {
      width: 100%;
      display: flex;
      padding: 10px;
      margin-bottom: 10px;
      img {
        width: 45px;
        height: 45px;
      }
      div {
        padding-left: 10px;

        .p1 {
          width: 570px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 12px;
        }
        .p2 {
          background: rgba(150, 200, 200, 0.2);
          font-size: 13px;
          letter-spacing: 1.2px;
          padding: 3px;
          font-size: 15px;
          width: 570px;
          word-break: break-all;
        }
      }
    }
  }
}
</style>