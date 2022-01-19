<template>
  <v-container>
    {{ codRAO[0].desc }}
    <v-radio-group
      v-model="codRAO[0].value"
      row
      class="calc__items"
      @change="codRAO[8].value = '**'"
    >
      <v-radio
        v-for="(item, i) in codRAO[0].radios"
        :key="i"
        :label="item.text"
        :value="item.id"
        class="calc__item"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>

<script>
export default {
  props: ['codRAO'],
  data() {
    return {

    }
  }
}
</script>
<style lang="sass">

</style>
