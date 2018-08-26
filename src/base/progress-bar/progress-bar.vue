<template>
  <div
    class="progress-bar"
    ref="progressBar"
    @click.stop="progressClick"
  >
    <div class="bar-inner">
      <!-- 已播放 -->
      <div class="progress" ref="progress"></div>
      <!-- 小球 -->
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart="progressTouchStart"
        @touchmove="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from 'common/js/dom';

const transform = prefixStyle('transform');

export default {
  props: {
    percent: { type: Number, default: 30 }
  },
  created() {
    this.touch = {};
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - this.$refs.progressBtn.clientWidth;
        const offsetWidth = newPercent * barWidth;
        // console.log('total', barWidth);
        // console.log('width', offsetWidth);
        this._offset(offsetWidth);
      }
    }
  },
  methods: {
    progressClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      // console.log('click', offsetWidth);
      this._offset(offsetWidth);
      this._triggerPercent(offsetWidth);
    },
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
      this.$emit('startTouchingProgress'); // 防止自动隐藏掉控制栏
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return;
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offsetWidth = Math.min(Math.max(0, this.touch.left + deltaX), this.$refs.progressBar.clientWidth - this.$refs.progressBtn.clientWidth);
      this._offset(offsetWidth);
    },
    progressTouchEnd(e) {
      this.touch.initiated = false;
      this._triggerPercent();
      this.$emit('stopTouchingProgress'); // 防止自动隐藏掉控制栏
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`;
      this.$refs.progressBtn.style[transform] = `translate(${offsetWidth}px, -50%)`;
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - this.$refs.progressBtn.clientWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit('percentChange', percent);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: coral;
  display: flex;
  align-items: center;
  .bar-inner {
    position: relative;
    background-color: $color-background-d;
    height: 0.12rem;
    width: 100%;
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
      // width: 30%;
    }
    .progress-btn-wrapper {
      position: absolute;
      top: 50%;
      left: 0;
      width: 0.5rem;
      height: 0.5rem;
      transform: translateY(-50%);
      // background-color: coral;
      .progress-btn {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: $color-background-l;
      }
    }
  }
}

</style>
