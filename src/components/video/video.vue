<template>
  <div class="video" ref="video">
    <!-- 顶部导航 -->
    <div class="video-header">
      <m-header></m-header>
    </div>

    <!-- 返回顶部 -->
    <div class="gotop" v-show="showGoTopButton">
      <gotop-button @goTop="scrollToTop" />
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
    <div class="video-info" v-if="dataLoaded">
      <div
        class="title-wrapper"
        :class="{'full-title-wrapper': showDetailedInfo, 'mini-title-wrapper': !showDetailedInfo}"
      >
        <h2>{{ videoViewInfo.title }}</h2>
        <button @click="toggleVideoInfoPanel"><i :class="videoInfoToggleButtonStyle" /></button>
      </div>

      <p class="basic-info" ref="basicInfo">
        <span class="video-info-author">{{ videoViewInfo.owner.name }}</span>
        <span class="video-info-plays">{{ _formatNumber(videoViewInfo.stat.view) }}次观看</span>
        <span class="video-info-danmu">{{ _formatNumber(videoViewInfo.stat.danmaku) }}弹幕</span>
        <span class="video-info-pubTime">{{ _formatDate(videoViewInfo.pubdate) }}</span>
      </p>

      <div class="detailed-inso-start-line">
        <div class="detailed-info" ref="detailedInfo">
          <p class="detailed-info-copyright"><i class="icon-award" />未经作者授权禁止转载</p>
          <p class="detailed-info-desc">{{ videoViewInfo.desc }}</p>
          <video-path-nav
            :cid="videoViewInfo.tid"
            :aid="videoViewInfo.aid"
            @navigateTo="handlePathNavClick"
          />
          <div class="video-tags">
            <button class="tag-item" v-for="item in tags" :key="item.tag_id">{{ item.tag_name }}</button>
            <button class="tag-item"></button>
            <button class="tag-item"></button>
            <button class="tag-item"></button>
            <button class="tag-item"></button>
          </div>
          <div class="video-socials">
            <button class="favorite"><i class="icon-heart" />收藏</button>
            <button class="favorite"><i class="icon-download" />缓存</button>
            <button class="favorite"><i class="icon-share-2" />分享</button>
          </div>
        </div>
      </div>

    </div>

    <div class="below-video" ref="belowVideo">
      <!-- 分P -->
      <div class="video-pages" v-show="videoPages.length > 1">
        <slider-video-pages
          :pages="videoPages"
          :currentPageNum="currentVideoPage"
          @selectPage="selectPage"
        />
      </div>
      <!-- 推荐 -->
      <div class="video-recommend">
        <video-list
          :videos="recommendVideosPassToVideolist"
          v-show="true"
          :rank="false"
        />
      </div>

      <!-- 评论 -->
      <div class="video-comment" v-show="haveRepliesLoaded">
        <comment-list :comments="replies" :totalRepliesCount="totalRepliesCount" />
      </div>

      <!-- footer -->
      <div class="video-footer" ref="footer">
        <m-footer />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import moment from 'moment';
import debounce from 'lodash/debounce';
import MHeader from 'base/m-header/m-header';
import VideoList from 'base/video-list/video-list';
import VideoPathNav from 'base/video-path-nav/video-path-nav';
import SliderVideoPages from 'base/slider-video-pages/slider-video-pages';
import CommentList from 'base/comment-list/comment-list';
import GotopButton from 'base/gotop-button/gotop-button';
import MFooter from 'base/m-footer/m-footer';
import { loadVideoScreenData, getVideoReplies } from 'api/video';
import { prefixStyle, scrollToTopSmoothly } from 'common/js/dom';

const transform = prefixStyle('transform');
const SCROLLING_THRESHOLD = 0.1;
const GO_TOP_THRESHOLD = 0.2;

export default {
  components: {
    MHeader,
    VideoList,
    VideoPathNav,
    SliderVideoPages,
    CommentList,
    GotopButton,
    MFooter
  },
  data() {
    return {
      showDetailedInfo: false,
      dataLoaded: false,
      playUrlInfo: null, // timelength | durl.url,
      videoViewInfo: {}, // pic, title | owner, stat{}, pubdate | copyright, desc | tid aid
      tags: [], // data[]
      videoPages: [], // pages[]
      recommendVideos: [], // data.slice(0, 20)
      haveRepliesLoaded: false,
      replies: [], // data.replies.slice(0, 5)
      totalRepliesCount: 0,
      showGoTopButton: false,
    };
  },
  computed: {
    ...mapGetters([
      'videoAid',
      'currentVideoPage'
    ]),
    videoInfoToggleButtonStyle() {
      return this.showDetailedInfo ? 'icon-chevron-up' : 'icon-chevron-down';
    },
    recommendVideosPassToVideolist() {
      return this.recommendVideos.map(item => ({
        aid: item.aid,
        cid: item.cid,
        pic: item.pic,
        title: item.title,
        author: item.owner.name,
        play: item.stat.view,
        video_review: item.stat.danmaku,
      }));
    }
  },
  watch: {
    dataLoaded() {
      setTimeout(() => this.syncVideoInfoPanel(), 20);
    }
  },
  created() {
    // fetch视频info & view & recommends, 评论滚动再加载
    this._loadVideoScreenData();
    this.debounceFunc = debounce(this._handleScroll, 200);
  },
  mounted() {
    // 滚动加载评论
    window.addEventListener('scroll', this.debounceFunc, false);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.debounceFunc, false);
  },
  methods: {
    ...mapMutations({
      setCurrentVideoPage: 'SET_CURRENT_VIDEO_PAGE',
    }),
    ...mapActions(['selectVideoPlay']),
    // calculateStartY() {
    //   const rect = this.$refs.basicInfo.getBoundingClientRect();
    //   const top = rect.top;
    //   const bottom = rect.bottom;
    // },
    _loadVideoScreenData() {
      loadVideoScreenData(this.videoAid)
        .then(res => {
          // console.log(res);
          this.videoViewInfo = res.videoViewInfo;
          this.playUrlInfo = res.playUrlInfo;
          this.tags = res.tags;
          this.recommendVideos = res.recommendVideos.slice(0, 20); // 只要20;
          this.videoPages = res.videoPages;
          this.dataLoaded = true;
        });
    },
    scrollToTop() {
      scrollToTopSmoothly();
    },
    _handleScroll() {
      const rect = this.$refs.video.getBoundingClientRect();
      const scrollTop = 0 - rect.top;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bodyHeight = documentHeight - windowHeight;
      const scrollPercentage = scrollTop / bodyHeight;
      console.log('scrollPercentage', scrollPercentage);
      // 评论threshold
      if (scrollPercentage > SCROLLING_THRESHOLD && !this.haveRepliesLoaded) {
        // 加载评论
        getVideoReplies(this.videoAid, this.currentPageNum)
          .then(res => {
            // console.log(res.data);
            this.totalRepliesCount = res.data.data.page.count;
            this.replies = res.data.data.replies.slice(0, 5); // 不超过5条
            this.haveRepliesLoaded = true;
          });
      }
      // goTop theshold
      if (scrollPercentage > GO_TOP_THRESHOLD) {
        this.showGoTopButton = true;
      } else {
        this.showGoTopButton = false;
      }
    },
    _formatDate(ts) {
      return moment.unix(ts).format('M-D');
    },
    _formatNumber(num) {
      num = Number(num);
      if (num < 10000) {
        return `${num}`;
      }
      return `${(num / 10000).toFixed(1)}万`;
    },
    handlePathNavClick(rid) {
      console.log(rid);
    },
    _calculateDetailInfoOffsetHeight() {
      const diRect = this.$refs.detailedInfo.getBoundingClientRect();
      // console.log(diRect.top - diRect.bottom, '!');
      return diRect.bottom - diRect.top;
    },
    toggleVideoInfoPanel() {
      this.showDetailedInfo = !this.showDetailedInfo;
      this.syncVideoInfoPanel();
    },
    syncVideoInfoPanel() {
      this.$refs.belowVideo.style.transition = 'all 0.4s';
      const offsetHeight = this._calculateDetailInfoOffsetHeight();
      if (!this.showDetailedInfo) {
        this.$refs.belowVideo.style[transform] = 'translate3d(0, 0, 0)';
      } else {
        this.$refs.belowVideo.style[transform] = `translate3d(0, ${offsetHeight}px, 0)`;
      }
    },
    selectPage(page) {
      this.setCurrentVideoPage(page.page);
      // 重新获取视频源
    },
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';
@import 'common/scss/mixins.scss';

.video {
  position: absolute;
  top: 0;
  // bottom: 0;
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
  .gotop {
    position: fixed;
    right: 1rem;
    bottom: 2rem;
    z-index: 100;
  }
}

.content-start-line {
  padding-top: 1.7rem;
  background-color: $color-background-d;
}

.video-player-wrapper {
  position: relative;
  width: 100%;
  height: 8.4rem;
  background-color: coral;
  z-index: 99;
}

.open-app-btn {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 0.5rem 0.5rem;
  // z-index: 2;
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
  // height: 3.4rem;
  background-color: transparent;
  // background-color: pink;
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
  .full-title-wrapper {
    // height: 2rem;
  }
  .basic-info {
    color: $color-text-gray;
    font-size: $font-size-small-s;
    display: flex;
    align-items: center;
    // margin-bottom: 0.5rem;
    .video-info-author {
      color: $color-text;
      padding-right: 0.5rem;
    }
    span {
      margin-right: 0.5rem;
    }
  }
}

.detailed-inso-start-line {
  position: relative;
}

.detailed-info {
  // height: 6rem;
  position: absolute;
  width: 100%;
  top: 0.5rem;
  left: 0;
  // background-color: lavender;
  border-bottom: 0.03rem solid $color-background-m;
  // background-color: lightcyan;
  p {
    color: $color-text-gray;
    font-size: $font-size-small-s;
    margin-bottom: 0.5rem;
    line-height: 0.7rem;
  }
  .icon-award {
    color: $color-theme;
  }
}
.video-tags {
  display: flex;
  padding: 0 0.5rem;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  .tag-item {
    height: 1.2rem;
    width: 3rem;
    font-size: $font-size-small-s;
    background-color: $color-border-gray;
    border: 1px solid $color-border-gray;
    border-radius: 2rem;
    margin-bottom: 0.5rem;
    &:empty {
      height: 0;
      margin: 0;
      padding: 0;
      border: none;
    }
  }
}

.video-socials {
  display: flex;
  align-items: center;
  padding-bottom: 0.3rem;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1rem;
    width: 2.4rem;
    margin-right: 0.5rem;
    font-size: $font-size-small-s;
    background-color: transparent;
    color: $color-text-gray-d;
    i {
      font-size: $font-size-medium;
    }
  }
}

.below-video {
  // position: absolute;
  width: 100%;
  // padding-top: 0.4rem;
  background-color: $color-background;
  z-index: 1;
  // transform: translate3d(0, 0, 0);
}

.video-pages {
  padding: 0 0.5rem;
}

.video-recommend {
  padding: 0 0.5rem;
}

.video-comment {
  padding: 1.5rem 0.5rem 0 0.5rem;
}

.video-footer {

}
</style>
