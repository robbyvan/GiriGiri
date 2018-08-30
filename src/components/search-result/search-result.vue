<template>
  <div class="search-result">
    <div class="category" ref="category">
      <button
        v-for="(item, index) in categories"
        :key="item"
        :class="{'active-category': currentCategoryIndex === index }"
        @click="selectCategory(index)"
      >
        {{ item }} <span>{{_categoryCountText(index)}}</span>
      </button>
    </div>
    <div class="search-content-wrapper" ref="contentWrapper">
      <!-- 综合 -->
      <div
        class="total-wrapper"
        v-if="currentCategoryIndex === 0"
      >
        <!-- 排序方式 -->
        <div class="order-box">
          <button
            v-for="(item, index) in orders"
            :key="item"
            :class="{'active-order': currentOrderIndex === index }"
            @click="selectOrder(index)"
          >
            {{ item }}
          </button>
        </div>
        <!-- mini番剧列表 -->
        <div class="bangumi-list-wrapper" v-if="showBangumiList && currentOrderIndex === 0">
          <bangumi-list :bangumis="totalInfo.result.bangumi" />
          <div class="more-bangumi-wrapper">
            <div class="more-line"></div>
            <button class="more-bangumi-btn" @click="viewAllBangumis">
              查看更多番剧<i class="icon-eye" />
            </button>
            <div class="more-line"></div>
          </div>
        </div>
        <!-- 推荐视频 -->
        <div class="search-video-list" v-if="showSearchContent">
          <video-list
            :rank="false"
            :duration="true"
            :videos="videoList"
            @select="selectVideo"
          />
          <p class="is-loading-page" v-show="isLoadingPage">正在获取...⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</p>
          <p class="no-more" v-show="showNoMore">没有更多了呀ﾉ)ﾟДﾟ(</p>
        </div>
      </div>

      <!-- 番剧 -->
      <div class="bangumi-wrapper" v-if="showSearchContent && currentCategoryIndex === 1">
        <bangumi-list :bangumis="bangumis" />
        <p class="is-loading-page" v-show="isLoadingPage">正在获取...⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</p>
        <p class="no-more" v-show="showNoMore">没有更多了呀ﾉ)ﾟДﾟ(</p>
      </div>

      <!-- UP主 -->
      <div class="upuser-wrapper" v-if="showSearchContent && currentCategoryIndex === 2">
        <user-list :users="upusers" />
        <p class="is-loading-page" v-show="isLoadingPage">正在获取...⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</p>
        <p class="no-more" v-show="showNoMore">没有更多了呀ﾉ)ﾟДﾟ(</p>
      </div>

      <!-- 影视 -->
      <div class="pgc-wrapper" v-if="currentCategoryIndex === 3">
        <p class="no-more">什么都没找到呀ヽ(。ﾟдﾟ)ｐ</p>
      </div>

    </div>

    <!-- 返回顶部 -->
    <div class="gotop" v-show="showGoTopButton">
      <gotop-button />
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle';
import BangumiList from 'base/bangumi-list/bangumi-list';
import VideoList from 'base/video-list/video-list';
import UserList from 'base/user-list/user-list';
import GotopButton from 'base/gotop-button/gotop-button';
import MFooter from 'base/m-footer/m-footer';
import { searchTotal, searchCertainType } from 'api/search';

const MAX_PAGE_LENGTH = 5;
const SCROLLING_THRESHOLD = 0.25;
const GO_TOP_THRESHOLD = 0.2;
const ORDERS = ['totalrank', 'click', 'pubdate', 'dm'];
const CATEGORIES = ['all', 'bangumi', 'upuser', 'pgc'];

export default {
  components: {
    BangumiList,
    VideoList,
    UserList,
    GotopButton,
    MFooter
  },
  props: {
    categories: { type: Array, default: () => ['综合', '番剧', 'UP主', '影视'] },
    orders: { type: Array, default: () => ['默认排序', '播放多', '新发布', '弹幕多'] }
  },
  data() {
    return {
      currentCategoryIndex: 0,
      currentOrderIndex: 0,
      totalInfo: null,
      typeInfo: null,
      currentPage: 1,
      isLoadingPage: false,
      videoList: [],
      bangumis: [],
      upusers: [],
      pgcs: [],
      keyword: '',
      // UI
      showGoTopButton: false,
    };
  },
  computed: {
    showSearchContent() {
      return this.totalInfo !== null;
    },
    showBangumiList() {
      if (this.totalInfo === null) {
        return false;
      }
      if (this.totalInfo.result.bangumi === undefined) {
        return false;
      }
      if (this.totalInfo.result.bangumi.length === 0) {
        return false;
      }
      return true;
    },
    showNoMore() {
      let info = null;
      if (this.isLoadingPage) {
        return false;
      }
      if (this.currentCategoryIndex === 0) {
        info = this.totalInfo;
      } else {
        info = this.typeInfo;
      }
      if (info === null) {
        return false;
      }
      if (info.numPages === undefined) {
        return false;
      }
      return this.currentPage >= Math.min(MAX_PAGE_LENGTH, info.numPages);
    }
  },
  watch: {
    totalInfo(newInfo) {
      if (newInfo !== null) {
        this.videoList = newInfo.result.video;
      }
    }
  },
  created() {
    this.keyword = this.$route.params.keyword;
    this.throttleFunc = throttle(this._handleScroll, 200);
    this._loadTotalInfo();
  },
  mounted() {
    // "无限"滚动加载
    window.addEventListener('scroll', this.throttleFunc, false);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleFunc, false);
  },
  methods: {
    // UI
    _formatNumber(num) {
      if (Number(num) > 99) {
        return '99+';
      }
      return `${num}`;
    },
    _categoryCountText(index) {
      // console.log(this.totalInfo);
      if (this.totalInfo === null) {
        return '';
      }
      switch (index) {
        case 1:
          return `(${this._formatNumber(this.totalInfo.top_tlist.bangumi)})`;
        case 2:
          return `(${this._formatNumber(this.totalInfo.top_tlist.upuser)})`;
        case 3:
          return `(${this._formatNumber(this.totalInfo.top_tlist.pgc)})`;
        default:
          return '';
      }
    },
    // 切换大类
    selectCategory(index) {
      if (index === this.currentCategoryIndex) {
        return;
      }
      this.isLoadingPage = true;
      this.currentCategoryIndex = index;
      this.typeInfo = null;
      searchCertainType(this.keyword, 1, CATEGORIES[this.currentCategoryIndex])
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data);
            this.typeInfo = res.data;
            switch (this.currentCategoryIndex) {
              case 1:
                this.bangumis = res.data.result;
                break;
              case 2:
                this.upusers = res.data.result;
                break;
              case 3:
                this.pgcs = [];
                break;
              default:
                this.videoList = this.typeInfo.result.video;
            }
            this.currentPage = 1;
            this.isLoadingPage = false;
          }
        });
    },
    // 切换综合页排序规则
    selectOrder(index) {
      if (index === this.currentOrderIndex) {
        return;
      }
      this.currentOrderIndex = index;
      this.totalInfo = null;
      searchTotal(this.keyword, 1, ORDERS[this.currentOrderIndex])
        .then(res => {
          // console.log(res.data);
          if (res.data.code === 0) {
            this.currentPage = 1;
            this.totalInfo = res.data;
          }
        });
    },
    viewAllBangumis() {
      this.selectCategory(1);
    },
    // 点击视频
    selectVideo(item) {
      this.$router.push(`/video/av${item.aid}`);
    },
    // 数据相关
    _loadTotalInfo() {
      this.isLoadingPage = true;
      searchTotal(this.keyword).then(res => {
        if (res.data.code === 0) {
          this.totalInfo = res.data;
          this.totalrankVideos = this.totalInfo.result.video;
          this.isLoadingPage = false;
        }
      });
    },
    _handleScroll() {
      if (this.isLoadingPage || this.showNoMore) {
        return;
      }
      const rect = this.$refs.contentWrapper.getBoundingClientRect();
      const categoryRect = this.$refs.category.getBoundingClientRect();
      const scrollTop = categoryRect.bottom - rect.top;
      const windowHeight = window.innerHeight - categoryRect.bottom;
      const documentHeight = document.documentElement.scrollHeight;
      const bodyHeight = documentHeight - windowHeight + categoryRect.bottom;
      const scrollPercentage = scrollTop / bodyHeight;
      // console.log('scrollPercentage', scrollPercentage);
      if (scrollPercentage > SCROLLING_THRESHOLD) {
        this.isLoadingPage = true;
        if (this.currentCategoryIndex === 0) {
          searchTotal(this.keyword, this.currentPage + 1, ORDERS[this.currentOrderIndex])
            .then(res => {
              this.videoList = [...this.videoList, ...res.data.result.video];
              this.isLoadingPage = false;
              this.currentPage += 1;
            });
        } else {
          searchCertainType(this.keyword, this.currentPage + 1, CATEGORIES[this.currentCategoryIndex])
            .then(res => {
              if (res.data.code === 0) {
                this.typeInfo = res.data;
                this.currentPage += 1;
                this.isLoadingPage = false;
                switch (this.currentCategoryIndex) {
                  case 1:
                    this.bangumis = [...this.bangumis, ...res.data.result];
                    break;
                  case 2:
                    this.upusers = [...this.upusers, ...res.data.result];
                    break;
                }
              }
            });
        }
      }
      // goTop theshold
      if (scrollPercentage > GO_TOP_THRESHOLD) {
        this.showGoTopButton = true;
      } else {
        this.showGoTopButton = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.gotop {
  position: fixed;
  right: 1rem;
  bottom: 2rem;
  z-index: 100;
}

.search-result {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  background-color: $color-background;
}

.category {
  position: fixed;
  z-index: 3;
  height: 2rem;
  background-color: $color-background;
  width: 100%;
  padding: 0.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: transparent;
    font-size: $font-size-small;
    color: $color-text-gray;
    padding: 0.2rem 0;
    &.active-category {
      border-bottom: 0.1rem solid $color-theme;
      color: $color-theme;
    }
  }
}

.search-content-wrapper {
  position: relative;
  padding-top: 2rem;
  width: 100%;
  min-height: 100%;
  background-color: $color-background-d;
}

.total-wrapper {
  width: 100%;
  height: 100%;
  // padding-bottom: 1rem;
  .order-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 1.8rem;
    background-color: $color-background-l;
    button {
      background-color: transparent;
      font-size: $font-size-small;
      color: $color-text-gray;
      padding: 0.2rem 0;
      &.active-order {
        color: $color-theme;
      }
    }
  }
}

.bangumi-list-wrapper {
  padding: 0 0.5rem;
}

.search-video-list {
  padding: 0 0.5rem;
}

.more-bangumi-wrapper {
  // background-color: lightcyan;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  .more-line {
    height: 1px;
    width: 25%;
    background-color: $color-text-gray;
  }
  .more-bangumi-btn {
    margin: 0 0.5rem;
    background-color: transparent;
    font-size: $font-size-small;
    color: $color-text-gray;
  }
}

.bangumi-wrapper {
  width: 100%;
  padding: 0 0.5rem;
}

.upuser-wrapper {
  padding: 0.5rem;
  width: 100%;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.is-loading-page {
  margin-top: 1rem;
  font-size: $font-size-small;
  color: $color-text-gray;
  text-align: center;
  height: 1.2rem;
  line-height: 1.2rem;
}

.no-more {
  padding: 1rem 0;
  text-align: center;
  font-size: $font-size-small;
  color: $color-text-gray;
}

</style>
