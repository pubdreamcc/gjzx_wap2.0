<template>
  <transition name="myRouter" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  .myRouter-enter, .myRouter-leave-to{
    opacity: 0;
    transform: translateX(-100%);
  }
  .myRouter-enter-active, .myRouter-leave-active{
    transition: all .2s linear;
  }
</style>
