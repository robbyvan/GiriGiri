<template>
  <header class="header">
    <!-- logo -->
    <a tag="a" class="logo" @click="navigateToHome">
      GiriGiri
    </a>
    <!-- controls -->
    <div class="controls">
      <!-- 放大镜 -->
      <router-link to="/search" class="search" tag="a">
        <i class="icon-search" />
      </router-link>
      <!-- 用户头像 -->
      <router-link to="/user" class="avatar" tag="a">
        <svg data-name="\u56FE\u5C42 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <title>default avatar</title>
          <path fill="#e7e7e7" d="M0 0h80v80H0z"></path>
          <path d="M45.78 57.73h2.29a73.4 73.4 0 0 1 4.23 9.5 57.14 57.14 0 0 1 2.62 10.5 50.58 50.58 0 0 1-29.86 0 57.14 57.14 0 0 1 2.62-10.5 73.4 73.4 0 0 1 4.23-9.5h2.29l2.67 7.21 2.41-7.21h1.42l2.41 7.21zM31.72 18.51l4.87 4.87a1.8 1.8 0 0 1 0 2.55 1.8 1.8 0 0 1-2.55 0l-4.87-4.87a1.8 1.8 0 0 1 0-2.55 1.8 1.8 0 0 1 2.55 0zM48.57 18.51a1.8 1.8 0 0 1 2.55 0 1.8 1.8 0 0 1 0 2.55l-4.87 4.87a1.8 1.8 0 0 1-2.55 0 1.8 1.8 0 0 1 0-2.55z" fill="#ccc"></path>
          <path data-name="Combined-Shape" d="M24.2 24.22h31.6a7.2 7.2 0 0 1 7.2 7.2v20.12a7.2 7.2 0 0 1-7.2 7.2H24.2a7.2 7.2 0 0 1-7.2-7.2V31.42a7.2 7.2 0 0 1 7.2-7.2zm1 4a4.24 4.24 0 0 0-4.2 4.29v17.94a4.24 4.24 0 0 0 4.21 4.27h29.5A4.24 4.24 0 0 0 59 50.45V32.51a4.24 4.24 0 0 0-4.21-4.27z" fill="#ccc"></path>
          <path data-name="Combined-Shape" d="M25.88 29.84h28.24a3.22 3.22 0 0 1 3.22 3.21v16.86a3.22 3.22 0 0 1-3.22 3.21H25.88a3.22 3.22 0 0 1-3.22-3.21V33.05a3.22 3.22 0 0 1 3.22-3.21zm0 .8a2.42 2.42 0 0 0-2.42 2.41v16.86a2.42 2.42 0 0 0 2.42 2.41h28.24a2.42 2.42 0 0 0 2.42-2.41V33.05a2.42 2.42 0 0 0-2.42-2.41z" fill="#ccc"></path>
          <path data-name="Combined-Shape" d="M26.73 40.1l7-3.1a1.81 1.81 0 1 1 1.48 3.3l-7 3.1a1.81 1.81 0 1 1-1.48-3.3zM53.27 40.1a1.81 1.81 0 1 1-1.48 3.3l-7-3.1a1.81 1.81 0 1 1 1.48-3.3zM37.58 47.9c-1 0-1.9-.7-2.7-2a.8.8 0 0 1 .26-1.11.81.81 0 0 1 1.11.26c.54.86 1 1.23 1.33 1.23s.79-.37 1.33-1.23a.81.81 0 0 1 1.37 0c.54.86 1 1.23 1.33 1.23s.79-.37 1.33-1.23a.81.81 0 0 1 1.11-.26.8.8 0 0 1 .26 1.11c-.8 1.28-1.69 2-2.7 2a2.71 2.71 0 0 1-2-1.06 2.71 2.71 0 0 1-2.03 1.06z" fill="#ccc"></path>
        </svg>
      </router-link>
      <!-- 下载按钮 -->
      <button class="download">下载App</button>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations({
      setMainTabRid: 'SET_MAIN_TAB_RID',
      setSubTabRid: 'SET_SUB_TAB_RID',
    }),
    navigateToHome() {
      this.setMainTabRid(0);
      this.setSubTabRid(0);
      this.$router.push('/home/0');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  padding: 0 0.35rem;
  // height: 2rem;
  background-color: $color-background;
  // background-color: gold;
  .logo {
    flex: 0 0 4.2rem;
    display: block;
    // text-align: center;
    // margin-left: 0.77rem;
    width: 4.2rem;
    // background-color: pink;
    font-family: "Comic Sans MS", sans-serif;
    font-size: $font-size-large-x;
    font-weight: lighter;
    color: $color-theme;
  }
  .controls {
    flex: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .search {
      display: flex;
      justify-content:center;
      align-items: center;
      margin-right: 1rem;
      font-size: $font-size-large;
      font-weight: lighter;
      color: $color-text-gray;
    }
    .avatar {
      position: relative;
      width: 1rem;
      height: 1rem;
      overflow: hidden;
      margin-right: 0.5rem;
      border-radius: 50%;
      border: 1px solid $color-background;
      svg {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .download {
      padding: 0rem 0.6rem;
      height: 1.2rem;
      border-radius: 0.3rem;
      font-size: $font-size-small;
      background-color: $color-theme;
      color: $color-text-white;
    }
  }
}
</style>
