<template>
  <div class="home">
    <div class="header clearMargin_top"><span>首页</span><a href="javascript:;" class="sao"><img src="../assets/imgs/扫一扫@2x.png"></a><a href="javascript:;" class="search"><img src="../assets/imgs/seek@2x.png"></a></div>
    <div class="slide_banner">
      <mt-swipe>
        <mt-swipe-item><img src="../assets/swiper/swiper1.png"></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swiper/swiper2.png"></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swiper/swiper3.png"></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swiper/swiper4.png"></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swiper/swiper1.png"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="live_course"></div>
    <div class="live_banner"></div>
    <p class="recommend_course"></p>
    <div class="course_class"></div>
    <div class="footer">
      <div class="home"><a href="javascript:;"><img src="../assets/imgs/home_bat_home_icon@2x.png"><span>首页</span></a></div>
      <div class="home"><a href="/resourcecenter"><img src="../assets/imgs/home_bat_resource_icon@2x.png"><span>资源中心</span></a></div>
      <div class="home"><a href="/mine"><img src="../assets/imgs/home_bat_me_icon@2x.png"><span>我的</span></a></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  components: {}
}
</script>

<style lang="scss">
  .header{
    width:750px;
    height:126px;
    background:rgba(50,70,216,1);
    position: relative;
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
    margin-top: 24px;
    height: 320px;
    img{
      width: 100%;
      height: 100%;
    }
    .mint-swipe-indicators{
      left: 534px;
      bottom: 24px;
      transform: none;
      .mint-swipe-indicator{
        width:20px;
        height:8px;
        margin-right: 10px;
        background:rgba(153,153,153,1);
        border-radius:7px;
      }
      .is-active{
        background:rgba(255,255,255,1);
      }
    }
  }
  .footer{
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
