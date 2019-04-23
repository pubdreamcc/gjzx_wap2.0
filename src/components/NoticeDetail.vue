<template>
  <div class="noticedetail">
    <div class="header"><a href="/mynotices"><img src="../assets/imgs/live_direction_left@2x.png"></a><span>消息详情</span></div>
    <div class="noticedetail_content clearMargin_top"><span class="noticedetail_content_title">报名成功</span><span class="noticedetail_content_time">2019.03.18</span><p class="noticedetail_content_content">最近学习的钢筋工课程考试报名已经开始啦,你已经报名成功,考试将以实际考试时间为准,请仔细阅读考试详情,如有疑问,请致电400-609-6665</p></div>
  </div>
</template>

<script>
export default {
  name: ''
}
</script>

<style lang="scss">
  .noticedetail{
    width:750px;
    height:1334px;
    background:rgba(242,242,242,1);
    .header{
      height:128px;
      background:rgba(255,255,255,1);
      position: relative;
      border-bottom: 1px solid rgba(226,226,226,1);
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
    .noticedetail_content{
      margin-top: 44px;
      height: 272px;
      padding-left: 24px;
      background:rgba(255,255,255,1);
      .noticedetail_content_title{
        display: block;
        margin-top: 18px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
      }
      .noticedetail_content_time{
        margin-top: 12px;
        display: block;
        width:112px;
        height:34px;
        font-size:24px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:34px;
      }
      .noticedetail_content_content{
        margin-top: 24px;
        width:700px;
        height:120px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:40px;
      }
    }
  }
</style>
