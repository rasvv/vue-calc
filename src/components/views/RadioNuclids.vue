<template>
  <v-container>
    <v-row class="lineheight">
      <v-col cols="8" class="lineheight"> Радионуклид </v-col>
      <v-col cols="4" class="lineheight">
        {{ selected.Name_RN_Lat }}
      </v-col>
    </v-row>
    <v-row class="lineheight">
      <v-col cols="8" class="lineheight"> Период полураспада </v-col>
      <v-col cols="4" class="lineheight">
        {{ selected.Period_p_r }} {{ selected.Edinica_izmer_p_r }}
      </v-col>
    </v-row>
    <v-row class="lineheight">
      <v-col cols="8" class="lineheight"> Вид излучения </v-col>
      <v-col cols="4" class="lineheight">
        {{ selected.Vid_izluch }}
      </v-col>
    </v-row>
    <v-row class="lineheight">
      <v-col cols="8" class="lineheight"> Трансурановые (Да/Нет) </v-col>
      <v-col cols="4" class="lineheight">
        <!-- {{ selected.Trans }} -->
        <!-- {{ selected.Num_TM > 92? 'да': 'нет' }} -->
        {{ trans }}
      </v-col>
    </v-row>
    <v-row class="lineheight">
      <v-col cols="8" class="lineheight"> ПЗУА, Бк/г </v-col>
      <v-col cols="4" class="lineheight">
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
.lineheight
	padding: 2px 8px
</style>
