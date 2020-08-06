import Vue from 'vue';
import Vuex from 'vuex';

import generateID from '../helpers/generateID';
import formatTime from '../helpers/formatTime';

Vue.use(Vuex);
const initNewEvent = {
  name: '',
  startTime: {
    hour: '',
    min: '00',
    ampm: 'am',
  },
  endTime: {
    hour: '',
    min: '00',
    ampm: 'am',
  },
};
export default new Vuex.Store({
  state: {
    newEvent: initNewEvent,
  },
  mutations: {
    setNewEventName(state, name) {
      state.newEvent.name = name;
    },
    setStartHour(state, hour) {
      state.newEvent.startTime.hour = hour;
    },
    setStartMin(state, min) {
      state.newEvent.startTime.min = min;
    },
    setStartAMPM(state, ampm) {
      state.newEvent.startTime.ampm = ampm;
    },
    setEndHour(state, hour) {
      state.newEvent.endTime.hour = hour;
    },
    setEndMin(state, min) {
      state.newEvent.endTime.min = min;
    },
    setEndAMPM(state, ampm) {
      state.newEvent.endTime.ampm = ampm;
    },
    addEvent(state, selectInfo) {
      if (state.newEvent.startTime.hour !== '') {
        const startObj = state.newEvent.startTime;
        const start = `${selectInfo.startStr}T${formatTime(startObj)}:${startObj.min}`;

        const endObj = state.newEvent.endTime;
        const end = `${selectInfo.startStr}T${formatTime(endObj)}:${endObj.min}`;

        selectInfo.view.calendar.addEvent({
          id: generateID(),
          title: state.newEvent.name,
          start,
          end,
          allDay: false,
        });
      } else {
        selectInfo.view.calendar.addEvent({
          id: generateID(),
          title: state.newEvent.name,
          allDay: true,
        });
      }
    },
  },
  actions: {
  },
  modules: {
  },
});
