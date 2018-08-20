<template>
  <footer class="footer">
    <p class="desc">本项目仅用于coding学习</p>
    <p class="desc">ギリギリ 喵星球备99999号</p>
    <p class="thanks">请前往哔哩哔哩支持正版: m.bilibili.com</p>

  </footer>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.footer {
  padding: 1rem 0;
  display: flex;
  flex-direction:column;
  background-color: $color-background-l;
  p {
    padding: 0.35rem 0;
    text-align: center;
    font-size: $font-size-small;
    color: $color-text-gray;
  }
}
</style>
