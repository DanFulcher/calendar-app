<template>
  <div class="newEventForm">
    <Field
      label="Name"
      placeholder="eg. John Smith Climbing"
      :val="name"
      @valChanged="updateName($event)"
      :showError="nameError"
      errorMessage="Please name your event" />
    <Field
      label="Date"
      :val="date"
      @valChanged="updateDate($event)"
      :showError="dateError"
      errorMessage="Please select a date"
      type="date" />
    <FieldRow>
      <Time
        label="Start Time"
        :placeholder="startHour"
        @hourChanged="updateStartHour($event)"
        @minChanged="updateStartMin($event)" />
      <Time
        label="End Time"
        :placeholder="endHour"
        @hourChanged="updateEndHour($event)"
        @minChanged="updateEndMin($event)" />
    </FieldRow>
    <p v-if="this.$store.state.formError !== ''" class="error">
      {{ this.$store.state.formError }}
    </p>
    <div class="buttonCont">
      <Button text="Add to calendar" :onClick="this.addToCal" />
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import Field from '../Fields/Field.vue';
import Time from '../Fields/Time.vue';
import FieldRow from '../Fields/FieldRow.vue';
import Button from '../Button.vue';

export default {
  props: {
    date: String,
  },
  data() {
    return {
      nameError: false,
      dateError: false,
    };
  },
  components: {
    Field,
    Time,
    FieldRow,
    Button,
  },
  methods: {
    updateName(name) {
      this.nameError = false;
      this.$store.commit('setNewEventName', name);
    },
    updateDate(newDate) {
      this.dateError = false;
      this.$store.commit('setNewEventDate', newDate);
    },
    updateStartHour(hour) {
      this.$store.commit('setStartHour', hour);
    },
    updateStartMin(min) {
      this.$store.commit('setStartMin', min);
    },
    updateEndHour(hour) {
      this.$store.commit('setEndHour', hour);
    },
    updateEndMin(min) {
      this.$store.commit('setEndMin', min);
    },
    addToCal() {
      if (this.name && this.date) {
        this.$store.commit('addEvent');
        this.$store.commit('getEvents');
        this.$emit('close');
      }
      if (!this.name) {
        this.nameError = true;
      }
      if (!this.date) {
        this.dateError = true;
      }
    },
  },
  computed: mapState({
    name: (state) => state.newEvent.name,
    startHour: (state) => state.newEvent.startTime.hour,
    endHour: (state) => state.newEvent.endTime.hour,
  }),
};
</script>

<style lang="scss" scoped>
.buttonCont {
  display: flex;
  justify-content: flex-end;
}
</style>
