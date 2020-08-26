<template>
  <div class="calendar-date-indicator">
    <h2>{{ selectedMonth }}</h2>
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
