<template>
  <div class="mine">
    <a href="javascript:;" class="backArrow" @click="goBack"><img src="../assets/imgs/live_direction_left@2x.png"></a>
    <p class="banner">登录国凯鲁班学院</p>
    <div class="inputPhone"><span>+86</span><input type="text" placeholder="请输入手机号"></div>
    <div class="inputPsd"><input type="text" placeholder="请输入密码"></div>
    <div class="forgetPsd"><span>忘记密码</span></div>
    <div class="btn"><button class="register_btn">注册</button><button class="login_btn">登录</button></div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  components: {},
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
  .mine{
    .backArrow{
      position: absolute;
      left: 38px;
      top: 66px;
      img{
        width:20px;
        height:36px;
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
        width:600px;
        height:96px;
        line-height: 96px;
        border-radius:48px;
        border:4px solid rgba(226,226,226,1);
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
    }
    .inputPsd{
      margin-top: 48px;
      text-align: center;
      input{
        width:600px;
        height:96px;
        border-radius:48px;
        border:4px solid rgba(226,226,226,1);
        outline: none;
        box-sizing: border-box;
        padding-left: 46px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height: 96px;
        &::-webkit-input-placeholder{
          color: rgba(153,153,153,1);
        }
      }
    }
    .forgetPsd{
      margin-top: 34px;
      padding-right: 74px;
      text-align: right;
      span{
        display: inline-block;
        width:112px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:40px;
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
        line-height: 96px;
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
