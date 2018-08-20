<template>
  <div class="home-detail">
    <!-- 首页 -->
    <div class="index-page" v-if="subTabRid === 0">
      <homepage />
    </div>

    <!-- 分类页 -->
    <div class="sub-page" v-if="subTabRid !== 0">
      others
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Homepage from './homepage';

export default {
  components: {
    Homepage
  },
  computed: {
    ...mapGetters(['subTabRid']),
  }
};
</script>

<style lang="scss" scoped>

</style>
