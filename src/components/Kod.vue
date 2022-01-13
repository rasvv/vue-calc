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
          <v-row class="bordered">
            ОЗРИ?
            <v-radio-group
              v-model="ozri"
              column
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
                  label="9 - прочие РАО"
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
                    :items="opCods"
                    item-text="Text"
                    item-value="Cod"
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
  props: ['list', 'kodRAO', 'codRAO', 'opCods'],
  data() {
    return {
      ozri: 2,
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
      selected: [],
      desc: `Операция связана с постановкой на учет:     1)  изделий (например, ЗРИ, ОРИ, ИОУ) при поступлении на склад готовой продукции;     2)  РВ и РАО (кроме ОЗРИ), образовавшихся при осуществлении деятельности.  Код не может быть использован для отражения фактов постановки на учет:     1)  материалов, которые стояли на учете в СГУК ЯМ. Для этого следует использовать операцию с кодом 12;    2)  РАО образовавшихся при обслуживании и эксплуатации пунктов хранения/захоронения РАО в штатном режиме. Для этого следует использовать операцию с кодом 13;    3)  РАО образовавшихся из РВ, не подлежащих учету в СГУК РВ и РАО. Для этого следует использовать операцию с кодом 14;    4)  РВ образовавшихся при переработке РАО в виде ОЗРИ. Для этого следует использовать операцию с кодом 15;    5)  РАО в виде отработавших ЗРИ и других учетных единиц, стоявших на учете как РВ в СГУК РВ и РАО. Для этого следует использовать операцию с кодом 41;    6)  РАО, образовавшихся из других учетных единиц, стоявших на учете в СГУК РВ и РАО,  после приведения в соответствие критериям приемлемости РАО для захоронения,  переработки, постановки на учет при операциях упаковки/переупаковки или сортировки. Для этого следует использовать операции с кодами 55, 56, 57, 59;    7)  РВ изготовленных (образовавшихся) из других стоявших на учете объектов. Для этого следует использовать операцию с кодом 58;    8)  ОРИ, образовавшихся в результате перевода в эту категорию ЗРИ. Для этого следует использовать операцию с кодом 65.`	
    };
  },
  computed: {
    trans() {
      return 'AM > 92? "да": "нет"' 
    }
  },
  methods: {
    parseSelected() {
      console.log(this.selected); 
      this.desc = this.selected.Description
      this.codRAO[8].value = this.selected.Cod
      // this.selected
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
  overflow: scroll
</style>