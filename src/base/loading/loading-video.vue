<template>
  <div class="video" ref="video">
    <!-- 顶部导航 -->
    <div class="video-header">
      <m-header></m-header>
    </div>

    <!-- 播放器 -->
    <div class="content-start-line"></div>
    <div class="video-player-wrapper">
      <video />
    </div>

    <!-- 打开App -->
    <div class="open-app-btn">
      <button>高清更流畅, App内打开观看</button>
    </div>

    <!-- 基本信息 -->
    <div class="video-info">
      <div class="title-wrapper mini-title-wrapper">
        <h2><span class="tombstone"></span></h2>
        <button><i class="icon-chevron-down" /></button>
      </div>

      <p class="basic-info" ref="basicInfo">
        <span class="video-info-author"><span class="tombstone"></span></span>
        <span class="video-info-plays"><span class="tombstone"></span></span>
        <span class="video-info-danmu"><span class="tombstone"></span></span>
        <span class="video-info-pubDate"><span class="tombstone"></span></span>
      </p>
    </div>

    <div class="below-video" ref="belowVideo">
      <!-- 分P -->
      <!-- 推荐 -->
      <div class="video-recommend">
        <loading-rank :showRank="false" :videos="recommends" />
      </div>

      <!-- footer -->
      <div class="video-footer" ref="footer">
        <m-footer />
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header';
import LoadingRank from 'base/loading/loading-rank';
import MFooter from 'base/m-footer/m-footer';

export default {
  components: {
    MHeader,
    LoadingRank,
    MFooter
  },
  data() {
    return {
      showGoTopButton: false,
      recommends: [1, 2, 3, 4],
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';
@import 'common/scss/mixins.scss';

.video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  // background-color: lavender;
  .video-header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: $color-background;
    height: 2rem;
    z-index: 98;
  }
}

.tombstone {
  position: absolute;
  width: 70%;
  height: 80%;
  background-color: $color-background-m;
}

.content-start-line {
  padding-top: 1.7rem;
  background-color: $color-background-d;
}

.video-player-wrapper {
  position: relative;
  width: 100%;
  height: 8.4rem;
  background-color: $color-background-d;
  z-index: 99;
}

.open-app-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0.5rem;
  height: 2.4rem;
  background-color: $color-background;
  button {
    height: 1.6rem;
    width: 100%;
    border-radius: 2rem;
    font-size: $font-size-medium;
    color: white;
    background-color: $color-theme;
  }
}

.video-info {
  position: relative;
  background-color: transparent;
  padding: 0 0.5rem;
  .title-wrapper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
    h2 {
      flex: 9;
      font-size: $font-size-medium;
      font-weight: lighter;
      line-height: 0.9rem;
      height: 0.9rem;
      position: relative;
    }
    button {
      flex: 1;
      background-color: transparent;
      color: $color-text-gray;
      align-self: flex-start;
      display: flex;
      justify-content: center;
    }
  }
  .mini-title-wrapper {
    // height: 1rem;
    white-space: nowrap;
    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .basic-info {
    color: $color-text-gray;
    font-size: $font-size-small-s;
    display: flex;
    align-items: center;
    .video-info-author {
      color: $color-text;
      padding-right: 0.5rem;
    }
    .video-info-author, .video-info-plays, .video-info-danmu, .video-info-pubDate {
      position: relative;
      width: 2.5rem;
      height: 0.6rem;
      margin-right: 0.5rem;
    }
  }
}

.below-video {
  width: 100%;
  padding-top: 0.5rem;
  background-color: $color-background;
  z-index: 1;
}

.video-recommend {
  padding: 0 0.5rem;
}

.video-footer {
  margin-top: 0.5rem;
}

</style>
