<template>
  <div class="subpage" ref="subpage">
    <div class="page-content-start-line" ref="contentStartLine"></div>
    <div class="page-content-detail" v-show="!isLoadingPage" @touchstart="onTouchStart">
      <!-- 一级推荐 -->
      <div class="recommend" v-if="isMainTag && sectionGroups.length">
        <!-- 循环所有组 -->
        <section class="section-wrapper" v-for="group in sectionGroups" :key="group.rid">
          <!-- 组名 -->
          <div class="group-header">
            <h2>{{ group.name }}</h2>
            <button @click.stop="navigateToMore(group)">
              <span>查看更多</span>
              <i class="icon-chevron-right" />
            </button>
          </div>

          <div class="group-videos">
            <!-- 循环生成视频 -->
            <div
              class="video-wrapper"
              v-for="item in group.data"
              :key="item.aid"
              @click.stop="selectVideo(item)"
            >
              <div class="video-cover-wrapper">
                <!-- 封面 -->
                <img class="video-cover"  v-lazy="_httpsSrc(item.pic)" alt="cover" />
                <!-- 信息 -->
                <div class="video-dec">
                  <span class="desc-tab">
                    <i class="icon-watch" />
                    <span class="video-play" v-text="_formatNumber(item.play)" />
                  </span>
                  <span class="desc-tab">
                    <i class="icon-align-left" />
                    <span class="video-review" v-text="_formatNumber(item.video_review)" />
                  </span>
                </div>
              </div>
              <!-- 视频title -->
              <div class="video-title">
                <p>{{ item.title }}</p>
              </div>
            </div>
            <div class="video-wrapper empty"></div>
            <div class="video-wrapper empty"></div>
          </div>

        </section>
      </div>
      <!-- 二级分类 -->
      <div
        class="subpageVideos"
        v-if="!isMainTag && detailRecommends.length && detailLatestArchive.length"
      >
        <!-- 热门推荐 -->
        <section class="section-wrapper">
          <!-- 组名 -->
          <div class="group-header">
            <h2>热门推荐</h2>
          </div>
          <!-- 视频列表 -->
          <div class="group-videos">
            <!-- 循环生成视频 -->
            <div
              class="video-wrapper"
              v-for="item in detailRecommends"
              :key="item.aid"
              @click.stop="selectVideo(item)"
            >
              <div class="video-cover-wrapper">
                <!-- 封面 -->
                <img class="video-cover"  v-lazy="_httpsSrc(item.pic)" alt="cover" />
                <!-- 信息 -->
                <div class="video-dec">
                  <span class="desc-tab">
                    <i class="icon-watch" />
                    <span class="video-play" v-text="_formatNumber(item.play)" />
                  </span>
                  <span class="desc-tab">
                    <i class="icon-align-left" />
                    <span class="video-review" v-text="_formatNumber(item.video_review )" />
                  </span>
                </div>
              </div>
              <!-- 视频title -->
              <div class="video-title">
                <p>{{ item.title }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 最新视频 -->
        <section class="section-wrapper">
          <!-- 组名 -->
          <div class="group-header">
            <h2>最新视频</h2>
          </div>
          <!-- 视频列表 -->
          <div class="group-videos">
            <!-- 循环生成视频 -->
            <div
              class="video-wrapper"
              v-for="item in detailLatestArchive"
              :key="item.aid"
              @click.stop="selectVideo(item)"
            >
              <div class="video-cover-wrapper">
                <!-- 封面 -->
                <img class="video-cover"  v-lazy="_httpsSrc(item.pic)" alt="cover" />
                <!-- 信息 -->
                <div class="video-dec">
                  <span class="desc-tab">
                    <i class="icon-watch" />
                    <span class="video-play" v-text="_formatNumber(item.play)" />
                  </span>
                  <span class="desc-tab">
                    <i class="icon-align-left" />
                    <span class="video-review" v-text="_formatNumber(item.video_review )" />
                  </span>
                </div>
              </div>
              <!-- 视频title -->
              <div class="video-title">
                <p>{{ item.title }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 加载更多按钮 -->
        <button class="load-more-button" @click="loadMore">点击加载更多</button>
      </div>
    </div>
    <!-- 首屏加载 -->
    <loading-home v-if="isLoadingPage" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import LoadingHome from 'base/loading/loading-home';
import { getInitSubAll, getInitSubCategory, getSubTabLatestByPage } from 'api/subpage';
import { MAIN_TABS } from 'api/config';

export default {
  components: {
    LoadingHome
  },
  data() {
    return {
      isLoadingPage: false,
      isMainTag: true,
      sectionGroups: [],
      detailRecommends: [],
      detailLatestArchive: [],
      detailLatestPageNum: 1,
    };
  },
  computed: {
    ...mapGetters([
      'mainTabRid',
      'subTabRid'
    ]),
  },
  created() {
    // 确认是否在推荐tag, 确定渲染页面
    this.isMainTag = (MAIN_TABS.indexOf(this.subTabRid) > -1);
    // xhr
    if (this.isMainTag) {
      this._getInitSubAll();
    } else {
      this._getInitSubCategory();
    }
  },
  watch: {
    subTabRid() {
      // 确认是否在推荐tag, 确定渲染页面
      this.isMainTag = (MAIN_TABS.indexOf(this.subTabRid) > -1);
      // 获取数据
      if (this.isMainTag) {
        this._getInitSubAll();
      } else {
        this._getInitSubCategory();
      }
    }
  },
  methods: {
    ...mapMutations({
      setMainTabRid: 'SET_MAIN_TAB_RID',
      setSubTabRid: 'SET_SUB_TAB_RID',
    }),
    ...mapActions([
      'selectVideoPlay',
      'saveWatchHistory'
    ]),
    _formatNumber(num) {
      num = Number(num);
      if (num < 10000) {
        return `${num}`;
      }
      return `${(num / 10000).toFixed(1)}万`;
    },
    _httpsSrc(url) {
      if (url.startsWith('http://')) {
        return `https://${url.substr(7)}`;
      }
      return `https://${url}`;
    },
    _getGroupVideos(group) {
      return this.sectionVideos[group];
    },
    _getInitSubAll() {
      this.isLoadingPage = true;
      getInitSubAll(this.mainTabRid)
        .then(res => {
          // console.log(res);
          this.sectionGroups = res;
          this.isLoadingPage = false;
        })
        .catch(e => {
          this.isLoadingPage = false;
          // console.log(e);
        });
    },
    _getInitSubCategory() {
      this.isLoadingPage = true;
      getInitSubCategory(this.subTabRid)
        .then(res => {
          this.detailRecommends = res.detailRecommends;
          this.detailLatestArchive = res.detailLatest.archives;
          this.detailLatestPageNum = res.detailLatest.page.num;
          this.detailLatestPageInfo = { ...res.detailLatest.page };
          // console.log(res);
          this.isLoadingPage = false;
        })
        .catch(e => {
          this.isLoadingPage = false;
        });
    },
    onTouchStart() {
      this.$emit('contentTouching');
    },
    navigateToMore(group) {
      if (group.children.length > 0) {
        // 点击了热门推荐 跳转到rid的ranking页
        this.$router.push(`/rank/${group.rid}`);
      } else {
        this.setSubTabRid(group.rid);
        this.$router.push(`/home/${group.rid}`);
      }
    },
    loadMore() {
      if (this.isLoadingMore) {
        return;
      }
      const hasMore = (this.detailLatestPageNum * this.detailLatestPageInfo.size) < this.detailLatestPageInfo.count;
      if (!hasMore) {
        return;
      }
      this.isLoadingMore = true;
      getSubTabLatestByPage(this.subTabRid, this.detailLatestPageNum + 1)
        .then(res => {
          if (res.data.code === 0) {
            const detailLatest = res.data;
            this.detailLatestArchive = [...this.detailLatestArchive, ...detailLatest.archives];
            this.detailLatestPageNum = detailLatest.page.num;
          }
          this.isLoadingMore = false;
        })
        .catch(e => {
          this.isLoadingMore = false;
        });
    },
    selectVideo(item) {
      if (this.mainTabRid === 13) {
        console.log('是番剧');
      } else {
        this.selectVideoPlay({
          aid: item.aid,
          pageNum: 1,
        });
        this.saveWatchHistory(item);
        this.$router.push(`/video/av${item.aid}`);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';
@import 'common/scss/mixins.scss';

.subpage {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  background-color: $color-background-d;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  .page-content-start-line {
    padding-top: 4.8rem;
    background-color: $color-border;
  }
  .page-content-detail {
    width: 100%;
    padding-top: 0.2rem;
  }
}

.section-wrapper {
  width: 100%;
  margin-bottom: 2rem;
  // background-color: pink;
  overflow: hidden;
  .group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
    padding: 0 0.4rem;
    h2 {
      color: $color-text;
      font-size: $font-size-medium;
      font-weight: lighter;
      height: 1rem;
      line-height: 1.05rem;
    }
    button {
      display: flex;
      height: 1rem;
      align-items: center;
      background-color: transparent;
      font-size: $font-size-small;
      color: $color-text-gray;
      span, i {
        height: 100%;
        line-height: 1rem;
      }
    }
  }
}

.group-videos {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.video-wrapper {
  &.empty {
    height: 0;
    border: none;
    padding: 0;
    margin: 0;
  }
  margin-top: 0.4rem;
  width: 46%;
  // background-color: gold;
  .video-cover-wrapper {
    display: block;
    position: relative;
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
      // padding-left: 0.2rem;
      padding-bottom: 0.2rem;
      width: 100%;
      font-size: $font-size-small-s;
      color: $color-text-white;
      background: linear-gradient(180deg,rgba(33,33,33,0),rgba(33,33,33,.5));
      display: flex;
      justify-content: space-around;
      .desc-tab {
        display: flex;
        justify-content: space-around;
        align-items: center;
        i {
          font-size: $font-size-small;
        }
       .video-play {
          padding-left: 0.1rem;
        }
        .video-review {
          padding-left: 0.1rem;
        }
      }
    }
  }

  .video-title {
    width: 100%;
    height: 1.5rem;
    padding-top: 0.1rem;
    p  {
      width: 100%;
      height: 100%;
      font-size: $font-size-small;
      color: $color-text;
      @include no-wrap-multi(2);
      line-height: 0.71rem;
    }
  }
}

.load-more-button {
  width: 100%;
  height: 2rem;
  color: $color-theme;
  font-size: $font-size-medium;
  background-color: $color-background-m;
}
</style>
