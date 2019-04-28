<template>
 <div class="examinationRegistration">
   <div class="header"><a href="/myinfo"><img src="../assets/imgs/live_lift@2x.png"></a><span>考试报名</span></div>
   <ul class="exam_progress" id="exam_progress">
     <li class="activeSelect" @click="selectMenu(0)">全部</li>
     <li @click="selectMenu(1)">未预约</li>
     <li @click="selectMenu(2)">待审核</li>
     <li @click="selectMenu(3)">审核通过</li>
   </ul>
   <swiper :options="swiperOption" ref="myswiper">
     <swiper-slide>暂时没有相关数据</swiper-slide>
     <swiper-slide>暂时没有相关数据</swiper-slide>
     <swiper-slide>暂时没有相关数据</swiper-slide>
     <swiper-slide>暂时没有相关数据</swiper-slide>
   </swiper>
 </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      swiperOption: {
        on: {
          slideChangeTransitionEnd () {
            let allLi = document.getElementById('exam_progress').getElementsByTagName('li')
            for (let i = 0; i < allLi.length; i++) {
              if (i === this.activeIndex) {
                allLi[this.activeIndex].className = 'activeSelect'
              } else {
                allLi[i].className = ''
              }
            }
          }
        }
      }
    }
  },
  methods: {
    selectMenu (index) {
      let allLi = document.getElementById('exam_progress').getElementsByTagName('li')
      switch (index) {
        case 0:
          this.$refs.myswiper.swiper.slideTo(0, 300, false)
          allLi[0].className = 'activeSelect'
          allLi[1].className = allLi[2].className = allLi[3].className = ''
          break
        case 1:
          this.$refs.myswiper.swiper.slideTo(1, 300, false)
          allLi[1].className = 'activeSelect'
          allLi[0].className = allLi[2].className = allLi[3].className = ''
          break
        case 2:
          this.$refs.myswiper.swiper.slideTo(2, 300, false)
          allLi[2].className = 'activeSelect'
          allLi[0].className = allLi[1].className = allLi[3].className = ''
          break
        case 3:
          this.$refs.myswiper.swiper.slideTo(3, 300, false)
          allLi[3].className = 'activeSelect'
          allLi[0].className = allLi[1].className = allLi[2].className = ''
          break
      }
    }
  }
}

</script>

<style lang="scss">
  .examinationRegistration{
    background:rgba(242,242,242,1);
    .header{
      position: relative;
      height:128px;
      background:rgba(50,70,216,1);
      a{
        position: absolute;
        left: 24px;
        top: 60px;
        img{
          width:48px;
          height:48px;
        }
      }
      span{
        position: absolute;
        left: 294px;
        top: 56px;
        width:164px;
        height:56px;
        font-size:40px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:56px;
      }
    }
    .exam_progress{
      height: 88px;
      display: flex;
      background-color: #fff;
      li{
        flex: 0 0 25%;
        height: 88px;
        line-height: 88px;
        box-sizing: border-box;
        text-align: center;
        font-size:34px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(153,153,153,1);
        &.activeSelect{
          border-bottom: 6px solid rgba(50,70,216,1);
        }
      }
    }
    .swiper-container{
      margin-top: 24px;
      height: 300px;
      font-size: 28px;
    }
  }
</style>
