<template>
  <button type="button" class="btn" :disabled="loadingStatus">
    <span class="spinner-border spinner-border-sm" aria-hidden="true"
    v-if="loadingStatus"></span>
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    loadingStatus: Boolean,
  },
};
</script>
