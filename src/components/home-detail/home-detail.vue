<template>
  <div class="home-detail">
    <!-- 首页 -->
    <div class="index-page" v-if="subTabRid === 0">
      <homepage @contentTouching="onTouchStart" />
    </div>

    <!-- 分类页 -->
    <div class="sub-page" v-if="subTabRid !== 0">
      <subpage @contentTouching="onTouchStart" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Homepage from './homepage';
import Subpage from './subpage';
import { TABS } from 'api/config';

export default {
  components: {
    Homepage,
    Subpage
  },
  computed: {
    ...mapGetters(['subTabRid'])
  },
  created() {
    this._syncTabs();
  },
  methods: {
    ...mapMutations({
      setMainTabRid: 'SET_MAIN_TAB_RID',
      setSubTabRid: 'SET_SUB_TAB_RID',
    }),
    _syncTabs() {
      if (this.$route.params.rid) {
        const rid = Number(this.$route.params.rid);
        const keys = Object.keys(TABS);
        if (keys.indexOf(rid.toString()) === -1) {
          // console.log('nomatch');
          this.$router.push('/home');
        } else {
          const tab = TABS[rid];
          this.setSubTabRid(tab.rid);
          this.setMainTabRid(tab.parent);
        }
      }
    },
    onTouchStart() {
      this.$emit('homeTouching');
    },
  }
};
</script>

<style lang="scss" scoped>
.home-detail {
  width: 100%;
}
</style>
