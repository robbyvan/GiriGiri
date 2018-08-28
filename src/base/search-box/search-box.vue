<template>
  <div class="search-box">
    <i class="icon-search" />
    <input type="text" class="box" ref="query" :placeholder="placeholder" v-model="query" />
    <i class="icon-x-circle" v-show="showClear" @click="clear" />
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  props: {
    placeholder: { type: String, default: '搜索视频、番剧、UP主或AV号' }
  },
  data() {
    return {
      query: '',
      showClear: false,
    };
  },
  created() {
    this.$watch('query', debounce(newQuery => {
      if (!this.showClear && newQuery.length > 0) {
        this.showClear = true;
      } else if (this.showClear && newQuery.length === 0) {
        this.showClear = false;
      }
      this.$emit('query', newQuery);
    }, 200));
  },
  methods: {
    clear() {
      this.query = '';
    },
    setQuery(q) {
      this.query = q;
    },
    blur() {
      this.$refs.query.blur();
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.search-box {
  display: flex;
  width: 100%;
  height: 1.4rem;
  align-items: center;
  background-color: $color-background-d;
  padding: 0 0.5rem;
  border-radius: 0.1rem;
  i.icon-search {
    color: $color-border;
    font-weight: lighter;
    font-size: $font-size-medium-x;
  }
  .box {
    outline: none;
    border: 0;
    height: 100%;
    padding-left: 0.4rem;
    background-color: transparent;
    font-size: $font-size-small;
    font-weight: normal;
    width: 100%;
    color: $color-text-search;
    &::placeholder {
      color: $color-text-gray;
    }
  }
  i.icon-x-circle {
    font-size: $font-size-medium;
    color: $color-text-gray-d;
  }
}

</style>
