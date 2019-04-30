<template>
  <div class="coursedetail">
    <div class="backArrow" @click="goback"><img src="../assets/imgs/live_lift@2x.png"></div>
    <videoPlayer :options='playerOptions' ref="videoPlayer" class="video-player vjs-custom-skin" :playsinline="true"></videoPlayer>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import {videoPlayer} from 'vue-video-player'
export default {
  name: '',
  data () {
    return {
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: false,
        language: 'zh-CN',
        fluid: true,
        aspectRatio: '16:9',
        preload: 'auto',
        sources: [{
          type: 'video/mp4',
          src: 'http://www.gk0101.com/upload/video/fa65a4b24d534aecb8957bbccfca1bcd.mp4'
        }],
        controlBar: {
          timeDivider: false,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      }
    }
  },
  components: {
    videoPlayer
  },
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  .coursedetail{
    .video-player{
      width:750px;
      height:422px;
      .vjs-big-play-button{
        width:144px;
        height:144px !important;
        transform: translate(-50%,-50%);
        margin-left: 0;
        margin-top: 0 !important;
        background: url('../assets/imgs/Play@2x.png') center center no-repeat;
        background-size: 100% 100%;
        border: none;
        outline: none;
        span{
          display: none;
        }
      }
      .vjs-control-bar{
        height: 88px;
        .vjs-play-control{
          width:53px;
          height:53px;
          background: url('../assets/imgs/Play@2x.png') center center no-repeat;
          border: none;
          outline: none;
          background-size: 100% 100%;
          margin: 13px 0 11px 15px;
          span{
            display: none;
          }
        }
        .vjs-volume-panel{
          display: none;
        }
      }
      .vjs-current-time{
        width:54px;
        height:28px;
        font-size:20px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:28px;
        margin: 0 0 !important;
        position: absolute;
        bottom: 10px;
        left: 88px;
        text-align: center;
      }
      .vjs-duration{
        position: absolute;
        margin: 0 !important;
        width:50px;
        height:28px;
        font-size:20px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:28px;
        text-align: center;
        bottom: 10px;
        right: 96px;
      }
      .vjs-progress-control{
          width: 560px;
          flex: none;
          margin-left: 26px;
        .vjs-progress-holder{
          background:rgba(226,226,226,1);
          margin-top: -6px;
          .vjs-play-progress::before{
            width:24px;
            height:24px;
            background:rgba(255,255,255,1);
            border-radius:12px;
            top: -10px;
          }
        }
      }
      .vjs-fullscreen-control{
        width:36px;
        height:36px;
        border: none;
        outline: none;
        background: url('../assets/imgs/play_full@2x.png') center center no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 30px;
        top: 26px;
        span{
          display: none;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  .coursedetail{
    position: relative;
    .backArrow{
      position: absolute;
      left: 38px;
      top: 66px;
      z-index: 2;
      img{
        width: 48px;
        height: 48px;
      }
    }
  }

</style>
