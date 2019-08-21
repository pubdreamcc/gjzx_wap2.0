<template>
  <div class="mycourse">
    <div class="header"><a href="#/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>我的课程</span></div>
    <div class="courseInfoDetail" v-for="(course, index) in publicCourse" :key="index" @click="goCourseVideo(course.id)">
      <img :src="'http://www.gk0101.com'+course.coverImg">
      <span class="courseInfo_coursetitle">{{course.courseName}}</span>
      <span class="courseInfo_courseTotal">{{course.totalMic}}节微课</span>
      <span class="courseInfo_coursePrice">{{course.price}}</span>
      <span class="studyInfo">{{publicSituation[index]}}</span>
      <canvas></canvas>
    </div>
    <div class="notFound" v-show="publicCourse.length === 0">
      <img src="../assets/imgs/search_not_found@2x.png" class="notFound_img">
      <span>暂无课程信息</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      publicCourse: [],
      publicSituation: [],
      studyRatio: []
    }
  },
  created () {
    // 发送Ajax得到我的课程信息
    let userID = localStorage.getItem('userID')
    let URL = `http://www.gk0101.com/user/rest/v1/userInfo/queryMycourseList`
    let params = new URLSearchParams()
    params.append('pageNo', 1)
    params.append('pageSize', 10000)
    params.append('buyerUserId', userID)
    params.append('institutionId', 10103)
    axios.post(URL, params).then(res => {
      if (res.data.code === 0) {
        const result = res.data.data.result
        this.publicCourse = result
        for (let i = 0; i < result.length; i++) {
          this.studyRatio.push(parseInt((result[i].learnedMic / result[i].totalMic) * 100))
          if (result[i].learnedMic === 0) {
            this.publicSituation[i] = '未学习'
          } else if (result[i].learnedMic < result[i].totalMic) {
            this.publicSituation[i] = '学习中'
          } else if (result[i].learnedMic === result[i].totalMic) {
            this.publicSituation[i] = '已完成'
          }
        }
      }
    })
  },
  methods: {
    goCourseVideo (i) {
      this.$router.push({
        name: 'CourseDetail',
        query: {
          courseId: i
        }
      })
    }
  },
  mounted () {
    setTimeout(() => {
      let allCanvas = document.getElementsByTagName('canvas')
      if (allCanvas.length > 0) {
        const divNode = document.getElementsByClassName('courseInfoDetail')[0]
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
    }, 600)
  }
}
</script>

<style lang="scss" scoped>
  .mycourse{
    background: #fff;
    .header{
      position: relative;
      width:750px;
      height:128px;
      background:rgba(50,70,216,1);
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
        right: 292px;
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
    .courseInfoDetail{
      margin-top: 26px;
      position: relative;
      height: 204px;
      margin-bottom: 42px;
      img{
        position: absolute;
        left: 22px;
        top: 0;
        width:272px;
        height:204px;
        border-radius:8px;
      }
      .courseInfo_coursetitle{
        position: absolute;
        right: 128px;
        top: 0;
        width:306px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
      }
      .courseInfo_courseTotal{
        position: absolute;
        right: 328px;
        bottom: 68px;
        width:104px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(199,199,204,1);
        line-height:34px;
      }
      .courseInfo_coursePrice{
        position: absolute;
        right: 376px;
        bottom: 14px;
        width:50px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(53,197,155,1);
        line-height:34px;
      }
      canvas{
        position: absolute;
        right: 38px;
        bottom: 94px;
      }
      .studyInfo{
        position: absolute;
        right: 40px;
        bottom: 44px;
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
