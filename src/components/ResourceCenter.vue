<template>
   <div class="resourcecenter">
    <div class="footer">
      <div class="home"><a href="/home"><img src="../assets/imgs/bat_home@2x.png"><span>首页</span></a></div>
      <div class="home"><a href="javascript:;"><img src="../assets/imgs/bat_course@2x.png"><span>资源中心</span></a></div>
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
