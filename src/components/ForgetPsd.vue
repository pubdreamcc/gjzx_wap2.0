<template>
  <div class="forgetpsd">
    <a href="javascript:;" class="backArrow"><img src="../assets/imgs/live_direction_left@2x.png" @click="backToMine"></a>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  methods: {
    backToMine () {
      this.$router.go(-1)
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
  }
</style>
