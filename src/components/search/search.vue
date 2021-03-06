<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-top-wrapper">
      <div class="search-box-wrapper">
        <search-box
          ref="searchBox"
          @query="handleQueryChange"
          @clear="clearQuery"
          @search="search"
        />
      </div>
      <button class="cancel-btn" @click="backToHome">取消</button>
    </div>

    <!-- 热搜 -->
    <div class="search-home">
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
      <!-- 搜索历史 -->
      <div class="search-history">
        <h2 class="history-title">历史搜索</h2>
        <p
          class="search-history-item"
          v-for="s in searchHistory"
          :key="s"
          @click="selectHistoryItem(s)"
        ><i class="icon-clock" />{{ s }}</p>
        <button
          class="clear-history-btn"
          v-show="searchHistory.length > 0"
          @click="clearSearchHistory"
        >清除历史记录</button>
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
      <p class="no-suggest" v-show="showNoSuggestHint">没有相关的搜索推荐哦 ﾍ(;´Д｀ﾍ)</p>
    </div>

    <router-view></router-view>

  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box';
import { getHotWords, getSuggestions } from 'api/search';
import { loadSearches, saveSearch, clearSearch } from 'common/js/cache';

export default {
  components: {
    SearchBox
  },
  data() {
    return {
      showSuggest: false,
      directJump: false,
      hotWords: [],
      suggests: [],
      searchHistory: loadSearches(),
    };
  },
  computed: {
    showNoSuggestHint() {
      return this.suggests.length === 0;
    }
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
      if (this.directJump) {
        this.directJump = false;
        return;
      }
      if (query.trim() === '') {
        this.showSuggest = false;
        return;
      }
      this.showSuggest = true;
      getSuggestions(query).then(res => {
        if (res.data.code === 0) {
          if (Object.prototype.toString.apply(res.data.result) === '[object Array]') {
            this.suggests = res.data.result;
          } else {
            this.suggests = res.data.result.tag;
          }
        } else {
          this.suggests = [];
        }
      });
    },
    search() {
      const q = this.$refs.searchBox.query;
      // 保存记录
      this.searchHistory = saveSearch(q);
      // 跳转
      this.$router.push(`/search/${q}`);
      // 关闭搜索建议
      this.showSuggest = false;
    },
    selectHotwordTag(tag) {
      this._jumpToSearchDetail(tag);
    },
    selectHistoryItem(s) {
      this._jumpToSearchDetail(s);
    },
    clearQuery() {
      this.$router.push(`/search`);
    },
    clearSearchHistory() {
      this.searchHistory = clearSearch();
    },
    selectSuggestItem(item) {
      this._jumpToSearchDetail(item.value);
      // 关闭搜索建议
      this.showSuggest = false;
    },
    backToHome() {
      this.$router.push('/home');
    },
    //
    _jumpToSearchDetail(kw) {
      // 直接搜s
      this.directJump = true;
      // 同步query
      this.$refs.searchBox.setQuery(kw);
      // 保存记录
      this.searchHistory = saveSearch(kw);
      // 跳转
      this.$router.push(`/search/${kw}`);
    },
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
  // background-color: $color-background-l;
}

.search-top-wrapper {
  position: fixed;
  z-index: 4;
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

.search-home {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 2rem;
}

.hotword-wrapper {
  padding-top: .5rem;
  width: 100%;
  background-color: $color-background;
  h2 {
    font-size: $font-size-small;
    color: $color-text-gray;
    padding-left: 0.5rem;
    height: 1rem;
  }
  .words-wrapper {
    padding-top: 0.5rem;
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
  z-index: 3;
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

.no-suggest {
  text-align: center;;
  color: $color-text-gray;
  font-size: $font-size-small;
  padding: 1rem 0;
}

.search-history {
  margin-top: 1rem;
  border-top: 0.5rem solid $color-background-l;
  padding: 0.5rem;
  width: 100%;
  // background-color: lavender;
  // text-align: center;
}

.history-title {
  font-size: $font-size-small;
  color: $color-text-gray;
  height: 1rem;
  line-height: 1rem;
  // background-color: lightcyan;
}

.search-history-item {
  box-sizing: border-box;
  font-size: $font-size-small;
  height: 2rem;
  border-bottom: 0.06rem solid $color-border;
  display: flex;
  align-items: center;
  i {
    color: $color-text-gray;
    font-size: $font-size-medium;
    margin-right: 0.5rem;
  }
}

.clear-history-btn {
  display: block;
  background-color: transparent;
  width: 6rem;
  height: 1rem;
  margin: 0.5rem auto;
  color: $color-text-gray;
  font-size: $font-size-small;
  text-align: center;
  // background-color: coral;
}

</style>
