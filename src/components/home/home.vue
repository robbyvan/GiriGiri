<template>
  <div class="home">
    <!-- 顶部header -->
    <m-header />
    <!-- 中部navigator -->
    <!-- <m-nav></m-nav> -->
    <!-- 正文 -->
    <router-view />
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header';

export default {
  components: {
    MHeader
  },
};
</script>

<style lang="scss" scoped>

</style>
