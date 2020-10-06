<template>
  <div>
    <div class="events">
      <div v-if="events.length > 0">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="event"
        >
          <h3>{{event.name}}</h3>
          <p>{{event.startTime}} - {{event.endTime}}</p>
        </div>
      </div>
      <div v-else>
        <p class="no-events">No events have been added for this day.</p>
      </div>
    </div>
    <div class="buttonCont">
      <Button text="Add Event" :onClick="this.changeModal" />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {

  components: {
    Button,
  },
  props: {
    events: Array,
  },
  methods: {
    changeModal() {
      this.$emit('addEvent');
    },
  },
};
</script>

<style lang="scss" scoped>
.events {
  margin-bottom: 20px;
  .event {
    border-bottom: 1px solid #eee;
    h3 {
      margin-bottom: 5px;
    }
    p {
      margin: 0 0 10px;
    }
  }
  .no-events {
    font-size: 21px;
    text-align: center;
    font-style: italic;
    color: #b7b7b7;
  }
}
.buttonCont {
  display: flex;
  justify-content: flex-end;
}
</style>
