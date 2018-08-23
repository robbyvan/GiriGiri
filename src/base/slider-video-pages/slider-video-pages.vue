<template>
  <ul class="slider-nav">
    <li
      v-for="item in pages"
      :key="item.cid"
      class="tab-item"
      :class="{'active-page': currentPageNum === item.page}"
      @click="selectTab(item)"
    >
      <span class="tab-item-text">{{ item.part }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pages: { type: Array, default: () => [] },
    currentPageNum: { type: Number, default: 1 },
  },
  methods: {
    selectTab(item) {
      this.$emit('selectPage', item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';
@import 'common/scss/mixins.scss';

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
  background-color: $color-background;
  height: 1.8rem;
  .tab-item {
    display: inline-block;
    position: relative;
    height: 100%;
    width: 5.4rem;
    margin-right: 0.5rem;
    border: 0.03rem solid $color-text-gray;
    border-radius: 5px;
    font-size: $font-size-small-s;
    color: $color-text-gray-d;
    .tab-item-text {
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      padding: 0 0.3rem;
      line-height: 0.6rem;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      // text-align: center;
    }
    &.active-page {
      color: $color-theme;
      border-color: $color-theme;
    }
  }
}
</style>
