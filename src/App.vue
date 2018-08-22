<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import throttle from 'lodash/throttle';

const MAX_FONT_SIZE = 67.5;
const MIN_FONT_SIZE = 24;
const MAX_WIDTH = 1095;

export default {
  name: 'App',
  created() {
    this.throttleFunc = throttle(this._adjustBaseFontSize, 200);
  },
  mounted() {
    // 响应式字体
    this._adjustBaseFontSize();
    window.addEventListener('resize', this.throttleFunc);
  },
  beforeDestroy() {
     window.removeEventListener('resize', this.throttleFunc);
  },
  methods: {
    _adjustBaseFontSize() {
      const currentWidth = document.documentElement.clientWidth;
      const ftSize = Math.max(Math.min((currentWidth / MAX_WIDTH) * MAX_FONT_SIZE, MAX_FONT_SIZE), MIN_FONT_SIZE);
      document.querySelector('html').style.fontSize = `${ftSize}px`;
    }
  }
};
</script>

<style lang="scss">
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
}
</style>
