<template>
  <div class="home">
    <!-- 顶部header -->
    <m-header class="m-header" />
    <!-- 中部navigator -->
    <navbar />
    <!-- 正文 -->
    <router-view />
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header';
import Navbar from 'base/navbar/navbar';

export default {
  components: {
    MHeader,
    Navbar
  },
};
</script>

<style lang="scss" scoped>
.home{
  position: relative;
  .m-header {
    z-index: 99;
  }
}
</style>
