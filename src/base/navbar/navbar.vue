<template>
  <nav class="navbar">
    <!-- 主slider导航 -->
    <div class="slider-nav-main">
      <slider-nav class="slider-nav-content" :tabs="mainTabs" :type="1" @select="changeMainTab" />
      <button class="expand-btn" @click="expandFullNav">
        <i class="icon-chevron-down" />
      </button>
    </div>
    <!-- 二级slider导航 -->
    <div class="slider-nav-sub" v-show="subTabs.length">
      <slider-nav class="slider-nav-content" :tabs="subTabs" :type="2" @select="changeSubTab" />
    </div>
    <!--隐藏的fullnav -->
    <full-nav class="full-nav" ref="fullNav" :tabs="mainTabs" />
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
    }
  },
  methods: {
    ...mapMutations({
      setMainTabRid: 'SET_MAIN_TAB_RID',
      setSubTabRid: 'SET_SUB_TAB_RID',
    }),
    expandFullNav() {
      this.$refs.fullNav.expand();
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
  .slider-nav-main {
    display: flex;
    .slider-nav-content {
      flex: 85;
    }
    .expand-btn {
      flex: 15;
      background-color: transparent;
    }
  }
  .full-nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
