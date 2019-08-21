<template>
  <div class="mycredit">
    <div class="header"><a href="#/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>学分</span></div>
    <div class="credit_content">
      <img src="../assets/imgs/credit@2x.png">
      <span class="credits">{{credits}}</span>
      <span class="credit_tags">已获学分</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      credits: 0
    }
  },
  mounted () {
    const URL = `http://www.gk0101.com/exam/rest/v1/exam/getInformationByUserId`
    const userID = localStorage.getItem('userID')
    const params = new URLSearchParams()
    params.append('userId', userID)
    params.append('institutionId', '10103')
    axios.post(URL, params).then(res => {
      if (res.data.code === 0) {
        const result = res.data.data
        this.credits = result.credits
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .mycredit{
    background:rgba(242,242,242,1);
    .header{
      position: relative;
      width:750px;
      height:128px;
      background-color: #3246D8;
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
        top: 54px;
        width:82px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:56px;
      }
    }
    .credit_content{
      position: relative;
      width: 100%;
      height: 260px;
      img{
        position: absolute;
        left: 24px;
        top: 24px;
        width:702px;
        height:236px;
        border-radius:12px;
      }
      .credits{
        position: absolute;
        left: 76px;
        top: 72px;
        width:80px;
        height:92px;
        font-size:66px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:92px;
        z-index: 1;
      }
      .credit_tags{
        position: absolute;
        left: 76px;
        top: 164px;
        width:120px;
        height:48px;
        line-height: 48px;
        text-align: center;
        border-radius:36px;
        font-size:20px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        border:2px solid rgba(255,255,255,1);
      }
    }
  }
</style>
