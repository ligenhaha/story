<template>
  <!--外层容器-->
  <div class="progress-wrapper" ref="progressBar" @click="progressClick">
    <!--填充块-->
    <div class="fill" ref="progress"></div>
    <!--滑块-->
    <div class="slider" ref="progressBtn"
         @touchstart.prevent="progressTouchStart"
         @touchmove.prevent="progressTouchMove"
         @touchend.prevent="progressTouchEnd"></div>
  </div>
</template>

<script>
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')
  const progressBtnWidth = 7
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    watch: {
      percent (newPercent) {
        // console.log('eeffdfdf')
        if (newPercent >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          this._offset(offsetWidth)
        }
      }
    },
    created () {
      this.touch = {}
    },
    methods: {
      progressTouchStart (e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove (e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd (e) {
        this.touch.initiated = false
        this._triggerPercent()
      },
      progressClick (e) {
        // 当我们点击progressBtn的时候.e.offseX获取不对
        // this._offset(e.offsetX)
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent()
      },
      _offset (offsetWidth) {
        const offsetWidth1 = offsetWidth + 6
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.progress.style.width = `${offsetWidth1}px`
      },
      _triggerPercent () {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit('percentChange', percent)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .progress-wrapper
    position: relative
    width: 86%
    height 6px
    /*border:1px solid darkgray*/
    background: #ebebeb
    border-radius 50px
    display flex
    align-items center
    margin: 0 auto
    margin-top -10px
    margin-bottom 30px

    .slider
      position: absolute
      left: 0
      width: 24px
      height: 24px
      display: inline-block
      background: #ffac2d
      cursor: pointer
      border-radius: 50px

    .fill
      display: inline-block
      width: 0
      height: 6px
      background: #ffac2f
</style>
