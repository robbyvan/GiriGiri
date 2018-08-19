<template>
  <nav class="navbar">
    <!-- 主slider导航 -->
    <div class="slider-nav-main">
      <slider-nav class="slider-nav-content" :tabs="mainTabs" />
      <button class="expand-btn" @click="shouldNavExpand(true)">
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

export default {
  components: {
    SliderNav
  },
  props: {
    mainTabs: { type: Array, default: () => [] },
    showSubNav: { type: Boolean, default: false },
  },
  data() {
    return {
      showFullNav: false,
    };
  },
  methods: {
    shouldNavExpand(status) {
      if (status) {
        this.showFullNav = true;
      } else {
        this.showFullNav = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  .slider-nav-main {
    display: flex;
    .slider-nav-content {
      flex: 85;
    }
    .expand-btn {
      flex: 15;
    }
  }

}
</style>
