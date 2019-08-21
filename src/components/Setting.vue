<template>
 <div class="setting">
   <div class="header_title">
     <a href="#/myinfo"><img src="../assets/imgs/live_direction_left@2x.png"></a>
     <span>设置</span>
   </div>
   <div class="aboutUs position_class" @click="goAboutUs"><span>关于我们</span><img src="../assets/imgs/direction@2x.png"></div>
   <div class="evaluate position_class"><span>评价</span><img src="../assets/imgs/direction@2x.png"></div>
   <div class="fingerPrint position_class" v-if="!NOFingerPrint" @click="handleClick"><span>开启指纹验证</span><van-switch v-model="checked"/></div>
   <div class="changePsd position_class" @click="goChangePsd"><span>修改密码</span><img src="../assets/imgs/direction@2x.png"></div>
   <div class="Sign_out"><span @click="signOut">退出登录</span></div>
 </div>
</template>

<script>
import Switch from 'vant/lib/switch'
import 'vant/lib/switch/style'
export default {
  name: '',
  data () {
    return {
      checked: false,
      NOFingerPrint: false
    }
  },
  components: {
    vanSwitch: Switch
  },
  methods: {
    signOut () {
      // 跳转至首页
      this.$router.replace('/home')
      // 清楚localStorage中存储的userID
      localStorage.clear()
    },
    goAboutUs () {
      this.$router.push('/aboutus')
    },
    goChangePsd () {
      this.$router.push('/changepsd')
    },
    changeFingerPrint (num) {
      switch (num) {
        case 0:
          this.checked = false
          break
        case 1:
          this.checked = true
          break
        case -1:
          this.NOFingerPrint = true
          break
      }
    },
    handleClick (e) {
      if (e.target === document.getElementsByClassName('van-switch')[0] || e.target === document.getElementsByClassName('van-switch__node')[0]) {
      } else {
        this.checked = !this.checked
      }
      if (window.JSIAppData) {
        window.JSIAppData.clickText(this.checked)
      } else if (window.webkit) {
        window.webkit.messageHandlers.JSObject.postMessage(this.checked)
      }
    }
  },
  mounted () {
    // 把自己定义的方法传到 window 对象，供原生调用
    this.$app.changeFingerPrint = this.changeFingerPrint
    // 告诉安卓自己到了设置页
    if (window.JSIAppData) {
      window.JSIAppData.currentPage('setting')
    } else if (window.webkit) {
      // 告诉 IOS 自己到了设置页
      window.webkit.messageHandlers.currentPage.postMessage('setting')
    }
  }
}
</script>

<style lang="scss" scoped>
  .setting{
    background:rgba(242,242,242,1);
    height: 1334px;
    .header_title{
      position: relative;
      height: 126px;
      background: #fff;
      span{
        position: absolute;
        width:82px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:56px;
        top: 48px;
        left: 334px;
      }
      a{
        position: absolute;
        left: 24px;
        top: 58px;
        img{
          width: 48px;
          height: 48px;
        }
      }
    }
    .aboutUs{
      margin-top: 24px;
    }
    .fingerPrint{
      .van-switch{
        top: 20px;
        position: absolute;
        right: 24px;
      }
    }
    .position_class{
      height: 88px;
      background: #fff;
      position: relative;
      border-bottom: 1px solid rgba(242,242,242,1);
      span{
        position: absolute;
        left: 26px;
        top: 20px;
        display: inline-block;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48px;
      }
      img{
        position: absolute;
        top: 20px;
        right: 24px;
        width: 48px;
        height: 48px;
      }
    }
    .Sign_out{
      margin-top: 24px;
      text-align: center;
      height: 88px;
      line-height: 88px;
      font-size:34px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color: #3246D8FF;
      background-color: #fff;
    }
  }
</style>
