<template>
  <button @click="onClick" :disabled="disabled">
    <span v-if="!loading">{{ text }}</span>
    <Loading v-else />
  </button>
</template>

<script>
import Loading from './Loading.vue';

export default {
  props: {
    text: String,
    onClick: Function,
    loading: Boolean,
    disabled: Boolean,
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss" scoped>
button {
  background: #0e7b6f;
  padding: 20px 40px;
  border: none;
  outline: none;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}
</style>
