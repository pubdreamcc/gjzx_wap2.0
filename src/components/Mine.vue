<template>
  <div class="mine">
    <a href="javascript:;" class="backArrow" @click="goBack"><img src="../assets/imgs/live_direction_left@2x.png"></a>
    <p class="banner">登录国凯鲁班学院</p>
    <div class="inputPhone"><span>+86</span><input type="text" placeholder="请输入手机号" v-model="phoneNumber" @blur="checkPhone" @focus="changeFlag0('phone')"><img src="../assets/imgs/mistake@2x.png" v-if="phoneImgFlag" v-show="phoneImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else></div>
    <div class="inputPsd"><input type="password" placeholder="请输入密码" v-model="psd" @focus="changeFlag0('psd')" @blur="checkPsd"><img src="../assets/imgs/mistake@2x.png" v-if="psdImgFlag" v-show="psdImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else></div>
    <div class="forgetPsd"><span v-show="Tips">请确认手机号和密码有效性</span><span @click="goForgetPsd">忘记密码</span></div>
    <div class="btn"><button class="register_btn" @click="goRegister">注册</button><button class="login_btn" @click="goLogin">登录</button></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      phoneNumber: '',
      psdImgFlag: true,
      phoneImgFlag: true,
      phoneImgFlag0: false,
      psdImgFlag0: false,
      psd: '',
      Tips: false
    }
  },
  watch: {
    phoneNumber () {
      this.checkNumber()
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    goForgetPsd () {
      this.$router.push('/forgetpsd')
    },
    goRegister () {
      this.$router.replace('/register')
    },
    goLogin () {
      if (!(this.psdImgFlag) && !(this.phoneImgFlag) && !(this.Tips)) {
        // 发送Ajax请求获取后台数据
        let URL = 'http://www.gk0101.com/cms/rest/v1/login/doLogin'
        let params = new URLSearchParams()
        let paramObj = {userAccount: this.phoneNumber, userPassword: this.psd, equipmentType: 3, institutionId: '10103', publicIp: '183.56.162.88'}
        params.append('params', JSON.stringify(paramObj))
        axios.post(URL, params).then(res => {
          const result = res.data.code
          // 保存用户的id值
          const userID = res.data.data.id
          if (result === 0) {
            // 跳转至首页,登录成功
            this.$router.replace('/home')
            // 保存userId 到local storage
            localStorage.setItem('userID', userID)
            // 告诉原生当前userId
            if (window.JSIAppData) {
              window.JSIAppData.saveUserId(userID)
            } else if (window.webkit) {
              window.webkit.messageHandlers.saveUserId.postMessage(userID)
            }
          } else {
            // 显示错误提示信息
            this.Tips = true
          }
        }).catch(error => {
          alert('登录失败了~~~' + error)
        })
      }
    },
    checkNumber () {
      if (!(/^\d+/.test(this.phoneNumber))) {
        this.phoneNumber = ''
      } else {
        this.phoneNumber = this.phoneNumber.replace(/\D/g, '')
      }
    },
    changeFlag0 (value) {
      if (value === 'phone') {
        this.phoneImgFlag0 = true
        this.Tips = false
      } else if (value === 'psd') {
        this.psdImgFlag0 = true
        this.Tips = false
      }
    },
    checkPhone () {
      if (!(/^1[34578]\d{9}$/.test(this.phoneNumber))) {
        this.phoneImgFlag = true
      } else {
        this.phoneImgFlag = false
      }
    },
    checkPsd () {
      if (this.psd) {
        this.psdImgFlag = false
      } else {
        this.psdImgFlag = true
      }
    },
    FingerPrintLoginSuccess (id) {
      // 跳转至首页,登录成功
      this.$router.replace('/home')
      // 保存userId 到local storage
      localStorage.setItem('userID', id)
      // 告诉原生当前userId
      if (window.JSIAppData) {
        window.JSIAppData.saveUserId(id)
      } else if (window.webkit) {
        window.webkit.messageHandlers.saveUserId.postMessage(id)
      }
    }
  },
  mounted () {
    // 挂载FingerPrintLoginSuccess方法到window对象供原生调用
    this.$app.FingerPrintLoginSuccess = this.FingerPrintLoginSuccess
    // 告诉安卓自己到了登录页
    if (window.JSIAppData) {
      window.JSIAppData.currentPage('login')
    } else if (window.webkit) {
      // 告诉iOS 自己到了 登录页
      window.webkit.messageHandlers.currentPage.postMessage('login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .mine{
    .backArrow{
      position: absolute;
      left: 38px;
      top: 66px;
      img{
        width: 48px;
        height: 48px;
      }
    }
    .banner{
      width:360px;
      height:58px;
      font-size:42px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(0,0,0,1);
      line-height:58px;
      letter-spacing:2px;
      margin: 202px auto 0;
    }
    .inputPhone{
      margin-top: 146px;
      text-align: center;
      position: relative;
      input{
        box-sizing: border-box;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        outline: none;
        border: 1px solid rgba(153,153,153,1); /*no*/
        width:600px;
        height:96px;
        border-radius:48px;
        padding-left: 144px;
        &::-webkit-input-placeholder{
          color: rgba(153,153,153,1);
        }
      }
      span{
        position: absolute;
        width:62px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
        left: 122px;
        top: 24px;
      }
      img{
        position: absolute;
        right: 7px;
        top: 18px;
        width: 60px;
        height: 60px;
      }
    }
    .inputPsd{
      margin-top: 48px;
      text-align: center;
      position: relative;
      input{
        width:600px;
        height:96px;
        border-radius:48px;
        border: 1px solid rgba(153,153,153,1); /*no*/
        outline: none;
        box-sizing: border-box;
        padding-left: 46px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        &::-webkit-input-placeholder{
          color: rgba(153,153,153,1);
        }
      }
      img{
        position: absolute;
        right: 7px;
        top: 18px;
        width: 60px;
        height: 60px;
      }
    }
    .forgetPsd{
      margin-top: 34px;
      padding-right: 74px;
      padding-left: 76px;
      overflow: hidden;
      span{
        &:nth-child(2){
        float: right;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #3246D8;
        line-height:40px;
        }
        &:nth-child(1){
          display: inline-block;
          height:40px;
          font-size:28px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:red;
          line-height:40px;
        }
      }
    }
    .btn{
      margin-top: 172px;
      text-align: center;
      button{
        width:288px;
        height:96px;
        border-radius:48px;
        border:4px solid rgba(50,70,216,1);
        outline: none;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        text-align: center;
      }
      .register_btn{
        color: #3246D8;
        margin-right: 24px;
        background: #fff;
      }
      .login_btn{
        color: rgba(255,255,255,1);
        background: #3246D8;
      }
    }
  }
</style>
