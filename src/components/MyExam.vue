<template>
  <div class="myexam">
    <div class="header"><a href="#/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>我的考试</span></div>
    <ul class="taskClass" ref="taskClass">
      <li @click="select('type')" :class="{active: activeFlag === 'type'}">类型<span :class="{active: activeFlag === 'type'}"></span></li>
      <li @click="select('course')" :class="{active: activeFlag === 'course'}">所属课程<span :class="{active: activeFlag === 'course'}"></span></li>
      <li @click="select('state')" :class="{active: activeFlag === 'state'}">状态<span :class="{active: activeFlag === 'state'}"></span></li>
    </ul>
    <div class="class_content" v-show="repeat">
      <p v-for="(item, index) in classes" :key="index" :class="{'activeCourse': name === item.courseName}" @click="selectExam(item.courseName, $event)">{{item.courseName}}</p>
    </div>
    <div class="load_wrap" v-show="loadingFlag"><img src="../assets/imgs/loading.gif" class="loading"><span class="load_span">{{msg01}}</span></div>
    <div class="wrap" ref="wrap">
      <ul class="Exam_content">
        <li v-for="(exam, index) in exams" :key="index" @click="goDoExam(exam.examType, exam.id, exam.courseId, exam.chapterId, exam.examStatus)">
          <img :src="'http://www.gk0101.com'+exam.coverImg">
          <span class="exam_name">{{exam.courseName}}</span>
          <span class="exam_title">{{exam.knowPointName}}</span>
          <span class="exam_score">得分：<span>{{exam.examSheetScore}}</span></span>
          <span :class="{'exam_type': exam.examType === 12, 'exam_type_chapter': exam.examType !== 12}">{{exam.examType === 12 ? '综合模拟':'章节测验'}}</span>
          <span :class="{'exam_progress': exam.examStatus === '已完成', 'exam_progress_unfinished': exam.examStatus === '未完成', 'exam_progress_null':  exam.examStatus === null}">{{exam.examStatus === null ? '' : exam.examStatus}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
  name: '',
  data () {
    return {
      activeFlag: '',
      repeat: false,
      classes: [],
      name: '',
      loadingFlag: false,
      msg01: '玩命加载中~',
      examStatus: -1,
      examType: -1,
      exams: []
    }
  },
  mounted () {
    // 发送Ajax请求得到考试课程信息
    axios.get(`http://www.gk0101.com/teach/rest/v1/course/getMyStudyCourse?userId=${localStorage.getItem('userID')}&courseId=`).then(res => {
      const result = res.data.data
      this.exams = result
      this.exams.forEach(item => {
        item.examType = 12
      })
      axios.get(`http://www.gk0101.com/exam/rest/v1/studySheet/getStudyChapter?userId=${localStorage.getItem('userID')}&courseId=`).then(res => {
        const result = res.data.data
        result.forEach(item => {
          item.examType = 3
          this.exams.push(item)
        })
        axios.get(`http://www.gk0101.com/exam/rest/v1/examSheet/myExam?pageNo=1&pageSize=10&examType=-1&institutionId=10103&userId=${localStorage.getItem('userID')}&examStatus=-1&courseId=`).then(res => {
          const result = res.data.data.result
          result.forEach(item => {
            if (item.examStatus === 1) {
              item.examStatus = '未完成'
            } else if (item.examStatus === 9) {
              item.examStatus = '已完成'
            }
            this.exams.push(item)
          })
          this.$nextTick(() => {
            // 初始化better-scroll
            this.myScroll = new BScroll(this.$refs.wrap, {
              scrollY: true,
              click: true,
              probeType: 3,
              pullDownRefresh: {
                threshold: 50
              }
            })
            this.myScroll.on('pullingDown', () => {
              this.loadingFlag = true
              setTimeout(() => {
                this.loadingFlag = false
                this.myScroll.finishPullDown()
              }, 2000)
            })
          })
        })
      })
    })
  },
  methods: {
    select (str) {
      switch (str) {
        case 'type':
          if (this.repeat) {
            this.activeFlag = ''
            this.repeat = false
            this.myScroll.enable()
            document.body.style.overflow = ''
          } else {
            this.activeFlag = str
            this.classes = [{courseName: '全部'}, {courseName: '章节测验'}, {courseName: '综合模拟'}, {courseName: '综合考试'}]
            this.repeat = true
            this.myScroll.disable()
            document.body.style.overflow = 'hidden'
          }
          break
        case 'course':
          if (this.repeat) {
            this.activeFlag = ''
            this.repeat = false
            this.myScroll.enable()
            document.body.style.overflow = ''
          } else {
            this.activeFlag = str
            this.classes = [{courseName: '全部'}]
            this.repeat = true
            this.myScroll.disable()
            document.body.style.overflow = 'hidden'
          }
          break
        case 'state':
          if (this.repeat) {
            this.activeFlag = ''
            this.repeat = false
            this.myScroll.enable()
            document.body.style.overflow = ''
          } else {
            this.activeFlag = str
            this.classes = [{courseName: '全部'}, {courseName: '待完成'}, {courseName: '已完成'}]
            this.repeat = true
            this.myScroll.disable()
            document.body.style.overflow = 'hidden'
          }
          break
      }
    },
    selectExam (name, ev) {
      this.name = name
      this.$refs.taskClass.getElementsByClassName('active')[0].childNodes[0].nodeValue = name
      this.repeat = false
      this.myScroll.enable()
      document.body.style.overflow = ''
      if (name === '全部') {
        if (ev.target.nextElementSibling === null) {
          console.log(123)
        } else if (ev.target.nextElementSibling.innerHTML === '章节测验') {
          this.examType = -1
        } else if (ev.target.nextElementSibling.innerHTML === '待完成') {
          this.examStatus = -1
        }
      }
      if (name === '章节测验') {
        this.examType = 3
      }
      if (name === '综合模拟') {
        this.examType = 12
      }
      if (name === '综合考试') {
        this.examType = 15
      }
      if (name === '待完成') {
        this.examStatus = 1
      }
      if (name === '已完成') {
        this.examStatus = 9
      }
      axios.get(`http://www.gk0101.com/teach/rest/v1/course/getMyStudyCourse?userId=${localStorage.getItem('userID')}&courseId=`).then(res => {
        const result = res.data.data
        this.exams = result
        this.exams.forEach(item => {
          item.examType = 12
        })
        axios.get(`http://www.gk0101.com/exam/rest/v1/studySheet/getStudyChapter?userId=${localStorage.getItem('userID')}&courseId=`).then(res => {
          const result = res.data.data
          result.forEach(item => {
            item.examType = 3
            this.exams.push(item)
          })
          axios.get(`http://www.gk0101.com/exam/rest/v1/examSheet/myExam?pageNo=1&pageSize=10&examType=${this.examType}&institutionId=10103&userId=${localStorage.getItem('userID')}&examStatus=${this.examStatus}&courseId=`).then(res => {
            const result = res.data.data.result
            result.forEach(item => {
              if (item.examStatus === 1) {
                item.examStatus = '未完成'
              } else if (item.examStatus === 9) {
                item.examStatus = '已完成'
              }
              this.exams.push(item)
            })
            this.myScroll.refresh()
          })
        })
      })
    },
    goDoExam (examType, id, courseId, chapterid, examStatus) {
      if (examStatus === '已完成') {
        this.$router.push({
          name: 'ExamRead',
          query: {
            examType: examType,
            userId: localStorage.getItem('userID'),
            courseId: courseId,
            chapterId: chapterid,
            examSheetId: id
          }
        })
      } else {
        this.$router.push({
          name: 'DoExam',
          query: {
            examType: examType,
            id: id,
            courseId: courseId,
            chapterId: chapterid
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .myexam{
    .header{
      position: relative;
      width:750px;
      height:128px;
      background:rgba(50,70,216,1);
      z-index: 1;
      a{
        position: absolute;
        left: 24px;
        top: 58px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 294px;
        top: 62px;
        width:164px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:56px;
      }
    }
    .taskClass{
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: #fff;
      z-index: 1;
      position: relative;
      li{
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        &.active{
          color: rgba(50,70,216,1);
        }
        span{
          margin-left: 28px;
          margin-bottom: -22px;
          display: inline-block;
          width: 0;
          height: 0;
          border-width: 23px 12px;
          border-style: solid dashed dashed;
          border-color: rgba(153,153,153,1) transparent transparent;
          &.active{
            border-width: 23px 12px;
            border-style: dashed dashed solid;
            border-color: transparent transparent rgba(50,70,216,1);
            margin-bottom: -3px;
          }
        }
      }
    }
    .class_content{
      position: absolute;
      width: 100%;
      z-index: 2;
      height: 1230px;
      background-color: rgba(214,214,214, .5);
      p{
        height: 82px;
        background-color: #fff;
        line-height: 82px;
        padding-left: 22px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        opacity: 1;
        &.activeCourse{
          color: #3246D8;
        }
      }
    }
    .load_wrap{
      text-align: center;
      .loading{
        width: 100px;
        height: 100px;
        vertical-align: middle;
      }
      .load_span{
        font-size:30px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        margin-left: 20px;
        color: #999999;
      }
    }
    .wrap{
      height: 800px;
      .Exam_content{
        li{
          height: 204px;
          position: relative;
          margin-bottom: 44px;
          img{
            position: absolute;
            left: 26px;
            top: 0;
            width:272px;
            height:204px;
            border-radius:8px;
          }
          .exam_name{
            position: absolute;
            left: 316px;
            top: 0;
            width:306px;
            font-size:30px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:40px;
          }
          .exam_title{
            position: absolute;
            left: 316px;
            top: 60px;
            width: 280px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(199,199,204,1);
            line-height:34px;
          }
          .exam_score{
            position: absolute;
            left: 316px;
            bottom: 0;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            line-height: 24px;
            color: #999999;
            max-height: 99999px;
            span{
              font-size: 32px;
              color: #35C59B;
            }
          }
          .exam_type{
            position: absolute;
            right: 200px;
            bottom: 0;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color: rgba(255,96,87,1);
            line-height:34px;
          }
          .exam_type_chapter{
            position: absolute;
            right: 200px;
            bottom: 0;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,122,41,1);
            line-height:34px;
          }
          .exam_progress{
            position: absolute;
            right: 30px;
            top: 60px;
            width:108px;
            height:48px;
            background:rgba(50,70,216,1);
            border-radius:24px;
            text-align: center;
            line-height: 48px;
            color: #fff;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
          }
          .exam_progress_unfinished{
            position: absolute;
            right: 30px;
            top: 60px;
            width:108px;
            height:48px;
            background:rgba(242,242,242,1);
            color: #999999;
            border-radius:24px;
            text-align: center;
            line-height: 48px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
          }
          .exam_progress_null{
            background: none;
          }
        }
      }
    }
  }
</style>
