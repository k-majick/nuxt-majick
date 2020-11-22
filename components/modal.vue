<template>
<div class="modal__mask" :class="`modal__mask--${modalType}`">
  <div class="modal__wrapper">
    <div class="modal">
      <div class="modal__container">
        <button class="modal__close" type="button" @click="$emit('close')">&times;</button>
        <slot name="header"></slot>
        <slot name="content"></slot>
        <slot name="action"></slot>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue
} from 'nuxt-property-decorator';

@Component({})
export default class Modal extends Vue {

  name = 'Modal';

  @Prop() modalType!: string;

}
</script>
