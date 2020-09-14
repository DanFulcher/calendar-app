<template>
  <div>
    <Field
      label="Email Address"
      placeholder="example@example.com"
      :val="email"
      @valChanged="handleUser($event)"
      :showError="userError !== ''"
      :errorMessage="userError" />
    <Field
      label="Password"
      :val="password"
      @valChanged="handlePassword($event)"
      :showError="passwordError !== ''"
      :errorMessage="passwordError"
      type="password" />
    <Button text="Log in" :onClick="this.login" />

    <p class="link" @click="handleCreate">New here? Create an account</p>
  </div>
</template>

<script>
import Field from '@/components/Fields/Field.vue';
import Button from '@/components/Button.vue';
import * as fb from '../firebase';

export default {
  data() {
    return {
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
    handleUser(value) {
      this.email = value;
      this.userError = '';
    },
    handlePassword(value) {
      this.password = value;
      this.passwordError = '';
    },
    login() {
      if (this.email && this.password) {
        fb.auth.signInWithEmailAndPassword(this.email, this.password)
          .then(
            () => {
              const name = fb.auth.currentUser.displayName;
              this.$store.dispatch('logUserIn', {
                name,
                email: this.email,
              });
            },
          ).catch(
            (err) => {
              if (err.code === 'auth/invalid-email') {
                this.userError = "That's not an email address! You silly goose.";
              } if (err.code === 'auth/user-not-found') {
                this.userError = "I don't know you!";
              } if (err.code === 'auth/wrong-password') {
                this.passwordError = 'Wrong password, you idiot!';
              }
            },
          );
      } if (!this.email) {
        this.userError = 'Please enter your email address';
      } if (!this.password) {
        this.passwordError = 'Please enter your password';
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
