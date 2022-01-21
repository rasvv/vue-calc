<template>
  <v-app>
    <v-main>
      <Calculator />
    </v-main>
  </v-app>
</template>

<script>
import Calculator from "./components/Calculator.vue";

export default {
  name: "App",

  components: {
    Calculator,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang="sass" scoped>
html
	max-height: 100vh

@media (min-width: 2800px)
	.container
		max-width: 3700px !important
</style>
