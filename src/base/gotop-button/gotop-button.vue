<template>
  <button @click.stop="goTop" class="button-wrapper">
    <span class="icon">
      <i class="icon-arrow-up" />
    </span>
  </button>
</template>

<script>
export default {
  methods: {
    goTop() {
      this.$emit('goTop');
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'common/scss/const.scss';

.button-wrapper {
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid $color-background;
  background-color: $color-background;
  .icon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: $color-theme;
    font-weight: lighter;
  }
}

</style>
