<template>
  <fieldset :class="wrap ? 'd-flex; justify-column' : ''">
    <legend>
      {{ codRAO[idx].description }}
    </legend>
    <v-radio-group
      v-model="codRAO[idx].value"
      :row="row"
      :column="!row"
      class="calc__items py-0 my-n2"
      :class="wrap ? 'ml-5' : ''"
      @change="changeValue"
    >
      <v-radio
        v-for="(item, i) in codRAO[idx].radios"
        :key="i"
        :disabled="!disabled(item, enabled)"
        :label="item.id + ' - ' + item.text"
        :value="item.id"
        class="calc__item"
      ></v-radio>
    </v-radio-group>
  </fieldset>
</template>

<script>
export default {
  props: ["codRAO", "idx", "row", "wrap", "changeValue", "enabled"],
  data() {
    return {};
  },
  methods: {
    disabled(elem, enable) {
      return elem.enabled.includes(enable);
    },
  },
};
</script>
<style lang="sass"></style>
