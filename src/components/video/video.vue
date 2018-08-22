<template>
  <div class="video">
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
    <div class="video-info" v-if="dataLoaded">
      <div
        class="title-wrapper"
        :class="{'full-title-wrapper': showDetailedInfo, 'mini-title-wrapper': !showDetailedInfo}"
      >
        <h2>{{ videoViewInfo.title }}</h2>
        <button @click="toggleVideoInfoPanel"><i :class="videoInfoToggleButtonStyle" /></button>
      </div>

      <p class="basic-info">
        <span class="video-info-author">{{ videoViewInfo.owner.name }}</span>
        <span class="video-info-plays">{{ _formatNumber(videoViewInfo.stat.view) }}次观看</span>
        <span class="video-info-danmu">{{ _formatNumber(videoViewInfo.stat.danmaku) }}弹幕</span>
        <span class="video-info-pubTime">{{ _formatDate(videoViewInfo.pubdate) }}</span>
      </p>

      <div class="detailed-info">
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

    <div class="below-video" ref="belowVideo">
      <!-- 分P -->
      <div class="video-pages">
        <slider-video-pages
          :pages="videoPages"
          :currentPageNum="currentPageNum"
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
      <div class="video-comment">

      </div>
      <!-- footer -->
      <div class="video-footer">

      </div>
      Video works!
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import MHeader from 'base/m-header/m-header';
import VideoList from 'base/video-list/video-list';
import VideoPathNav from 'base/video-path-nav/video-path-nav';
import SliderVideoPages from 'base/slider-video-pages/slider-video-pages';
import { loadVideoScreenData } from 'api/video';
import { prefixStyle } from 'common/js/dom';

const transform = prefixStyle('transform');

export default {
  components: {
    MHeader,
    VideoList,
    VideoPathNav,
    SliderVideoPages
  },
  data() {
    return {
      showDetailedInfo: false,
      dataLoaded: false,
      playUrlInfo: null, // timelength | durl.url,
      videoViewInfo: {}, // pic, title | owner, stat{}, pubdate | copyright, desc | tid aid
      tags: [], // data[]
      videoPages: [], // pages[]
      currentPageNum: 1,
      recommendVideos: [], // data.slice(0, 20)
      replies: [] // data.replies.slice(0, 5)
    };
  },
  computed: {
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
  created() {
    // fetch视频info & view & recommends, 评论滚动再加载
    this._loadVideoScreenData();
  },
  methods: {
    _loadVideoScreenData() {
      loadVideoScreenData('29053024')
        .then(res => {
          console.log(res);
          this.videoViewInfo = res.videoViewInfo;
          this.playUrlInfo = res.playUrlInfo;
          this.tags = res.tags;
          this.recommendVideos = res.recommendVideos;
          this.videoPages = res.videoPages;
          this.dataLoaded = true;
        });
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
    toggleVideoInfoPanel() {
      this.showDetailedInfo = !this.showDetailedInfo;
      this.$refs.belowVideo.style.transition = 'all 0.4s';
      if (this.showDetailedInfo) {
        this.$refs.belowVideo.style[transform] = 'translate3d(0, 0, 0)';
      } else {
        this.$refs.belowVideo.style[transform] = 'translate3d(0, -6.2rem, 0)';
      }
    },
    selectPage(page) {
      this.currentPageNum = page.page;
      // 重新获取视频源
    }
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
  background-color: lavender;
  .video-header {
    position: absolute;
    background-color: $color-background;
    top: 0;
    z-index: 98;
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
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0.5rem;
  // background-color: lightcyan;
  button {
    height: 1.4rem;
    width: 100%;
    border-radius: 2rem;
    font-size: $font-size-medium;
    color: white;
    background-color: $color-theme;
  }
}

.video-info {
  display: relative;
  // background-color: white;
  padding: 0 0.5rem;
  border-bottom: 0.03rem solid $color-background-m;
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
      height: 100%;
      background-color: transparent;
      color: $color-text-gray;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;
    }
  }
  .mini-title-wrapper {
    height: 1rem;
    white-space: nowrap;
    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .full-title-wrapper {
    height: 2rem;
  }
  .basic-info {
    color: $color-text-gray;
    font-size: $font-size-small-s;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
    .video-info-author {
      color: $color-text;
      padding-right: 0.5rem;
    }
    span {
      margin-right: 0.5rem;
    }
  }

  .detailed-info {
    height: 6rem;
    // background-color: gold;
    p {
      color: $color-text-gray;
      font-size: $font-size-small-s;
      margin-bottom: 0.5rem;
    }
    .icon-award {
      color: $color-theme;
    }
  }
  .video-tags {
    display: flex;
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
}

.video-socials {
  display: flex;
  align-items: center;
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
  position: relative;
  padding-top: 0.4rem;
  background-color: $color-background;
  transform: translate3d(0, -6.2rem, 0);
}
</style>
