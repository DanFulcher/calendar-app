<template>
  <div>
    <Field
      label="Name"
      placeholder="John Smith"
      :val="name"
      @valChanged="handleName($event)"
      :showError="nameError"
      errorMessage="Please enter your name" />
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
    <Button text="Create Account" :onClick="this.createAccount" />

    <p class="link" @click="handleLogin">Or click here to log in</p>
  </div>
</template>

<script>
import Field from '@/components/Fields/Field.vue';
import Button from '@/components/Button.vue';

export default {
  data() {
    return {
      name: '',
      nameError: false,
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
    handleName(value) {
      this.name = value;
    },
    handleUser(value) {
      this.email = value;
    },
    handlePassword(value) {
      this.password = value;
    },
    createAccount() {
      if (this.email && this.password) {
        this.$store.dispatch('createAccount', {
          name: this.name,
          email: this.email,
          password: this.password,
        });
      } if (!this.name) {
        this.nameError = true;
      } if (!this.email) {
        this.userError = true;
      } if (!this.password) {
        this.passwordError = true;
      }
    },
    handleLogin() {
      this.$store.commit('setSideBar', 'login');
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
