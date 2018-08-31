<template>
  <div class="space" ref="space">
   <div class="fixed-nav">
    <!-- 顶部header -->
    <m-header class="m-header" />
    </div>
    <div class="start-line"></div>
    <!-- banner -->
    <div class="banner">
      <img :src="bannerSrc" alt="banner" />
    </div>
    <!-- 观看历史 -->
    <div class="history">
      <span class="history-title">历史记录</span>
      <video-list :videos="watchHistory" />
      <button
        class="clear-history"
        v-show="watchHistory.length > 0"
        @click="clearWatchHistory"
      >清除历史记录</button>
    </div>
    <!-- footer -->
    <div class="footer-line"></div>
    <div class="mfooter">
      <m-footer />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MHeader from 'base/m-header/m-header';
import VideoList from 'base/video-list/video-list';
import MFooter from 'base/m-footer/m-footer';

export default {
  components: {
    MHeader,
    VideoList,
    MFooter,
  },
  props: {
    user: { type: Object, default: () => {} }
  },
  computed: {
    ...mapGetters(['watchHistory']),
    bannerSrc() {
      return require('common/img/bannerTop.png');
    },
  },
  created() {
  },
  methods: {
    ...mapActions(['clearWatchHistory']),
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.space {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100%;
  .fixed-nav {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background-color: $color-background;
    z-index: 100;
    .m-header {
      position: relative;
      z-index: 99;
    }
  }
}

.start-line {
  padding-top: 2rem;
}

.banner {
  height: 5.2rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.history {
  padding: 0.5rem;
  width: 100%;
  .history-title {
    display: block;
    width: 2.5rem;
    padding: 0.2rem 0;
    margin: 0 auto;
    font-size: $font-size-small;
    color: $color-theme;
    text-align: center;
    border-bottom: 0.1rem solid $color-theme;
  }
  .clear-history {
    display: block;
    width: 5rem;
    height: 1rem;
    background-color: transparent;
    text-align: center;
    margin: 1rem auto;
    font-size: $font-size-small;
    color: $color-theme;
  }
}

.footer-line {
  height: 7rem;
  width: 100%;
}

.mfooter {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

</style>
