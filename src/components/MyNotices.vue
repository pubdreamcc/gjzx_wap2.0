<template>
  <div class="mynotices">
    <div class="header"><a href="myinfo"><img src="../assets/imgs/live_direction_left@2x.png"></a><span class="title">我的消息</span><span class="read">已读</span></div>
    <div class="notice_content">
      <div class="system_notices commonStyle" @click="goNoticeDetail"><img src="../assets/imgs/messages@2x.png"><span>系统消息</span><span>最近学习的钢筋工课程考试报名已经开始啦</span><span class="time">2019.03.18</span></div>
      <div class="line"></div>
      <div class="admin_notices commonStyle" @click="goNoticeDetail"><img src="../assets/imgs/inform@2x.png"><span>管理员通知</span><span>最近学习的钢筋工课程考试报名已经开始啦,点击链…</span><span class="time">2019.03.18</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  methods: {
    goNoticeDetail () {
      this.$router.push('/noticedetail')
    }
  }
}
</script>

<style lang="scss">
  .mynotices{
    width:750px;
    height:1334px;
    background:rgba(242,242,242,1);
    .header{
      position: relative;
      background-color: #fff;
      height:128px;
      a{
        position: absolute;
        left: 24px;
        top: 60px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      .title{
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
      .read{
        position: absolute;
        right: 24px;
        top: 58px;
        height:44px;
        font-size:32px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:44px;
      }
    }
    .notice_content{
      margin-top: 44px;
      position: relative;
      height:266px;
      background:rgba(255,255,255,1);
      .line{
        position: absolute;
        left: 24px;
        top: 130px;
        width:702px;
        height:0;
        border-top:2px solid rgba(226,226,226,1);
      }
      .commonStyle{
        height: 133px;
        position: relative;
        img{
          position: absolute;
          left: 24px;
          top: 20px;
          width: 48px;
          height: 48px;
        }
        span{
          position: absolute;
          &:nth-child(2){
            left: 96px;
            top: 18px;
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:48px;
          }
          &:nth-child(3){
            top: 72px;
            left: 96px;
            height:40px;
            font-size:28px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:40px;
          }
          &.time{
            top: 26px;
            right: 24px;
            height:34px;
            font-size:24px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:34px;
          }
        }
      }
    }
  }
</style>
