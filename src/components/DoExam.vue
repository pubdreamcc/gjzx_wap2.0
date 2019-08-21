<template>
  <div class="doexam clearMargin_top">
    <div class="header"><a href="#/myexam"><img src="../assets/imgs/live_direction_left@2x.png"></a><span>{{countdown}}</span></div>
    <div class="task_explain">
      <p class="title">考试说明：</p>
      <p class="chapter">{{courseName}}</p>
      <p class="section" v-if="knowPointName">{{knowPointName}}</p>
    </div>
    <div class="task_content clearMargin_top">
      <div class="task_questions" v-for="item in singleQuestions" :key="item.questionId">
        <span class="type">单选</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options">
          <li v-for="(item2, index) in item.questItems" :key="index"><img src="../assets/imgs/correct@2x.png" v-show="item2.selectItem"><span class="option_word" @click="selectSingleOption(item.questionId, item2.itemsNo, $event)" v-show="item2.selectItem === null">{{item2.itemsNo}}</span><span class="option_content">{{item2.subject}}</span></li>
        </ul>
      </div>
      <div class="task_questions" v-for="item in manyQuestions" :key="item.questionId">
        <span class="type">多选</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options">
          <li v-for="(item2, index) in item.questItems" :key="index"><img src="../assets/imgs/correct@2x.png" v-show="item2.selectItem" @click="selectManyOption(item.questionId, $event, item2.itemsNo)"><span class="option_word" @click="selectManyOption(item.questionId, $event, item2.itemsNo)" v-show="item2.selectItem === null">{{item2.itemsNo}}</span><span class="option_content">{{item2.subject}}</span></li>
        </ul>
      </div>
      <div class="task_questions" v-for="item in judgeQuestions" :key="item.questionId">
        <span class="type">判断题</span>
        <p class='question_title'><span>{{item.questionNo}}.</span>{{item.questionTitle}}</p>
        <ul class="question_options">
          <li><img src="../assets/imgs/correct@2x.png" v-show="item.selAnswer === 'right'"><span class="option_word" @click="selectJudgeOption(item.questionId, $event, 1)" v-show="item.selAnswer === null || item.selAnswer === 'error'"></span><span class="option_content">正确</span></li>
          <li><img src="../assets/imgs/correct@2x.png" v-show="item.selAnswer === 'error'"><span class="option_word" @click="selectJudgeOption(item.questionId, $event, 0)" v-show="item.selAnswer === 'right' || item.selAnswer === null"></span><span class="option_content">错误</span></li>
        </ul>
      </div>
    </div>
    <div class="submit" @click="submitExam">立即提交</div>
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
      singleQuestions: [],
      manyQuestions: [],
      judgeQuestions: [],
      countdown: '00-30-00',
      flag: false,
      examSheetId: '',
      timer: 0
    }
  },
  mounted () {
    // 发送ajax请求得到考试信息
    const courseId = this.$route.query.courseId || this.$route.query.id
    const userId = localStorage.getItem('userID')
    const institutionId = 10001
    const examType = this.$route.query.examType
    const id = this.$route.query.chapterId
    if (id) {
      axios.get(`http://www.gjzxedu.com/exam/rest/v1/knowPoint/getChaperName?courseId=${courseId}&userId=${userId}&id=${id}&institutionId=${institutionId}`).then(res => {
        const ret = res.data.data
        this.courseName = ret.courseName
        this.knowPointName = ret.knowPointName
      })
      axios.get(`http://www.gjzxedu.com/exam/rest/v1/exam/stuPaper?examType=${examType}&courseId=${courseId}&equipmentType=3&institutionId=10001&userId=${userId}&chapterId=${id}`).then(res => {
        const ret = res.data.data
        this.examSheetId = ret.examPaperDto.examSheetId
        if (ret.examPaperDto.singleSelectsQuestions) {
          this.singleQuestions = ret.examPaperDto.singleSelectsQuestions
        }
        if (ret.examPaperDto.mulSelectsQuestions) {
          this.manyQuestions = ret.examPaperDto.mulSelectsQuestions
        }
        if (ret.examPaperDto.judgeSelectsQuestions) {
          this.judgeQuestions = ret.examPaperDto.judgeSelectsQuestions
        }
      })
    } else {
      axios.get(`http://www.gjzxedu.com/exam/rest/v1/knowPoint/getChaperName?courseId=${courseId}&userId=${userId}&institutionId=${institutionId}`).then(res => {
        const ret = res.data.data
        this.courseName = ret.courseName
      })
      axios.get(`http://www.gjzxedu.com/exam/rest/v1/exam/doMocks?examType=${examType}&courseId=${courseId}&equipmentType=3&institutionId=10103&userId=${userId}&chapterId=`).then(res => {
        const ret = res.data.data
        this.examSheetId = ret.examPaperDto.examSheetId
        if (ret.examPaperDto.singleSelectsQuestions) {
          this.singleQuestions = ret.examPaperDto.singleSelectsQuestions
        }
        if (ret.examPaperDto.mulSelectsQuestions) {
          this.manyQuestions = ret.examPaperDto.mulSelectsQuestions
        }
        if (ret.examPaperDto.judgeSelectsQuestions) {
          this.judgeQuestions = ret.examPaperDto.judgeSelectsQuestions
        }
      })
    }
    this.$nextTick(() => {
      let totalTime = 1800
      let minute, second
      this.timer = setInterval(() => {
        totalTime--
        minute = parseInt(totalTime / 60)
        second = parseInt(totalTime % 60)
        this.countdown = `00-${minute}-${second}`
        if (totalTime === 0) {
          alert('考试时间到，请确定，系统会自动提交试卷~')
          clearInterval(this.timer)
          // 发送Ajax提交考试
          axios.post(`http://www.gjzxedu.com/exam/rest/v1/exam/submitPaper?examSheetId=${this.examSheetId}`).then(res => {
            this.$router.replace({
              name: 'ExamRead',
              query: {
                examType: this.$route.query.examType,
                userId: localStorage.getItem('userID'),
                courseId: this.$route.query.courseId || this.$route.query.id,
                chapterId: this.$route.query.chapterId,
                examSheetId: this.examSheetId
              }
            })
          })
        }
      }, 1000)
    })
  },
  methods: {
    selectSingleOption (id, i, ev) {
      let allSpan = ev.target.parentNode.parentNode.getElementsByTagName('span')
      for (let index = 0; index < allSpan.length; index++) {
        const element = allSpan[index]
        element.style.display = 'inline-block'
      }
      let allImg = ev.target.parentNode.parentNode.getElementsByTagName('img')
      for (let index = 0; index < allImg.length; index++) {
        const element = allImg[index]
        element.style.display = 'none'
      }
      ev.target.previousSibling.style.display = 'inline'
      ev.target.style.display = 'none'
      // 发送Ajax请求保存用户的答题信息
      axios.post(`http://www.gjzxedu.com/exam/rest/v1/exam/saveTestPaper?sysn=false&questionId=${id}&examSheetId=${this.examSheetId}&result=${i}&questionType=1`).then(res => {
        console.log(res.data)
      })
    },
    selectJudgeOption (id, ev, num) {
      let allImg = ev.target.parentNode.parentNode.getElementsByTagName('img')
      let allSpan = ev.target.parentNode.parentNode.getElementsByTagName('span')
      for (let index = 0; index < allImg.length; index++) {
        const element = allImg[index]
        element.style.display = 'none'
      }
      for (let index = 0; index < allSpan.length; index++) {
        const element = allSpan[index]
        element.style.display = 'inline-block'
      }
      ev.target.style.display = 'none'
      ev.target.previousSibling.style.display = 'inline'
      axios.post(`http://www.gjzxedu.com/exam/rest/v1/exam/saveTestPaper?sysn=false&questionId=${id}&examSheetId=${this.examSheetId}&result=${num}&questionType=7`).then(res => {
        console.log(res.data)
      })
    },
    selectManyOption (id, ev, i) {
      if (ev.target.nodeName === 'SPAN') {
        ev.target.style.display = 'none'
        ev.target.previousSibling.style.display = 'inline'
        let params = ''
        let allImgs = ev.target.parentNode.parentNode.getElementsByTagName('img')
        for (let index = 0; index < allImgs.length; index++) {
          if (allImgs[index].style.display === 'inline') {
            params = params + allImgs[index].nextSibling.innerHTML + '@@@@@'
          }
        }
        let indexNum = params.lastIndexOf('@@@@@')
        params = params.substring(0, indexNum)
        axios.post(`http://www.gjzxedu.com/exam/rest/v1/exam/saveTestPaper?sysn=false&questionId=${id}&examSheetId=${this.examSheetId}&result=${params}&questionType=3`).then(res => {
          console.log(res.data)
        })
      } else if (ev.target.nodeName === 'IMG') {
        ev.target.nextSibling.style.display = 'inline-block'
        ev.target.style.display = 'none'
        let params2 = ''
        let allImgs2 = ev.target.parentNode.parentNode.getElementsByTagName('img')
        for (let index = 0; index < allImgs2.length; index++) {
          if (allImgs2[index].style.display === 'inline') {
            params2 = params2 + allImgs2[index].nextSibling.innerHTML + '@@@@@'
          }
        }
        let indexNum2 = params2.lastIndexOf('@@@@@')
        params2 = params2.substring(0, indexNum2)
        axios.post(`http://www.gjzxedu.com/exam/rest/v1/exam/saveTestPaper?sysn=false&questionId=${id}&examSheetId=${this.examSheetId}&result=${params2}&questionType=3`).then(res => {
          console.log(res.data)
        })
      }
    },
    submitExam () {
      // 判断考试有没有做完
      // 判断题目有没全部完成
      let allUL = document.getElementsByClassName('question_options')
      for (let index = 0; index < allUL.length; index++) {
        this.flag = false
        for (let i = 0; i < allUL[index].getElementsByTagName('img').length; i++) {
          if (window.getComputedStyle(allUL[index].getElementsByTagName('img')[i], null).display === 'inline') {
            this.flag = true
          }
        }
        if (this.flag === false) {
          alert('题目没有做完，不能交卷！')
          return
        }
      }
      // 发送Ajax请求提交考试
      axios.post(`http://www.gjzxedu.com/exam/rest/v1/exam/submitPaper?examSheetId=${this.examSheetId}`).then(res => {
        this.$router.replace({
          name: 'ExamRead',
          query: {
            examType: this.$route.query.examType,
            userId: localStorage.getItem('userID'),
            courseId: this.$route.query.courseId || this.$route.query.id,
            chapterId: this.$route.query.chapterId,
            examSheetId: this.examSheetId
          }
        })
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
  .doexam{
    background:rgba(242,242,242,1);
    &::after{
      display: block;
      height: 96px;
      content: '',
    }
    .header{
      position: fixed;
      top: 0;
      left: 0;
      width:750px;
      background-color: #fff;
      height:128px;
      a{
        position: absolute;
        left: 24px;
        top: 62px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 282px;
        top: 56px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
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
      top: 128px;
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
