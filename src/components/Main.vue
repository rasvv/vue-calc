<template>
  <v-container
    class="calc"
    fluid
  >
    <v-row class="calc__form bordered">
      <v-col cols="4" class="calc__selectnuclids borred">
        Выбор
        <v-row class="calc__types bordered">
          Агрегатное состояние
          <v-radio-group
            v-model="codRAO[0].value"
            row
            class="calc__items"
            @change="codRAO[8].value = '**'"
          >
            <v-radio
              label="Жидкие РАО"
              :value=1
              class="calc__item"
            ></v-radio>
            <v-radio
              label="Твердые РАО"
              :value=2
              class="calc__item"
            ></v-radio>
            <v-radio
              label="Газообразные РАО"
              :value=3
              class="calc__item"
            ></v-radio>
          </v-radio-group>
        </v-row>
        <v-row class="bordered">
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
                Вид илучения
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
                {{ selected.AM > 92? 'да': 'нет' }}
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                ПЗУА, Бк/г
              </v-col>
              <v-col>
                {{ selected.MZUA }}
              </v-col>
            </v-row>

          </v-col>
        </v-row> 

        <v-row width="100%">
          <v-col cols="5">
            <div height="100%">
              <v-text-field
                label="Фильтр"
                hide-details="auto"
                clearable
                v-model="filter"
              ></v-text-field>
              <v-list>
                <v-list-item-group class="calc__nuclids bordered">
                  <v-list-item
                    v-for="(item, i) in filteredNuclids"
                    :key="i"
                    @click="selected = filteredNuclids[i]"
                    @dblclick="addNuclid"
                  >
                    <!-- {{ i + 1 }} -->
                    {{ item.Name_RN }}
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </div>
          </v-col>

          <v-col cols="1" class="buttons">
            <v-btn @click="addNuclid">
              <v-icon class="mx-0 mb-0" >mdi-plus</v-icon>
            </v-btn>
            <v-btn @click="delNuclid">
              <v-icon class="mx-0 mb-0">mdi-minus</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="6">
            <!-- <v-btn 
              :disabled="!enabledBTN"
              @click="showKod = true"
            >
              Расчитать
            </v-btn>             -->
            <v-list>
              <v-list-item-group class="calc__nuclids bordered">
                <v-list-item
                  v-for="(item, i) in selectedNuclids"
                  :key="i"
                  @click="selectedMin = selectedNuclids[i]"
                  @dblclick="delNuclid"
                >
                  <div class="calc__nuclids-card">
                    {{ item.Name_RN }}
                    <v-text-field
                      label="Удельная активность"
                      v-model="item.UdA"
                      @change="isdisb()"
                      :rules="rules"
                      hide-details="auto"
                    ></v-text-field>
                  </div>
                  
                  <!-- {{ item.Name_RN }} -->
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8" class="calc__kod">
        <v-container>
          <v-row class="pagetop">
            <v-col cols="9" class="bordered">
              <v-data-table
                :headers="headers"
                :items="selectedNuclids"
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
                    Переработка
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
                          v-model="codRAO[8].value"
                          :items="filteredTypeRAO"
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import Kod from './Kod.vue'
export default {
  data () {
    return {
      filter: '',
      validNuclids: false,
      showKod: false,
      nuclids: [],
      typeRAO: [],
      selected: {},
      selectedMin: {},
      selectedNuclids: [],
      
      codRAO: [
        {
          elem: "p01",
          value: 2
        },
        {
          elem: "p02",
          value: "*"
        },
        {
          elem: "p03",
          value: "*"
        },
        {
          elem: "p04",
          value: 0
        },
        {
          elem: "p05",
          value: "*"
        },
        {
          elem: "p06",
          value: "*"
        },
        {
          elem: "p07",
          value: 0
        },
        {
          elem: "p08",
          value: 0
        },
        {
          elem: "p09",
          value: "**"
        },
        {
          elem: "p11",
          value: 2
        },
      ],
      kod: true,
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
      selectedTypes: [],
      desc: "",
      rules: [
        value => !!value || 'Required.'
      ],
    }
  },
  // components: {
  //   Kod
  // },
  methods: {
    addNuclid() {
      this.selected.Trans = this.selected.AM > 92? 'да': 'нет' 
      this.selected.Period = `${this.selected.Period_p_r} ${this.selected.Edinica_izmer_p_r}`
      this.selected.UdA = 0
      this.selected.Udamza = this.selected.UdA / +this.selected.MOI
      this.selectedNuclids.push(this.selected)
      this.isdisb()
    },
    delNuclid() {
      this.selectedNuclids.splice(this.selectedNuclids.indexOf(this.selectedMin), 1)
      this.isdisb()
    },
    setSelected() {
      // this.selected = this.nuclids[i]
    },
    isdisb () {
      let per = false
      if (this.selectedNuclids.length === 0) return false
      console.log("isdisb");
      console.log(this.selectedNuclids);
      this.selectedNuclids.forEach(elem => {
        console.log(elem.UdA)
        if (!elem.UdA || elem.UdA <= 0 ) per = true
      })
      per ? this.isdisabled = false : this.isdisabled = true
      this.validNuclids = this.isdisabled
    },
    parseSelected() {
      console.log(this.filteredTypeRAO); 
      this.desc = this.filteredTypeRAO.description
      this.codRAO[8].value = this.filteredTypeRAO.cod
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
      this.selectedNuclids.forEach(elem => {
        console.log("UdA = " + elem.UdA)
        console.log("MOI = " + elem.MOI)
        console.log("Udamza = " + elem.Udamza)
        elem.Udamza = elem.UdA / +elem.MOI
        console.log("Udamza = " + elem.Udamza)
      });
    }

  },
  mounted() {
    this.nuclids = require('@/db/nuclids.json');
    this.typeRAO = require('@/db/typeRAO.json');
  },
  computed: {
    filteredNuclids () {
      return this.nuclids.filter((elem) => {
        if (this.filter === '' || !this.filter) return true
        else return elem.Name_RN.indexOf(this.filter) > -1
      })
    },
    filteredTypeRAO () {
      return this.typeRAO.filter((elem) => {
        if (elem.section === this.codRAO[0].value) return true
        else return elem.section === this.codRAO[0].value
      })
    },
    kodRAO () {
      let cod = ''
      this.codRAO.forEach(elem => {
        cod = cod.toString() + elem.value
      })
      console.log(cod);
      return cod
    },
    trans() {
      return 'AM > 92? "да": "нет"' 
    },
    enabledBTN() {
      return this.validNuclids && this.codRAO[8].value != "**"
    }     
  }
}
</script>

<style lang="sass" scoped>
// link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.css"
html
  box-sizing: border-box
  margin: 0 
  padding: 0 

.calc
  &__form
    min-height: 1020px    
    height: 98vh 

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

  &__nuclids
    width: 100%
    height: calc(98vh - 440px)
    overflow: scroll

    &-card
      border-bottom: 1px solid #ccc
      width: 100%
      padding: 8px
      justify-content: start

  &__selectnuclids
    // max-height: 95vh

.v-btn:not(.v-btn--round).v-size--default
    width: 100%
    min-width: 0
    padding: 0
    margin-bottom: 10px

.bordered
  margin: 0
  width: 100%
  border: 1px solid #aaa

.borred
  height: 97vh

.buttons
  padding: 0
  gap:30px  
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

.left
  // height: 100%
  overflow: scroll
  height: calc(98vh - 440px)
.right
  height: calc(98vh - 440px)
</style>
