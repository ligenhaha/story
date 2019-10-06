<template>
    <div class="menu-wrapper">
      <div class="menuItem">
        <img src="../../assets/1.png">
      </div>
      <div class="menuItem">
        <img src="../../assets/2.png">
      </div>
      <div class="menuItem">
        <img src="../../assets/3.png">
      </div>
      <div class="menuItem">
        <img src="../../assets/4.png">
      </div>
    </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .menu-wrapper
    /*background red*/
    height:100px
    display flex
    align-items center
    flex-direction: row
    flex-wrap: wrap
    justify-content space-between
    margin-left 55px
    margin-right 55px
    margin-top -4px
    .menuItem
      /*width:25%*/
      display: flex
      flex-direction: column
      align-items: center
      justify-content space-between
      img
        width 120px
        height 70px
</style>
