<template>
  <div class="bottom-tab">
    <div class="tab-item" >
      <img  src="../../assets/11.png" alt="首页">
    </div>
    <div class="tab-item" >
      <img  src="../../assets/12.png" alt="首页">
    </div>
    <div class="tab-item" >
      <img  src="../../assets/13.png" alt="首页">
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .bottom-tab
    width 100%
    height 70px
    position fixed
    left 0px
    bottom 0px
    z-index 90
    background-color: #d7c093
    display: flex
    padding 15px
    border-top: 1px solid #E0DCD1;

    .tab-item
      display flex
      flex 1
      flex-direction column
      align-items center
      justify-content center
      font-size 14px
      color rgb(153,153,153)
      span
        padding-bottom 20px
        font-size 23px
      img
        width 48px
        padding-bottom 15px
        padding-top 15px
      .on
        color: #82ce6a
</style>
