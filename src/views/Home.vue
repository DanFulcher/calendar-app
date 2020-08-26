<template>
  <div class="home">
    <Calendar />
  </div>
</template>

<script>
import Calendar from '@/components/Calendar/index.vue';

export default {
  name: 'Home',
  components: {
    Calendar,
  },
};
</script>
