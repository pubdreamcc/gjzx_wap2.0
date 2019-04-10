<template>
  <div>
    <div class="home"></div>
    <div class="header"></div>
    <div class="slide_banner"></div>
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
    }
  }
</style>
