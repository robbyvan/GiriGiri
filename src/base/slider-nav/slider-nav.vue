<template>
  <ul class="slider-nav">
    <li
      v-for="item in tabs"
      :key="item.rid"
      class="tab-item"
    >
      <router-link :to="`/home/${item.rid}`" tag="a">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tabs: { type: Array, default: () => [] }
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
  padding-left: 4%;
  padding-bottom: 0.22rem;
  background-color: gold;
  .tab-item {
    display: inline-block;
    font-size: $font-size-small;
    color: $color-text-gray-d;
    text-align: center;
    width: 20%;
    // background-color: pink;
  }
}
</style>
