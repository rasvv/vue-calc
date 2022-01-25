<template>
  <v-dialog v-model="activator" fullscreen hide-overlay transition="dialog-bottom-transition">
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
