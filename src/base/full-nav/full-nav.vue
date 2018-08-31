<template>
  <div class="fn-container" ref="fullNavContainer">
    <ul class="full-nav">
      <li
        v-for="item in tabs"
        :key="item.rid"
        class="tab-item"
        :class="{'active-tab': currentTabRid === item.rid}"
        @click="selectTab(item)"
      >
        <span>{{ item.name }}</span>
      </li>
      <li class="tab-item"></li>
      <li class="tab-item"></li>
      <li class="tab-item"></li>
      <li class="tab-item"></li>
      <li class="tab-item"></li>
      <li class="tab-item"></li>
    </ul>
    <button class="collapse-btn" @click="collapse">
      <i class="icon-chevron-up" />
    </button>
  </div>
</template>

<script>
import { prefixStyle } from 'common/js/dom';

const transform = prefixStyle('transform');

export default {
  props: {
    tabs: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentTabRid: 0,
      showFullNav: false,
    };
  },
  methods: {
    selectTab(item) {
      this.currentTabRid = item.rid;
      this.$emit('select', item);
    },
    collapse() {
      this.$refs.fullNavContainer.style.transition = 'all 0.4s';
      this.$refs.fullNavContainer.style[transform] = 'translate3d(0, -100%, 0)';
    },
    expand() {
      this.$refs.fullNavContainer.style.transition = 'all 0.4s';
      this.$refs.fullNavContainer.style[transform] = 'translate3d(0, 0, 0)';
    },
    shouldNavExpand(status) {
      this.showFullNav = status;
      if (this.showFullNav) {
        this.expand();
      } else {
        this.collapse();
      }
    },
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.fn-container {
  width: 100%;
  overflow: hidden;
  background-color: $color-background;
  transform: translate3d(0, -100%, 0);
}

.collapse-btn {
  margin: 0 auto;
  width: 4rem;
  background-color: transparent;
  color: $color-text-gray;
}

.full-nav {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  .tab-item {
    flex: 1 0 2.4rem;
    padding: 0.3rem 0;
    text-align: center;
    span {
      padding-bottom: 0.4rem;
      font-size: $font-size-small;
      color: $color-text-gray-d;
      text-align: center;
      line-height: 1.3rem;
    }
    &:empty {
      height: 0;
      border: none;
      padding: 0;
      margin: 0;
    }
    &.active-tab span{
      color: $color-theme;
      border-bottom: 0.08rem solid $color-theme;
    }
  }
}

</style>
