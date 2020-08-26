<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }"
    @click="$emit('select')"
  >
    <span>{{ label }}</span>
  </li>
</template>
<script>
import dayjs from 'dayjs';

export default {
  name: 'CalendarMonthDayItem',

  props: {
    day: {
      type: Object,
      required: true,
    },

    isCurrentMonth: {
      type: Boolean,
      default: false,
    },

    isToday: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    label() {
      return dayjs(this.day.date).format('D');
    },
  },
};
</script>
<style lang="scss" scoped>
  .calendar-day {
    position: relative;
    min-height: 120px;
    font-size: 16px;
    background-color: #fff;
    color: #4a4a4a;
    padding: 5px;
    cursor: pointer;
  }

  .calendar-day > span {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    width: 35px;
    height: 35px;
  }

  .calendar-day--not-current {
    background-color: #fff8f0;
  }

  .calendar-day--today {
    padding-top: 4px;
  }

  .calendar-day--today > span {
    color: #fff;
    border-radius: 50%;
    background-color: #f27154;
  }
</style>
