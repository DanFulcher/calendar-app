<template>
  <div class="home">
    <SideBar :open="sidebarOpen" @close="toggleSideBar">
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
// import Icon from 'vue-awesome/components/Icon.vue';
import LoginForm from '@/components/LoginForm.vue';
import CreateAccount from '@/components/CreateAccount.vue';
import SideBarContent from '@/components/SideBarContent.vue';
import 'vue-awesome/icons/bars';

export default {
  name: 'Home',
  data() {
    return {
      // sidebarOpen: false,
    };
  },
  created() {
    this.$store.commit('isUserLoggedIn');
  },
  methods: {
    login() {
      this.$store.commit('logUserIn');
    },
    // toggleSideBar() {
    //   this.sidebarOpen = !this.sidebarOpen;
    // },
  },
  computed: mapState({
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    sideBarType: (state) => state.sideBarType,
  }),
  components: {
    Calendar,
    SideBar,
    // 'v-icon': Icon,
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
