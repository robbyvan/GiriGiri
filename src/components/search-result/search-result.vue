<template>
  <div class="search-result">
    <div class="category">
      <button
        v-for="(item, index) in categories"
        :key="item"
        :class="{'active-category': currentCategoryIndex === index }"
        @click="selectCategory(index)"
      >
        {{ _categoryText(index) }}
      </button>
    </div>
    <div class="search-content-wrapper">
      <div class="total-wrapper">
        <div class="order-box">
          <button
            v-for="(item, index) in orders"
            :key="item"
            :class="{'active-order': currentOrderIndex === index }"
            @click="selectOrder(index)"
          >
            {{ item }}
          </button>
        </div>
      </div>
      <div class="bangumi-wrapper"></div>
      <div class="upuser-wrapper"></div>
      <div class="pgc-wrapper"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: { type: Array, default: () => ['综合', '番剧', 'UP主', '影视'] },
    orders: { type: Array, default: () => ['默认排序', '播放多', '新发布', '弹幕多'] }
  },
  data() {
    return {
      currentCategoryIndex: 0,
      currentOrderIndex: 0,
      bangumis: [],
      upusers: [],
      pgcs: [],
      keyword: '',
    };
  },
  computed: {
  },
  methods: {
    _categoryText(index) {
      switch (index) {
        case 1:
          return `${this.categories[index]}(${this.bangumis.length})`;
        case 2:
          return `${this.categories[index]}(${this.upusers.length})`;
        case 3:
          return `${this.categories[index]}(${this.pgcs.length})`;
        default:
          return '综合';
      }
    },
    // 切换大类
    selectCategory(index) {
      if (index === this.currentCategoryIndex) {
        return;
      }
      this.currentCategoryIndex = index;
    },
    // 切换综合页排序规则
    selectOrder(index) {
      if (index === this.currentOrderIndex) {
        return;
      }
      this.currentOrderIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.search-result {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 2rem;
  background-color: $color-background;
}

.category {
  position: fixed;
  z-index: 3;
  height: 2rem;
  background-color: $color-background;
  width: 100%;
  padding: 0.2rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    background-color: transparent;
    font-size: $font-size-small;
    color: $color-text-gray;
    padding: 0.2rem 0;
    &.active-category {
      border-bottom: 0.1rem solid $color-theme;
      color: $color-theme;
    }
  }
}

.search-content-wrapper {
  position: relative;
  padding-top: 2rem;
  width: 100%;
  height: 100%;
  // background-color: lavender;
}

.total-wrapper {
  width: 100%;
  height: 100%;
  // background-color: lightcyan;
  .order-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 1.8rem;
    background-color: $color-background-l;
    button {
      background-color: transparent;
      font-size: $font-size-small;
      color: $color-text-gray;
      padding: 0.2rem 0;
      &.active-order {
        color: $color-theme;
      }
    }
  }
}

</style>
