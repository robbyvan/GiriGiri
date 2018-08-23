<template>
  <ul class="loading-rank">
    <li
      class="video-item"
      v-for="(video, index) in videos"
      :key="video"
    >
      <!-- 排名 -->
      <div class="rank" v-show="showRank">
        <span
          :class="getRankingClass(index)"
          v-text="getRankingText(index)">
        </span>
      </div>
      <!-- 封面 -->
      <div class="cover-wrapper">
        <img src="./loading.png" alt="cover" />
      </div>
      <!-- 详情 -->
      <div class="info">
        <h2 class="title"><span class="tombstone"></span></h2>
        <p class="author">
          <i class="icon-author" />
          <span class="video-author"><span class="tombstone"></span></span>
        </p>
        <div class="video-dec">
          <span class="desc-tab">
            <i class="icon-watch" />
            <span class="video-play"><span class="tombstone"></span></span>
          </span>
          <span class="desc-tab">
            <i class="icon-align-left" />
            <span class="video-review"><span class="tombstone"></span></span>
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    showRank: { type: Boolean, default: true },
    videos: { type: Array, default: () => [1, 2, 3, 4, 5, 6] }
  },
  methods: {
    getRankingClass(index) {
      if (index <= 2) {
        return `icon rank${index + 1}`;
      } else {
        return 'text';
      }
    },
    getRankingText(index) {
      if (index > 2) {
        return index + 1;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';
@import 'common/scss/mixins.scss';

.tombstone {
  position: absolute;
  width: 80%;
  height: 80%;
  background-color: $color-background-m;
}

.loading-rank {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  .video-item {
    display: flex;
    flex-direction: row;
    margin-top: 0.8rem;
    width: 100%;
    height: 3.6rem;
    .rank {
      flex: 10;
      height: 100%;
      padding: 0 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        width: 100%;
        height: 100%;
        background-size: 1rem 1.75rem;
        background-repeat:no-repeat;
        background-position:center center;
        &.rank1 {
          background-image: url('../../common/img/rank1.png');
        }
        &.rank2 {
          background-image: url('../../common/img/rank2.png');
        }
        &.rank3 {
          background-image: url('../../common//img/rank3.png');
        }
      }
      .text {
        text-align: center;
        font-size: $font-size-small;
      }
    }
    .cover-wrapper {
      flex: 40;
      margin-right: 0.5rem;
      overflow: hidden;
      border-radius: 0.3rem;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
        text-align: left;
      }
    }
    .info {
      flex: 50;
      margin-right: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        flex: 2;
        max-height: 1rem;
        font-size: $font-size-small;
        text-align: left;
        word-break: break-all;
        @include no-wrap-multi(2);
        position: relative;
        display: flex;
        align-items: center;
      }
      .author {
        flex: 1;
        max-height: 0.5rem;
        font-size: $font-size-small-s;
        color: $color-text-gray;
        display: flex;
        align-items: center;
        .video-author {
          padding-left: 0.2rem;
          width: 2.5rem;
          height: 100%;
          position: relative;
        }
      }
      .video-dec {
        flex: 1;
        max-height: 0.5rem;
        display: flex;
        font-size: $font-size-small-s;
        justify-content: flex-start;
        color: $color-text-gray;
        .desc-tab {
          padding-right: 0.5rem;
          display: flex;
          .video-play, .video-review {
            padding-left: 0.1rem;
            width: 2.5rem;
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}

</style>
