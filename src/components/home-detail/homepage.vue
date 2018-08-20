<template>
  <div class="homepage">
    <div class="video-wrapper" v-for="item in viewVideos" :key="item.aid">
      <div class="video-cover-wrapper">
        <!-- 封面 -->
        <img class="video-cover"  v-lazy="item.pic" alt="cover" />
        <!-- 信息 -->
        <div class="video-dec">
          <span class="video-duration">{{ item.duration }}</span>
          <span class="video-play" v-text="_formatPlays(item.play)"></span>
          <span class="video-review">{{ item.video_review }}弹幕</span>
        </div>
      </div>
      <!-- 视频title -->
      <div class="video-title">
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getHomepageVideos } from 'api/homepage';

const BATCH_NUM = 20;

export default {
  data() {
    return {
      videos: [],
      viewVideos: [],
    };
  },
  created() {
    this._getVideos();
  },
  methods: {
    _getVideos() {
      getHomepageVideos()
        .then(res => {
          if (res.code === 0) {
            this.videos = res.data.list; // 100条
            this.viewVideos = this.videos.slice(0, BATCH_NUM); // 20条
            console.log(this.viewVideos);
          } else {
            this.videos = [];
            this.viewVideos = [];
          }
        });
    },
    _formatPlays(plays) {
      plays = Number(plays);
      if (plays < 10000) {
        return `${plays}观看`;
      }

      return `${(plays / 10000).toFixed(1)}万观看`;
    },
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.homepage {
  position: relative;
  width: 100%;
  margin-top: 0.3rem;
  border-top: 0.05rem solid $color-border-gray;
  display: flex;
  flex-direction: column;
}

.video-wrapper {
  margin: 0.3rem 0;
  // padding: 0.5rem;
  // background-color: gold;
  .video-cover-wrapper {
    display: block;
    position: relative;
    width: 14rem;
    height: 8.85rem;
    margin: 0 auto;
    border-radius: 0.35rem;
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
      .video-play {

      }
      .video-review {

      }
    }
  }
  .video-title {
    width: 13.8rem;
    margin: 0.3rem auto;
    p  {
      font-size: $font-size-small;
      color: $color-text;
    }
  }
}
</style>
