<template>
  <div class="scan">
    <div class="header"><a href="#/home"><img src="../assets/imgs/live_lift@2x.png"></a><span>扫一扫</span></div>
    <div class="scanArea"></div>
    <div class="switch"><img src="../assets/imgs/light@3x.png" @click="openLight"><span @click="openLight">打开手电筒</span></div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      codeURL: '',
      scan: ''
    }
  },
  // created () {
  //   // 创建扫码控件
  //   let that = this
  //   if (!window.plus) return
  //   that.scan = new plus.barcode.Barcode('scanArea')
  //   that.scan.onmarked = (type, result, file) => {
  //     switch (type) {
  //       case plus.barcode.QR:
  //         type = 'QR'
  //         break
  //       case plus.barcode.EAN13:
  //         type = 'EAN13'
  //         break
  //       case plus.barcode.EAN8:
  //         type = 'EAN8'
  //         break
  //       default:
  //         type = '其它' + type
  //         break
  //     }
  //     result = result.replace(/\n/g, '')
  //     that.codeUrl = result
  //     alert(result)
  //     that.closeScan()
  //   }
  // },
  mounted () {
    // 开始扫码
    if (!window.plus) return
    this.scan.start()
  },
  methods: {
    closeScan () {
      if (!window.plus) return
      this.scan.close()
    },
    openLight () {
      this.scan.setFlash(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  .scan{
    height: 1334px;
    position: relative;
    background-color: black;
    .header{
      position: relative;
      height: 126px;
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
    .scanArea{
      height: 800px;
      text-align: center;
      color: #fff;
    }
    .switch{
      img{
        position: absolute;
        left: 346px;
        top: 900px;
        width:72px;
        height:72px;
        background: #1B1B1B;
        border-radius:36px;
      }
      span{
        position: absolute;
        left: 316px;
        top: 998px;
        width:130px;
        height:36px;
        font-size:26px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:36px;
      }
    }
  }
</style>
