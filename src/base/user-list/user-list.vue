<template>
  <div class="user-list">
    <div class="user-item" v-for="item in users" :key="item.mid" @click="selectUser(item)">
      <div class="avatar-wrapper">
        <img :src="item.upic" alt="avatar" />
      </div>
      <div class="user-desc">
        <h2 class="uname">{{ item.uname }}</h2>
        <p class="u-info">
          <span>粉丝: {{ item.fans }}</span>
          <span>视频: {{ item.videos }}</span>
        </p>
        <p class="usign">{{ item.usign }}</p>
      </div>
    </div>
    <p class="no-more" v-show="!users.length">什么都没找到呀ヽ(。ﾟдﾟ)ｐ</p>
  </div>
</template>

<script>
export default {
  props: {
    users: { type: Array, default: () => [] }
  },
  methods: {
    selectUser(item) {
      this.$emit('selectUser', item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.user-list {
  // display: flex;
  // flex-direction: column;
  position: relative;
  width: 100%;
}

.user-item {
  height: 3rem;
  margin-bottom: 0.5rem;
  // display: flex;
  // justify-content: space-between;
  // align-items: center;
}

.avatar-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  float: left;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}

.user-desc {
  overflow: hidden;
  padding-left: 0.5rem;
  .uname {
    font-size: $font-size-small;
  }
  .u-info {
    margin-top: 0.5rem;
    font-size: $font-size-small-s;
    color: $color-text-gray;
    span {
      margin-right: 1rem;
    }
  }
  .usign {
    margin-top: 0.3rem;
    font-size: $font-size-small-s;
    color: $color-text-gray;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.no-more {
  padding: 1rem 0;
  text-align: center;
  font-size: $font-size-small;
  color: $color-text-gray;
}

</style>
