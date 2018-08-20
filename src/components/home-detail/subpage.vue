<template>
  <div class="homepage" ref="subpage">
    <div class="page-content-start-line" ref="contentStartLine"></div>
    <div class="page-content-detail">
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
  </div>
</template>

<script>
import debounce from 'lodash/debounce';
import { getHomepageVideos } from 'api/homepage';

const BATCH_NUM = 20;
const MAX_BATCH_INDEX = 5;
const SCROLLING_THRESHOLD = 0.6;

export default {
  data() {
    return {
      videos: [],
      viewVideos: [],
      currentBatchIndex: 1,
    };
  },
  created() {
    this._getVideos();
    this.debounceFunc = debounce(this._handleScroll, 200);
  },
  mounted() {
    // "无限"滚动加载
    window.addEventListener('scroll', this.debounceFunc, false);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.debounceFunc, false);
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
    _handleScroll() {
      const rect = this.$refs.subpage.getBoundingClientRect();
      const scrollTop = 0 - rect.top;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bodyHeight = documentHeight - windowHeight;
      const scrollPercentage = scrollTop / bodyHeight;
      console.log('scrollPercentage sub', scrollPercentage);
      if (scrollPercentage > SCROLLING_THRESHOLD && this.currentBatchIndex < MAX_BATCH_INDEX) {
        this.viewVideos = [
          ...this.viewVideos,
          ...this.videos.slice(
            BATCH_NUM * this.currentBatchIndex,
            BATCH_NUM * (this.currentBatchIndex + 1)
          ),
        ];
        this.currentBatchIndex += 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.homepage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .page-content-start-line {
    padding-top: 4.9rem;
  }
  .page-content-detail {
  }
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
      line-height: 0.8rem;
    }
  }
}
</style>
