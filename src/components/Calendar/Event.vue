<template>
  <div
    class="event"
    @click="handleClick"
    @mouseenter="showDetails =  true"
    @mouseleave="showDetails = false"
  >
    {{`${event.startTime} ${event.name}`}}
    <div class="event__details" v-if="showDetails">
      <p class="name">{{event.name}}</p>
      <p class="times">{{`${event.startTime} - ${event.endTime}`}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDetails: false,
    };
  },
  methods: {
    handleClick() {
      // alert('Event Clicked');
    },
  },
};
</script>

<style lang="scss" scoped>
  .event {
    background: #0e7b6f;
    color: #fff;
    border-radius: 5px;
    font-size: 12px;
    text-align: left;
    padding: 5px;
    margin-bottom: 5px;
    position:relative;
    &__details {
      position: absolute;
      bottom:100%;
      left: 0;
      z-index: 2;
      width: 100%;
      padding: 10px;
      background: #fff;
      box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.25);
      border-radius: 3px;
      color: #4a4a4a;
      .times {
        font-size: 21px;
        font-weight: bold;
        margin: 0;
      }
      .name {
        font-size: 18px;
        margin: 0;
      }
    }
    &:hover {
      background: #09574e;
    }
  }
</style>
