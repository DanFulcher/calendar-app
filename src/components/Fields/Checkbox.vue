<template>
  <div>
    <input @change="onClick" :value="value" class="checkbox" type="checkbox" />
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
    },
    label: {
      type: String,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
