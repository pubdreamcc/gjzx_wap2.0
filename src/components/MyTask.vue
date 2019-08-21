<template>
  <div class="mytask">
    <div class="header"><a href="#/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>课后作业</span></div>
    <ul class="taskClass" ref="taskClass">
      <li @click="select('type')" :class="{active: activeFlag === 'type'}">类型<span :class="{active: activeFlag === 'type'}"></span></li>
      <li @click="select('course')" :class="{active: activeFlag === 'course'}">所属课程<span :class="{active: activeFlag === 'course'}"></span></li>
      <li @click="select('state')" :class="{active: activeFlag === 'state'}">状态<span :class="{active: activeFlag === 'state'}"></span></li>
    </ul>
    <div class="class_content" v-show="repeat">
      <p v-for="(item, index) in classes" :key="index" @click="selectTask(item.courseName, item.id, $event)" :class="{'activeCourse': name === item.courseName}">{{item.courseName}}</p>
    </div>
    <div class="load_wrap" v-show="loadingFlag"><img src="../assets/imgs/loading.gif" class="loading"><span class="load_span">{{msg01}}</span></div>
    <div class="wrap" ref="wrap">
      <ul class="task_content">
        <li v-for="(task, index) in tasks" :key="index" @click="goTask(task.examStatus, task.courseId, task.knowPointId)">
          <img :src="'http://www.gk0101.com'+task.coverImg">
          <span class="task_name">{{task.chapterName}}</span>
          <span class="task_title">{{task.knowPointName}}</span>
          <span :class="{'task_type': task.examType === 0, 'task_type_coursePractice': task.examType !== 0}">{{task.examType === 0 ? '练习':'课后实操'}}</span>
          <span :class="{'task_progress': task.examStatus === 9, 'task_progress_unfinished': task.examStatus !== 9}">{{task.examStatus === 9 ? '已完成':'待完成'}}</span>
        </li>
      </ul>
    </div>
    <div class="load_wrap" v-show="loadingFlag02"><img src="../assets/imgs/loading.gif" class="loading"><span class="load_span">{{msg02}}</span></div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      tasks: [],
      taskCourse: [],
      loadingFlag: false,
      pageNO: 1,
      msg01: '玩命加载中~',
      msg02: '玩命加载中~',
      loadingFlag02: false,
      activeFlag: '',
      repeat: false,
      classes: [],
      name: '',
      courseID: '',
      examType: 0,
      examStatus: -1
    }
  },
  mounted () {
    // 发送Ajax请求得到练习作业
    axios.get(`http://www.gk0101.com/teach/rest/v1/course/myExamCourse?userId=${localStorage.getItem('userID')}&institutionId=10103&examType=0`).then(res => {
      if (res.data.code === 0) {
        const result = res.data.data
        this.taskCourse = result
      }
    })
    axios.get(`http://www.gk0101.com/exam/rest/v1/examSheet/myExam?pageNo=1&pageSize=10&examType=0&institutionId=10103&userId=${localStorage.getItem('userID')}&examStatus=-1&courseId=`).then(res => {
      if (res.data.code === 0) {
        const result = res.data.data.result
        this.tasks = result
      }
      this.$nextTick(() => {
        this.myScroll = new BScroll(this.$refs.wrap, {
          scrollY: true,
          click: true,
          probeType: 3,
          pullDownRefresh: {
            threshold: 50
          },
          pullUpLoad: {
            threshold: 744
          }
        })
        this.myScroll.on('pullingDown', () => {
          this.loadingFlag = true
          axios.get(`http://www.gk0101.com/exam/rest/v1/examSheet/myExam?pageNo=1&pageSize=10&examType=0&institutionId=10103&userId=${localStorage.getItem('userID')}&examStatus=-1&courseId=`).then(res => {
            if (res.data.code === 0) {
              const result = res.data.data.result
              this.tasks = result
              this.loadingFlag = false
              this.loadingFlag02 = false
              this.msg02 = '玩命加载中~'
              this.pageNO = 1
              this.$nextTick(() => {
                this.myScroll.refresh()
              })
              this.myScroll.finishPullDown()
            }
          })
        })
        this.myScroll.on('pullingUp', () => {
          if (this.pageNO >= 4) {
            this.loadingFlag02 = true
            this.msg02 = '我也是有底线的~'
            this.myScroll.finishPullUp()
            return
          }
          this.loadingFlag02 = true
          axios.get(`http://www.gk0101.com/exam/rest/v1/examSheet/myExam?pageNo=${++this.pageNO}&pageSize=10&examType=0&institutionId=10103&userId=${localStorage.getItem('userID')}&examStatus=-1&courseId=`).then(res => {
            if (res.data.code === 0) {
              const result = res.data.data.result
              result.forEach(item => {
                this.tasks.push(item)
                this.loadingFlag02 = false
                this.$nextTick(() => {
                  this.myScroll.refresh()
                })
                this.myScroll.finishPullUp()
              })
            }
          })
        })
        this.myScroll.on('scroll', (pos) => {
          if (Math.abs(Math.round(pos.y)) < Math.abs(this.myScroll.maxScrollY)) {
            this.loadingFlag02 = false
          } else {
            this.loadingFlag02 = true
          }
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
            this.classes = [{courseName: '全部'}, {courseName: '练习'}, {courseName: '课后实操'}]
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
            this.classes = this.taskCourse
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
    selectTask (name, id, ev) {
      // 发送Ajax请求
      this.name = name
      this.$refs.taskClass.getElementsByClassName('active')[0].childNodes[0].nodeValue = name
      this.repeat = false
      this.myScroll.enable()
      document.body.style.overflow = ''
      if (id) {
        this.courseID = id
      }
      if (name === '全部') {
        if (ev.target.nextElementSibling.innerHTML === '练习') {
          this.examType = 0
        } else {
          this.examStatus = -1
        }
      } else if (name === '课后实操') {
        this.examType = 2
      } else if (name === '待完成') {
        this.examStatus = 1
      } else if (name === '已完成') {
        this.examStatus = 9
      } else if (name === '练习') {
        this.examType = 0
      }
      axios.get(`http://www.gk0101.com/exam/rest/v1/examSheet/myExam?pageNo=1&pageSize=10&examType=${this.examType}&institutionId=10103&userId=${localStorage.getItem('userID')}&examStatus=${this.examStatus}&courseId=${this.courseID}`).then(res => {
        const result = res.data.data.result
        this.tasks = result
        this.myScroll.refresh()
      })
    },
    goTask (state, id, knowPointId) {
      if (state === 9) {
        this.$router.push({
          name: 'CompleteTask',
          query: {
            courseId: id,
            knowPointId: knowPointId
          }
        })
      } else {
        this.$router.push({
          name: 'Task',
          query: {
            courseId: id,
            knowPointId: knowPointId
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .mytask{
    .header{
      position: relative;
      height: 128px;
      background:rgba(50,70,216,1);
      z-index: 1;
      a{
        position: absolute;
        top: 60px;
        left: 24px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 294px;
        top: 56px;
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
      .task_content{
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
          .task_name{
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
          .task_title{
            position: absolute;
            left: 316px;
            top: 130px;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(199,199,204,1);
            line-height:34px;
          }
          .task_type{
            position: absolute;
            left: 316px;
            bottom: 0;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(255,122,41,1);
            line-height:34px;
          }
          .task_type_coursePractice{
            position: absolute;
            left: 316px;
            bottom: 0;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#35C59B;
            line-height:34px;
          }
          .task_progress{
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
          .task_progress_unfinished{
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
        }
      }
    }
  }
</style>
