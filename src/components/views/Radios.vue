<template>
  <v-container>
    {{ codRAO[idx].description }}
    <v-radio-group
      v-model="codRAO[idx].value"
      :row="row"
      :column="!row"
      class="calc__items"
      @change="changeValue"
    >
      <v-radio
        v-for="(item, i) in codRAO[idx].radios"
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
  props: ["codRAO", "idx", "row"],
  data() {
    return {};
  },
  methods: {
    changeValue() {
      if (this.idx === 0) this.codRAO[8].value = "**";
    },
  },
};
</script>
<style lang="sass">
</style>
