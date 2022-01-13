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
                <v-list-item-group class="calc__nuclids left bordered">
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
            <v-list>
              <v-list-item-group class="calc__nuclids right bordered">
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
      <v-col cols="8" class="calc__kod" v-if="kod">
        <!-- Код РАО -->
        <Kod
          :list = "selectedNuclids"
          :kodRAO = "kodRAO"
          :codRAO = "codRAO"
          :opCods = "opCods"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Kod from './Kod.vue'
export default {
  data () {
    return {
      filter: '',
      nuclids: [],
      opCods: [],
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
      rules: [
        value => !!value || 'Required.'
      ],
    }
  },
  components: {
    Kod
  },
  methods: {
    addNuclid() {
      this.selected.Trans = this.selected.AM > 92? 'да': 'нет' 
      this.selected.Period = `${this.selected.Period_p_r} ${this.selected.Edinica_izmer_p_r}`
      this.selected.Udamza = this.selected.UdA_TRO / this.selected.MZA
      this.selectedNuclids.push(this.selected)
    },
    delNuclid() {
      this.selectedNuclids.splice(this.selectedNuclids.indexOf(this.selectedMin), 1)
    },
    setSelected() {
      // this.selected = this.nuclids[i]
    },
  },
  mounted() {
    this.nuclids = require('@/db/nuclids.json');
    this.opCods = require('@/db/opCods.json');
  },
  computed: {
    filteredNuclids () {
      return this.nuclids.filter((elem) => {
        if (this.filter === '' || !this.filter) return true
        else return elem.Name_RN.indexOf(this.filter) > -1
      })
    },
    filteredOpCods () {
      return this.opCods.filter((elem) => {
        if (this.filter === '' || !this.filter) return true
        else return elem.Kod.indexOf(this.filter) > -1
      })
    },
    kodRAO () {
      let cod = ''
      this.codRAO.forEach(elem => {
        cod = cod.toString() + elem.value
      })
      console.log(cod);
      return cod
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
    // height: calc(98vh - 410px)
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
  height: calc(98vh - 390px)
</style>
