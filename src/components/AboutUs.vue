<template>
 <div class="aboutus">
   <div class="header"><a href="#/setting"><img src="../assets/imgs/live_direction_left@2x.png"></a><span>关于我们</span></div>
   <img src="../assets/imgs/logo@2x.png" class="logo">
   <div class="title"><span>国凯鲁班学院</span></div>
   <div class="version"><span>V2.0.0</span></div>
   <div class="content">
     <p class="introduce">国凯鲁班学院是深圳国泰安教育技术有限公司与广东省凯文职业培训学院联合开发运营的面向建设行业从业人员，全面提升职业技能及职业资格证书培训的在线学习平台，可为学员提供便捷的线上O2O学习综合解决方案。</p>
     <p class="content_Detail"><span class="content_Detail_title">培训项目及服务主要包含:</span><span>20多个建设行业技术工种的培训及继续教育；</span><span>建设行业现场专业人员的培训及继续教育；</span><span>安管三类人员；<span>建造师继续教育及考前辅导；</span></span><span>招投标从业人员培训；</span><span>广东省建设领域专业技术人员的高级技术研修培训；</span><span>BIM培训等。</span></p>
   </div>
 </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style lang="scss" scoped>
  .aboutus{
    width:750px;
    height:1334px;
    background:rgba(242,242,242,1);
    position: relative;
    .header{
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
        top: 54px;
        left: 294px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:56px;
      }
    }
    .logo{
      position: absolute;
      left: 280px;
      top: 210px;
      width: 192px;
      height: 192px;
    }
    .title{
      text-align: center;
      position: absolute;
      left: 24px;
      top: 426px;
      width:704px;
      height:62px;
      span{
        height:62px;
        font-size:48px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:66px;
      }
    }
    .version{
      position: absolute;
      left: 24px;
      top: 504px;
      width:704px;
      height:62px;
      text-align: center;
      span{
        font-size:32px;
         line-height: 44px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
      }
    }
    .content{
      position: absolute;
      left: 24px;
      top: 612px;
      width: 704px;
      height: 662px;
      color: #333333;
      font-family: PingFangSC;
      font-size: 28px;
      font-weight: 400;
      line-height: 48px;
      .content_Detail{
        margin-top: 48px;
        span{
          display: block;
        }
        .content_Detail_title{
          display: block;
          font-size: 32px;
          font-weight: 800;
          color: #333;
        }
      }
    }
  }
</style>
