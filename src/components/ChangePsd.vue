<template>
 <div class="changepsd">
   <div class="header"><a href="#/setting"><img src="../assets/imgs/live_direction_left@2x.png"></a><span>修改密码</span></div>
   <div class="inputHeight first_input"><input type="password" placeholder="请输入原密码" v-model="oldPsd"></div>
   <div class="inputHeight"><input type="password" placeholder="请输入新密码" v-model="newPsd"></div>
   <div class="inputHeight"><input type="password" placeholder="请再次输入新密码" v-model="newPsd02"></div>
   <div class="inputHeight btn" @click="goChangePsd">确定</div>
   <p class="Tips" ref="error_Tips"></p>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      oldPsd: '',
      newPsd: '',
      newPsd02: ''
    }
  },
  methods: {
    goChangePsd () {
      // 发生ajax请求更改用户密码
      if (!this.oldPsd.trim()) {
        this.$refs.error_Tips.innerHTML = '原密码不能为空'
      } else if (!this.newPsd.trim()) {
        this.$refs.error_Tips.innerHTML = '新密码不能为空'
      } else if (!this.newPsd02.trim()) {
        this.$refs.error_Tips.innerHTML = '请再次确认新密码'
      } else if (this.newPsd.trim() !== this.newPsd02.trim()) {
        this.$refs.error_Tips.innerHTML = '前后两次密码不一致'
      } else if (this.oldPsd.trim() && this.newPsd.trim() === this.newPsd02.trim()) {
        // 发生ajax请求判断用户输入的密码是否正确
        let URL = 'http://www.gk0101.com/cms/setNewPasswordByUserId'
        let params = new URLSearchParams()
        params.append('userId', localStorage.getItem('userID'))
        params.append('oldPassword', this.oldPsd.trim())
        axios.post(URL, params).then(res => {
          const result = res.data.code
          if (result === 0) {
            // 用户输入的旧密码正确，可以修改密码
            let URL = 'http://www.gk0101.com/cms/updateUserInfo'
            let params = new URLSearchParams()
            params.append('userId', localStorage.getItem('userID'))
            params.append('newPassword', this.newPsd.trim())
            axios.post(URL, params).then(res => {
              if (res.data.code === 0) {
                alert('修改成功')
                this.$router.go(-1)
              }
            })
          } else {
            this.$refs.error_Tips.innerHTML = '原密码输入错误'
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .changepsd{
    width:750px;
    height:1334px;
    background:rgba(242,242,242,1);
    .header{
      position: relative;
      background-color: #fff;
      height: 128px;
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
    .inputHeight{
      margin-top: 2px;
      width: 750px;
      height: 88px;
      background: #fff;
      input{
        border: none;
        outline: none;
        box-sizing: border-box;
        padding-left: 26px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color: #333;
        width: 100%;
        height: 100%;
        line-height: 88px;
        &::-webkit-input-placeholder{
          color:rgba(153,153,153,1);
        }
      }
    }
    .first_input{
      margin-top: 22px;
    }
    .btn{
      margin-top: 34px;
      background:rgba(50,70,216,1);
      font-size:34px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height: 88px;
      text-align: center;
    }
    .Tips{
      color: red;
      font-size: 30px;
      margin-top: 10px;
      padding-left: 30px;
      font-family: PingFangSC-Regular;
    }
  }
</style>
