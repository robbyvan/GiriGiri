<template>
  <div class="homepage" ref="homepage">
    <div class="page-content-start-line" ref="contentStartLine"></div>
    <div class="page-content-detail">
      <div class="video-wrapper" v-for="item in videos" :key="item">
        <div class="video-cover-wrapper">
          <!-- 封面 -->
          <img class="video-cover"  src="./loading.png" alt="cover" />
          <!-- 信息 -->
          <div class="video-dec">
            <span class="video-duration">00:00</span>
            <span class="video-play">--观看</span>
            <span class="video-review">--弹幕</span>
          </div>
        </div>
        <!-- 视频title -->
        <div class="video-title">
          <p>加载中...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [0, 1, 2],
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.homepage {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.video-wrapper {
  padding: 0.4rem 0;
  border-top: 1px solid $color-border-gray;
  .video-cover-wrapper {
    display: block;
    position: relative;
    width: 14rem;
    height: 8.85rem;
    margin: 0 auto;
    border-radius: 0.35rem;
    border: 0.08rem solid $color-border-gray;
    overflow: hidden;
    .video-cover {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
    .video-dec {
      position: absolute;
      bottom: 0;
      left: 0;
      padding-left: 0.2rem;
      padding-bottom: 0.3rem;
      width: 100%;
      font-size: $font-size-small-s;
      color: $color-text-white;
      background: linear-gradient(180deg,rgba(33,33,33,0),rgba(33,33,33,.5));
      span {
        margin-left: 0.2rem;
      }
      .video-duration {
        display: inline-block;
        background-color: $color-background-dg;
        padding: 0.2rem 0.15rem;
      }
    }
  }
  .video-title {
    width: 13.8rem;
    margin: 0.3rem auto;
    p  {
      font-size: $font-size-small;
      color: $color-text;
      line-height: 0.8rem;
    }
  }
}
</style>
