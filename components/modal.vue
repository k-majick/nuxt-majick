<template>
<div class="modal__mask" :class="{'modal__mask--project': isProject}">
  <div class="modal__wrapper" :class="{'modal__wrapper--project': isProject}">
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

  @Prop() isProject!: boolean;

  close() {
    this.$emit('close');
  }

}
</script>
