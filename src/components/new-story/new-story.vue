<template>
    <div class="new-story-wrapper">
      <div class="aside">
        <img src="../../assets/6.png">
      </div>
      <div class="content">
        <div class="content-item">
          <div class="img-wrapper">
            <img src="../../assets/16.jpg">
          </div>
          <div class="status_wrapper">
            <div class="status_item">
              <span class="font_ligen iconnice " style="font-size: 20px; color: seagreen" ></span>
              <p>193</p>
            </div>
            <div class="status_item">
              <span class="font_ligen iconhot " style="font-size: 16px;color: red" ></span>
              <p>250℃</p>
            </div>
            <div class="status_item">
              <span class="font_ligen iconzhuanfa " style="font-size: 18px; color:#29abe2" ></span>
              <p>156</p>
            </div>
          </div>
        </div>
        <div class="content-item">
          <div class="img-wrapper">
            <img src="../../assets/17.jpg">
          </div>
          <div class="status_wrapper">
          <div class="status_item">
            <span class="font_ligen iconnice " style="font-size: 20px; color: seagreen" ></span>
            <p>193</p>
          </div>
          <div class="status_item">
            <span class="font_ligen iconhot " style="font-size: 16px;color: red" ></span>
            <p>250℃</p>
          </div>
          <div class="status_item">
            <span class="font_ligen iconzhuanfa " style="font-size: 18px; color:#29abe2" ></span>
            <p>156</p>
          </div>
        </div>
        </div>
        <div class="content-item">
          <div class="img-wrapper">
            <img src="../../assets/18.jpg">
          </div>
          <div class="status_wrapper">
            <div class="status_item">
              <span class="font_ligen iconnice " style="font-size: 20px; color: seagreen" ></span>
              <p>193</p>
            </div>
            <div class="status_item">
              <span class="font_ligen iconhot " style="font-size: 16px;color: red" ></span>
              <p>250℃</p>
            </div>
            <div class="status_item">
              <span class="font_ligen iconzhuanfa " style="font-size: 18px; color:#29abe2" ></span>
              <p>156</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  export default {
    components: {
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .new-story-wrapper
    display flex
    margin-left 15px
    margin-top 10px
    margin-right 55px
    .aside
      img
        width 36px
        height 190px
    .content
      display flex
      flex-direction: row
      flex-wrap: wrap
      margin-left 10px
      margin-top 30px
      .content-item
        margin-bottom 10px
        width 100%
        .img-wrapper
          width 100%
          img
            width 100%
            height 100%
            /*border-radius 10px*/
            border-top-left-radius 10px
            border-top-right-radius 10px
        .status_wrapper
          background #E0DCD1
          padding-top -2px
          border-bottom-left-radius 10px
          border-bottom-right-radius 10px
          height 50px
          display flex
          flex-direction row
          align-items center
          .status_item
            display flex
            flex-direction row
            flex 1
            justify-content center
            align-items center
            padding-top 10px
            padding-bottom 10px
            span
              font-size 40px
              margin-right 5px
              color #939393
            p
              font-size 24px
              color #939393
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
