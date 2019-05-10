<template>
  <div class="scan">
    <div class="header"><a href="#/home"><img src="../assets/imgs/live_lift@2x.png"></a><span>扫一扫</span></div>
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
  .scan{
    .header{
      position: relative;
      height: 126px;
      background-color: black;
      a{
        position: absolute;
        left: 38px;
        top: 50px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      span{
        position: absolute;
        left: 316px;
        top: 50px;
        width:120px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:56px;
      }
    }
  }
</style>
