<template>
  <div class="calendar-date-selector">
    <span @click="selectPrevious" class="arrow">﹤</span>
    <span @click="selectCurrent" class="calendar-date-current">
      <h3>Today</h3>
    </span>
    <span @click="selectNext" class="arrow">﹥</span>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'CalendarDateSelector',

  props: {
    currentDate: {
      type: String,
      required: true,
    },

    selectedDate: {
      type: Object,
      required: true,
    },
  },

  methods: {
    selectPrevious() {
      const newSelectedDate = dayjs(this.selectedDate).subtract(1, 'month');
      this.$emit('dateSelected', newSelectedDate);
    },

    selectCurrent() {
      const newSelectedDate = dayjs(this.currentDate);
      this.$emit('dateSelected', newSelectedDate);
    },

    selectNext() {
      const newSelectedDate = dayjs(this.selectedDate).add(1, 'month');
      this.$emit('dateSelected', newSelectedDate);
    },
  },
};
</script>

<style lang="scss" scoped>
  .calendar-date-selector {
    display: flex;
    align-items: center;
    .arrow {
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      cursor: pointer;
      &:hover {
        background: #0e7b6f;
        color: #fff;
      }
    }
    .calendar-date-current {
      margin: 0 15px;
      cursor: pointer;
    }
  }
</style>
