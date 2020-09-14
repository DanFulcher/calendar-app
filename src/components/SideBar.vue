<template>
  <div class="sidebar" :class="open && 'open'">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .sidebar {
    width: 0;
    height: 100%;
    padding: 40px 0;
    background: #fff;
    transition: width .8s, padding .8s;
    overflow: hidden;
    &.open {
      width: 350px;
      padding: 40px 0 40px 15px;
    }
    &__header {
      display: flex;
      &__button {
        cursor: pointer;
      }
    }
  }
</style>
