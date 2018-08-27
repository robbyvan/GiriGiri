<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-top-wrapper">
      <div class="search-box-wrapper">
        <search-box @query="handleQueryChange" ref="searchBox" />
      </div>
      <button class="cancel-btn">取消</button>
    </div>
    <!-- 热搜 -->
    <div class="hotword-wrapper">
      <h2>大家都在搜</h2>
      <div class="words-wrapper">
        <p
          v-for="hw in hotWords"
          :key="hw.keyword"
          @click="selectHotwordTag(hw.keyword)"
        >{{hw.keyword}}</p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </div>

    <!-- 搜索建议 -->
    <div class="suggest-list" v-show="showSuggest">
      <div class="suggest-list-start-line"></div>
      <p
        class="suggest-item"
        v-for="item in suggests"
        :key="item.value"
        v-html="item.name"
        @click="selectSuggestItem(item)"
      ></p>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history">
      <button>清除历史记录</button>
    </div>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box';
import { getHotWords, getSuggestions } from 'api/search';

export default {
  components: {
    SearchBox
  },
  data() {
    return {
      showSuggest: false,
      hotWords: [],
      suggests: [],
    };
  },
  created() {
    this._getHotWords();
  },
  methods: {
    // 加载数据
    _getHotWords() {
      getHotWords().then(res => {
        if (res.data.code === 0) {
          this.hotWords = res.data.list;
        }
      });
    },
    // UI操作
    handleQueryChange(query) {
      // console.log(query);
      if (query.trim() === '') {
        this.showSuggest = false;
        return;
      }
      getSuggestions(query).then(res => {
        if (res.data.code === 0) {
          this.suggests = res.data.result.tag;
          this.showSuggest = true;
        } else {
          this.suggests = [];
        }
      });
    },
    selectHotwordTag(tag) {
      this.$refs.searchBox.setQuery(tag);
    },
    selectSuggestItem(item) {
      console.log('select', item.value);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.search {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-background-l;
}

.search-top-wrapper {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 2rem;
  background-color: $color-background;
  display: flex;
  align-items: center;
  .search-box-wrapper {
    flex: 85;
    height: 100%;
    padding: 0.3rem 0 0.3rem 0.5rem;
  }
  .cancel-btn {
    flex: 15;
    font-size: $font-size-small;
    color: $color-theme;
    height: 100%;
    background-color: transparent;
  }
}

.hotword-wrapper {
  padding-top: .5rem;
  width: 100%;
  background-color: $color-background;
  h2 {
    font-size: $font-size-medium;
    color: $color-text-gray;
    padding-left: 0.5rem;
  }
  .words-wrapper {
    margin-top: 0.5rem;
    height: 4rem;
    // background-color: lavender;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    p {
      line-height: 1.5rem;
      height: 1.5rem;
      min-width: 2rem;
      text-align: center;
      margin-bottom: 0.5rem;
      margin-left: 0.5rem;
      border: 0.05rem solid $color-border;
      padding: 0 0.5rem;
      font-size: $font-size-small;
      color: $color-text;
      border-radius: 1rem;
      &:empty {
        height: 0;
        border: 0;
        margin: 0;
        padding: 0;
      }
    }
  }
}

.suggest-list {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-background;
  .suggest-list-start-line {
    padding-top: 2rem;
  }
  .suggest-item {
    margin: 0 0.5rem;
    box-sizing: border-box;
    line-height: 2rem;
    border-bottom: 0.1rem solid $color-border;
    font-size: $font-size-small;
    color: $color-text;
  }
}

.search-history {

}

</style>
