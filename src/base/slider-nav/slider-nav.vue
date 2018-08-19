<template>
  <ul class="slider-nav">
    <li
      v-for="item in tabs"
      :key="item.rid"
      class="tab-item"
      :class="{
        'active-tab-main': type === 1 && currentTabRid === item.rid,
        'active-tab-sub': type === 2 && currentTabRid === item.rid
      }"
      @click="selectTab(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tabs: { type: Array, default: () => [] },
    type: { type: Number, default: 1 }, // 1: main; 2: sub
    currentTabRid: { type: Number, default: 0 }
  },
  // watch: {
  //   tabs(newTabs) {
  //     if (!newTabs.length) {
  //       return;
  //     }
  //     this.currentTabRid = this.tabs[0].rid;
  //   }
  // },
  methods: {
    selectTab(item) {
      this.$emit('select', item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

.slider-nav {
  position: relative;
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  padding-left: 2%;
  padding-bottom: 0.22rem;
  background-color: $color-background;
  .tab-item {
    display: inline-block;
    font-size: $font-size-small;
    color: $color-text-gray-d;
    text-align: center;
    margin: 0 0.65rem;
    padding-bottom: 0.4rem;
    &.active-tab-main {
      color: $color-theme;
      border-bottom: 0.1rem solid $color-theme;
    }
    &.active-tab-sub {
      color: $color-theme;
    }
  }
}
</style>
