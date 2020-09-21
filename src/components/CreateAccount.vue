<template>
  <div>
    <Field
      label="Name"
      placeholder="John Smith"
      :val="name"
      @valChanged="handleName($event)"
      :showError="nameError !== ''" />
    <Field
      label="Email Address"
      placeholder="example@example.com"
      :val="email"
      @valChanged="handleUser($event)"
      :showError="userError !== ''" />
    <Field
      label="Password"
      :val="password"
      @valChanged="handlePassword($event)"
      :showError="passwordError !== ''"
      type="password" />
    <Button text="Create Account" :onClick="this.createAccount" />

    <p class="link" @click="handleLogin">Or click here to log in</p>
  </div>
</template>

<script>
import Field from '@/components/Fields/Field.vue';
import Button from '@/components/Button.vue';
import * as fb from '../firebase';

export default {
  data() {
    return {
      name: '',
      nameError: '',
      email: '',
      userError: '',
      password: '',
      passwordError: '',
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
      if (this.name && this.email && this.password) {
        fb.auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(
            () => {
              const user = fb.auth.currentUser;
              user.updateProfile({
                displayName: this.name,
              }).then(
                this.$store.dispatch('logUserIn', {
                  name: this.name,
                  email: this.email,
                }),
              ).catch(
                (err) => this.nameError === err.code,
              );
            },
          ).catch(
            (err) => {
              if (err.code === 'auth/email-already-in-use') {
                this.userError = 'Too late! This email address is already in use!';
              } if (err.code === 'auth/weak-password') {
                this.passwordError = 'This password is as weak as Taylors climbs.';
              }
            },
          );
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
