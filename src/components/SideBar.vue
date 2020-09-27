<template>
  <div class="sidebar" :class="open && 'open'">
    <div class="sidebar__content">
      <slot />
    </div>
    <div class="menuToggleContainer">
      <div class="toggleButton" @click="toggleSideBar">
        <v-icon name="bars" scale="2" />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue';

export default {
  components: {
    'v-icon': Icon,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleSideBar() {
      this.open = !this.open;
    },
  },
};
</script>

<style lang="scss" scoped>
  .sidebar {
    position:absolute;
    top: 0;
    left: -332px;
    z-index: 1;
    width: 400px;
    height: 100%;
    background: #fff;
    box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.25);
    transition: left .8s;
    overflow: hidden;
    display: flex;
    &.open {
      left:0;
    }
    &__content {
      padding-left: 15px;
      text-align: left;
    }
    .menuToggleContainer {
      padding: 15px 20px;
      .toggleButton {
        cursor: pointer;
      }
    }
  }
</style>
