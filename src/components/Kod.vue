<template>
  <v-container>
    <v-row class="pagetop">
      <v-col cols="9" class="bordered">
        <v-data-table
          :headers="headers"
          :items="list"
        ></v-data-table>
      </v-col>
      <v-col cols="3" class="bordered">
        <div>
          Код РАО
          <div>
            {{ kodRAO }}
          </div>
          <v-row class="bordered">
            ОЗРИ?
            <v-radio-group
              v-model="p02"
              row
              class="calc__items"
            >
              <v-radio label="Да" :value=1 class="calc__item"></v-radio>
              <v-radio label="Нет" :value=2 class="calc__item"></v-radio>
            </v-radio-group>
          </v-row>	
        </div>
      </v-col>
    </v-row>
    <v-row class="pagebottom">
      <v-col cols="5" class="bordered">
        ЯМ / Класс РАО
      </v-col>
      <v-col cols="7" class="bordered">
        Переработка / Тип РАО / Пожароопасность
      </v-col>
    </v-row>	
  </v-container>
</template>

<script>
export default {
  props: ['list', 'kodRAO'],
  data() {
    return {
      headers: [
        // { text: '№', align: 'start', sortable: false, value: 'ID',},
        { text: 'Радионуклид', value: 'Name_RN' },
        { text: 'Период полураспада', value: 'Period' },
        { text: 'Удельная активность', value: 'UdA_TRO' },
        { text: 'Вид', value: 'Vid_izluch' },
        { text: 'Трансурановый', value: 'Trans' },
        { text: 'ПЗУА', value: 'MZA' },
        { text: 'УдА / ПЗУА', value: 'Udamza' },
      ],			
    };
  },
  computed: {
    trans() {
      return 'AM > 92? "да": "нет"' 
    }
  }
}
</script>

<style lang="sass" scoped>
.bordered
  margin: 0
  width: 100%
  border: 1px solid #aaa
.pagetop
  height: 40vh
.pagebottom
  height: 57vh
</style>