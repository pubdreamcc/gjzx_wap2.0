<template>
 <div class="register clearMargin_top">
  <a href="javascript:;" class="backArrow" @click="back"><img src="../assets/imgs/live_direction_left@2x.png"></a>
  <p class="register_banner">注册</p>
  <div class="inputPhone"><input type="text" placeholder="请输入手机号" v-model="phoneNumber" @focus="changeFlag0('phone')" @blur="checkPhone" @keyup="checkNewphone"/><span>+86</span><img src="../assets/imgs/mistake@2x.png" v-if="phoneImgFlag" v-show="phoneImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else></div>
  <div class="inputConfirm"><input type="text" placeholder="验证码" v-model="confirmNumber" @focus="changeFlag0('confirm')" @blur="checkConfirm"/><span @click="getConfirm" ref="getConfirm">获取验证码</span><img src="../assets/imgs/mistake@2x.png" v-if="confirmImgFlag" v-show="confirmImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else></div>
  <div class="inputPsd"><input type="password" placeholder="请输入密码" v-model="psd" @focus="changeFlag0('psd')" @blur="checkPsd" @keyup="checkEffectivePsd"/><img src="../assets/imgs/mistake@2x.png" v-if="psdImgFlag" v-show="psdImgFlag0"><img src="../assets/imgs/correct@2x.png" v-else></div>
  <div class="btn"><button @click="goRegister">立即注册</button><span v-text="errorTipsMsg"></span></div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      phoneImgFlag: true,
      confirmImgFlag: true,
      psdImgFlag: true,
      psdImgFlag0: false,
      phoneImgFlag0: false,
      confirmImgFlag0: false,
      psd: '',
      phoneNumber: '',
      confirmNumber: '',
      newPhone: false,
      time: 60,
      TipsMsg: ['手机号码已经注册', '密码为6位且不超过20位的数字或字母或下划线组成', '验证码错误'],
      errorTipsMsg: ''
    }
  },
  watch: {
    phoneNumber () {
      this.checkNumber()
    }
  },
  methods: {
    back () {
      this.$router.replace('/mine')
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
      } else if (value === 'psd') {
        this.psdImgFlag0 = true
      } else {
        this.confirmImgFlag0 = true
      }
    },
    checkNewphone () {
      if ((/^1[34578]\d{9}$/.test(this.phoneNumber))) {
        // 发送Ajax请求判断手机号是否已经注册
        let URL = 'http://www.gk0101.com/cms/isNoMobile'
        let params = new URLSearchParams()
        let phoneStr = this.phoneNumber.toString()
        params.append('mobile', phoneStr)
        axios.post(URL, params).then(res => {
          const result = res.data.mess
          if (result) {
            this.newPhone = false
            this.errorTipsMsg = this.TipsMsg[0]
          } else {
            this.newPhone = true
            this.errorTipsMsg = ''
          }
        }).catch(error => {
          alert('判断手机号是否已经注册失败' + error)
        })
      }
    },
    checkPhone () {
      if (!(/^1[34578]\d{9}$/.test(this.phoneNumber))) {
        this.phoneImgFlag = true
      } else if (this.newPhone) {
        this.phoneImgFlag = false
      } else {
        this.phoneImgFlag = true
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
    checkEffectivePsd () {
      if (!(/^[\w]{6,20}$/.test(this.psd))) {
        this.errorTipsMsg = this.TipsMsg[1]
      } else {
        this.errorTipsMsg = ''
      }
    },
    getConfirm () {
      if (!this.phoneImgFlag && this.newPhone) {
        // 发送Ajax请求获取短信验证码
        if (this.time !== 60) {
          return
        }
        let timer = setInterval(() => {
          this.$refs.getConfirm.innerHTML = this.time + 's'
          this.time--
          if (this.time === -1) {
            clearInterval(timer)
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
        }).catch(error => {
          alert('短信验证发送错误' + error)
        })
      }
    },
    goRegister () {
      if ((!this.errorTipsMsg || this.errorTipsMsg === this.TipsMsg[2]) && !this.phoneImgFlag && !this.psdImgFlag && this.newPhone && !this.confirmImgFlag) {
        // 发送Ajax请求注册用户信息
        let URL = 'http://www.gk0101.com/cms/registUser'
        let userInfoObj = {mobile: this.phoneNumber, userPassword: this.psd, code: this.confirmNumber, equipmentType: 3, institutionId: '10103'}
        let params = new URLSearchParams()
        params.append('params', JSON.stringify(userInfoObj))
        axios.post(URL, params).then(res => {
          let result = res.data.code
          const userID = res.data.data.id
          if (result === 0) {
            // 注册成功跳转至首页
            this.$router.replace('/home')
            localStorage.setItem('userID', userID)
            this.errorTipsMsg = ''
          } else {
            this.errorTipsMsg = this.TipsMsg[2]
            this.confirmImgFlag = true
          }
        }).catch(error => {
          alert('注册用户失败' + error)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .register{
    position: relative;
    .backArrow{
      position: absolute;
      left: 38px;
      top: 66px;
      img{
        width: 48px;
        height: 48px;
      }
    }
    .register_banner{
      width:90px;
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
        width:600px;
        height:96px;
        border-radius:48px;
        outline: none;
        color: #333333;
        border:4px solid rgba(226,226,226,1);
        padding-left: 144px;
        line-height: 96px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        &::-webkit-input-placeholder{
          color: #999999;
        }
      }
      span{
        position: absolute;
        left: 122px;
        top: 24px;
        width:62px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:48px;
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
        border:4px solid rgba(226,226,226,1);
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#333333;
        line-height:96px;
        padding-left: 46px;
        &::-webkit-input-placeholder{
          color: #666666;
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
    .inputPsd{
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
        border:4px solid rgba(226,226,226,1);
        &::-webkit-input-placeholder{
          color: #666666;
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
    .btn{
      margin-top: 98px;
      text-align: center;
      button{
        width:600px;
        height:96px;
        background:rgba(50,70,216,1);
        border-radius:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      span{
        display: block;
        margin-top: 20px;
        color: red;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        font-size: 28px;
        height: 40px;
        line-height: 40px;
      }
    }
  }
</style>
