import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import { auth } from 'firebase';

import generateID from '../helpers/generateID';

Vue.use(Vuex);
const initNewEvent = {
  name: '',
  startTime: {
    hour: '09',
    min: '00',
  },
  endTime: {
    hour: '11',
    min: '00',
  },
};
export default new Vuex.Store({
  state: {
    sideBarType: 'login',
    isLoggedIn: false,
    newEvent: initNewEvent,
    events: [
      {
        name: 'Today event',
        date: '2020-08-27',
        startTime: '09:00',
        endTime: '11:00',
      },
      {
        name: 'Dan Event',
        date: '2020-08-27',
        startTime: '10:00',
        endTime: '11:00',
      },
      {
        name: 'Today event 2',
        date: '2020-08-27',
        startTime: '08:00',
        endTime: '11:00',
      },
      {
        name: 'Test Event',
        date: '2020-08-08',
        startTime: '10:00',
        endTime: '12:00',
      },
      {
        name: 'Dan Test',
        date: '2020-08-15',
        startTime: '13:00',
        endTime: '15:00',
      },
      {
        name: 'Test Test',
        date: '2020-08-30',
        startTime: '13:00',
        endTime: '15:00',
      },
    ],
  },
  mutations: {
    setNewEventName(state, name) {
      state.newEvent.name = name;
    },
    setStartHour(state, hour) {
      state.newEvent.startTime.hour = hour;
      const updatedEndTime = parseFloat(hour) + 2;
      state.newEvent.endTime.hour = updatedEndTime.toString();
    },
    setStartMin(state, min) {
      state.newEvent.startTime.min = min;
    },
    setEndHour(state, hour) {
      state.newEvent.endTime.hour = hour;
    },
    setEndMin(state, min) {
      state.newEvent.endTime.min = min;
    },
    addEvent(state, date) {
      const newEvent = {
        name: state.newEvent.name,
        id: generateID(),
        date,
        startTime: `${state.newEvent.startTime.hour}:${state.newEvent.startTime.min}`,
        endTime: `${state.newEvent.endTime.hour}:${state.newEvent.endTime.min}`,
      };
      axios.post('https://yonder-booking-sync.firebaseio.com/events', {
        newEvent,
      }).then((response) => {
        console.log(response);
      })
        .catch((error) => {
          console.log(error);
        });
      state.events.push(newEvent);
    },
    setSideBar(state, type) {
      state.sideBarType = type;
    },
  },
  actions: {
    isUserLoggedIn(state) {
      if (auth.currentUser) {
        state.isLoggedIn = true;
        console.log('user is logged in');
      } else {
        state.isLoggedIn = false;
        console.log('user is not logged in');
      }
    },
    createAccount({ state }, data) {
      console.log(data.name);
      console.log(data.email);
      console.log(data.password);
      state.isLoggedIn = true;
    },
    logUserIn({ state }, data) {
      console.log(data.email);
      console.log(data.password);
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
  modules: {
  },
});
