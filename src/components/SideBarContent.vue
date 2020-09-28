<template>
  <div>
    <div class="body">
      <p class="title">Hello {{user.name}}!</p>
      <p>Welcome to Dan's awesome Yonder Booking Sync!</p>
      <p>Let others know when you're climbing by adding it to the calendar.</p>
      <p>See when friends are climbing and book the same slot, or see when enemies are climbing and book a different slot. You do you!</p>
      <p class="title">Filter</p>
      <Checkbox label="Just show my climbs" :value="this.$store.state.justMyClimbs" @click="toggle" />
    </div>
    <div class="footer">
      <Button text="Log Out" :onClick="this.logout"/>
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/Fields/Checkbox.vue';
import Button from '@/components/Button.vue';
import * as fb from '../firebase';

export default {
  props: {
    user: {
      type: Object,
    },
  },
  components: {
    Button,
    Checkbox,
  },
  methods: {
    toggle() {
      this.$store.state.justMyClimbs = !this.$store.state.justMyClimbs;
    },
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.commit('logUserOut');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  margin-bottom: 20px;
  .title {
    font-size: 21px;
  }
}
</style>
