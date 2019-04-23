<template>
 <div class="mycertificate">
   <div class="header"><a href="/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>国凯鲁班学院证书</span></div>
   <div class="certificateDetail"><span>钢筋工证书</span><a href="javascript:;"><img src="../assets/imgs/direction@2x.png"></a></div>
 </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  .mycertificate{
    width:750px;
    height:1334px;
    background:rgba(242,242,242,1);
    .header{
      width:750px;
      height:128px;
      background:rgba(50,70,216,1);
      position: relative;
      a{
        position: absolute;
        left: 24px;
        top: 58px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 212px;
        top: 56px;
        width:328px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:56px;
      }
    }
    .certificateDetail{
      margin-top: 28px;
      height: 88px;
      background:#ffffff;
      position: relative;
      span{
        position: absolute;
        left: 24px;
        top: 20px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
      }
      a{
        position: absolute;
        right: 24px;
        top: 20px;
        img{
          width: 48px;
          height: 48px;
        }
      }
    }
  }
</style>
