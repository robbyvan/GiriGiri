<template>
  <div class="comment">
    <h3 class="comment-title">评论<span class="comment-count">({{ totalRepliesCount }})</span></h3>
    <ul class="comment-wrapper">
      <li v-for="item in comments" :key="item.rpid" class="comment-item">
        <div class="avatar-wrapper">
          <img :src="_httpsSrc(item.member.avatar)" alt="avatar" />
        </div>
        <div class="comment-content-box">
          <h3 class="comment-info">
            <span class="uname">{{ item.member.uname }}</span>
            <span class="cdate">{{ _formatDate(item.ctime) }}</span>
          </h3>
          <p class="comment-message">{{ item.content.message }}</p>
        </div>
      </li>
    </ul>
    <div class="download-btn">打开App, 查看全部评论</div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    comments: { type: Array, default: () => [] },
    totalRepliesCount: { type: Number, default: () => [] },
  },
  methods: {
    _formatDate(ts) {
      const pubDate = moment.unix(ts);
      const moreThanOneYear = pubDate.isBefore(moment(), 'year');
      return moreThanOneYear ? pubDate.format('YYYY-M-D') : pubDate.format('M-D');
    },
    _httpsSrc(url) {
      if (url.startsWith('http://')) {
        return `https://${url.substr(7)}`;
      }
      return `https://${url}`;
    },
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.comment {
  position: relative;
  width: 100%;
  // display: flex;
  // flex-direction: column;
  .comment-title {
    font-size: $font-size-medium;

    span {
      padding-left: 0.3rem;
      color: $color-text-gray;
    }
  }
  .comment-wrapper {
    width: 100%;
  }
  .comment-item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.6rem 0;
    border-bottom: 0.01rem solid $color-border;
    &:last-child {
      border: none;
    }
    // white-space: nowrap;
    .avatar-wrapper {
      flex: 13;
      // padding: 0 1%;
      align-self: flex-start;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .comment-content-box {
      flex: 87;
      padding-left: 0.5rem;

      .comment-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: $font-size-small;
        height: 1rem;
        color: $color-text-gray-d;
        .cdate {
          color: $color-text-gray;
          font-size: $font-size-small-s;
        }
      }
      .comment-message {
        margin-top: 0.3rem;
        font-size: $font-size-small;
        line-height: 0.75rem;
        white-space: pre-line;
      }
    }
  }

  .download-btn{
    text-align: center;
    background-color: $color-theme;
    color: $color-text-white;
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: $font-size-small;
    border-radius: 3px;
  }
}

</style>
