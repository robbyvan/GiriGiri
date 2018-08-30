<template>
  <div class="bangumi-list">
    <div
      class="bangumi-item"
      v-for="item in bangumis"
      :key="item.newest_ep_id"
    >
      <div class="cover-wrapper">
        <img :src="item.cover" alt="bangumi cover" />
      </div>
      <div class="bangumi-desc">
        <h2><i class="icon-tv" />番剧</h2>
        <p class="bangumi-title">{{ item.title }}</p>
        <p class="latest-episode">TV更新至{{ item.total_count }}话</p>
      </div>
    </div>
    <p class="no-more" v-show="!bangumis.length">什么都没找到呀ヽ(。ﾟдﾟ)ｐ</p>
  </div>
</template>

<script>
export default {
  props: {
    bangumis: { type: Array, default: () => [] },
  },
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.bangumi-list {
  display: flex;
  flex-direction: column;
}

.bangumi-item {
  height: 4.4rem;
  margin-top: 0.5rem;
  // background-color: lightcyan;
  display: flex;
}

.cover-wrapper {
  flex: 25;
  overflow: hidden;
  border-radius: 0.3rem;
  img {
    width: 100%;
    height: 100%;
  }
}

.bangumi-desc {
  flex: 75;
  display: flex;
  flex-direction: column;
  h2 {
    flex: 0 0 0.8rem;
    padding-left: 0.5rem;
    font-size: $font-size-small;
    i {
      font-size: $font-size-medium;
      color: $color-theme;
      margin-right: 0.5rem;
    }
  }
  .bangumi-title {
    margin: 0.5rem 0 0.3rem;
    padding-left: 0.5rem;
    line-height: 0.7rem;
    font-size: $font-size-small;
    word-break: break-word;
  }
  .latest-episode {
    padding-left: 0.5rem;
    font-size: $font-size-small-s;
    color: $color-text-gray;
  }
}

.no-more {
  padding: 1rem 0;
  text-align: center;
  font-size: $font-size-small;
  color: $color-text-gray;
}

</style>
