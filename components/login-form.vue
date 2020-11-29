<template>
<form class="form form--login" ref="form" @submit.prevent="sendLoginForm" novalidate>
  <div class="form__group">
    <input class="form__input" type="email" name="email" v-model="email">
    <label class="form__label">E-mail</label>
  </div>
  <div class="form__group">
    <input class="form__input" type="password" name="password" v-model="password">
    <label class="form__label">Password</label>
  </div>
  <div class="form__group form__group--alert">
    <span class="form__alert" v-if="alert" v-html="alert"></span>
  </div>
  <div class="form__group form__group--submit">
    <button class="form__btn" type="submit" ref="submitBtn">Send it!</button>
  </div>
</form>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';
import axios from "axios";

@Component
export default class LoginForm extends Vue {
  private alert = '';
  private email = '';
  private password = '';

  mounted() {
    console.dir(this.$store.state);
  }

  async sendLoginForm() {
    (this.$refs.submitBtn as HTMLButtonElement).disabled = true;

    const fd = new FormData();

    fd.append('email', this.email);
    fd.append('password', this.password);

    try {
      let res = await axios.post('/server/users/login', fd);
      console.dir(res);
      let token = res.data.token;
      let userData = res.data.userData;

      if (token) {
        this.$store.dispatch('_auth/loginUser', {
          userData,
          token
        });
      } else {
        this.alert = 'Token missing';
      }
    } catch (err) {
      let error = err.response;

      if (error.status == 409) {
        this.alert = error.data.message;
      } else {
        this.alert = err;
      }
    }

    console.dir(this.$store);
  }

  resetLoginForm() {
    this.$v.$reset();
    (this.$refs.submitBtn as HTMLButtonElement).disabled = false;
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/components/_form";
@import "../assets/scss/components/_modal";
</style>
