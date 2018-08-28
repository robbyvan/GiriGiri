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
  </div>
</template>

<script>
export default {
  props: {
    categories: { type: Array, default: () => ['综合', '番剧', 'UP主', '影视'] }
  },
  data() {
    return {
      currentCategoryIndex: 0,
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
    selectCategory(index) {
      if (index === this.currentCategoryIndex) {
        return;
      }
      this.currentCategoryIndex = index;
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
  display: flex;
  width: 100%;
  padding: 0.3rem 1rem;
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

</style>
