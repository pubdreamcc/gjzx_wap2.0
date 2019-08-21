<template>
  <div class="coursebuy">
    <div class="header"><a href='javascript:;' @click="goBack"><img src="../assets/imgs/live_direction_left@2x.png"></a><span>购买课程</span></div>
    <p class="courseTitle">课程</p>
    <div class="courseInfo">
      <img :src="courseImg">
      <span class="courseInfo-title">{{courseTitle}}</span>
      <span class="courseInfo-totalClass">{{courseClass}}节微课</span>
      <span class="courseInfo-price">{{coursePrice}}</span>
    </div>
    <p class="buyTitle">支付方式</p>
    <div class="weChatBuy BuyMethods" @click="selectPay('weChat')"><img src="../assets/imgs/WeChat@2x.png" class="pay"><span class="buyText">微信支付</span><img src="../assets/imgs/correct@2x.png" class="buySelect" v-if="buy === 'weChat'"><span class="buyRound" v-else></span></div>
    <div class="BuyMethods" @click="selectPay('aLi')"><img src="../assets/imgs/pay@2x.png" class="pay"><span class="buyText">支付宝支付</span><img src="../assets/imgs/correct@2x.png" class="buySelect" v-if="buy === 'aLi'"><span class="buyRound" v-else></span></div>
    <div class="money"><span>￥{{coursePrice}}</span><span>应付金额</span></div>
    <button class="goBuy">立即支付</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      courseTitle: '',
      courseImg: '',
      courseClass: '',
      coursePrice: '',
      buy: 'weChat'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    selectPay (str) {
      this.buy = str
    }
  },
  mounted () {
    // 得到课程信息
    axios.get(`http://www.gk0101.com/teach/rest/v1/course/getCourseInfoByCourseId?courseId=${this.$route.query.courseId}&institutionId=10103`)
      .then(res => {
        if (res.data.code === 0) {
          const ret = res.data.data
          this.courseTitle = ret.courseName
          this.courseClass = ret.totalMic
          this.courseImg = 'http://www.gk0101.com' + ret.coverImg
          if (ret.price && ret.price !== 0) this.coursePrice = ret.price
        }
      }).catch(e => {
        alert('获取课程价格失败' + e)
      })
  }
}
</script>

<style lang='scss' scoped>
  .coursebuy{
    background:rgba(242,242,242,1);
    .header{
      position: relative;
      width:750px;
      height:128px;
      background:rgba(255,255,255,1);
      a{
        position: absolute;
        left: 24px;
        top: 60px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 294px;
        top: 54px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:56px;
      }
    }
    .courseTitle{
      padding-left: 20px;
      padding-top: 16px;
      padding-bottom: 16px;
      font-size:28px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(153,153,153,1);
      line-height:40px;
    }
    .courseInfo{
      width:750px;
      height:248px;
      background:rgba(255,255,255,1);
      padding: 24px 0 20px 26px;
      position: relative;
      box-sizing: border-box;
      img{
        width:272px;
        height:204px;
        border-radius:8px;
      }
      .courseInfo-title{
        position: absolute;
        left: 314px;
        width:414px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
      }
      .courseInfo-totalClass{
        position: absolute;
        left: 314px;
        bottom: 86px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(199,199,204,1);
        line-height:34px;
      }
      .courseInfo-price{
        position: absolute;
        bottom: 20px;
        left: 314px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(76,217,100,1);
        line-height:34px;
      }
    }
    .buyTitle{
      padding: 26px 0 18px 20px;
      height:40px;
      font-size:28px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(153,153,153,1);
      line-height:40px;
    }
    .weChatBuy{
      border-bottom: 1px solid rgba(242,242,242,1);
    }
    .BuyMethods{
      width:750px;
      height:136px;
      background:rgba(255,255,255,1);
      line-height: 136px;
      padding: 0 25px;
      position: relative;
      box-sizing: border-box;
      .pay{
        width: 48px;
        height: 48px;
        margin-right: 36px;
        vertical-align: middle;
      }
      .buyText{
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
      }
      .buySelect{
        width:60px;
        height:60px;
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
      }
      .buyRound{
        position: absolute;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
        width:48px;
        height:48px;
        border-radius:50%;
        box-sizing: border-box;
        opacity:0.3;
        border:2px solid rgba(151,151,151,1);
      }
    }
    .money{
      margin-top: 34px;
      height: 394px;
      background-color: #fff;
      padding: 18px 25px 0;
      box-sizing: border-box;
      span{
        &:nth-child(2){
          height:44px;
          font-size:32px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(0,0,0,1);
          line-height:44px;
        }
        &:nth-child(1){
          float: right;
          height:44px;
          font-size:24px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:rgba(255,59,48,1);
          line-height:34px;
        }
      }
    }
    .goBuy{
      outline: none;
      border: none;
      width:750px;
      height:98px;
      background:rgba(255,122,41,1);
      text-align: center;
      line-height: 98px;
      font-size:32px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(255,255,255,1);
    }
  }
</style>
