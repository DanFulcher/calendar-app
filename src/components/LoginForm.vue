<template>
  <div>
    <Field
      label="Email Address"
      placeholder="example@example.com"
      :val="email"
      @valChanged="handleUser($event)"
      :showError="userError"
      errorMessage="Please enter a valid username" />
    <Field
      label="Password"
      :val="password"
      @valChanged="handlePassword($event)"
      :showError="passwordError"
      errorMessage="Please enter your password"
      type="password" />
    <Button text="Log in" :onClick="this.login" />

    <p class="link" @click="handleCreate">New here? Create an account</p>
  </div>
</template>

<script>
import Field from '@/components/Fields/Field.vue';
import Button from '@/components/Button.vue';

export default {
  data() {
    return {
      email: '',
      userError: false,
      password: '',
      passwordError: false,
    };
  },
  components: {
    Field,
    Button,
  },
  methods: {
    handleUser(value) {
      this.email = value;
    },
    handlePassword(value) {
      this.password = value;
    },
    login() {
      if (this.email && this.password) {
        this.$store.dispatch('logUserIn', {
          email: this.email,
          password: this.password,
        });
      } if (!this.email) {
        this.userError = true;
      } if (!this.password) {
        this.passwordError = true;
      }
    },
    handleCreate() {
      this.$store.commit('setSideBar', 'createAccount');
    },
  },
};
</script>

<style lang="scss" scoped>
.link {
  font-weight: bold;
  color: #0e7b6f;
  cursor: pointer;
}
</style>
