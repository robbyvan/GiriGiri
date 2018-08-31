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
    <!-- 基本信息 -->
    <div class="basic-info" v-if="showInfo">
      <!-- 头像 -->
      <div class="avatar">
        <img :src="spaceInfo.upic" />
      </div>
      <!-- 资料 -->
      <div class="desc">
        <div class="account">
          <h1 class="uname">{{spaceInfo.uname}}</h1>
          <div class="lvl-wrapper"><img :src="lvlImgSrc" alt="gender" /></div>
          <p class="uid">UID: {{spaceInfo.mid}}</p>
        </div>
        <p class="social">
          <span>{{userStat.following}}</span>关注
          <span>{{fansNum}}</span>粉丝
        </p>
        <p class="usign">{{spaceInfo.usign}}</p>
      </div>
    </div>
    <!-- 投稿 -->
    <div class="submit-videos">
      <h2 class="submit-title">Ta的投稿</h2>
      <video-list :duration="true" :videos="viewSubmitVideos" />
      <p class="no-videos" v-show="!submitVideos.length">Ta还没有投稿</p>
    </div>
    <!-- 加载更多按钮 -->
    <button
      class="load-more-button"
      @click="loadMore"
      v-show="currentPage < maxPage"
    >点击加载更多</button>
    <!-- footer -->
    <div class="mfooter">
      <div class="footer-box">
        <m-footer />
      </div>
    </div>
    <!-- 返回顶部 -->
    <div class="gotop" v-show="showGoTopButton">
      <gotop-button />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import debounce from 'lodash/debounce';
import MHeader from 'base/m-header/m-header';
import VideoList from 'base/video-list/video-list';
import GotopButton from 'base/gotop-button/gotop-button';
import MFooter from 'base/m-footer/m-footer';
import { loadSpaceData } from 'api/user';
import { formatNumber } from 'common/js/format';

const MAX_PAGE_NUM = 5;
const SIZE_PER_PAGE = 20;
const GO_TOP_THRESHOLD = 0.2;

export default {
  components: {
    MHeader,
    VideoList,
    MFooter,
    GotopButton
  },
  props: {
    user: { type: Object, default: () => {} }
  },
  data() {
    return {
      submitVideos: [],
      viewSubmitVideos: [],
      userStat: null,
      currentPage: 1,
      maxPage: MAX_PAGE_NUM,
      showGoTopButton: false,
    };
  },
  computed: {
    ...mapGetters(['spaceInfo']),
    showInfo() {
      return this.spaceInfo !== null && this.userStat !== null;
    },
    bannerSrc() {
      return require('common/img/bannerTop.png');
    },
    lvlImgSrc() {
      if (typeof this.spaceInfo.level !== 'number') {
        return '';
      }
      return require(`common/img/lv${this.spaceInfo.level}.png`);
    },
    fansNum() {
      return formatNumber(this.spaceInfo.fans);
    }
  },
  watch: {
    spaceInfo(newSpaceInfo, preSpaceInfo) {
      if (newSpaceInfo.mid === preSpaceInfo.mid) {
        return;
      }
      this._getSubmitVideos();
    }
  },
  created() {
    if (this.spaceInfo === null) {
      this.$router.push(`/home`);
    }
    this._getSubmitVideos();
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
    ...mapMutations({
      setSpaceInfo: 'SET_SPACE_INFO'
    }),
    _getSubmitVideos() {
      if (this.spaceInfo === null) {
        this.submitVideos = [];
        return;
      }
      loadSpaceData(this.spaceInfo.mid).then(res => {
        // console.log(res);
        this.submitVideos = res.submitVideos.vlist.map(v => ({...v, duration: v.length}));
        this.maxPage = res.submitVideos.pages;
        this.userStat = res.userStat;
        this.viewSubmitVideos = this.submitVideos.slice(0, 20);
      });
      // getSubmitVideos(this.spaceInfo.mid).then(res => {
      //   console.log(res);
      //   this.submitVideos = res.data.data.vlist.map(v => ({...v, duration: v.length}));
      //   this.viewSubmitVideos = this.submitVideos.slice(0, 20);
      // });
    },
    _loadVideosByPage() {
      if (this.currentPage >= this.maxPage) {
        return;
      }
      this.viewSubmitVideos = [
        ...this.viewSubmitVideos,
        ...this.submitVideos.slice(
          this.currentPage * SIZE_PER_PAGE,
          (this.currentPage + 1) * SIZE_PER_PAGE
        )
      ];
      this.currentPage += 1;
    },
    // UI
    _handleScroll() {
      const rect = this.$refs.space.getBoundingClientRect();
      const scrollTop = 0 - rect.top;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const bodyHeight = documentHeight - windowHeight;
      const scrollPercentage = scrollTop / bodyHeight;
      // console.log('scrollPercentage', scrollPercentage);
      // goTop theshold
      this.showGoTopButton = scrollPercentage > GO_TOP_THRESHOLD;
    },
    loadMore() {
      this._loadVideosByPage();
    },
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

.basic-info {
  position: relative;
  min-height: 8rem;
  // background-color: coral;
}

.avatar {
  height: 4rem;
  width: 4rem;
  overflow: hidden;
  border-radius: 50%;
  background-color: lavender;
  display: flex;
  align-items: center;
  // transform: translate3d(0.5rem, -50%, 0);
  position: absolute;
  left: 0.5rem;
  top: -2rem;
  img {
    width: 100%;
    height: 100%;
  }
}

.desc {
  padding-top: 3rem;
  .account {
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    .uname {
      font-size: $font-size-large-s;
      font-weight: bold;
    }
    .lvl-wrapper {
      flex: 0 0 1rem;
      margin-left: 0.2rem;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .uid {
      font-size: $font-size-small;
      margin-left: 0.5rem;
      font-weight: normal;
    }
  }
  .social {
    font-size: $font-size-small;
    color: $color-text-gray;
    margin-top: 0.5rem;
    span {
      padding:0 0.2rem 0 0.5rem;
      color: $color-text;
    }
  }
  .usign {
    padding-left: 0.5rem;
    margin-top: 0.5rem;
    font-size: $font-size-small;
    color: $color-text-gray;
  }
}

.submit-title {
  font-size: $font-size-small;
}

.submit-videos {
  padding: 0.5rem;
}

.load-more-button {
  width: 100%;
  height: 1.6rem;
  color: $color-theme;
  font-size: $font-size-small;
  background-color: $color-background-m;
}

.no-videos {
  height: 3rem;
  width: 100%;
  line-height: 3rem;
  text-align: center;
  font-size: $font-size-small;
  color: $color-text-gray;
}

.gotop {
  position: fixed;
  right: 1rem;
  bottom: 2rem;
  z-index: 100;
}

.mfooter {
  width: 100%;
  height: 7rem;
  // background-color: lavender;
  position: relative;
  .footer-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

}

</style>
