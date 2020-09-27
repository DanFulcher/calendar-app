<template>
  <div class="home">
    <SideBar>
      <div v-if="!isLoggedIn">
        <LoginForm v-if="sideBarType === 'login'" />
        <CreateAccount v-if="sideBarType === 'createAccount'" />
      </div>
      <div v-else>
        <SideBarContent :user="user">
        </SideBarContent>
      </div>
    </SideBar>
    <div class="calContainer">
      <Calendar />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Calendar from '@/components/Calendar/index.vue';
import SideBar from '@/components/SideBar.vue';

import LoginForm from '@/components/LoginForm.vue';
import CreateAccount from '@/components/CreateAccount.vue';
import SideBarContent from '@/components/SideBarContent.vue';

export default {
  name: 'Home',
  created() {
    this.$store.commit('isUserLoggedIn');
    this.$store.commit('getEvents');
  },
  methods: {
    login() {
      this.$store.commit('logUserIn');
    },
  },
  computed: mapState({
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    sideBarType: (state) => state.sideBarType,
  }),
  components: {
    Calendar,
    SideBar,
    LoginForm,
    CreateAccount,
    SideBarContent,
  },
};
</script>

<style lang="scss" scoped>
  .home {
    padding-left: 68px;
    .calContainer {
      width: 100%;
    }
  }
</style>
