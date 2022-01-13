<template>
	<v-app>
    <v-main>
      <Main/>
    </v-main>
  </v-app>
</template>

<script>
import Main from './components/Main';

export default {
  name: 'App',

  components: {
    Main,
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
