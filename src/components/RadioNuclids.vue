<template>
  <v-container>
    <v-col>
      <v-row>
        <v-col>
          Период полураспада
        </v-col>
        <v-col>
          {{ selected.Period_p_r }} {{ selected.Edinica_izmer_p_r }} 
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Вид излучения
        </v-col>
        <v-col>
          {{ selected.Vid_izluch }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Трансурановые (Да/Нет)
        </v-col>
        <v-col>
          <!-- {{ selected.Trans }} -->
          <!-- {{ selected.Num_TM > 92? 'да': 'нет' }} -->
          {{ trans }}
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          ПЗУА, Бк/г
        </v-col>
        <v-col>
          {{ codRAO[0].value === 1 ? selected.UdA_GRO : selected.UdA_TRO }}
        </v-col>
      </v-row>

    </v-col>
  </v-container>
</template>

<script>
export default {
  props: ['codRAO', 'selected', 'trans'],
  data() {
    return {

    }
  }
}
</script>
<style lang="sass">

</style>
