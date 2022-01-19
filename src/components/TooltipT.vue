<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        {{ codRAO[idx].value }}
      </span>
    </template>
    <span>{{ codRAO[idx].description }}</span> <br /><br />
    <div>
      {{
        codRAO[idx].value === "*" ? codRAO[idx].value : activeMenu(idx)[0].text
      }}
    </div>
  </v-tooltip>
</template>

<script>
export default {
  props: ["codRAO", "idx"],
  data() {
    return {};
  },
  methods: {
    activeMenu(idx) {
      if (idx === 8) {
        console.log(this.codRAO[8].radios);
        return this.codRAO[8].radios;
      } else
        return this.codRAO[idx].radios.filter((elem) => {
          return elem.id === this.codRAO[idx].value;
        });
    },
  },
};
</script>