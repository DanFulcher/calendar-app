<template>
  <div class="add-button" @click="handleClick">
    <v-icon name="plus" scale="2" color="#0e7b6f" />
  </div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue';
import 'vue-awesome/icons/plus';

export default {
  components: {
    'v-icon': Icon,
  },
  methods: {
    handleClick() {
      this.$emit('onClick');
    },
  },
};
</script>

<style lang="scss" scoped>
.add-button {
  position: fixed;
  right: 15px;
  bottom: 15px;
  padding: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.25);
  cursor: pointer;
  transition: all .8s;
  &:hover {
    box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.25);
  }
}
</style>
