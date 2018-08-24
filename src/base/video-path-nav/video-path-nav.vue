<template>
  <p class="detailed-info-path" v-show="showPath">
    <button @click="_navigateTo(1)">
      主页
    </button>
    <i class="icon-chevron-right" />
    <button @click="_navigateTo(2)">
      {{ mainTabName }}
    </button>
    <i class="icon-chevron-right" />
    <button @click="_navigateTo(3)" v-show="hasSubTab">
      {{ subTabName }}
    </button>
    <i class="icon-chevron-right" v-show="hasSubTab" />
    <span>av{{ aid }}</span>
  </p>
</template>

<script>
import { TABS, MAIN_TABS } from 'api/config';

const allTabs = Object.keys(TABS).map(s => Number(s));

export default {
  props: {
    cid: { type: Number, default: 1 },
    aid: { type: Number, default: 0 },
  },
  computed: {
    mainTabRid() {
      if (MAIN_TABS.indexOf(this.cid) === -1) {
        // 是subtab, 有main
        return TABS[this.cid].parent;
      }
      return this.cid;
    },
    subTabRid() {
      return this.cid;
    },
    mainTabName() {
      return TABS[this.mainTabRid].name;
    },
    subTabName() {
      return TABS[this.subTabRid].name;
    },
    showPath() {
      return allTabs.indexOf(this.cid) !== -1;
    },
    hasSubTab() {
      return MAIN_TABS.indexOf(this.cid) === -1;
    }
  },
  methods: {
    _navigateTo(layer) {
      switch (layer) {
        case 1:
          this.$emit('navigateTo', 0);
          return;
        case 2:
          this.$emit('navigateTo', this.mainTabRid);
          return;
        case 3:
          this.$emit('navigateTo', this.subTabRid);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.detailed-info-path {
  button {
    background-color: transparent;
    color: $color-theme;
  }
}
</style>
