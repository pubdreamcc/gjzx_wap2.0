<template>
 <div class="personinfo">
   <div class="personinfo_title">
     <a href="/myinfo" class="backArrow"><img src="../assets/imgs/live_direction_left@2x.png"></a>
     <span class="person_info_title">个人信息</span>
     <span class="save">保存</span>
   </div>
   <div class="person_img">
     <span class="commonSpan">头像</span>
     <a href="javascript:;"><img :src="personinfo.userImg"></a>
   </div>
   <div class="name commonHeight"><span class="commonSpan">姓名</span></div>
 </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  data () {
    return {
      personinfo: {userImg: './static/img/bat_me@2x.png', weChat: '', qq: '', email: '', sex: '', userName: '', mobile: '', institutionName: '', userAccount: ''}
    }
  },
  created () {
    // 取出userID
    const userID = localStorage.getItem('userID')
    let URL = 'http://www.gk0101.com/cms/getUserInfoByUserIdOnPone?userId=' + userID
    axios.get(URL).then(res => {
      const result = res.data.data
      if (result.userImg) {
        this.personinfo.userImg = result.userImg
      }
      this.personinfo.weChat = result.weChat
      this.personinfo.qq = result.qq
      this.personinfo.email = result.email
      this.personinfo.sex = result.sex
      this.personinfo.institutionName = result.institutionName
      this.personinfo.userAccount = result.userAccount
      this.personinfo.mobile = result.mobile
      this.userName = result.userName
    }).catch(error => {
      alert('请求个人信息数据错误' + error)
    })
  }
}
</script>

<style lang="scss">
  .personinfo{
    background: rgba(242,242,242,1);
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
    }
    .person_img{
      height: 176px;
      margin-top: 24px;
      background: #fff;
      a{
        position: absolute;
        right: 94px;
        top: 40px;
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
