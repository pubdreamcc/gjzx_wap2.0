<template>
  <div class="task clearMargin_top">
    <div class="header"><a href="javascript:;" @click="backCourseDetail"><img src="../assets/imgs/live_lift@2x.png"></a><span>{{courseName}}</span></div>
    <div class="task_explain">
      <p class="title">作业说明：</p>
      <p class="chapter">{{chapterName}}</p>
      <p class="section">{{knowPointName}}</p>
    </div>
    <div class="task_content clearMargin_top">
      <div class="task_questions" v-for="(item, index) in singleQuestions" :key="index">
        <span class="type">单选</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options" title="">
          <li v-for="(item, index) in item.questItems" :key="index"><img src="../assets/imgs/correct@2x.png" v-if="false"><span v-else class="option_word" @click="selectOption()">{{item.itemsNo}}</span><span class="option_content">{{item.subject}}</span></li>
        </ul>
      </div>
      <div class="task_questions" v-for="(item, index) in manyQuestions" :key="index">
        <span class="type">多选</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options">
          <li v-for="(item, index) in item.questItems" :key="index"><img src="../assets/imgs/correct@2x.png" v-if="false"><span v-else class="option_word">{{item.itemsNo}}</span><span class="option_content">{{item.subject}}</span></li>
        </ul>
      </div>
      <div class="task_questions" v-for="(item, index) in judgeQuestions" :key="index">
        <span class="type">判断题</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options">
          <li><img src="../assets/imgs/correct@2x.png" v-if="false"><span v-else class="option_word"></span><span class="option_content">正确</span></li>
          <li><img src="../assets/imgs/correct@2x.png" v-if="false"><span v-else class="option_word"></span><span class="option_content">错误</span></li>
        </ul>
      </div>
    </div>
    <div class="submit">立即提交</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      courseName: '',
      knowPointName: '',
      chapterName: '',
      singleQuestions: [],
      manyQuestions: [],
      judgeQuestions: [],
      selectIndex: ''
    }
  },
  created () {
    // 发送Ajax请求得到问题相关的信息
    axios.get(`http://www.gk0101.com/exam/rest/v1/knowPoint/getChaperName?courseId=${this.$route.query.courseId}&userId=${localStorage.getItem('userID')}&id=${this.$route.query.knowPointId}&institutionId=10103`).then(res => {
      const result = res.data.data
      this.courseName = result.courseName
      this.chapterName = result.chapterName
      this.knowPointName = result.knowPointName
    })
    axios.get(`http://www.gk0101.com/exam/rest/v1/exam/stuPaper?examType=0&courseId=${this.$route.query.courseId}&equipmentType=3&institutionId=10103&userId=${localStorage.getItem('userID')}&knowPointId=${this.$route.query.knowPointId}`).then(res => {
      const result = res.data.data.examPaperDto
      if (result.singleSelectsQuestions) {
        this.singleQuestions = result.singleSelectsQuestions
      }
      if (result.mulSelectsQuestions) {
        this.manyQuestions = result.mulSelectsQuestions
      }
      if (result.judgeSelectsQuestions) {
        this.judgeQuestions = result.judgeSelectsQuestions
      }
    })
  },
  methods: {
    backCourseDetail () {
      this.$router.go(-1)
    },
    selectOption () {
      console.log(123)
    }
  }
}
</script>

<style lang="scss" scoped>
  .task{
    background:rgba(242,242,242,1);
    &::after{
      display: block;
      height: 96px;
      content: '',
    }
    .header{
      width:750px;
      height:128px;
      background: #3246D8;
      position: fixed;
      top: 0;
      left: 0;
      a{
        position: absolute;
        left: 24px;
        top: 64px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 56px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color: #fff;
        line-height:56px;
      }
    }
    .task_explain{
      width:702px;
      height:212px;
      background:rgba(255,255,255,1);
      border-radius:12px;
      margin: 0 auto 0;
      padding: 32px 0 0 26px;
      position: fixed;
      top: 150px;
      left: 24px;
      box-sizing: border-box;
      .title{
        width:144px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:40px;
      }
      .chapter{
        margin-top: 20px;
        height:40px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
      }
      .section{
        margin-top: 14px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:40px;
      }
    }
    .task_content{
      margin-top: 386px;
      .task_questions{
        width:702px;
        background:rgba(255,255,255,1);
        border-radius:12px;
        margin: 0 auto 22px;
        padding-top: 52px;
        box-sizing: border-box;
        .type{
          display: inline-block;
          margin-left: 24px;
          width:96px;
          line-height: 48px;
          text-align: center;
          font-size:24px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          height:48px;
          background:rgba(242,242,242,1);
          border-radius:24px 24px 0px 24px;
          vertical-align: top;
        }
        .question_title{
          display: inline-block;
          margin-left: 24px;
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:44px;
          width: 550px;
        }
        .question_options{
          margin-top: 30px;
          li{
            margin-bottom: 24px;
            .option_word{
              display: inline-block;
              width:48px;
              height:48px;
              font-size:28px;
              line-height: 48px;
              text-align: center;
              border-radius:24px;
              border:2px solid rgba(51,51,51,1);
              margin-left: 38px;
              margin-right: 14px;
              vertical-align: middle;
            }
            img{
              width:60px;
              height:60px;
              margin-left: 32px;
              margin-right: 8px;
              vertical-align: middle;
            }
            .option_content{
              display: inline-block;
              width: 597px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              font-size:28px;
              color:rgba(51,51,51,1);
              vertical-align: middle;
            }
          }
        }
      }
    }
    .submit{
      position: fixed;
      bottom: 0;
      left: 0;
      height: 96px;
      background:rgba(50,70,216,1);
      text-align: center;
      line-height: 96px;
      font-size:34px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      width: 750px;
    }
  }
</style>
