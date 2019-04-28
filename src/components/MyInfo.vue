<template>
 <div class="myInfo clearMargin_top">
  <div class="myInfo_personcenter">
    <img class="bg_img" src="../assets/imgs/个人中心底图@2x.png">
    <div class="person_info">
      <p class="userName">{{userInfo.userName}}</p>
      <span class="ID">学号：{{userInfo.studentNo}}</span>
      <span class="college">学院：{{userInfo.institutionName}}</span>
      <img  class="userImg" :src="userInfo.userImg" @click="goPersonInfo">
    </div>
    <div class="person_study">
      <div class="credit"><p><span>{{userStudy.credits}}</span>/分</p><span class="get">已获学分</span></div>
      <div class="course"><p><span>{{userStudy.courseCount}}</span>/门</p><span class="get">已学课程</span></div>
      <div class="time"><p><span>{{userStudy.studyTime}}</span>/分钟</p><span class="get">学习时长</span></div>
    </div>
  </div>
  <div class="myInfoClass">
    <div @click="goMyCourse"><img src="../assets/imgs/course@2x.png"><span>我的课程</span></div>
    <div><img src="../assets/imgs/me_job@2x.png"><span>课后作业</span></div>
    <div><img src="../assets/imgs/me_examination@2x.png"><span>我的考试</span></div>
    <div @click="goExaminationRegistration"><img src="../assets/imgs/me_apply@2x.png"><span>考试报名</span></div>
    <div @click="goMyScore"><img src="../assets/imgs/me_performance@2x.png"><span>我的成绩</span></div>
    <div><img src="../assets/imgs/me_creditnce@2x.png"><span>学分</span></div>
    <div><img src="../assets/imgs/me_record@2x.png"><span>记录</span></div>
    <div></div>
  </div>
  <div class="myCertificate clearMargin_top" @click="goMyCertificate">
    <p>国匠鲁班学院证书</p>
    <a href="javascript:;"><img src="../assets/imgs/direction@2x.png"></a>
  </div>
  <div class="myTips clearMargin_top">
    <div><img src="../assets/imgs/me_indent@2x.png" class="icon"><span>我的订单</span><a href="javascript:;" class="right_arrow"><img src="../assets/imgs/direction@2x.png"></a></div>
    <div @click="goMyNotices"><img src="../assets/imgs/me_news@2x.png" class="icon"><span>我的消息</span><a href="javascript:;" class="right_arrow"><img src="../assets/imgs/direction@2x.png"></a></div>
    <div><img src="../assets/imgs/me_tickling@2x.png" class="icon"><span>问题反馈</span><span class="phone">400-609-6665</span><a href="javascript:;" class="right_arrow"><img src="../assets/imgs/direction@2x.png"></a></div>
    <div @click="goSetting"><img src="../assets/imgs/me_setting up@2x.png" class="icon"><span>设置</span><a href="javascript:;" class="right_arrow"><img src="../assets/imgs/direction@2x.png"></a></div>
  </div>
  <div class="line"></div>
  <div class="footer">
    <div class="home"><a href="/home"><img src="../assets/imgs/bat_home@2x.png"><span>首页</span></a></div>
    <div class="home"><a href="/resourcecenter"><img src="../assets/imgs/home_bat_resource_icon@2x.png"><span>资源中心</span></a></div>
    <div class="home"><a href="javascript:;"><img src="../assets/imgs/bat_me@2x.png"><span>我的</span></a></div>
  </div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      userInfo: {userName: '', institutionName: '', studentNo: '无学号', userImg: './static/img/bat_me@2x.png'},
      userStudy: {courseCount: '', credits: '', studyTime: ''}
    }
  },
  created () {
    // 发送Ajax请求获取用户个人数据
    let URL = 'http://www.gk0101.com/cms/getUserInfoByUserIdOnPone'
    let params = new URLSearchParams()
    // 得到用户id
    const userID = localStorage.getItem('userID')
    params.append('userId', userID)
    axios.post(URL, params).then(res => {
      const result = res.data.data
      this.userInfo.institutionName = result.institutionName
      this.userInfo.userName = result.userName
      if (result.userImg) {
        this.userInfo.userImg = 'http://www.gk0101.com' + result.userImg
      }
    }).catch(error => {
      alert('获取用户个人信息失败' + error)
    })
    // 发送Ajax请求获取用户的学习信息
    let URLStudy = 'http://www.gk0101.com/exam/rest/v1/exam/getInformationByUserId'
    let paramsStudy = new URLSearchParams()
    paramsStudy.append('userId', userID)
    params.append('institutionId', '10103')
    axios.post(URLStudy, paramsStudy).then(res => {
      const result = res.data.data
      this.userStudy.credits = result.credits
      this.userStudy.courseCount = result.courseCount
      this.userStudy.studyTime = result.studyTime
    }).catch(error => {
      alert('获取用户学习信息失败' + error)
    })
  },
  methods: {
    goSetting () {
      this.$router.push('/setting')
    },
    goMyCourse () {
      this.$router.push('/mycourse')
    },
    goMyScore () {
      this.$router.push('/myscore')
    },
    goPersonInfo () {
      this.$router.push('/personinfo')
    },
    goExaminationRegistration () {
      this.$router.push('/examinationregistration')
    },
    goMyCertificate () {
      this.$router.push('/mycertificate')
    },
    goMyNotices () {
      this.$router.push('/mynotices')
    }
  }
}
</script>

<style lang="scss">
  .myInfo{
    overflow-x: hidden;
    background: rgba(242,242,242,1);
    height: 1500px;
    .myInfo_personcenter{
      background: #fff;
      margin-top: 14px;
      position: relative;
      .bg_img{
        display: block;
        margin: 0 auto;
        width:754px;
        height:458px;
      }
      .person_info{
        .userName{
          position: absolute;
          left: 50px;
          top: 52px;
          width:242px;
          height:48px;
          font-size:34px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:48px;
        }
        .ID{
          position: absolute;
          left: 50px;
          top: 104px;
          height:34px;
          font-size:24px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(185,194,255,1);
          line-height:34px;
        }
        .college{
          position: absolute;
          left: 270px;
          top: 104px;
          height:34px;
          font-size:24px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(185,194,255,1);
          line-height:34px;
        }
        .userImg{
          position: absolute;
          right: 52px;
          top: 46px;
          width:96px;
          height:96px;
          border:8px solid rgba(185,194,255,1);
          border-radius: 50%;
        }
      }
      .person_study{
        div{
          position: absolute;
          top: 220px;
          .get{
            display: block;
            width:82px;
            height:28px;
            font-size:20px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(185,194,255,1);
            line-height:28px;
            margin-top: -8px;
          }
          p{
            height: 96px;
            line-height:96px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(185,194,255,1);
            span{
              font-size:68px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(255,255,255,1);
            }
          }
        }
        .credit{
          left: 118px;
        }
        .course{
          left: 332px;
        }
        .time{
          right: 90px;
        }
      }
    }
    .myInfoClass{
      background: #fff;
      width: 702px;
      margin: 0 auto;
      height: 326px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-content: space-around;
      div{
        width: 94px;
        margin-right: 82px;
        text-align: center;
        span{
          display: block;
          height:34px;
          font-size:23px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:34px;
          margin-top: 6px;
        }
        img{
          width:88px;
          height:88px;
        }
        &:nth-child(4n){
          margin-right: 0;
        }
      }
    }
    .myCertificate{
      width:702px;
      height:168px;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 32px 0px rgba(226,226,226,1);
      border-radius:12px;
      margin: 22px auto 0;
      position: relative;
      p{
        width:278px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
        margin-top: 60px;
        margin-left: 40px;
      }
      a{
        position: absolute;
        right: 24px;
        top: 60px;
        img{
          width:48px;
          height:48px;
        }
      }
    }
    .myTips{
      width: 702px;
      margin: 16px auto 0;
      background: #fff;
      div{
        height: 48px;
        position: relative;
        margin-top: 40px;
        &:nth-child(1){
          margin-top: 10;
        }
        .icon{
          position: absolute;
          left: 9px;
          width: 48px;
          height: 48px;
        }
        span{
          display: inline-block;
          margin-left: 72px;
          height:48px;
          font-size:34px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:48px;
        }
        .phone{
          float: right;
          margin-right: 70px;
          margin-left: 0;
        }
        .right_arrow{
          position: absolute;
          right: 4px;
          top: 0;
          img{
            width:48px;
            height:48px;
          }
        }
      }
    }
    .line{
      width:750px;
      height:6px;
      border:2px solid rgba(242,242,242,1);
      margin-top: 40px;
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
  }
</style>
