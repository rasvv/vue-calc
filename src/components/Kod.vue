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
          <h2 class="mb-6">
            {{ kodRAO }}
          </h2>

          <v-btn 
            :disabled="!enabledBTN"
            width="100%"
            class="mb-4"            
            @click="calcCodRAO"
          >
            Расчитать
          </v-btn>            


          <v-btn 
            width="100%"
            class="mb-4"
            @click="showKod = true"
          >
            Скопировать код
          </v-btn>          
          <v-btn 
            width="100%"
            class="mb-10"
            @click="setShowKod"
          >
            Новый расчет
          </v-btn>          
          <v-row class="calc__types bordered">
            ОЗРИ?
            <v-radio-group
              v-model="ozri"
              column
              :disabled="codRAO[0].value != 2"
              class="calc__items"
              @change="setOZRI"
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
        <v-row class="calc__types bordered">
          Содержание ядерных материалов
          <v-radio-group
            v-model="codRAO[3].value"
            column
            class="calc__items"
          >
            <v-radio
              label="0 - не содержащие ЯМ"
              :value=0
              class="calc__item"
            ></v-radio>
            <v-radio
              label="1 - содержащие ЯМ"
              :value=1
              class="calc__item"
            ></v-radio>
          </v-radio-group>
        </v-row>

        <v-row class="calc__types bordered">
          Класс РАО
          <v-radio-group
            v-model="codRAO[7].value"
            column
            class="calc__items"
          >
            <v-radio
              label="0 - удаляемые, класс которых не установлен"
              :value=0
              class="calc__item"
            ></v-radio>
            <v-radio
              label="1 - удаляемые 1-го класса"
              :value=1
              class="calc__item"
            ></v-radio>
            <v-radio
              label="2 - удаляемые 2-го класса"
              :value=2
              class="calc__item"
            ></v-radio>
            <v-radio
              label="3 - удаляемые 3-го класса"
              :value=3
              class="calc__item"
            ></v-radio>
            <v-radio
              label="4 - удаляемые 4-го класса"
              :value=4
              class="calc__item"
            ></v-radio>
            <v-radio
              label="5 - удаляемые 5-го класса"
              :value=5
              class="calc__item"
            ></v-radio>
            <v-radio
              label="6 - удаляемые 6-го класса"
              :value=6
              class="calc__item"
            ></v-radio>
            <v-radio
              label="7 - особые РАО"
              :value=7
              class="calc__item"
            ></v-radio>
            <v-radio
              label="9 - прочие РАО"
              :value=9
              class="calc__item"
            ></v-radio>
          </v-radio-group>
        </v-row>
      </v-col>
      <v-col cols="7" class="bordered">
        <v-row>
          <v-col cols="12">
            <v-row class="calc__types bordered">
              Класс РАО
              <v-radio-group
                v-model="codRAO[6].value"
                column
                class="calc__items"
              >
                <v-radio
                  label="0 - не подвергавшиеся переработке способами, перечисленными ниже"
                  :value=0
                  class="calc__item"
                ></v-radio>
                <v-radio
                  label="1 - спрессованные (компактированные)"
                  :value=1
                  class="calc__item"
                ></v-radio>
                <v-radio
                  label="2 - битумированные"
                  :value=2
                  class="calc__item"
                ></v-radio>
                <v-radio
                  label="3 - цементированные"
                  :value=3
                  class="calc__item"
                ></v-radio>
                <v-radio
                  label="4 - остеклованные"
                  :value=4
                  class="calc__item"
                ></v-radio>
                <v-radio
                  label="9 - омоноличенные (отвержденные) другим способом"
                  :value=9
                  class="calc__item"
                ></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-row class="calc__types bordered">
              <v-col cols="12">
                <v-row>
                  Тип РАО
                </v-row>
                <v-row>
                  <v-combobox
                    v-model="selected"
                    :items="typeRAO"
                    item-text="description"
                    item-value="cod"
                    dense
                    clearable
                    @change="parseSelected"
                  >
                  </v-combobox>                
                </v-row>
                <v-row class="mh">
                  {{ desc }}
                </v-row>                
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6">
            <v-row class="calc__types bordered">
              Пожароопасность
              <v-radio-group
                v-model="codRAO[9].value"
                column
                class="calc__items"
              >
                <v-radio
                  label="1 - горючие"
                  :value=1
                  class="calc__item"
                ></v-radio>
                <v-radio
                  label="2 - не горючие"
                  :value=2
                  class="calc__item"
                ></v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>	
  </v-container>
</template>

<script>
export default {
  props: ['list', 'kodRAO', 'codRAO', 'typeRAO', 'showKod', 'validNuclids'],
  data() {
    return {
      ozri: 2,
      headers: [
        { text: 'Радионуклид', value: 'Name_RN' },
        { text: 'Период полураспада', value: 'Period' },
        { text: 'Удельная активность', value: 'UdA' },
        { text: 'Вид', value: 'Vid_izluch' },
        { text: 'Трансурановый', value: 'Trans' },
        { text: 'ПЗУА', value: 'UdA_TRO' },
        { text: 'УдА / ПЗУА', value: 'Udamza' },
      ],		
      selected: [],
      desc: ""
    };
  },
  computed: {
    trans() {
      return 'AM > 92? "да": "нет"' 
    },
    enabledBTN() {
      return this.validNuclids && this.codRAO[8].value != "**"
    }    
  },
  methods: {
    parseSelected() {
      console.log(this.selected); 
      this.desc = this.selected.description
      this.codRAO[8].value = this.selected.cod
      // this.selected
    },
    setOZRI() {
      if (this.ozri === 1) {this.codRAO[1].value = 4}
    },
    setShowKod() {
      this.$emit(this.showKod = false)
      console.log(this.showKod);
    },
    calcCodRAO() {
      this.list.forEach(elem => {
        console.log("UdA = " + elem.UdA)
        console.log("MOI = " + elem.MOI)
        console.log("Udamza = " + elem.Udamza)
        elem.Udamza = elem.UdA / +elem.MOI
        console.log("Udamza = " + elem.Udamza)
      });
    }
  },
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
  height: 55vh

.calc
  &__types
    padding: 5px

  &__item
    display: inline-block

  &__items
    width: 100%
    display: flex
    justify-content: space-around
    display: block
    gap: 30px

.mh
  max-height: 300px
  overflow-y: scroll
</style>