<template>
  <transition name="slide">
    <div class="rank">
      <!-- header -->
      <header class="rank-header">
        <div class="title">
          <button @click="goBack()"><i class="icon-chevron-left" /></button>
          <h1>排行榜</h1>
        </div>
        <nav>
          <slider-nav
            :tabs="rankTabs"
            :currentTabRid="selectedMainTabRid"
            @select="selectTab"
          />
        </nav>
      </header>
      <!-- 导航 -->
      <div class="rank-content-start-line"></div>
      <!-- 正文 -->
      <div class="rank-content">
        <video-list />
      </div>
    </div>
  </transition>
</template>

<script>
import SliderNav from 'base/slider-nav/slider-nav';
import VideoList from 'base/video-list/video-list';
import { TABS, RANK_TABS } from 'api/config';
import { getRankingsByRid } from 'api/rank';

export default {
  components: {
    SliderNav,
    VideoList
  },
  data() {
    return {
      isLoadingRankList: false,
      selectedMainTabRid: 0,
      videos: [],
    };
  },
  computed: {
    rankTabs() {
      const navTabs = RANK_TABS.map(mRid => TABS[mRid]);
      navTabs[0].name = '全站';
      navTabs[2].name = '番剧';
      navTabs[3].name = '国创';
      return navTabs;
    },
  },
  watch: {
    selectedMainTabRid(newTabRid) {
      // 更新列表
      this._getRankingsByRid();
    }
  },
  created() {
    console.log('created');
    if (this.$route.params.rid) {
      // 路由而来
      let rid = Number(this.$route.params.rid);
      if (RANK_TABS.indexOf(rid) === -1) {
        // 不在nav内的rid
        if (rid === 167 || rid === 13) {
          // api的问题, 修改实际的rid
          rid = (rid === 13) ? 33 : 168;
          this.selectedMainTabRid = rid;
          this.$router.push(`/rank/${rid}`);
        } else {
          // 错误的rid, redirect到动画
          this.$router.push('/rank/1');
          this.selectedMainTabRid = 1;
        }
      } else {
        // 在nav内的rid
        this.selectedMainTabRid = rid;
      }
    } else {
      console.log('hi?');
      // 没有rid, redirect到动画
      this.$router.push('/rank/1');
      this.selectedMainTabRid = 1;
    }
    this._getRankingsByRid();
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    selectTab(tab) {
      // 切换路由
      this.selectedMainTabRid = tab.rid;
      this.$router.push(`/rank/${tab.rid}`);
    },
    _getRankingsByRid() {
      if (this.isLoadingRankList) {
        return;
      }
      this.isLoadingRankList = true;
      getRankingsByRid(this.selectedMainTabRid)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.videos = res.data.list;
          }
          this.isLoadingRankList = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease;
}
.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.rank {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  .rank-header {
    position: fixed;
    width: 100%;
    background-color: $color-background;
    .title {
      position: relative;
      width: 100%;
      button {
        position: absolute;
        left: 0.5rem;
        height: 100%;
        padding: 0 0.5rem;
        background-color: transparent;
        color: $color-theme;
      }
      h1 {
        flex: 1;
        text-align: center;
        color: $color-theme;
        font-size: $font-size-medium;
        height: 2rem;
        line-height: 2rem;
      }
    }
  }
  .rank-content-start-line {
    padding-top: 3.6rem;
    background-color: $color-background-l;
  }
  .rank-content {
    position: relative;
    width: 100%;
    background-color: $color-background-d;
    // height: 100%;
  }
}
</style>
