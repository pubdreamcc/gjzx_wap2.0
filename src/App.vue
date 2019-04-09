<template>
  <div id="app">
    <div class="box1">我是box1</div>
    <div class="box2">我是box2</div>
    <div class="box3">我是box3</div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
  body{
    margin: 0;
    padding: 0;
  }
  #app{
    font-size: 30px;
    background: pink;
    height: 500px;
    .box1{
      width: 150px;
      background: gray;
    }
    .box2{
      width: 500px;
      background: yellowgreen;
    }
    .box3{
      width: 100px;
      background: #00ccaa;
    }
    div{
      float: left;
    }
  }
</style>
