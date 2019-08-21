<template>
  <div class="myorder">
    <div class="header"><a href="#/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>我的订单</span></div>
    <ul class="myCourseClass" id="myCourseClass">
      <li class="activeSelect" @click="selectMenu(0)">待付款</li>
      <li @click="selectMenu(1)">已付款</li>
    </ul>
    <swiper :options="swiperOption" ref="myswiper">
      <swiper-slide>
        <div class="courseInfoDetail" v-for="(course, index) in unpaid" :key="index">
          <img :src="'http://www.gk0101.com'+course.coverImg">
          <span class="courseInfo_coursetitle">{{course.courseName}}</span>
          <span class="courseInfo_courseTotal">{{course.totalMic}}节微课</span>
          <span class="courseInfo_coursePrice">{{course.price}}</span>
          <span class="studyInfo" @click="goBuy">立即支付</span>
        </div>
        <div class="notOrder" v-show="unpaid.length === 0">
          <img src="../assets/imgs/search_not_found@2x.png" class="notOrder_img">
          <span>暂无订单</span>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="courseInfoDetail" v-for="(course, index) in paymented" :key="index">
          <img :src="'http://www.gk0101.com'+course.coverImg">
          <span class="courseInfo_coursetitle">{{course.courseName}}</span>
          <span class="courseInfo_courseTotal">{{course.totalMic}}节微课</span>
          <span class="courseInfo_coursePrice">{{course.price}}</span>
          <span class="studyInfo" @click="goStudy(course.courseId)">立即学习</span>
        </div>
        <div class="notOrder" v-show="paymented.length === 0">
          <img src="../assets/imgs/search_not_found@2x.png" class="notOrder_img">
          <span>暂无订单</span>
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
      },
      unpaid: [],
      paymented: []
    }
  },
  mounted () {
    // 发生ajax请求得到订单详情
    axios.get(`http://www.gk0101.com/user/rest/v1/order/getMyOrderCourseList?pageNum=1&pageSize=10&orderStatus=0&buyerUserId=${localStorage.getItem('userID')}&institutionId=10103`).then(res => {
      const ret = res.data.data
      this.unpaid = ret
    })
    axios.get(`http://www.gk0101.com/user/rest/v1/order/getMyOrderCourseList?pageNum=1&pageSize=10&orderStatus=9&buyerUserId=${localStorage.getItem('userID')}&institutionId=10103`).then(res => {
      const ret = res.data.data
      this.paymented = ret
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
    goStudy (i) {
      this.$router.push({
        name: 'CourseDetail',
        query: {
          courseId: i
        }
      })
    },
    goBuy () {
      console.log('付款逻辑')
    }
  }
}
</script>

<style lang="scss" scoped>
  .myorder{
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
    .myCourseClass{
      display: flex;
      align-items: center;
      height: 90px;
      justify-content: space-around;
      li{
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
          .studyInfo{
            position: absolute;
            right: 24px;
            bottom: 58px;
            text-align: center;
            width:120px;
            height:48px;
            border-radius:24px;
            border:2px solid rgba(50,70,216,1);
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(50,70,216,1);
            line-height:48px;
          }
        }
        .notOrder{
          position: relative;
          margin-bottom: 0;
          height: 600px;
          .notOrder_img{
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
    }
  }
</style>
