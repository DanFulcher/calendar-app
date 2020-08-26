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
          @select="handleDateClick(day)"
        />
      </ol>
    </div>
    <NewEvent
      v-if="modal.show"
      :title="modal.title"
      :info="modal.selctInfo"
      @close="modal.show = false"
      :selectInfo="this.modal.selectInfo"
    />
  </div>
</template>

<script>
// import moment from 'moment';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import NewEvent from '../NewEvent.vue';
import CalendarDateIndicator from './CalendarDateIndicator.vue';
import CalendarDateSelector from './CalendarDateSelector.vue';
import CalendarWeekdays from './CalendarWeekdays.vue';
import CalendarMonthDayItem from './CalendarMonthDayItem.vue';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(advancedFormat);

export default {
  data() {
    return {
      selectedDate: dayjs(),
      modal: {
        show: false,
        title: '',
        selectInfo: {},
      },
    };
  },
  components: {
    CalendarDateIndicator,
    CalendarDateSelector,
    CalendarWeekdays,
    CalendarMonthDayItem,
    NewEvent,
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
      this.modal.title = dayjs(day.date).format('Do of MMMM YYYY');
      this.modal.show = true;
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
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => ({
        date: dayjs(`${this.year}-${this.month}-${index + 1}`).format('YYYY-MM-DD'),
        isCurrentMonth: true,
      }));
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

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => ({
          date: dayjs(
            `${previousMonth.year()}-${previousMonth.month()
                + 1}-${previousMonthLastMondayDayOfMonth + index}`,
          ).format('YYYY-MM-DD'),
          isCurrentMonth: false,
        }),
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

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => ({
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
        ).format('YYYY-MM-DD'),
        isCurrentMonth: false,
      }));
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