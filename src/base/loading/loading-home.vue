<template>
  <div class="loading">
    <div class="recommend">
        <!-- 循环所有组 -->
        <section class="section-wrapper">
          <!-- 组名 -->
          <div class="group-header">
            <h2>热门推荐</h2>
          </div>

          <div class="group-videos">
            <!-- 循环生成视频 -->
            <div class="video-wrapper" v-for="item in videos" :key="item">
              <div class="video-cover-wrapper">
                <!-- 封面 -->
                <img class="video-cover" src="./loading.png" alt="cover" />
                <!-- 信息 -->
                <div class="video-dec">
                  <span class="desc-tab">
                    <i class="icon-watch" />
                    <span class="video-play">--</span>
                  </span>
                  <span class="desc-tab">
                    <i class="icon-align-left" />
                    <span class="video-review">--</span>
                  </span>
                </div>
              </div>
              <!-- 视频title -->
              <div class="video-title">
                <p>加载中...</p>
              </div>
            </div>
          </div>
        </section>

        <section class="section-wrapper">
          <!-- 组名 -->
          <div class="group-header">
            <h2>最新视频</h2>
          </div>
        </section>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [0, 1, 2, 3],
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.section-wrapper {
  width: 100%;
  margin-bottom: 2rem;
  // background-color: pink;
  overflow: hidden;
  .group-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2rem;
    padding: 0 0.4rem;
    h2 {
      color: $color-text;
      font-size: $font-size-medium;
      font-weight: lighter;
      height: 1rem;
      line-height: 1.05rem;
    }
    button {
      display: flex;
      height: 1rem;
      align-items: center;
      background-color: transparent;
      font-size: $font-size-small;
      color: $color-text-gray;
      span, i {
        height: 100%;
        line-height: 1rem;
      }
    }
  }
}

.group-videos {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.video-wrapper {
  margin-top: 0.4rem;
  width: 46%;
  overflow: hidden;
  .video-cover-wrapper {
    display: block;
    position: relative;
    margin: 0 auto;
    border-radius: 0.35rem;
    overflow: hidden;
    background-color: $color-background-m;
    background-image: linear-gradient(transparent 50%, rgba(0,0,0,.5));
    .video-cover {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
    .video-dec {
      position: absolute;
      bottom: 0;
      left: 0;
      padding-bottom: 0.2rem;
      width: 100%;
      font-size: $font-size-small-s;
      color: $color-text-white;
      background: linear-gradient(180deg,rgba(33,33,33,0),rgba(33,33,33,.5));
      display: flex;
      justify-content: space-around;
      .desc-tab {
        display: flex;
        justify-content: space-around;
        align-items: center;
        i {
          font-size: $font-size-small;
        }
       .video-play {
          padding-left: 0.1rem;
        }
        .video-review {
          padding-left: 0.1rem;
        }
      }
    }
  }

  .video-title {
    width: 100%;
    height: 1.5rem;
    padding-top: 0.1rem;
    p  {
      width: 100%;
      height: 100%;
      font-size: $font-size-small;
      color: $color-text;
      line-height: 0.7rem;
    }
  }
}
</style>
