<template>
 <div class="search">
   <div class="search_input">
     <img src="../assets/imgs/course_seek@2x.png" class="search_icon">
     <input type="text" placeholder="请输入课程关键字" v-model="keywords" @keyup="searchCourse(keywords)">
     <img src="../assets/imgs/seek_close@2x.png" class="cancel_search" v-show="keywords.trim()" @click="cancelKeywords">
     <a href="/home">取消</a>
   </div>
   <div class="line"></div>
   <div class="search_tags" v-show="!keywords.trim()">
     <button v-for="(tag, index) of tags" :key="index" @click="searchCourse(tag)">{{tag}}</button>
   </div>
   <div class="course_Info" v-for="(course, index) in courses" :key="index">
     <img :src="'http://www.gk0101.com/'+course.coverImg">
     <div class="course_detail">
       <p>{{course.courseName}}</p>
       <span>{{course.totalMic}}节微课</span>
       <span>免费</span>
     </div>
   </div>
   <div class="search_error" v-show="error_flag"><img src="../assets/imgs/搜索为空@2x.png"><p>暂时没有满足条件的课程</p></div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      tags: ['我们的深圳', '文科教学', '安全教育', '哲学与人生', '数码摄影', '直播回放', '电子商务', '机械识图'],
      keywords: '',
      courses: [],
      error_flag: false
    }
  },
  components: {},
  methods: {
    searchCourse (value) {
      this.keywords = value
      if (this.keywords.trim()) {
        // 发送Ajax请求获取数据
        let keyword = this.keywords.trim()
        let URL = 'http://www.gk0101.com/teach/rest/v1/course/getCourseList?pageNo=1&pageSize=10&courseName=' + keyword
        axios.get(URL).then(res => {
          let result = res.data.data.result
          if (result.length === 0) {
            this.error_flag = true
            this.courses = []
          } else {
            this.courses = result
            this.error_flag = false
          }
        }).catch(error => {
          alert('课程搜索失败' + error)
        })
      }
    },
    cancelKeywords () {
      this.keywords = ''
    }
  },
  watch: {
    keywords (newValue, oldValue) {
      if (newValue.trim() === '') {
        this.error_flag = ''
        this.courses = []
      }
    }
  }
}
</script>

<style lang="scss">
  .search{
    margin-top: 54px;
    .search_input{
      position: relative;
      height: 64px;
      input{
        position: absolute;
        left: 22px;
        top: 0;
        border: none;
        outline: none;
        padding-left: 66px;
        box-sizing: border-box;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        width:622px;
        height:64px;
        line-height: 64px;
        background:rgba(242,242,242,1);
        border-radius:30px;
        &::-webkit-input-placeholder{
          color: #C7C7CC;
        }
      }
      .search_icon{
        position: absolute;
        left: 40px;
        top: 16px;
        width: 40px;
        height: 40px;
        z-index: 1;
      }
      .cancel_search{
        position: absolute;
        width:38px;
        height:38px;
        top: 14px;
        right: 128px;
      }
      a{
        position: absolute;
        right: 24px;
        top: 10px;
        width:58px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:40px;
      }
    }
    .line{
      margin-top: 8px;
      height:6px;
      border:1px solid rgba(242,242,242,1);
    }
    .search_tags{
      display: flex;
      padding-top: 20px;
      padding-left: 24px;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;
      button{
        width:144px;
        margin: 0 24px 24px 0;
        height:60px;
        background:rgba(242,242,242,1);
        border-radius:30px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height: 60px;
        text-align: center;
        border: none;
      }
    }
    .course_Info{
      margin-top: 20px;
      padding: 0 24px 0 20px;
      img{
        width:272px;
        height:204px;
        border-radius:8px;
      }
      .course_detail{
        float: right;
        p{
          width:414px;
          height:96px;
          font-size:34px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(0,0,0,1);
          line-height:48px;
        }
        span{
          display: block;
          &:nth-child(2){
            margin-top: 10px;
            width:106px;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(199,199,204,1);
            line-height:34px;
          }
          &:nth-child(3){
            margin-top: 20px;
            width:50px;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(53,197,155,1);
            line-height:34px;
          }
        }
      }

    }
    .search_error{
      margin-top: 108px;
      text-align: center;
      img{
        width:400px;
        height:324px;
      }
      p{
        margin-top: 12px;
        text-align: center;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:40px;
      }
    }
  }
</style>
