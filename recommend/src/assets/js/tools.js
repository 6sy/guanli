let obj = {}
obj.translatePath = function (path) {
  if (path = '/userList') return ''

}

computed: {
  isDisabled(path) {

    // 转换power


  }
},

function formDate (dateForm) {
  if (dateForm === "") {  //解决deteForm为空传1970-01-01 00:00:00
    return "";
  } else {
    var dateee = new Date(dateForm).toJSON();
    var date = new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    return date;
  }
}






userList
power
articleList
commentList
addArticle
lookNote
viewAnalyse
journalNotes


saveMd(value, render) {
  // console.log(render);
  this.value = render
},
changeMd(value, render) {
  this.value = render
},
imgAdd(pos, file) {
  var formData = new FormData()
  formData.append('file', file)
  axios({
    url: 'http://127.0.0.1:4000/api/article/uploadImg',//请求地址
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((url) => {
    this.$refs.md.$img2Url(pos, 'http://127.0.0.1:4000/' + url.data.url)
  })
},
imgDel() {
  console.log(2)
}








export default obj