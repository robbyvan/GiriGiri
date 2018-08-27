<template>
  <div class="search">
    <!-- 搜索框 -->
    <div class="search-top-wrapper">
      <div class="search-box-wrapper">
        <search-box />
      </div>
      <button class="cancel-btn">取消</button>
    </div>
    <!-- 热搜 -->
    <div class="hot-keyword-wrapper">
      <h2>大家都在搜</h2>
      <div class="keyword-wrapper">

      </div>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history">
      <button>清除历史记录</button>
    </div>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box';

export default {
  components: {
    SearchBox
  },
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
  background-color: $color-background;
}

.search-top-wrapper {
  width: 100%;
  height: 2rem;
  // background-color: lightcyan;
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

.hot-keyword-wrapper {
  margin-top: .5rem;
  width: 100%;
  background-color: lightcyan;
  h2 {
    font-size: $font-size-medium;
    color: $color-text-gray;
    padding-left: 0.5rem;
  }
  .keyword-wrapper {
    height: 4rem;
    background-color: lavender;
  }
}

</style>
