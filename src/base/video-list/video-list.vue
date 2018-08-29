<template>
  <ul class="video-list">
    <li
      class="video-item"
      v-for="(video, index) in videos"
      :key="video.aid"
      @click="selectItem(video)"
    >
      <!-- 排名 -->
      <div class="rank" v-show="rank">
        <span
          :class="getRankingClass(index)"
          v-text="getRankingText(index)">
        </span>
      </div>
      <!-- 封面 -->
      <div class="cover-wrapper">
        <img v-lazy="video.pic" alt="cover" />
        <div class="duration" v-if="duration">
          <p>{{_formatDuration(video.duration)}}</p>
        </div>
      </div>
      <!-- 详情 -->
      <div class="info">
        <h2 class="title">{{ video.title }}</h2>
        <p class="author">
          <i class="icon-author" />
          <span>{{ video.author }}</span>
        </p>
        <div class="video-dec">
          <span class="desc-tab">
            <i class="icon-watch" />
            <span class="video-play" v-text="_formatNumber(video.play)" />
          </span>
          <span class="desc-tab">
            <i class="icon-align-left" />
            <span class="video-review" v-text="_formatNumber(video.video_review)" />
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import moment from 'moment';
import { formatNumber, paddingZero } from 'common/js/format';

export default {
  props: {
    videos: { type: Array, default: () => [] },
    rank: { type: Boolean, default: false }, // 排行奖杯图片
    duration: { type: Boolean, default: false } // 视频时长
  },
  methods: {
    _formatNumber(num) {
      return formatNumber(num);
    },
    _formatDuration(time) {
      let d;
      if (typeof time === 'number') {
        d = moment.duration(`0:0:${time}`);
      } else {
        d = moment.duration(`0:${time}`);
      }
      return `${paddingZero(d.hours())}:${paddingZero(d.minutes())}:${paddingZero(d.seconds())}`;
    },
    getRankingNum(index) {
      if (index > 2) {
        return `<span class="text">${index + 1}</span>`;
      }
      return `<span class="icon rank${index + 1}" />`;
    },
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
    },
    selectItem(item) {
      this.$emit('select', item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';
@import 'common/scss/mixins.scss';

.video-list {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  .video-item {
    display: flex;
    flex-direction: row;
    margin-top: 0.8rem;
    width: 100%;
    height: 3.2rem;

    .rank {
      flex: 8;
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
          background-image: url('../../common/img/rank3.png');
        }
      }
      .text {
        text-align: center;
        font-size: $font-size-small;
      }
    }

    .cover-wrapper {
      flex: 37;
      margin-right: 0.5rem;
      overflow: hidden;
      border-radius: 0.3rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        vertical-align: top;
        text-align: left;
      }
      .duration{
        position: absolute;
        bottom: 0.15rem;
        right: 0.15rem;
        background-color: rgba(0, 0, 0, 0.4);
        padding: 0.1rem;
        p {
          font-size: $font-size-small-s;
          color: $color-text-white;
        }
      }
    }

    .info {
      flex: 55;
      margin-right: 0.5rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        flex: 2;
        max-height: 1.5rem;
        line-height: 0.75rem;
        font-size: $font-size-small;
        text-align: left;
        word-break: break-all;
        @include no-wrap-multi(2);
      }
      .author {
        flex: 1;
        max-height: 0.4rem;
        font-size: $font-size-small-s;
        color: $color-text-gray;
        display: flex;
        align-items: center;
        span {
          padding-left: 0.2rem;
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
          span {
             padding-left: 0.1rem;
          }
        }
      }
    }
  }
}

</style>
