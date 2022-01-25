<template>
  <v-container>
    <v-row>
      <v-col cols="8"> Радионуклид </v-col>
      <v-col cols="4">
        {{ selected.Name_RN_Lat }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8"> Период полураспада </v-col>
      <v-col cols="4">
        {{ selected.Period_p_r }} {{ selected.Edinica_izmer_p_r }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8"> Вид излучения </v-col>
      <v-col cols="4">
        {{ selected.Vid_izluch }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8"> Трансурановые (Да/Нет) </v-col>
      <v-col cols="4">
        <!-- {{ selected.Trans }} -->
        <!-- {{ selected.Num_TM > 92? 'да': 'нет' }} -->
        {{ trans }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8"> ПЗУА, Бк/г </v-col>
      <v-col cols="4">
        {{ codRAO[0].value === 1 ? selected.UdA_GRO : selected.UdA_TRO }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["codRAO", "selected", "trans"],
  data() {
    return {};
  },
};
</script>
<style lang="sass">
</style>
