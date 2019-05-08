<template>
  <div class="forgetpsd clearMargin_top">
    <a href="javascript:;" class="backArrow"><img src="../assets/imgs/live_direction_left@2x.png" @click="backToMine"></a>
    <span class="title">忘记密码</span>
    <div class="inputPhone">
      <span>+86</span>
      <input type="text" placeholder="请输入手机号" v-model="phoneNumber" @keyup="checkOldphone" @focus="changeFlag0('phone')" @blur="checkPhone">
      <img src="../assets/imgs/mistake@2x.png" v-if="phoneImgFlag" v-show="phoneImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else>
    </div>
    <div class="inputConfirm">
      <input type="text" placeholder="请输入验证码" v-model="confirmNumber" @focus="changeFlag0('confirm')" @blur="checkConfirm">
      <span @click="getConfirm" ref="getConfirm">获取验证码</span>
      <img src="../assets/imgs/mistake@2x.png" v-if="confirmImgFlag" v-show="confirmImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else>
    </div>
    <div class="inputNewPsd">
      <input type="password" placeholder="请输入新密码" v-model="psd" @focus="changeFlag0('psd')" @blur="checkPsd" @keyup="checkEffectivePsd">
      <img src="../assets/imgs/mistake@2x.png" v-if="psdImgFlag" v-show="psdImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else>
    </div>
    <div class="inputNewPsd2"><input type="password" placeholder="请再次确认新密码" v-model="psd2" @focus="changeFlag0('psd2')" @keyup="checkCommonPsd" @blur="checkPsd2"><img src="../assets/imgs/mistake@2x.png" v-if="psd2ImgFlag" v-show="psd2ImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else></div>
    <button class="forgetPsd_btn" @click="forgetPsd">确定</button>
    <span v-text="errorTipsMsg" class="errorTipsMsg"></span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      phoneNumber: '',
      timer: 0,
      time: 60,
      psd: '',
      psd2: '',
      confirmNumber: '',
      oldPhone: false,
      psdImgFlag: true,
      psd2ImgFlag: true,
      psd2ImgFlag0: false,
      psdImgFlag0: false,
      confirmImgFlag: true,
      confirmImgFlag0: false,
      phoneImgFlag: true,
      phoneImgFlag0: false,
      TipsMsg: ['手机号还未注册', '密码为6位且不超过20位的数字或字母或下划线组成', '前后两次密码不一致', '验证码错误'],
      errorTipsMsg: ''
    }
  },
  watch: {
    phoneNumber () {
      this.checkNumber()
    }
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  methods: {
    backToMine () {
      this.$router.go(-1)
    },
    getConfirm () {
      if (!this.phoneImgFlag && this.oldPhone) {
        // 发送Ajax请求获取短信验证码
        if (this.time !== 60) {
          return
        }
        this.timer = setInterval(() => {
          this.$refs.getConfirm.innerHTML = this.time + 's'
          this.time--
          if (this.time === -1) {
            clearInterval(this.timer)
            this.time = 60
            this.$refs.getConfirm.innerHTML = '获取验证码'
          }
        }, 1000)
        let URL = 'http://www.gk0101.com/cms/sendAliMsg'
        let params = new URLSearchParams()
        let phoneStr = this.phoneNumber.toString()
        params.append('mobile', phoneStr)
        axios.post(URL, params).then(res => {
          const result = res.data.code
          console.log(result)
        })
      }
    },
    checkConfirm () {
      if (this.confirmNumber.trim()) {
        this.confirmImgFlag = false
      } else {
        this.confirmImgFlag = true
      }
    },
    checkPsd () {
      if (this.psd && this.errorTipsMsg !== this.TipsMsg[1]) {
        this.psdImgFlag = false
      } else {
        this.psdImgFlag = true
      }
    },
    checkPsd2 () {
      if (this.psd2 && this.errorTipsMsg !== this.TipsMsg[2]) {
        this.psd2ImgFlag = false
      } else {
        this.psd2ImgFlag = true
      }
    },
    checkCommonPsd () {
      if ((/^[\w]{6,20}$/.test(this.psd2)) && this.psd2 === this.psd) {
        this.errorTipsMsg = ''
      } else {
        this.errorTipsMsg = this.TipsMsg[2]
      }
    },
    checkEffectivePsd () {
      if (!(/^[\w]{6,20}$/.test(this.psd))) {
        this.errorTipsMsg = this.TipsMsg[1]
      } else if (this.psd !== this.psd2 && (/^[\w]{6,20}$/.test(this.psd))) {
        this.errorTipsMsg = this.TipsMsg[2]
      } else {
        this.errorTipsMsg = ''
      }
    },
    checkNumber () {
      if (!(/^\d+/.test(this.phoneNumber))) {
        this.phoneNumber = ''
      } else {
        this.phoneNumber = this.phoneNumber.replace(/\D/g, '')
      }
    },
    checkOldphone () {
      if ((/^1[34578]\d{9}$/.test(this.phoneNumber))) {
        // 发送Ajax请求判断手机号是否已经注册过
        let URL = 'http://www.gk0101.com/cms/isNoMobile'
        let params = new URLSearchParams()
        let phoneStr = this.phoneNumber.toString()
        params.append('mobile', phoneStr)
        axios.post(URL, params).then(res => {
          const result = res.data.mess
          if (!result) {
            this.errorTipsMsg = this.TipsMsg[0]
            this.oldPhone = false
          } else {
            this.oldPhone = true
            this.errorTipsMsg = ''
          }
        })
      }
    },
    changeFlag0 (str) {
      if (str === 'phone') {
        this.phoneImgFlag0 = true
      } else if (str === 'psd') {
        this.psdImgFlag0 = true
      } else if (str === 'psd2') {
        this.psd2ImgFlag0 = true
      } else {
        this.confirmImgFlag0 = true
      }
    },
    checkPhone () {
      if (!(/^1[34578]\d{9}$/.test(this.phoneNumber))) {
        this.phoneImgFlag = true
      } else if (this.oldPhone) {
        this.phoneImgFlag = false
      } else {
        this.phoneImgFlag = true
      }
    },
    forgetPsd () {
      if ((!this.errorTipsMsg || this.errorTipsMsg === this.TipsMsg[3]) && !this.phoneImgFlag && !this.psd2ImgFlag && !this.psdImgFlag && this.oldPhone && !this.confirmImgFlag) {
        // 发送Ajax请求修改用户的密码
        let URL = 'http://www.gk0101.com/cms/setNewPassword'
        let params = new URLSearchParams()
        params.append('mobile', this.phoneNumber)
        params.append('code', this.confirmNumber)
        params.append('userPassword', this.psd)
        axios.post(URL, params).then(res => {
          let result = res.data.code
          if (result === 0) {
            this.$router.replace('/mine')
            this.errorTipsMsg = ''
          } else {
            this.errorTipsMsg = this.TipsMsg[3]
            this.confirmImgFlag = true
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .forgetpsd{
    position: relative;
    .backArrow{
      position: absolute;
      left: 24px;
      top: 60px;
      img{
        width: 48px;
        height: 48px;
      }
    }
    .title{
      display: block;
      height:58px;
      font-size:42px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(0,0,0,1);
      line-height:58px;
      letter-spacing:1px;
      width: 180px;
      margin: 202px auto 0;
    }
    .inputPhone{
      margin: 146px auto 0;
      position: relative;
      width:600px;
      height:96px;
      span{
        position: absolute;
        left: 46px;
        top: 24px;
        width:62px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
      }
      input{
        border: 2px solid rgba(226,226,226,1);
        outline: none;
        width:600px;
        height:96px;
        border-radius: 48px;
        padding-left: 144px;
        box-sizing: border-box;
        line-height: 96px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #333333;
        &::-webkit-input-placeholder{
          color: #999999;
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
    .inputConfirm{
      margin-top: 48px;
      text-align: center;
      position: relative;
      input{
        outline: none;
        box-sizing: border-box;
        width:600px;
        height:96px;
        border-radius:48px;
        border:2px solid rgba(226,226,226,1);
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#333333;
        line-height:96px;
        padding-left: 46px;
        &::-webkit-input-placeholder{
          color: #999999;
        }
      }
      span{
        position: absolute;
        top: 30px;
        right: 102px;
        width:140px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(50,70,216,1);
        line-height:40px;
      }
      img{
        position: absolute;
        right: 7px;
        top: 18px;
        width: 60px;
        height: 60px;
      }
    }
    .inputNewPsd{
      margin-top: 48px;
      text-align: center;
      position: relative;
      input{
        width:600px;
        height:96px;
        border-radius:48px;
        outline: none;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #333333;
        box-sizing: border-box;
        padding-left: 46px;
        line-height:96px;
        border:2px solid rgba(226,226,226,1);
        &::-webkit-input-placeholder{
          color: #999999;
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
    .inputNewPsd2{
      margin-top: 48px;
      text-align: center;
      position: relative;
      input{
        width:600px;
        height:96px;
        border-radius:48px;
        outline: none;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #333333;
        box-sizing: border-box;
        padding-left: 46px;
        line-height:96px;
        border:2px solid rgba(226,226,226,1);
        &::-webkit-input-placeholder{
          color: #999999;
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
    .forgetPsd_btn{
      display: block;
      margin: 98px auto 0;
      width: 600px;
      height: 96px;
      background:rgba(50,70,216,1);
      border-radius:48px;
      border: none;
      outline: none;
      line-height: 96px;
      text-align: center;
      font-size:34px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .errorTipsMsg{
      display: block;
      margin-top: 20px;
      color: red;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 28px;
      height: 40px;
      line-height: 40px;
      padding-left: 76px;
    }
  }
</style>
