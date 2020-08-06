<template>
  <div class="modalOverlay">
    <div class="modal">
      <div class="close" @click="$emit('close')">Close</div>
      <div class="modal__header">
        <h2>{{title }}</h2>
      </div>
      <div class="modal__body">
        <Field
          label="Name"
          placeholder="Climbing at Yonder"
          :val="this.$store.state.newEvent.name"
          @valChanged="updateName($event)"
          :showError="nameError"
          errorMessage="Please name your event" />
        <FieldRow>
          <Time
            label="Start Time"
            placeholder="9"
            @hourChanged="updateStartHour($event)"
            @minChanged="updateStartMin($event)"
            @ampmChanged="updateStartAMPM($event)" />
          <Time
            label="End Time"
            placeholder="11"
            @hourChanged="updateEndHour($event)"
            @minChanged="updateEndMin($event)"
            @ampmChanged="updateEndAMPM($event)" />
        </FieldRow>
        <div class="buttonCont">
          <Button text="Add to calendar" :onClick="this.addToCal" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Field from './Fields/Field.vue';
import Time from './Fields/Time.vue';
import FieldRow from './Fields/FieldRow.vue';
import Button from './Button.vue';

export default {
  props: {
    title: String,
    info: Object,
    selectInfo: Object,
  },
  data() {
    return {
      nameError: false,
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
      this.$store.commit('setNewEventName', name);
    },
    updateStartHour(hour) {
      this.$store.commit('setStartHour', hour);
    },
    updateStartMin(min) {
      this.$store.commit('setStartMin', min);
    },
    updateStartAMPM(ampm) {
      this.$store.commit('setStartAMPM', ampm);
    },
    updateEndHour(hour) {
      this.$store.commit('setEndHour', hour);
    },
    updateEndMin(min) {
      this.$store.commit('setEndMin', min);
    },
    updateEndAMPM(ampm) {
      this.$store.commit('setEndAMPM', ampm);
    },
    addToCal() {
      if (this.$store.state.newEvent.name) {
        this.$store.commit('addEvent', this.selectInfo);
        this.$emit('close');
      }
      this.nameError = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
  .modal {
    background: #fff;
    border-radius: 15px;
    width: 500px;
    max-width: 100%;
    padding: 20px 40px;
    text-align:left;
    .close {
      text-align: right;
      cursor: pointer;
    }
    &__header {
      border-bottom: 1px solid #f1f1f1;
      margin-bottom: 20px;
    }
    &__body {
      .buttonCont {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

}
</style>
