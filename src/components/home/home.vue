<template>
  <div class="home">
    <div class="fixed-nav">
      <!-- 顶部header -->
      <m-header class="m-header" />
      <!-- 中部navigator -->
      <navbar class="nav-bar" />
    </div>
    <!-- 正文 -->
    <div class="page-content">
      <router-view />
      <!-- footer -->
      <m-footer class="m-footer" />
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex';
import MHeader from 'base/m-header/m-header';
import Navbar from 'base/navbar/navbar';
import MFooter from 'base/m-footer/m-footer';

export default {
  components: {
    MHeader,
    Navbar,
    MFooter
  },
  computed: {
    // ...mapGetters(['subTabRid']),
  },
  watch: {
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.home{
  position: absolute;
  top: 0;
  left: 0;
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
    .nav-bar {
      position: relative;
      z-index: 98;
    }
  }
  .line-page-content-start {
    padding-top: 3.2rem;
  }
  .page-content {
    position: relative;
    width: 100%;
    // background-color: olive;
  }
  .m-footer {
  }
}
</style>
