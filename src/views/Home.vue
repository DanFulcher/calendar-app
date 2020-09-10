<template>
  <div class="home">
    <div class="menuToggleContainer">
      <SideBar :open="sidebarOpen" @close="toggleSideBar">
        <LoginForm v-if="!isLoggedIn && sideBarType === 'login'" />
        <CreateAccount v-if="!isLoggedIn && sideBarType === 'createAccount'" />
        <h1 v-if="isLoggedIn">Logged In Stuff</h1>
      </SideBar>
      <div class="toggleButton" @click="toggleSideBar">
        <v-icon name="bars" scale="2" />
      </div>
    </div>
    <div class="calContainer">
      <Calendar />
      {{sideBarType}}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Calendar from '@/components/Calendar/index.vue';
import SideBar from '@/components/SideBar.vue';
import Icon from 'vue-awesome/components/Icon.vue';
import LoginForm from '@/components/LoginForm.vue';
import CreateAccount from '@/components/CreateAccount.vue';
import 'vue-awesome/icons/bars';

export default {
  name: 'Home',
  data() {
    return {
      sidebarOpen: false,
      sideBar: undefined,
    };
  },
  created() {
    this.$store.dispatch('isUserLoggedIn');
  },
  methods: {
    login() {
      this.$store.commit('logUserIn');
    },
    toggleSideBar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
  },
  computed: mapState({
    isLoggedIn: (state) => state.isLoggedIn,
    sideBarType: (state) => state.sideBarType,
  }),
  components: {
    Calendar,
    SideBar,
    'v-icon': Icon,
    LoginForm,
    CreateAccount,
  },
};
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    .menuToggleContainer {
      padding: 15px;
      display: flex;
      .toggleButton {
        cursor: pointer;
      }
    }
    .calContainer {
      width: 100%;
    }
  }
</style>
