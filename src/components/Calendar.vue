<template>
  <div>
    <FullCalendar
        class='calendar'
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
      <NewEvent v-if="modal.show" :title="modal.title" @close="modal.show = false" />
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';

import NewEvent from './NewEvent.vue';

export default {
  data() {
    return {
      modal: {
        show: false,
        title: '',
      },

      eventGuid: 0,
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        initialView: 'dayGridMonth',
        initialEvents: [],
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  components: {
    FullCalendar,
    NewEvent,
  },
  methods: {

    createEventId() {
      this.eventGuid += 1;
      return String(this.eventGuid);
    },

    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },

    handleDateSelect(selectInfo) {
      this.modal.show = !this.modal.show;
      this.modal.title = moment(selectInfo.start).format('ddd Do MMMM YYYY');
      console.log(this.showModal);
      console.log(selectInfo);
      // const title = prompt('Please enter a new title for your event');
      // const calendarApi = selectInfo.view.calendar;

      // calendarApi.unselect(); // clear date selection

      // if (title) {
      //   calendarApi.addEvent({
      //     id: this.createEventId(),
      //     title,
      //     start: selectInfo.startStr,
      //     end: selectInfo.endStr,
      //     allDay: selectInfo.allDay,
      //   });
      // }
    },

    // handleEventClick(clickInfo) {
    //   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //     clickInfo.event.remove();
    //   }
    // },

    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
