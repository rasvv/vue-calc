<template>
  <v-dialog
    v-model="activator"
    hide-overlay
    overflowed
    scrollable="false"
    transition="dialog-bottom-transition"
  >
    <slot name="content" />
  </v-dialog>
</template>

<script>
export default {
  props: {
    activator: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
