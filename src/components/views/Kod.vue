<template>
  <v-container class="bgcolor">
    <v-row class="">
      <v-col cols="12" class="calc__types d-flex align-stretch">
        <v-container class="bordered">
          Код РАО
          <h1 class="my-6">
            {{ kodRAO }}
          </h1>
          <v-list max-height="50vh" dense>
            <v-list-item-group class="bordered" :style="leftPanel">
              <v-list-item
                v-for="(item, i) in codRAO"
                :key="i"
              >
                <v-card width="100%" min-height="50px">
                  <v-row>
                    <v-col cols="4">
                      {{ codRAO[i].description }} 
                    </v-col>
                    <v-col cols="1">
                      <h3>
                        {{ codRAO[i].value }}
                      </h3>
                    </v-col>
                    <v-col cols="7">
                      {{
                        codRAO[i].value === "*" ? codRAO[i].value : activeMenu(i)[0].text
                      }}
                    </v-col>
                  </v-row>
                </v-card>
              </v-list-item>
            </v-list-item-group>
          </v-list>          
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="bordered ma-2 mt-4">
        <h2>Радионуклидный состав</h2>
        <v-row class="nuclidstable">
          <v-data-table
            class="bordered ma-2 mt-4"
            :headers="headers"
            :items="selectedNuclids"
            :hide-default-footer="selectedNuclids.length < 5"
          ></v-data-table>
        </v-row>      
      </v-col>
    </v-row>
    <v-row>      
      <v-col cols="12" class="calc__types d-flex align-stretch">
        <v-container class="bordered">
          <v-btn width="100%" @click="copyToClipboard">
            Скопировать код
          </v-btn>
          <v-btn width="100%" @click="setShowKod">
            Новый расчет
          </v-btn>
        </v-container>
      </v-col>
    </v-row>  
  </v-container>
</template>

<script>
export default {
  props: ["codRAO", "kodRAO", "selectedNuclids"],
  data() {
    return {
      headers: [
        { text: "Радионуклид", value: "Name_RN"},
        { text: "Период полураспада", value: "Period" },
        { text: "Удельная активность", value: "UdA" },
        { text: "Вид излучения", value: "Vid_izluch" },
        { text: "Трансурановый", value: "Trans" },
        { text: "ПЗУА", value: "UdA_TRO" },
        { text: "Период потенциальной опасности", value: "Potential" },
      ],      
    };
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
    copyToClipboard () {
      // try {
        navigator.clipboard.writeText(this.kodRAO)
      // } catch(e) {
      //   throw e
      // }
    },    
  },
  computed: {
    show_Kod() {
      return localStorage.MODAL_NAME === 'show_Kod_Form';
    },
  },  
};
</script>

<style lang='sass'>
  .bgcolor
    background-color: #fff
</style>