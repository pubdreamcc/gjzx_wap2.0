<template>
 <div class="myscore">
   <div class="header"><a href="#/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>我的成绩</span></div>
   <div class="scoreRule clearMargin_top"><span>成绩计算规则</span><p><span>总成绩=观看成绩+平时成绩*20%+综合考试成绩*60%；</span><span>观看成绩：0或20分；</span><span>平时成绩：取所有章节测验的最高分后再平均；</span><span>综合考试成绩：线上或线下考试的最终成绩；</span></p></div>
   <ul class="scoreClass">
     <li>课程名称</li>
     <li>章节测试</li>
     <li>综合测试</li>
     <li>平时成绩</li>
     <li>总成绩</li>
   </ul>
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

<style lang="scss" scoped>
  .myscore{
    background:rgba(242,242,242,1);
    .header{
      position: relative;
      height:128px;
      background:rgba(50,70,216,1);
      a{
        position: absolute;
        left: 24px;
        top: 62px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 294px;
        top: 56px;
        width:164px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:56px;
      }
    }
    .scoreRule{
      background-color: #fff;
      margin: 34px auto 0;
      width:702px;
      height:236px;
      padding-left: 26px;
      box-sizing: border-box;
      border-radius:12px;
      &>span{
        display: inline-block;
        margin-top: 16px;
        width:240px;
        height:42px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
      }
      p{
        width:622px;
        height:156px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:34px;
        margin-top: 20px;
        span{
          display: block;
        }
      }
    }
    .scoreClass{
      margin: 22px auto 0;
      width:702px;
      height:80px;
      background:rgba(226,226,226,1);
      border-radius:12px 12px 0px 0px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      li{
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:40px;
      }
    }
  }
</style>
