<template>
 <div class="personinfo">
   <div class="personinfo_title">
     <a href="/myinfo" class="backArrow"><img src="../assets/imgs/live_direction_left@2x.png"></a>
     <span class="person_info_title">个人信息</span>
     <span class="save" @click="save">保存</span>
   </div>
   <div class="person_img">
     <span class="commonSpan">头像</span>
     <a href="javascript:;"><input type="file" id="file01" name="file01" accept=".png,.jpg" @change="showImg"><img :src="personinfo.userImg"></a>
   </div>
   <div class="name commonHeight"><span class="commonHeight_Span">姓名</span><span class="commonHeight_SpanRight"><input type="text" placeholder="请输入您的姓名" v-model="name"></span></div>
   <div class="sex commonHeight"><span class="commonHeight_Span">性别</span><span class="commonHeight_SpanRight"><label for="male">男</label><input type="radio" id="male" name="sex" :checked="male" class="sex_input" ref="radioMale"><label for="female">女</label><input type="radio" id="female" name="sex" :checked="female" class="sex_input" ref="radioFemale"></span></div>
   <div class="account commonHeight"><span class="commonHeight_Span">账号</span><span class="commonHeight_SpanRight">{{personinfo.userAccount}}</span></div>
   <div class="company commonHeight"><span class="commonHeight_Span">所属企业</span><span class="commonHeight_SpanRight">{{personinfo.institutionName}}</span></div>
   <div class="contact commonHeight"><span class="commonHeight_Span">联系方式</span><span class="commonHeight_SpanRight"><input type="text" placeholder="请输入手机号" v-model="phone"></span></div>
   <div class="email commonHeight"><span class="commonHeight_Span">邮箱</span><span class="commonHeight_SpanRight"><input type="text" placeholder="请输入邮箱" v-model="email"></span></div>
   <div class="qq commonHeight"><span class="commonHeight_Span">QQ号</span><span class="commonHeight_SpanRight"><input type="text" placeholder="请输入QQ号" v-model="qq"></span></div>
   <div class="WeChat commonHeight"><span class="commonHeight_Span">微信号</span><span class="commonHeight_SpanRight"><input type="text" placeholder="请输入微信号" v-model="WeChat"></span></div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      personinfo: {userImg: './static/img/bat_me@2x.png', sex: '', institutionName: '', userAccount: ''},
      male: false,
      female: false,
      name: '',
      phone: '',
      email: '',
      qq: '',
      WeChat: '',
      file: null,
      sex: ''
    }
  },
  created () {
    // 取出userID
    const userID = localStorage.getItem('userID')
    let URL = 'http://www.gk0101.com/cms/getUserInfoByUserIdOnPone?userId=' + userID
    axios.get(URL).then(res => {
      const result = res.data.data
      if (result.userImg) {
        this.personinfo.userImg = 'http://www.gk0101.com' + result.userImg
      }
      this.WeChat = result.weChat
      this.qq = result.qq
      this.email = result.email
      this.personinfo.sex = result.sex
      if (this.personinfo.sex === 1) {
        this.male = true
        this.female = false
      } else if (this.personinfo.sex === 2) {
        this.female = true
        this.male = false
      }
      this.personinfo.institutionName = result.institutionName
      this.personinfo.userAccount = result.userAccount
      this.phone = result.mobile
      this.name = result.userName
    }).catch(error => {
      alert('请求个人信息数据错误' + error)
    })
  },
  methods: {
    showImg (event) {
      let fileLength = event.target.files.length
      if (fileLength !== 0) {
        let file = event.target.files[0]
        this.file = file
        let URL = window.URL
        let imgURL = URL.createObjectURL(file)
        this.personinfo.userImg = imgURL
        event.target.value = null
      }
    },
    save () {
      // 发送Ajax请求更新用户信息
      if (this.phone.trim() === '' || /^1[34578]\d{9}$/.test(this.phone.trim())) {
        let URL = 'http://www.gk0101.com/cms/updateUser'
        if (this.$refs.radioMale.checked) {
          this.sex = 1
        } else if (this.$refs.radioFemale.checked) {
          this.sex = 2
        }
        let params = new FormData()
        params.append('file', this.file)
        params.append('id', localStorage.getItem('userID'))
        params.append('userName', this.name)
        params.append('sex', this.sex)
        params.append('mobile', this.phone)
        params.append('email', this.email)
        params.append('qq', this.qq)
        params.append('weChat', this.WeChat)
        axios.post(URL, params, {headers: {'Content-Type': 'multipart/form-data'}}).then(res => {
          if (res.data.code === 0) {
            this.$router.go(-1)
          }
        }).catch(error => {
          alert('更新用户数据失败' + error)
        })
      } else {
        alert('手机号格式错误')
      }
    }
  }
}
</script>

<style lang="scss">
  .personinfo{
    background: rgba(242,242,242,1);
    height: 1334px;
    .personinfo_title{
      height: 128px;
      background-color: #fff;
      .backArrow{
        position: absolute;
        left: 24px;
        top: 60px;
        img{
          width: 48px;
          height: 48px;
        }
      }
      .person_info_title{
        position: absolute;
        top: 56px;
        left: 294px;
        width:164px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(0,0,0,1);
        line-height:56px;
      }
      .save{
        position: absolute;
        right: 24px;
        bottom: 24px;
        width:58px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:40px;
      }
    }
    .commonSpan{
      position: absolute;
      left: 22px;
      top: 62px;
      height:48px;
      font-size:34px;
      font-family:PingFangSC-Regular;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:48px;
    }
    div{
      position: relative;
      background: #fff;
      .commonHeight_SpanRight{
        position: absolute;
        right: 24px;
        top: 22px;
        height:40px;
        font-size:28px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:40px;
        input{
          text-align: right;
          margin: 0 10px 0 0;
          border: none;
          outline: none;
          height: 40px;
          font-size:28px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(0,0,0,1);
          line-height:40px;
          box-sizing: border-box;
          padding: 0;
          &::-webkit-input-placeholder{
            font-size: 25px;
          }
        }
        .sex_input{
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }
      }
    }
    .commonHeight{
      height: 88px;
      margin-top: 2px;
      .commonHeight_Span{
        position: absolute;
        left: 26px;
        top: 18px;
        height:48px;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:48px;
      }
    }
    .company{
      margin-top: 24px;
    }
    .email{
      margin-top: 24px;
    }
    .qq{
      margin-top: 24px;
    }
    .person_img{
      height: 176px;
      margin-top: 24px;
      background: #fff;
      a{
        position: absolute;
        right: 94px;
        top: 40px;
        #file01{
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%,-50%);
          width: 96px;
          height: 96px;
          opacity: 0;
        }
        img{
          width:96px;
          height:96px;
          border:8px solid rgba(185,194,255,1);
          border-radius: 50%;
        }
      }
    }
  }
</style>
