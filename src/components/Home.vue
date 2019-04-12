<template>
  <div class="home">
    <div class="header clearMargin_top"><span>首页</span><a href="javascript:;" class="sao"><img src="../assets/imgs/扫一扫@2x.png"></a><a href="/search" class="search"><img src="../assets/imgs/seek@2x.png"></a></div>
    <div class="slide_banner">
      <mt-swipe>
        <mt-swipe-item><img src="../assets/swiper/swiper1.png"></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swiper/swiper2.png"></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swiper/swiper3.png"></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swiper/swiper4.png"></mt-swipe-item>
        <mt-swipe-item><img src="../assets/swiper/swiper1.png"></mt-swipe-item>
      </mt-swipe>
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
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">安全生产与职业道德</mt-tab-item>
        <mt-tab-item id="2">抹灰工</mt-tab-item>
        <mt-tab-item id="3">架子工</mt-tab-item>
        <mt-tab-item id="4">油漆工</mt-tab-item>
        <mt-tab-item id="5">钢筋工</mt-tab-item>
        <mt-tab-item id="6">混凝土工</mt-tab-item>
        <mt-tab-item id="7">模板工</mt-tab-item>
      </mt-navbar>
      <div class="img_btn"><img src="../assets/imgs/home_more_icon@2x.png"></div>
      <mt-tab-container v-model="selected" swipeable>
        <mt-tab-container-item id="1">
          <div class="course"><img src="../assets/course_imgs/安全生产与职业道德.png"><div class="course_info"><p>安全生产与职业道德</p><span>27节微课</span><span>免费</span></div></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="course"><img src="../assets/course_imgs/抹灰工.png"><div class="course_info"><p>抹灰工</p><span>35节微课</span><span>免费</span></div></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="course"><img src="../assets/course_imgs/架子工.png"><div class="course_info"><p>架子工</p><span>35节微课</span><span>¥19.9</span></div></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <div class="course"><img src="../assets/course_imgs/油漆工.png"><div class="course_info"><p>油漆工</p><span>16节微课</span><span>¥29.9</span></div></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="5">
          <div class="course"><img src="../assets/course_imgs/钢筋工.png"><div class="course_info"><p>钢筋工</p><span>16节微课</span><span>¥29.9</span></div></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="6">
          <div class="course"><img src="../assets/course_imgs/混凝土工.png"><div class="course_info"><p>混凝土工</p><span>16节微课</span><span>¥29.9</span></div></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="7">
          <div class="course"><img src="../assets/course_imgs/模板工.png"><div class="course_info"><p>模板工</p><span>16节微课</span><span>免费</span></div></div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
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
    return {
      selected: '1'
    }
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
    .img_btn{
      position: absolute;
      right: 22px;
      top: 0;
      img{
        width: 48px;
        height: 48px;
      }
    }
    .mint-navbar{
      overflow: auto;
      width: 636px;
      .mint-tab-item.is-selected{
        border-bottom: 8px solid rgba(50,70,216,1);
        color: #000000;
      }
      .mint-tab-item{
        margin-bottom: 0;
        color:rgba(199,199,204,1);
        padding: 0 0 4px 0;
        flex-shrink: 0;
        flex: none;
        margin-right: 22px;
        .mint-tab-item-label{
          height:40px;
          font-size:28px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          line-height:40px;
        }
      }
    }
    .mint-tab-container{
      margin-top: 22px;
      padding-right: 20px;
      .course{
        img{
          width:272px;
          height:205px;
          border-radius:8px;
        }
        .course_info{
          float: right;
          width:414px;
          p{
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
              width:104px;
              height:34px;
              font-size:24px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(199,199,204,1);
              line-height:34px;
            }
            &:nth-child(3){
              margin-top: 12px;
              width:80px;
              height:44px;
              font-size:24px;
              font-family:PingFangSC-Regular;
              font-weight:400;
              color:rgba(255,59,48,1);
              line-height:34px;
            }
          }
        }
      }
    }
  }
  .footer{
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
