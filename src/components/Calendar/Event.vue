<template>
  <div class="event" @click="handleClick">
    {{`${event.startTime} ${event.name}`}}
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
    &:hover {
      background: #09574e;
    }
  }
</style>
