<template>
  <div class="mycourse">
    <div class="header"><a href="#/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>我的课程</span></div>
    <ul class="myCourseClass" id="myCourseClass">
      <li class="activeSelect" @click="selectMenu(0)">公共课程</li>
      <li @click="selectMenu(1)">专业课程</li>
    </ul>
    <swiper :options="swiperOption" ref="myswiper">
      <swiper-slide>
        <div class="courseInfoDetail" v-for="(course, index) in publicCourse" :key="index" @click="goCourseVideo(course.id)">
          <img :src="'http://www.gk0101.com'+course.coverImg">
          <span class="courseInfo_coursetitle">{{course.courseName}}</span>
          <span class="courseInfo_courseTotal">{{course.totalMic}}节微课</span>
          <span class="courseInfo_coursePrice">免费</span>
          <span class="studyInfo">{{publicSituation[index]}}</span>
          <canvas width="72" height="72"></canvas>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="courseInfoDetail" v-for="(course, index) in majorCourse" :key="index" @click="goCourseVideo(course.id)">
          <img :src="'http://www.gk0101.com'+course.coverImg">
          <span class="courseInfo_coursetitle">{{course.courseName}}</span>
          <span class="courseInfo_courseTotal">{{course.totalMic}}节微课</span>
          <span class="courseInfo_coursePrice">免费</span>
          <span class="studyInfo">{{majorSituation[index]}}</span>
          <canvas width="72" height="72"></canvas>
        </div>
      </swiper-slide>
    </swiper>
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
      majorSituation: [],
      majorCourse: [],
      studyRatio: [],
      swiperOption: {
        on: {
          slideChangeTransitionEnd () {
            let CourseClassLi = document.getElementById('myCourseClass').getElementsByTagName('li')
            for (let i = 0; i < CourseClassLi.length; i++) {
              if (i === this.activeIndex) {
                CourseClassLi[i].setAttribute('class', 'activeSelect')
              } else {
                CourseClassLi[i].setAttribute('class', '')
              }
            }
          }
        }
      }
    }
  },
  created () {
    // 发送ajax请求得到公共课程信息
    let userID = localStorage.getItem('userID')
    let URL = `http://www.gk0101.com/teach/rest/v1/course/myCourseInfoList?pageNo=1&pageSize=10&courseClassify=1&userId=${userID}`
    let URL2 = `http://www.gk0101.com/teach/rest/v1/course/myCourseInfoList?pageNo=1&pageSize=10&courseClassify=3&userId=${userID}&institutionId=10103`
    axios.get(URL).then(res => {
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
      // 发送Ajax请求得到专业课程信息
      axios.get(URL2).then(res => {
        const result = res.data.data.result
        this.majorCourse = result
        for (let i = 0; i < result.length; i++) {
          this.studyRatio.push(parseInt((result[i].learnedMic / result[i].totalMic) * 100))
          if (result[i].learnedMic === 0) {
            this.majorSituation[i] = '未学习'
          } else if (result[i].learnedMic < result[i].totalMic) {
            this.majorSituation[i] = '学习中'
          } else if (result[i].learnedMic === result[i].totalMic) {
            this.majorSituation[i] = '已完成'
          }
        }
      })
    })
  },
  methods: {
    selectMenu (index) {
      let courseClassLi = document.getElementById('myCourseClass').getElementsByTagName('li')
      if (index === 0) {
        courseClassLi[0].setAttribute('class', 'activeSelect')
        courseClassLi[1].setAttribute('class', '')
        this.$refs.myswiper.swiper.slideTo(0, 300, false)
      } else if (index === 1) {
        courseClassLi[1].setAttribute('class', 'activeSelect')
        courseClassLi[0].setAttribute('class', '')
        this.$refs.myswiper.swiper.slideTo(1, 300, false)
      }
    },
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
      let x = allCanvas[0].width / 2
      let y = allCanvas[0].height / 2
      let radius = allCanvas[0].height / 2
      for (let i = 0; i < allCanvas.length; i++) {
        let ctx = allCanvas[i].getContext('2d')
        ctx.save()
        ctx.strokeStyle = '#999999'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, radius - 2, 0, 2 * Math.PI, true)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
        // 绘制比例数字
        ctx.save()
        ctx.fillStyle = '#3246D8'
        ctx.font = '24px PingFangSC-Regular'
        ctx.fillText(`${this.studyRatio[i]}%`, x - 13, y + 10)
        ctx.restore()
        // 绘制外围进度圆
        ctx.save()
        ctx.strokeStyle = '#3246D8'
        ctx.lineWidth = 6
        ctx.beginPath()
        ctx.arc(x, y, radius - 2, -Math.PI / 2, -Math.PI / 2 + this.studyRatio[i] * (Math.PI * 2 / 100), false)
        ctx.stroke()
        ctx.closePath()
        ctx.restore()
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
    .myCourseClass{
      display: flex;
      align-items: center;
      height: 90px;
      justify-content: space-around;
      li{
        flex: 0 0 136px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        padding-bottom: 16px;
        line-height:48px;
        &.activeSelect{
          border-bottom: 6px solid rgba(50,70,216,1);
          color: rgba(50,70,216,1);
        }
      }
    }
    .swiper-container{
      margin-top: 26px;
      .swiper-slide{
        div{
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
      }
    }
  }
</style>
