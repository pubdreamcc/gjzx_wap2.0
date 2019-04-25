<template>
  <div class="home">
    <div class="header clearMargin_top"><span>首页</span><a href="javascript:;" class="sao"><img src="../assets/imgs/扫一扫@2x.png"></a><a href="/search" class="search"><img src="../assets/imgs/seek@2x.png"></a></div>
    <div class="slide_banner">
      <swiper :options="swiperOption" v-if="bannerImgs.length>0">
        <swiper-slide v-for="(bannerImg, index) in bannerImgs" :key="index">
          <img :src="'http://www.gk0101.com'+bannerImg.bannerImg">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="live_course clearfix">
      <img src="../assets/imgs/home_live @2x.png">
      <span class="live_word">直播</span>
      <a href="javascript:;">查看更多</a>
    </div>
    <div class="live_banner">
      <a href="javascript:;"><img src="../assets/imgs/直播占位图.png"></a>
    </div>
    <p class="recommend_course">
      推荐课程
    </p>
    <div class="course_class">
      <div class="wrapper" ref="wrapper">
        <ul class="course_class_title clearfix content">
          <li v-for="(courseClass, index) in courseClasss" :key="index" :class="{'active': currentIndex === index}" @click="selectMenu(index, $event)">{{courseClass.majorName}}</li>
        </ul>
      </div>
      <div class="courseWrapper" ref="courseWrapper">
        <ul class="courseWrapper_content clearfix">
          <li>
            <div v-for="(majorCourse, index) in majorCourses1" :key="index">
              <img :src="'http://www.gk0101.com'+majorCourse.coverImg">
              <span class="courseInfo_title">{{majorCourse.courseName}}</span>
              <span class="courseInfo_totalClass">{{majorCourse.totalMic}}节微课</span>
              <span class="courseInfo_price">免费</span>
            </div>
          </li>
          <li>
            <div v-for="(majorCourse, index) in majorCourses2" :key="index">
              <img :src="'http://www.gk0101.com'+majorCourse.coverImg">
              <span class="courseInfo_title">{{majorCourse.courseName}}</span>
              <span class="courseInfo_totalClass">{{majorCourse.totalMic}}节微课</span>
              <span class="courseInfo_price">免费</span>
            </div>
          </li>
          <li>
            <div v-for="(majorCourse, index) in majorCourses3" :key="index">
              <img :src="'http://www.gk0101.com'+majorCourse.coverImg">
              <span class="courseInfo_title">{{majorCourse.courseName}}</span>
              <span class="courseInfo_totalClass">{{majorCourse.totalMic}}节微课</span>
              <span class="courseInfo_price">免费</span>
            </div>
          </li>
          <li>
            <div v-for="(majorCourse, index) in majorCourses4" :key="index">
              <img :src="'http://www.gk0101.com'+majorCourse.coverImg">
              <span class="courseInfo_title">{{majorCourse.courseName}}</span>
              <span class="courseInfo_totalClass">{{majorCourse.totalMic}}节微课</span>
              <span class="courseInfo_price">免费</span>
            </div>
          </li>
          <li>
            <div v-for="(majorCourse, index) in majorCourses5" :key="index">
              <img :src="'http://www.gk0101.com'+majorCourse.coverImg">
              <span class="courseInfo_title">{{majorCourse.courseName}}</span>
              <span class="courseInfo_totalClass">{{majorCourse.totalMic}}节微课</span>
              <span class="courseInfo_price">免费</span>
            </div>
          </li>
          <li>
            <div v-for="(majorCourse, index) in majorCourses6" :key="index">
              <img :src="'http://www.gk0101.com'+majorCourse.coverImg">
              <span class="courseInfo_title">{{majorCourse.courseName}}</span>
              <span class="courseInfo_totalClass">{{majorCourse.totalMic}}节微课</span>
              <span class="courseInfo_price">免费</span>
            </div>
          </li>
          <li>
            <div v-for="(majorCourse, index) in majorCourses7" :key="index">
              <img :src="'http://www.gk0101.com'+majorCourse.coverImg">
              <span class="courseInfo_title">{{majorCourse.courseName}}</span>
              <span class="courseInfo_totalClass">{{majorCourse.totalMic}}节微课</span>
              <span class="courseInfo_price">免费</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="img_btn"><img src="../assets/imgs/home_more_icon@2x.png"></div>
    </div>
    <div class="footer">
      <div class="home"><a href="javascript:;"><img src="../assets/imgs/home_bat_home_icon@2x.png"><span>首页</span></a></div>
      <div class="home"><a href="/resourcecenter"><img src="../assets/imgs/home_bat_resource_icon@2x.png"><span>资源中心</span></a></div>
      <div class="home"><a href="/mine"><img src="../assets/imgs/home_bat_me_icon@2x.png"><span>我的</span></a></div>
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
      ListWidth: [], // 存放下面课程列表的宽度累加的数组
      scrollX: 0, // 滚动下面课程列表获取的实时X轴滚动的距离
      selected: '1',
      majorID: [],
      bannerImgs: [],
      courseClasss: [],
      majorCourses1: [],
      majorCourses2: [],
      majorCourses3: [],
      majorCourses4: [],
      majorCourses5: [],
      majorCourses6: [],
      majorCourses7: [],
      swiperOption: {
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        loopedSlides: 4,
        spaceBetween: 32,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observeParents: true }
    }
  },
  created () {
    // 发送Ajax请求获取banner图片
    axios.get('http://www.gk0101.com/user/rest/v1/bannerinfo/getBannersRandomly?page=%7B%22pageSize%22%3A7%7D&bannerInfo=%7B%22bannerType%22%3A4%7D&institutionId=10103').then(res => {
      const result = res.data.data
      this.bannerImgs = JSON.parse(result)
    })
    // 发送ajax请求得到课程分类列表
    axios.get('http://www.gk0101.com/teach/rest/v1/majorinfo/getHomePageMajorInfoList?institutionId=10103').then(res => {
      const result = res.data.data
      this.courseClasss = result
      // 遍历得到majorID
      this.courseClasss.forEach((item, index) => {
        this.majorID[index] = item.id
      })
      // 发生ajax请求得到相关分类下的课程信息
      axios.get(`http://www.gk0101.com/teach/rest/v1/course/getRecommendCourseByMajorInfoIdOnphone?majorInfoId=${this.majorID[0]}&institutionId=10103&pageNum=0&pageSize=5`).then(res => {
        const result = res.data.data[0].courseInfoVos
        this.majorCourses1 = result
      })
      axios.get(`http://www.gk0101.com/teach/rest/v1/course/getRecommendCourseByMajorInfoIdOnphone?majorInfoId=${this.majorID[1]}&institutionId=10103&pageNum=0&pageSize=5`).then(res => {
        const result = res.data.data[0].courseInfoVos
        this.majorCourses2 = result
      })
      axios.get(`http://www.gk0101.com/teach/rest/v1/course/getRecommendCourseByMajorInfoIdOnphone?majorInfoId=${this.majorID[2]}&institutionId=10103&pageNum=0&pageSize=5`).then(res => {
        const result = res.data.data[0].courseInfoVos
        this.majorCourses3 = result
      })
      axios.get(`http://www.gk0101.com/teach/rest/v1/course/getRecommendCourseByMajorInfoIdOnphone?majorInfoId=${this.majorID[3]}&institutionId=10103&pageNum=0&pageSize=5`).then(res => {
        const result = res.data.data[0].courseInfoVos
        this.majorCourses4 = result
      })
      axios.get(`http://www.gk0101.com/teach/rest/v1/course/getRecommendCourseByMajorInfoIdOnphone?majorInfoId=${this.majorID[4]}&institutionId=10103&pageNum=0&pageSize=5`).then(res => {
        const result = res.data.data[0].courseInfoVos
        this.majorCourses5 = result
      })
      axios.get(`http://www.gk0101.com/teach/rest/v1/course/getRecommendCourseByMajorInfoIdOnphone?majorInfoId=${this.majorID[5]}&institutionId=10103&pageNum=0&pageSize=5`).then(res => {
        const result = res.data.data[0].courseInfoVos
        this.majorCourses6 = result
      })
      if (this.majorID[6]) {
        axios.get(`http://www.gk0101.com/teach/rest/v1/course/getRecommendCourseByMajorInfoIdOnphone?majorInfoId=${this.majorID[6]}&institutionId=10103&pageNum=0&pageSize=5`).then(res => {
          const result = res.data.data[0].courseInfoVos
          this.majorCourses7 = result
          this.$refs.courseWrapper.getElementsByTagName('ul')[0].style.width = 4942 + 'px'
        })
      } else {
        this.$refs.courseWrapper.getElementsByTagName('ul')[0].style.width = ''
      }
      this.$nextTick(() => {
        // 初始化better-scroll
        this.scroll = new BScroll(this.$refs.wrapper, {
          eventPassthrough: 'vertical',
          click: true,
          scrollX: true
        })
        this.scroll2 = new BScroll(this.$refs.courseWrapper, {
          eventPassthrough: 'vertical',
          scrollX: true,
          probeType: 3
        })
        this.scroll2.on('scroll', (pos) => {
          this.scrollX = Math.abs(Math.round(pos.x))
        })
        setTimeout(() => {
          this.getListWidth()
        }, 600) // 得到下面课程的列表宽度累加的数组
      })
    })
  },
  methods: {
    getListWidth () {
      let allList = this.$refs.courseWrapper.getElementsByTagName('li')
      let width = 0
      this.ListWidth.push(width)
      for (let i = 0; i < allList.length; i++) {
        // 得到下一个LI的宽度加上上一个LI宽度，并且push到this.ListWidth
        width += allList[i].clientWidth
        this.ListWidth.push(width)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      let allList = this.$refs.courseWrapper.getElementsByTagName('li')
      let el = allList[index]
      this.scroll2.scrollToElement(el, 300)
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.ListWidth.length; i++) {
        let width1 = this.ListWidth[i]
        let width2 = this.ListWidth[i + 1]
        if ((this.scrollX >= width1 && this.scrollX < width2) || !width2) {
          return i
        }
      }
      return 0
    }
  }
}
</script>

<style lang="scss">
  .header{
    position: fixed;
    z-index: 2;
    top: 0;
    width:750px;
    height:126px;
    background:rgba(50,70,216,1);
    span{
      display: block;
      margin: 54px auto 16px;
      width:82px;
      height:56px;
      font-size:40px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:56px;
    }
    a{
      position: absolute;
      top: 58px;
      img{
        width: 48px;
        height: 48px;
      }
    }
    .sao{
      right: 96px;
    }
    .search{
      right: 24px;
    }
  }
  .slide_banner{
    margin-top: 150px;
    height: 320px;
    .swiper-slide{
      height:320px;
      width:642px;
      img{
        width:642px;
        height:320px;
        border-radius: 12px;
      }
    }
  }
  .live_course{
    margin-top: 38px;
    height: 48px;
    padding: 0 24px 0 28px;
    line-height: 48px;
    img{
      float: left;
      width: 48px;
      height: 48px;
    }
    .live_word{
      margin-left: 22px;
      display: inline-block;
      width:68px;
      height:48px;
      font-size:34px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(0,0,0,1);
      line-height:48px;
    }
    a{
      float: right;
      width:96px;
      height:34px;
      font-size:24px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(142,142,147,1);
      line-height:34px;
      margin-top: 8px;
    }
  }
  .live_banner{
    margin: 28px auto 0;
    width: 702px;
    height: 320px;
    a{
      display: block;
      height: 100%;
      img{
        border-radius:12px;
        width: 100%;
        height: 100%
      }
    }
  }
  .recommend_course{
    margin: 40px 0 0 26px;
    height:48px;
    font-size:34px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(0,0,0,1);
    line-height:48px;
  }
  .course_class{
    margin-top: 20px;
    padding-left: 26px;
    position: relative;
    .wrapper{
      width: 654px;
      overflow-x: hidden;
      .course_class_title{
        width: 200%;
        li{
          float: left;
          height:40px;
          font-size:28px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(199,199,204,1);
          line-height:40px;
          margin-right: 22px;
          padding-bottom: 14px;
          &.active{
            border-bottom: 8px solid rgba(50,70,216,1);
            color: #000000;
          }
        }

      }
    }
    .courseWrapper{
      margin-top: 20px;
      width: 706px;
      overflow-x: hidden;
      .courseWrapper_content{
        width: 600%;
        &::after{
          height: 124px;
        }
        li{
          float: left;
          div:nth-child(1){
            margin-top: 0;
          }
          div{
            margin-top: 44px;
            width: 706px;
            position: relative;
            height: 205px;
            img{
              position: absolute;
              left: 0;
              top: 0;
              width:272px;
              height:205px;
              border-radius:8px;
            }
            .courseInfo_title{
              position: absolute;
              right: 0;
              top: 0;
              width:414px;
              height:96px;
              font-size:34px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(0,0,0,1);
              line-height:48px;
            }
            .courseInfo_totalClass{
              position: absolute;
              right: 308px;
              top: 106px;
              width:104px;
              height:34px;
              font-size:24px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(199,199,204,1);
              line-height:34px;
            }
            .courseInfo_price{
              position: absolute;
              right: 356px;
              top: 152px;
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
    }
    .img_btn{
      position: absolute;
      right: 22px;
      top: 0;
      img{
        width: 48px;
        height: 48px;
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    background-color: #fff;
    width: 750px;
    height: 101px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    border-top: 1px solid rgba(242,242,242,1);
    margin-top: 22px;
    .home{
      width: 96px;
      text-align: center;
      span{
        display: block;
        width:96px;
        height:28px;
        font-size:20px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(50,70,216,1);
        line-height:28px;
      }
      &:nth-child(1){
        img{
          width: 42px;
          height: 42px;
        }
      }
      &:nth-child(2){
        img{
          width: 54px;
          height: 36px;
        }
      }
      &:nth-child(3){
        img{
          width: 38px;
          height: 45px;
        }
      }
    }
  }
</style>
