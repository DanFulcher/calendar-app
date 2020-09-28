<template>
  <div>
    <div class="calendar-month">
      <div class="calendar-month-header">
        <CalendarDateIndicator
          :selected-date="selectedDate"
          class="calendar-month-header-selected-month"
        />
        <h1>Yonder Booking Sync</h1>
        <CalendarDateSelector
          :current-date="today"
          :selected-date="selectedDate"
          @dateSelected="selectDate"
        />
      </div>

      <CalendarWeekdays />

      <ol class="days-grid">
        <CalendarMonthDayItem
          v-for="day in days"
          :key="day.date"
          :day="day"
          :is-today="day.date === today"
          @select="handleDateClick(day.date)"
        />
      </ol>
      <AddButton @onClick="handleDateClick(today)" />
    </div>
    <NewEvent
      v-if="modal.show"
      :date="modal.date"
      @close="modal.show = false"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import NewEvent from '../NewEvent.vue';
import CalendarDateIndicator from './CalendarDateIndicator.vue';
import CalendarDateSelector from './CalendarDateSelector.vue';
import CalendarWeekdays from './CalendarWeekdays.vue';
import CalendarMonthDayItem from './CalendarMonthDayItem.vue';
import AddButton from './AddButton.vue';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

export default {
  data() {
    return {
      selectedDate: dayjs(),
      modal: {
        show: false,
        date: '',
      },
    };
  },
  components: {
    CalendarDateIndicator,
    CalendarDateSelector,
    CalendarWeekdays,
    CalendarMonthDayItem,
    NewEvent,
    AddButton,
  },
  selectDate(newSelectedDate) {
    this.selectedDate = newSelectedDate;
  },
  methods: {
    getWeekday(date) {
      return dayjs(date).weekday();
    },
    selectDate(newSelectedDate) {
      this.selectedDate = newSelectedDate;
    },
    handleDateClick(day) {
      this.$store.commit('setNewEventDate', day);
      this.modal.show = true;
      this.modal.date = day;
    },
  },
  computed: {
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ];
    },

    today() {
      return dayjs().format('YYYY-MM-DD');
    },

    month() {
      return Number(this.selectedDate.format('M'));
    },

    year() {
      return Number(this.selectedDate.format('YYYY'));
    },
    numberOfDaysInMonth() {
      return dayjs(this.selectedDate).daysInMonth();
    },
    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        const formatDay = dayjs(`${this.year}-${this.month}-${index + 1}`).format('YYYY-MM-DD');
        const allEvents = this.$store.state.events;
        const dayEvents = [];
        allEvents.map((event) => {
          if (event.date === formatDay) {
            dayEvents.push(event);
            return true;
          }
          return false;
        });
        const compare = (a, b) => {
          if (a.startTime < b.startTime) {
            return -1;
          }
          if (a.startTime > b.startTime) {
            return 1;
          }
          return 0;
        };

        dayEvents.sort(compare);
        return ({
          date: formatDay,
          isCurrentMonth: true,
          events: dayEvents,
        });
      });
    },
    previousMonthDays() {
      const firstDayOfTheMonthWeekday = this.getWeekday(
        this.currentMonthDays[0].date,
      );
      const previousMonth = dayjs(`${this.year}-${this.month}-01`).subtract(
        1,
        'month',
      );

      const previousMonthLastMondayDayOfMonth = dayjs(
        this.currentMonthDays[0].date,
      )
        .subtract(firstDayOfTheMonthWeekday - 1, 'day')
        .date();

      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          const formatDay = dayjs(
            `${previousMonth.year()}-${previousMonth.month()
                + 1}-${previousMonthLastMondayDayOfMonth + index}`,
          ).format('YYYY-MM-DD');
          const allEvents = this.$store.state.events;
          const dayEvents = [];
          allEvents.map((event) => {
            if (event.date === formatDay) {
              dayEvents.push(event);
              return true;
            }
            return false;
          });
          return ({
            date: formatDay,
            isCurrentMonth: false,
            events: dayEvents,
          });
        },
      );
    },
    nextMonthDays() {
      const lastDayOfTheMonthWeekday = this.getWeekday(
        `${this.year}-${this.month}-${this.currentMonthDays.length}`,
      );

      const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(1, 'month');

      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        const formatDay = dayjs(`${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`).format('YYYY-MM-DD');
        const allEvents = this.$store.state.events;
        const dayEvents = [];
        allEvents.map((event) => {
          if (event.date === formatDay) {
            dayEvents.push(event);
            return true;
          }
          return false;
        });
        return ({
          date: formatDay,
          isCurrentMonth: false,
          events: dayEvents,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .calendar-month-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0 20px;
  }
  .calendar-month {
    position: relative;
    border: solid 1px #ddd;
  }

  .day-of-week {
    color: var(--grey-800);
    font-size: 18px;
    background-color: #fff;
  }

  .day-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    list-style: none;
    padding-left: 0;
    background: #fff;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    list-style: none;
    padding-left: 0;
    background: #eee;
  }

  .day-of-week > * {
    text-align: center;
    padding-right: 5px;
  }

  .days-grid {
    height: 100%;
    position: relative;
    grid-column-gap: 1px;
    grid-row-gap: 1px;
    border-top: solid 1px #eee;
  }
</style>
