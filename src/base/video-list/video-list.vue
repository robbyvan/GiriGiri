<template>
  <ul class="video-list">
    <li
      class="video-item"
      v-for="(video, index) in videos"
      :key="video.aid"
    >
      <div class="rank" v-show="rank">
        <span :class="getRankClass(index)">{{ getRankText(index) }}</span>
      </div>
      <div class="content">
        <h2 class="title">{{ video.title }}}</h2>
        <p class="author">{{ video.author }}</p>
        <div class="video-dec">
          <span class="desc-tab">
            <i class="icon-watch" />
            <span class="video-play" v-text="_formatPlays(item.play)" />
          </span>
          <span class="desc-tab">
            <i class="icon-align-left" />
            <span class="video-review" v-text="_formatPlays(item.video_review )" />
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    videos: { type: Array, default: () => [] }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

</style>
