<template>
  <div class="myrecord">
    <div class="header"><a href="#/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>记录</span></div>
    <div class="record-course" v-for="(course, index) in recordCourse" :key="index" @click="goCourseVideo(course.courseId)">
      <img :src="'http://www.gk0101.com'+course.coverImg">
      <span class="coursetitle">{{course.courseName}}</span>
      <span class="courseTime">上次学习{{course.studyTime.slice(0, 10)}}</span>
      <canvas></canvas>
      <span class="studyStatus">{{course.studyStatus === 1 ? '学习中' : (course.studyStatus === 9 ? '已完成':'未学习')}}</span>
    </div>
    <div class="notFound" v-show="recordCourse.length === 0">
      <img src="../assets/imgs/search_not_found@2x.png" class="notFound_img">
      <span>暂无记录</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      recordCourse: [],
      studyRatio: []
    }
  },
  mounted () {
    // 发送Ajax请求得到之前记录的课程信息
    axios.get(`http://www.gk0101.com/exam/rest/v1/studySheet/getMyStudySheet?userId=${localStorage.getItem('userID')}`).then(res => {
      const ret = res.data.data
      this.recordCourse = ret
      for (const item of ret) {
        this.studyRatio.push(parseInt((item.learnedMic / item.totalMic) * 100))
      }
      this.$nextTick(() => {
        // 此时DOM已经渲染完成
        if (this.recordCourse.length !== 0) {
          this.getCanvas()
        }
      })
    })
  },
  methods: {
    goCourseVideo (id) {
      // 跳转到播放页面
      this.$router.push({
        name: 'CourseDetail',
        query: {
          courseId: id
        }
      })
    },
    getCanvas () {
      let allCanvas = document.getElementsByTagName('canvas')
      const divNode = document.getElementsByClassName('record-course')[0]
      for (const item of allCanvas) {
        item.width = divNode.getBoundingClientRect().width * 0.096
        item.height = divNode.getBoundingClientRect().height * 0.353
      }
      let lineWidth0 = allCanvas[0].width * 0.028
      let lineWidth1 = allCanvas[0].width * 0.083
      let fontSize = allCanvas[0].width * 0.33
      let xcut = allCanvas[0].width * 0.18
      let yadd = allCanvas[0].width * 0.139
      let x = allCanvas[0].width / 2
      let y = allCanvas[0].height / 2
      let radius = allCanvas[0].height / 2
      for (let i = 0; i < allCanvas.length; i++) {
        let ctx = allCanvas[i].getContext('2d')
        ctx.save()
        ctx.strokeStyle = '#999999'
        ctx.lineWidth = lineWidth0
        ctx.beginPath()
        ctx.arc(x, y, radius - 2, 0, 2 * Math.PI, true)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        // 绘制比例数字
        ctx.save()
        ctx.fillStyle = '#3246D8'
        ctx.font = `${fontSize}px PingFangSC-Regular`
        ctx.fillText(`${this.studyRatio[i]}%`, x - xcut, y + yadd)
        ctx.restore()
        // 绘制外围进度圆
        ctx.save()
        ctx.strokeStyle = '#3246D8'
        ctx.lineWidth = lineWidth1
        ctx.beginPath()
        ctx.arc(x, y, radius - 2, -Math.PI / 2, -Math.PI / 2 + this.studyRatio[i] * (Math.PI * 2 / 100), false)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .myrecord{
    .header{
      width: 100%;
      height:128px;
      background:rgba(50,70,216,1);
      position: relative;
      a{
        position: absolute;
        left: 24px;
        top: 50px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 334px;
        top: 56px;
        width:82px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:56px;
      }
    }
    .record-course {
      margin-top: 24px;
      padding-left: 24px;
      height: 204px;
      position: relative;
      img{
        width:272px;
        height:204px;
        border-radius:8px;
      }
      .coursetitle {
        position: absolute;
        top: 0;
        left: 316px;
        width:306px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
      }
      .courseTime {
        position: absolute;
        left: 316px;
        bottom: 62px;
        width:292px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(199,199,204,1);
        line-height:34px;
      }
      canvas{
        position: absolute;
        right: 38px;
        bottom: 94px;
      }
      .studyStatus{
        position: absolute;
        right: 36px;
        bottom: 40px;
        width:76px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:34px;
      }
    }
    .notFound{
      position: relative;
      height: 600px;
      .notFound_img{
        position: absolute;
        width:421px;
        height:350px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      span{
        position: absolute;
        left: 50%;
        bottom: 15px;
        transform: translateX(-50%);
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
      }
    }
  }
</style>
