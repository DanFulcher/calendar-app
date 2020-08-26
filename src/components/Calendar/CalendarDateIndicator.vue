<template>
  <div class="calendar-date-indicator">
    <h1>{{ selectedMonth }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    selectedDate: {
      type: Object,
      required: true,
    },
  },

  computed: {
    selectedMonth() {
      return this.selectedDate.format('MMMM YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
