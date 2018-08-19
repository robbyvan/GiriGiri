<template>
  <nav class="navbar">
    <!-- 主slider导航 -->
    <div class="slider-nav-main">
      <slider-nav class="slider-nav-content" :tabs="mainTabs" />
      <button class="expand-btn">
        <i class="icon-chevron-down" />
      </button>
    </div>
    <!-- 二级slider导航 -->
    <div class="slider-nav-sub" v-show="showSubNav">
      slider sub
    </div>
    <!--隐藏的fullnav -->
    <div>隐藏</div>
  </nav>
</template>

<script>
import SliderNav from 'base/slider-nav/slider-nav';

const mainTabs = [
  { tabName: '首页', path: 'home' },
  { tabName: '动画', path: 'animation' },
  { tabName: '番剧', path: 'bangumi' },
  { tabName: '国创', path: 'homemade' },
  { tabName: '音乐', path: 'music' },
  { tabName: '舞蹈', path: 'dance' },
  { tabName: '科技', path: 'science' },
  { tabName: '游戏', path: 'game' },
  { tabName: '娱乐', path: 'entertainment' },
  { tabName: '鬼畜', path: 'otomad' },
  { tabName: '电影', path: 'movie' },
  { tabName: '电视剧', path: 'series' },
  { tabName: '纪录片', path: 'documentary' },
  { tabName: '影视', path: 'film' },
  { tabName: '时尚', path: 'fashion' },
  { tabName: '生活', path: 'daily' },
  { tabName: '广告', path: 'ad' },
  { tabName: '直播', path: 'streaming' },
  { tabName: '相簿', path: 'album' },
];

export default {
  components: {
    SliderNav
  },
  props: {
    showSubNav: { type: Boolean, default: false },
    showFullNav: { type: Boolean, default: false },
  },
  data() {
    return {
      mainTabs: mainTabs,
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  .slider-nav-main {
    display: flex;
    // align-items: center;
    .slider-nav-content {
      flex: 85;
    }
    .expand-btn {
      flex: 15;
      // width: 100%;
      // height: 100%;
    }
  }

}
</style>
