import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '../firebase';

import generateID from '../helpers/generateID';

Vue.use(Vuex);
const initNewEvent = {
  name: '',
  date: '',
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
    user: {},
    newEvent: initNewEvent,
    events: [],
    formError: '',
    justMyClimbs: false,
  },
  mutations: {
    setNewEventName(state, name) {
      state.newEvent.name = name;
    },
    setNewEventDate(state, date) {
      state.newEvent.date = date;
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
    addEvent(state) {
      const newEvent = {
        name: state.newEvent.name,
        id: generateID(),
        date: state.newEvent.date,
        startTime: `${state.newEvent.startTime.hour}:${state.newEvent.startTime.min}`,
        endTime: `${state.newEvent.endTime.hour}:${state.newEvent.endTime.min}`,
        created_by: fb.auth.currentUser.uid,
      };
      fb.eventsCollection.doc(newEvent.id).set({
        newEvent,
      })
        .then(() => {
          state.newEvent = initNewEvent;
        })
        .catch((error) => {
          state.formError = error;
        });
    },
    setSideBar(state, type) {
      state.sideBarType = type;
    },
    isUserLoggedIn(state) {
      if (fb.auth.currentUser) {
        const user = fb.auth.currentUser;
        state.isLoggedIn = true;
        state.user = {
          name: user.displayName,
          email: user.email,
          id: user.uid,
        };
      } else {
        state.isLoggedIn = false;
      }
    },
    logUserOut(state) {
      state.isLoggedIn = false;
      state.user = {};
    },
    async getEvents(state) {
      state.events = [];
      const snapshot = await fb.eventsCollection.get();
      snapshot.docs.map((doc) => state.events.push(doc.data().newEvent));
    },
  },
  actions: {
    logUserIn({ state }, data) {
      state.isLoggedIn = true;
      state.user = {
        name: data.name,
        email: data.email,
      };
    },
  },
  modules: {
  },
});
