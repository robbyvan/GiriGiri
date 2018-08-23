<template>
  <div
    class="player-box"
    v-if="playUrlInfo !== null"
    :class="isFullScreenClass"
  >
    <div
      class="player-video-wrapper"
      :class="isFullScreenClass"
    >
      <video
        ref="video"
        class="player-video"
        :class="isFullScreenClass"
        preload="auto"
        webkit-playsinline
        playsinline
        loop
        muted
        @loadeddata="loaded"
        @error="error"
        @timeupdate="updateTime"
        @playing="ready"
        @waiting="wait"
        @pause="pauseVideo"
      ></video>
    </div>
    <div class="video-loading" v-show="!firstFrameLoaded">
      <img src="../../common/img/lazy2.gif" alt="loading gif" />
    </div>
    <div class="video-layers" v-show="firstFrameLoaded">
      <!-- 弹幕层: z-index 1 -->
      <div class="video-danmu" v-show="showDanmuLayer"></div>
      <!-- 控制层: z-index 2 -->
      <div
        class="video-controls"
        :class="{'hide-controls': !showControlLayer}"
      >
        <div class="video-time-box">
          <p class="video-time">
            <span class="video-current-time">{{formatedCurrentTime}}</span>
            <span class="video-time-slash" />
            <span class="video-duration">{{timeLen}}</span>
          </p>
        </div>
        <div class="video-controls-progressbar">
          <!-- <progressbar /> -->
        </div>
        <div class="video-controls-buttons">
          <span class="toggle-danmu" @click="toggleDanmuLayer">
            <i :class="showDanmuIconClass" />
          </span>
          <span class="toggle-fullscreen" @click="toggleFullsScreen">
            <i :class="changeFullScreenIconClass" />
          </span>
        </div>
      </div>
      <!-- 封面层: z-index 3 -->
      <div
        v-show="showCoverLayer"
        class="video-cover"
        @click="startPlaying"
      >
        <img :src="playUrlInfo.img" alt="cover image" />
        <div class="video-aid-wrapper">
          <p class="video-title-aid">av{{ playUrlInfo.aid }}</p>
        </div>
        <div class="video-timelength">
          <p>{{ timeLen }}</p>
        </div>
        <button class="video-start-play-btn" />
      </div>
      <!-- 控制播放: z-index 2 -->
      <div
        class="player-state-button"
        @click="toggleControlLayer"
      >
        <button
          class="video-resume-btn"
          :class="{'active-state': !shouldVideoPlay, 'hide-controls': !showControlLayer}"
          @click.stop="playVideo"
        />
        <button
          class="video-pause-btn"
          :class="{'active-state': shouldVideoPlay, 'hide-controls': !showControlLayer}"
          @click.stop="pauseVideo"
        />
        <span class="video-buffering-state" :class="{'active-state': isBuffering}" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      // UI相关
      showCoverLayer: true,
      showControlLayer: false,
      showDanmuLayer: false,
      isFullScreen: false,
      // 视频播放相关
      firstFrameLoaded: false,
      shouldVideoPlay: false, // 有可能在缓冲
      isBuffering: false,
      currentPlayingTime: 0,
    };
  },
  computed: {
    ...mapGetters(['videoAid', 'playUrlInfo']),
    formatedCurrentTime() {
      const dr = moment.duration(this.currentPlayingTime, 'seconds');
      return `${this._paddingZero(Math.floor(dr.asMinutes()))}:${this._paddingZero(dr.seconds())}`;
    },
    timeLen() {
      if (this.playUrlInfo !== null && this.playUrlInfo.timelength > 0) {
        const dr = moment.duration(this.playUrlInfo.timelength);
        return `${this._paddingZero(Math.floor(dr.asMinutes()))}:${this._paddingZero(dr.seconds())}`;
      }
      return '00:00:00';
    },
    showDanmuIconClass() {
      return this.showDanmuLayer ? 'icon-list' : 'icon-slash';
    },
    changeFullScreenIconClass() {
      return this.isFullScreen ? 'icon-minimize' : 'icon-maximize';
    },
    isFullScreenClass() {
      return this.isFullScreen ? 'full-screen' : '';
    },
  },
  watch: {
    playUrlInfo(newVal) {
      const that = this;
      if (newVal !== null) {
        setTimeout(() => {
          that.resetPlayer(newVal.playUrl);
        }, 20);
      }
    }
  },
  created() {
    console.log(this.playUrlInfo);
    // console.log(this.playUrlInfo.timelength);
  },
  methods: {
    resetPlayer(src) {
      // 状态重置
      this.showCoverLayer = true;
      this.showControlLayer = false;
      this.showDanmuLayer = false;
      this.isFullScreen = false;
      this.firstFrameLoaded = false;
      this.shouldVideoPlay = false;
      this.isBuffering = false;
      this.currentPlayingTime = 0;
      // video重置
      this.$refs.video.pause();
      this.$refs.video.src = src;
      this.$refs.video.currentTime = 0;
      this.$refs.video.load();
    },
    _paddingZero(src, digits = 2) {
      let str = src.toString(); // 转成str
      if (str.length < digits) {
        return this._paddingZero(`0${str}`, digits);
      }
      return str;
    },
    toggleControlLayer() {
      console.log('click');
      this.showControlLayer = !this.showControlLayer;

      clearTimeout(this.hideTimer);
      // 自动隐藏
      if (this.showControlLayer) {
        this.hideControlLayerInTime();
      }
    },
    hideControlLayerInTime(delay = 3000) {
      const that = this;
      this.hideTimer = setTimeout(() => {
        that.showControlLayer = false;
      }, delay);
    },
    toggleDanmuLayer() {
      this.showDanmuLayer = !this.showDanmuLayer;
    },
    toggleFullsScreen() {
      this.isFullScreen = !this.isFullScreen;
    },
    // 视频播放相关
    loaded() {
      this.firstFrameLoaded = true;
    },
    startPlaying() {
      // 开始播放 & 隐藏cover层
      this.playVideo();
      this.showCoverLayer = false;
    },
    pauseVideo() {
      clearTimeout(this.hideTimer);
      // 暂停视频播放
      const video = this.$refs.video;
      video.pause();
      this.shouldVideoPlay = false;
      this.isBuffering = false;
      // 之后还要暂停弹幕
    },
    playVideo() {
      clearTimeout(this.hideTimer);
      const video = this.$refs.video;
      video.play();
      this.shouldVideoPlay = true;
      this.showControlLayer = true;
      this.hideControlLayerInTime();
    },
    updateTime(e) {
      this.currentPlayingTime = e.target.currentTime;
    },
    ready() {
      this.shouldVideoPlay = true;
      this.isBuffering = false;
      // console.log('playing!');
    },
    wait() {
      this.shouldVideoPlay = false;
      this.isBuffering = true;
      // console.log('waiting!');
    },
    error(e) {
      console.log('error', e);
    }

  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.player-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $color-background;
  overflow: hidden;
  .player-video-wrapper {
    width: 100%;
    height: 100%;
    .player-video {
      outline: none;
      width: 100%;
      height: 100%;
      object-fit: fill;
      &.full-screen {
        object-fit: contain;
      }
    }
    &.full-screen {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &.full-screen {
    position: fixed;
    background-color: $color-background-black;
  }
}

.video-layers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  text-align: center;
  img {
    height: 100%;
    // width: 100%;
  }
}

.video-danmu {
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(169, 193, 196, 0.5);
}

// Control Layer
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2rem;
  z-index: 2;
  // background-color: rgba(255, 181, 181, 0.5);
  background-color: rgba(0, 0, 0,.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-time-box {
  flex: 27;
  background-color: gold;
  p {
    font-size: $font-size-small;
    color: $color-text-white;
    text-align: center;
  }
  .video-time-slash::before {
    content: '/';
  }
}

.video-controls-progressbar {
  flex: 50;
  background-color: lightcyan;
  height: 100%;
}

.video-controls-buttons {
  flex: 23;
  display: flex;
  justify-content: space-around;
  span {
    color: $color-text-white;
  }
  background-color: lavender;
}

// Cover Layer
.video-cover {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  // background-color: rgba(207, 171, 118, 0.5);
  img {
    width: 100%;
    height: 100%;
    filter: blur(0.3rem);
    -webkit-filter: blur(0.3rem);
    // opacity: 0.85;
  }
}

.video-aid-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  p {
    color: $color-text-white;
    font-size: $font-size-small;
    text-align: center;
    line-height: 1rem;
  }
}

.video-timelength {
  position: absolute;
  bottom: 0.8rem;
  left: 0.6rem;
  p {
    color: $color-text-white;
    font-size: $font-size-small-s;
    background-color: $color-background-dg;
    padding: 0.2rem 0.4rem;
  }
}

.video-start-play-btn {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  background-image: url('../../common/img/TV-Play.png');
  background-size: 100% auto;
}

.player-state-button {
  position: absolute;
  left: 0;
  bottom: 0rem;
  width: 100%;
  height: 100%;
  // background-color: coral;
}

.video-resume-btn, .video-pause-btn {
  position: absolute;
  right: 0.5rem;
  bottom: 2.5rem;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  background-size: 100% auto;
  display: none;
}

.video-resume-btn {
  background-image: url('../../common/img/TV-Play.png');
}

.video-pause-btn {
  background-image: url('../../common/img/TV-Pause.png');
}

.video-buffering-state {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2rem;
  height: 2rem;
  transform: translate(-50%, -50%);
  background-color: transparent;
  background-size: 100% auto;
  display: none;
  background-image: url('../../common/img/buff.gif');
}

.active-state {
  display: block;
}

.hide-controls {
  visibility: hidden;
  opacity: 0;
}

</style>
