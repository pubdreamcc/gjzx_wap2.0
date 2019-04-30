<template>
  <div class="resourcecenter clearMargin_top">
    <div class="header">
      <span>资源中心</span>
      <a href="#/search" class="search"><img src="../assets/imgs/course_seek@2x.png"></a>
      <a href="javascript:;" class="select" @click="changeFlag"><img src="../assets/imgs/course_screen@2x.png"></a>
    </div>
    <div class="line"></div>
    <ul class="course_class" v-show="course_class_flag">
      <li>
        <a href="javascript:;" :class="{a_active: falg01}" @click="getCourseClass('综合排序')">综合排序</a>
        <a href="javascript:;" @click="getCourseClass('最新')" :class="{a_active: falg02}">最新</a>
        <a href="javascript:;" @click="getCourseClass('人气')" :class="{a_active: falg03}">人气</a>
      </li>
      <li>
        <a href="javascript:;" :class="{a_active: falg04}" @click="getCourseClass02('全部课程')">全部课程</a>
        <a href="javascript:;" :class="{a_active: falg05}" @click="getCourseClass02('公共课程')">公共课程</a>
        <a href="javascript:;" :class="{a_active: falg06}" @click="getCourseClass02('专业课程')">专业课程</a>
      </li>
      <li>
        <a href="javascript:;" :class="{a_active: falg07}" @click="getCourseClass03('资费')">资费</a>
        <a href="javascript:;" :class="{a_active: falg08}" @click="getCourseClass03('免费')">免费</a>
        <a href="javascript:;" :class="{a_active: falg09}" @click="getCourseClass03('付费')">付费</a>
      </li>
    </ul>
    <div class="course_error_info" v-show="courses.length === 0">
      <img src="../assets/imgs/search_not_found@2x.png">
      <p>暂时没有你想要的内容噢！</p>
    </div>
    <div class="course_Info_wrap clearMargin_top" ref="course_Info_wrap">
      <div class="course_Info" v-for="(course, index) in courses" :key="index">
        <img :src="'http://www.gk0101.com/'+course.coverImg">
        <div class="course_detail">
          <p>{{course.courseName}}</p>
          <span>{{course.totalMic}}节微课</span>
          <span>免费</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="home"><a href="#/home"><img src="../assets/imgs/bat_home@2x.png"><span>首页</span></a></div>
      <div class="home"><a href="javascript:;"><img src="../assets/imgs/bat_course@2x.png"><span>资源中心</span></a></div>
      <div class="home"><a href="#/mine"><img src="../assets/imgs/home_bat_me_icon@2x.png"><span>我的</span></a></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      courses: [],
      course_class_flag: false,
      falg01: true,
      falg02: false,
      falg03: false,
      falg04: true,
      falg05: false,
      falg06: false,
      falg07: true,
      falg08: false,
      falg09: false,
      orderBy: 0,
      courseClassify: 0,
      price: -1
    }
  },
  mounted () {
    let URL = 'http://www.gk0101.com/teach/rest/v1/course/getCourseList?pageNo=1&pageSize=10&orderBy=0&courseClassify=0&price=-1&institutionId=10103'
    axios.get(URL).then(res => {
      const result = res.data.data.result
      this.courses = result
      axios.get('http://www.gk0101.com/teach/rest/v1/course/getCourseList?pageNo=2&pageSize=10&orderBy=0&courseClassify=0&price=-1&institutionId=10103').then(res => {
        const result = res.data.data.result
        this.courses = this.courses.concat(result)
      })
    }).catch(error => {
      alert('查找课程失败' + error)
    })
  },
  methods: {
    changeFlag () {
      this.course_class_flag = !this.course_class_flag
      if (this.course_class_flag) {
        this.$refs.course_Info_wrap.style.marginTop = 5.44 + 'rem'
      } else {
        this.$refs.course_Info_wrap.style.marginTop = ''
      }
    },
    getCourseClass (value) {
      switch (value) {
        case '综合排序':
          this.falg01 = true
          this.falg02 = false
          this.falg03 = false
          this.orderBy = 0
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
        case '最新':
          this.falg02 = true
          this.falg01 = false
          this.falg03 = false
          this.orderBy = 1
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
        case '人气':
          this.falg03 = true
          this.falg02 = false
          this.falg01 = false
          this.orderBy = 2
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
      }
    },
    getCourseClass02 (value) {
      switch (value) {
        case '全部课程':
          this.falg04 = true
          this.falg05 = false
          this.falg06 = false
          this.courseClassify = 0
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
        case '公共课程':
          this.falg05 = true
          this.falg04 = false
          this.falg06 = false
          this.courseClassify = 1
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
        case '专业课程':
          this.falg06 = true
          this.falg05 = false
          this.falg04 = false
          this.courseClassify = 7
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
      }
    },
    getCourseClass03 (value) {
      switch (value) {
        case '资费':
          this.falg07 = true
          this.falg08 = false
          this.falg09 = false
          this.price = -1
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
        case '免费':
          this.falg08 = true
          this.falg07 = false
          this.falg09 = false
          this.price = 0
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
        case '付费':
          this.falg09 = true
          this.falg08 = false
          this.falg07 = false
          this.price = 1
          this.sendAjax(this.orderBy, this.courseClassify, this.price)
          break
      }
    },
    // 发送Ajax请求的函数
    sendAjax (orderBy, courseClassify, price) {
      let URL = `http://www.gk0101.com/teach/rest/v1/course/getCourseList?pageNo=1&pageSize=10&orderBy=${orderBy}&courseClassify=${courseClassify}&price=${price}&institutionId=10103`
      axios.get(URL).then(res => {
        let result = res.data.data.result
        this.courses = result
      }).catch(error => {
        alert('查找课程失败' + error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .resourcecenter .header{
    position: fixed;
    top: 0;
    height: 140px;
    background-color: #fff;
    width: 100%;
    span{
      position: absolute;
      left: 294px;
      top: 56px;
      width:164px;
      height:56px;
      font-size:40px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(0,0,0,1);
      line-height:56px;
    }
    .search{
      position: absolute;
      top: 66px;
      right: 108px;
      img{
        width: 48px;
        height: 48px;
      }
    }
    .select{
      position: absolute;
      right: 32px;
      top: 66px;
      img{
        width:48px;
        height:48px;
      }
    }
  }
  .resourcecenter .line{
    position: fixed;
    width: 100%;
    height: 4px;
    background-color: rgba(242,242,242,1);
    top: 140px;
  }
  .resourcecenter .course_Info{
    margin-top: 20px;
    padding: 0 24px 0 20px;
    img{
      width:272px;
      height:204px;
      border-radius:8px;
    }
    .course_detail{
      float: right;
      p{
        width:414px;
        height:96px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
      }
      span{
        display: block;
        &:nth-child(2){
          margin-top: 10px;
          width:106px;
          height:34px;
          font-size:24px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(199,199,204,1);
          line-height:34px;
        }
        &:nth-child(3){
          margin-top: 20px;
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
  .course_error_info{
    width: 421px;
    margin: 506px auto 0;
    text-align: center;
    img{
      width: 421px;
      height: 232px;
    }
    p{
      height:40px;
      font-size:28px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:40px;
      text-align: center;
    }
  }
  .resourcecenter .course_Info_wrap{
    margin-top: 140px;
    &::after{
      display: table;
      content: '';
      height: 102px;
    }
  }
  .course_class{
    position: fixed;
    height: 268px;
    width: 750px;
    top: 142px;
    background-color: #fff;
    li{
      height: 89.33px;
      line-height: 89.33px;
      padding-left: 48px;
      a{
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        margin-right: 74px;
      }
      .a_active{
        color: #3246D8;
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 750px;
    height: 101px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
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
