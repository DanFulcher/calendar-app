<template>
  <div>
    <p class="title">Hello {{user.name}}!</p>
    <p>Click a day on the calendar to let people know when you're climbing</p>
    <Button text="Log Out" :onClick="this.logout"/>
  </div>
</template>

<script>
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
  },
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.commit('logUserOut');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 21px;
}
</style>
