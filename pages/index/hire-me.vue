<template>
<section class="main__section" v-if="page.content">
  <div class="main__content" v-html="page.content.rendered"></div>
  <div class="main__content">
    <form class="form" @submit.prevent="processForm" ref="form" v-on:change="processForm" novalidate>
      <div class="form__group" :class="{'form__group--error': $v.name.$dirty && $v.name.$error}">
        <span class="form__alert">{{ validationMessage('name') }}</span>
        <input class="form__input" type="text" name="name" v-model="$v.name.$model" @blur="$v.name.$touch()">
        <label class="form__label">Name</label>
      </div>
      <div class="form__group" :class="{'form__group--error': $v.email.$dirty && $v.email.$error}">
        <span class="form__alert">{{ validationMessage('email') }}</span>
        <input class="form__input" type="email" name="email" v-model.trim="$v.email.$model" @blur="$v.email.$touch()">
        <label class="form__label">E-mail</label>
      </div>
      <div class="form__group form__group--textarea" :class="{'form__group--error': $v.message.$dirty && $v.message.$error}">
        <span class="form__alert">{{ validationMessage('message') }}</span>
        <textarea class="form__input" name="message" rows="5" v-model="$v.message.$model" @blur="$v.message.$touch()"></textarea>
        <label class="form__label">Message</label>
      </div>
      <div class="form__group">
        <span class="form__alert" v-if=""></span>
      </div>
      <div class="form__group form__group--submit">
        <button class="form__btn" type="submit" ref="submitBtn">Send it!</button>
      </div>
    </form>
    <transition name="modal">
      <Modal v-show="openModal(1)" @close="toggleModal(1); resetForm()">
        <h3 slot="header" class="modal__title" v-html="page.acf.thanks_title"></h3>
        <div slot="content" class="modal__content">
          <p v-html="page.acf.thanks_message"></p>
        </div>
      </Modal>
    </transition>
  </div>
</section>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'nuxt-property-decorator';
import Modal from "@/components/modal.vue";
import GetPageMxn from "@/mixins/getPageMxn";
import ToggleModalMxn from "@/mixins/toggleModalMxn";
import Post from "@/types/Post";
import {
  validationMixin
} from 'vuelidate';
import {
  alpha,
  email,
  minLength,
  maxLength,
  required,
  helpers
} from 'vuelidate/lib/validators';
import axios from "axios";

const alphaDiacritic = helpers.regex('alphaDiacritic', /^[a-zA-ZÀ-ž\s]*$/);

@Component({
  mixins: [GetPageMxn, ToggleModalMxn, validationMixin],
  validations: {
    name: {
      required,
      alphaDiacritic,
      minLength: minLength(3),
      maxLength: maxLength(50)
    },
    email: {
      required,
      email
    },
    message: {
      required,
      minLength: minLength(10)
    }
  }
})
export default class HireMe extends Vue {
  public page: Post = [];
  private recaptchaSiteKey = process.env.recaptchaSiteKey;
  private name = '';
  private email = '';
  private message = '';
  public activeModal = 0;
  private validationMessages: {
    [key: string]: any
  } = {
    name: {
      required: "Please enter your name",
      alphaDiacritic: "Your name may contain letters only",
      minLength: "Your name may contain at least 3 letters",
      maxLength: "Your name may contain no more then 50 letters"
    },
    email: {
      required: "Please enter your e-mail address",
      email: "Please enter a valid e-mail address",
      maxLength: "Your e-mail address may contain no more then 50 letters"
    },
    message: {
      required: "Please enter your message",
      minLength: "Your e-mail message may contain no less then 10 letters",
      maxLength: "Your e-mail message may contain no more then 500 letters"
    }
  }

  // mounted() {
  //   this.toggleModal(1, false);
  // }

  processForm() {
    for (let key in this.validationMessages) {
      this.$v[key].$touch();
      this.validationMessage(key);
    }

    if (this.$v.$invalid == false)
      this.sendForm();

    return;
  }

  validationMessage(fieldName: string) {
    for (let key in this.validationMessages[fieldName]) {
      if (this.$v[fieldName].$dirty && this.$v[fieldName][key] as unknown == false)
        return this.validationMessages[fieldName][key];
    }
  }

  sendForm() {
    (this.$refs.submitBtn as HTMLButtonElement).disabled = true;

    const fd = new FormData();

    fd.append('name', this.$v.name.$model);
    fd.append('email', this.$v.email.$model);
    fd.append('message', this.$v.message.$model);

    axios.post('/server/email/send-email', fd).then(res => {
      this.toggleModal(1, false);
    });
  }

  resetForm() {
    for (let key in this.validationMessages) {
      this.$v[key].$model = '';
    }
    this.$v.$reset();
    (this.$refs.submitBtn as HTMLButtonElement).disabled = false;
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/components/_form";
@import "../../assets/scss/components/_modal";
</style>
