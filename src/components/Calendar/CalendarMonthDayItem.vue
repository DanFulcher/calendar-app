<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday
    }"
    @click="$emit('select')"
  >
    <div class="calendar-day__header">
      <span>{{ label }}</span>
    </div>
    <div class="calendar-day__body">
      <Event
        v-for="event in events"
        :event="event"
        :key="event.id"
      />
    </div>
  </li>
</template>
<script>
import dayjs from 'dayjs';
import Event from './Event.vue';

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
  components: {
    Event,
  },
  computed: {
    events() {
      const filtered = this.$store.state.justMyClimbs;
      const filteredEvents = [];
      if (this.day.events) {
        this.day.events.map((event) => {
          if (filtered && event.created_by === this.$store.state.user.id) {
            filteredEvents.push(event);
          } if (!filtered) {
            filteredEvents.push(event);
          }
          return true;
        });
      }

      return filteredEvents;
    },
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
    &__header {
      display: flex;
      justify-content: flex-end;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
      }
    }
  }

  .calendar-day--not-current {
    background-color: #fff8f0;
  }

  .calendar-day--today {
    padding-top: 4px;
  }

  .calendar-day--today > .calendar-day__header > span {
    color: #fff;
    border-radius: 50%;
    background-color: #f27154;
    margin-bottom: 10px;
  }
</style>
