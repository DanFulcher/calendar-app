<template>
  <div class="home">
    <Calendar />
    <h1 v-if="userloggedIn">Test</h1>
    <Button text="Add to calendar" :onClick="this.login" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Calendar from '@/components/Calendar/index.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Home',
  data() {
    return {
      userloggedIn: false,
    };
  },
  created() {
    this.$store.commit('isUserLoggedIn');
  },
  methods: {
    login() {
      this.$store.commit('logUserIn');
    },
  },
  computed: {
    ...mapState({
      isLoggedIn: (state) => state.isLoggedIn,
    }),
  },
  watch: {
    isLoggedIn(newVal) {
      this.userloggedIn = newVal;
    },
  },
  components: {
    Calendar,
    Button,
  },
};
</script>
