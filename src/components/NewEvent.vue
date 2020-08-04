<template>
  <div class="modalOverlay">
    <div class="modal">
      <div class="close" @click="$emit('close')">Close</div>
      <div class="modal__header">
        <h2>{{title}}</h2>
      </div>
      <div class="modal__body">
        <Field label="Name" :val="newEvent.name" @valChanged="newEvent.name = $event" />
        <FieldRow>
          <Field
            label="Start Time"
            :val="newEvent.startTime"
            @valChanged="newEvent.startTime = $event" />
          <Field
            label="End Time"
            :val="newEvent.endTime"
            @valChanged="newEvent.endTime = $event" />
        </FieldRow>
      </div>
    </div>
  </div>
</template>

<script>
import Field from './Fields/Field.vue';
import FieldRow from './Fields/FieldRow.vue';

export default {
  data() {
    return {
      newEvent: {
        name: '',
        startTime: '',
        endTime: '',
        allDay: true,
      },

    };
  },
  props: {
    title: String,
  },
  components: {
    Field,
    FieldRow,
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
  }

}
</style>
