<template>
  <div class="task clearMargin_top">
    <div class="header"><a href="javascript:;" @click="back"><img src="../assets/imgs/live_lift@2x.png"></a><span>{{courseName}}</span></div>
    <div class="task_explain">
      <p class="title">作业说明：</p>
      <p class="chapter">{{chapterName}}</p>
      <p class="section">{{knowPointName}}</p>
    </div>
    <div class="task_content clearMargin_top">
      <div class="task_questions" v-for="item in singleQuestions" :key="item.questionId">
        <span class="type">单选</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options">
          <li v-for="(item2, index) in item.questItems" :key="index"><img src="../assets/imgs/correct@2x.png" v-show="item2.selectItem"><span class="option_word" v-show="item2.selectItem === null">{{item2.itemsNo}}</span><span class="option_content">{{item2.subject}}</span></li>
        </ul>
        <div class="analysis">
          <p class="analysis_answer"><span>答案：</span><img src='../assets/imgs/correct@2x.png' v-if="item.result"><img src="../assets/imgs/mistake@2x.png" v-else><span v-show="!item.result">正确答案：{{item.questionAnswer}}</span></p>
          <p class="analysis_content" :class="{'active': item.questionAnalysis.length > 44}">解析：{{item.questionAnalysis}}</p>
          <span v-show="item.questionAnalysis.length > 44" class="more" @click="lookMore($event)">查看更多</span>
        </div>
      </div>
      <div class="task_questions" v-for="item in manyQuestions" :key="item.questionId">
        <span class="type">多选</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options">
          <li v-for="(item2, index) in item.questItems" :key="index"><img src="../assets/imgs/correct@2x.png" v-show="item2.selectItem"><span class="option_word" v-show="item2.selectItem === null">{{item2.itemsNo}}</span><span class="option_content">{{item2.subject}}</span></li>
        </ul>
        <div class="analysis">
          <p class="analysis_answer"><span>答案：</span><img src='../assets/imgs/correct@2x.png' v-if="item.result"><img src="../assets/imgs/mistake@2x.png" v-else><span v-show="!item.result">正确答案：{{item.questionAnswer}}</span></p>
          <p class="analysis_content" :class="{'active': item.questionAnalysis.length > 44}">解析：{{item.questionAnalysis}}</p>
          <span v-show="item.questionAnalysis.length > 44" class="more" @click="lookMore($event)">查看更多</span>
        </div>
      </div>
      <div class="task_questions" v-for="item in judgeQuestions" :key="item.questionId">
        <span class="type">判断题</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options">
          <li><img src="../assets/imgs/correct@2x.png" v-show="item.selAnswer === 'right'"><span class="option_word" v-show="item.selAnswer === null || item.selAnswer === 'error'"></span><span class="option_content">正确</span></li>
          <li><img src="../assets/imgs/correct@2x.png" v-show="item.selAnswer === 'error'"><span class="option_word" v-show="item.selAnswer === 'right' || item.selAnswer === null"></span><span class="option_content">错误</span></li>
        </ul>
        <div class="analysis">
          <p class="analysis_answer"><span>答案：</span><img src='../assets/imgs/correct@2x.png' v-if="item.result"><img src="../assets/imgs/mistake@2x.png" v-else><span v-show="!item.result">正确答案：{{item.questionAnswer === '0'?'错误':'正确'}}</span></p>
          <p class="analysis_content" :class="{'active': item.questionAnalysis.length > 44}">解析：{{item.questionAnalysis}}</p>
          <span v-show="item.questionAnalysis.length > 44" class="more" @click="lookMore($event)">查看更多</span>
        </div>
      </div>
    </div>
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
      judgeQuestions: []
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
    axios.get(`http://www.gk0101.com/exam/rest/v1/exam/stuPaper?examType=0&courseId=${this.$route.query.courseId}&institutionId=10103&userId=${localStorage.getItem('userID')}&knowPointId=${this.$route.query.knowPointId}`).then(res => {
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
    back () {
      this.$router.go(-1)
    },
    lookMore (ev) {
      if (ev.target.previousElementSibling.className === 'analysis_content active') {
        ev.target.previousElementSibling.className = 'analysis_content'
        ev.target.innerHTML = '点击收起'
      } else {
        ev.target.innerHTML = '查看更多'
        ev.target.previousElementSibling.className = 'analysis_content active'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .task{
    background:rgba(242,242,242,1);
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
        padding-bottom: 24px;
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
          width: 540px;
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
        .analysis{
          width:654px;
          background:rgba(242,242,242,1);
          border-radius:8px;
          margin: 0 auto;
          padding-left: 24px;
          box-sizing: border-box;
          .analysis_answer{
            max-height:99999px;
            font-size:34px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:60px;
            img{
              width: 60px;
              height: 60px;
              margin: 0 10px;
              vertical-align: middle;
            }
            span{
              vertical-align: middle;
            }
          }
          .analysis_content{
            margin-top: 6px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:40px;
            max-height: 999999px;
            &.active{
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .more{
            color: #3246D8;
            font-size:32px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            height: 48px;
            margin-top: 15px;
            display: inline-block;
          }
        }
      }
    }
  }
</style>
