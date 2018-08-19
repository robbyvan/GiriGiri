<template>
  <div class="home">
    <!-- 顶部header -->
    <m-header />
    <!-- 中部navigator -->
    <navbar :mainTabs="mainTabs" />
    <!-- 正文 -->
    <router-view />
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header';
import Navbar from 'base/navbar/navbar';
import { TABS, MAIN_TABS } from 'api/config';

export default {
  components: {
    MHeader,
    Navbar
  },
  created() {
    this.mainTabs = MAIN_TABS.map(rid => TABS[rid]);
    console.log(this.mainTabs);
  },
};
</script>

<style lang="scss" scoped>

</style>
