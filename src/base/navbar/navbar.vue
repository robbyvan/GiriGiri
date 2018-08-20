<template>
  <nav class="navbar">
    <!-- 主slider导航 -->
    <div class="slider-nav-main">
      <slider-nav
        class="slider-main"
        :tabs="mainTabs"
        :currentTabRid="mainTabRid"
        :type="1"
        @select="changeMainTab"
      />
      <button class="expand-btn" @click="expandFullNav">
        <i class="icon-chevron-down" />
      </button>
    </div>
    <!-- 二级slider导航 -->
    <transition name="subnav-slide">
      <div class="slider-nav-sub" v-show="subTabs.length">
        <slider-nav
          class="slider-sub"
          :tabs="subTabs"
          :currentTabRid="subTabRid"
          :type="2"
          @select="changeSubTab"
        />
      </div>
    </transition>
    <!--隐藏的fullnav -->
    <full-nav class="full-nav" ref="fullNav" :tabs="mainTabs" @select="selectFullNavTab" />
  </nav>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import SliderNav from 'base/slider-nav/slider-nav';
import FullNav from 'base/full-nav/full-nav';
import { TABS, MAIN_TABS } from 'api/config';

export default {
  components: {
    SliderNav,
    FullNav
  },
  computed: {
    ...mapGetters([
      'mainTabRid',
      'subTabRid'
    ]),
    mainTabs() {
      return MAIN_TABS.map(mRid => TABS[mRid]);
    },
    subTabs() {
      if (this.mainTabRid === 0) {
        return [];
      } else {
        let subTabs = TABS[this.mainTabRid].children.map(cRid => TABS[cRid]);
        subTabs.splice(0, 0, { ...TABS[this.mainTabRid], name: '推荐' });
        return subTabs;
      }
    },
  },
  methods: {
    ...mapMutations({
      setMainTabRid: 'SET_MAIN_TAB_RID',
      setSubTabRid: 'SET_SUB_TAB_RID',
    }),
    expandFullNav() {
      this.$refs.fullNav.expand();
    },
    collapseFullNav() {
      this.$refs.fullNav.collapse();
    },
    selectFullNavTab(item) {
      this.changeMainTab(item);
      this.collapseFullNav();
    },
    changeMainTab(item) {
      this.setMainTabRid(item.rid);
      this.setSubTabRid(item.rid);
      // 切换路由
      this.$router.push({
        path: `/home/${item.rid}`
      });
    },
    changeSubTab(item) {
      this.setSubTabRid(item.rid);
      this.$router.push({
        path: `/home/${item.rid}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.navbar {
  position: relative;
  width: 100%;
  .slider-nav-main {
    display: flex;
    align-items: center;
    // background-color: gold;
    height: 1.6rem;
    .slider-main {
      flex: 85;
    }
    .expand-btn {
      flex: 15;
      background-color: transparent;
      color: $color-text-gray;
    }
  }
  .slider-nav-sub {
    height: 1.6rem;
    // background-color: pink;
    display: flex;
    align-items: center;
    &.subnav-slide-enter-active {
      transition: all 0.3s ease;
    }
    &.subnav-slide-enter, &.subnav-slide-leave-to {
      transform: translate3d(0, -100%, 0)
    }
  }
  .slider-sub {
    background-color: $color-background-l;
    padding: 0.1rem 0;
    // background-color: pink;
  }
  .full-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
