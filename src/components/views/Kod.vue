<template>
  <v-card class="pa-4">
    <v-row>
      <v-col cols="12" class="calc__types d-flex align-stretch">
        <v-container class="bordered">
          <v-row>
            <v-col cols="6" class="d-flex flex-column align-center">
              Код РАО
              <h1 class="h1color">
                {{ kodRAO }}
              </h1>
            </v-col>
            <v-col cols="6" class="d-flex justify-center align-center">
              <v-btn width="60%" @click="copyToClipboard">
                Скопировать код
              </v-btn>
            </v-col>
          </v-row>
          <v-list max-height="50vh" dense>
            <v-list-item-group class="bordered py-3">
              <v-list-item-title flat>
                <v-row>
                  <v-col cols="4" class="pl-7">№ символа</v-col>
                  <v-col cols="2">Идентификатор</v-col>
                  <v-col cols="6">Значение</v-col>
                </v-row>
              </v-list-item-title>
              <v-list-item v-for="(item, i) in codRAO" :key="i" flat tile>
                <v-card width="100%">
                  <v-row>
                    <v-col cols="4" class="pa-5">
                      {{ codRAO[i].description }}
                    </v-col>
                    <v-col cols="2" class="pa-5">
                      <h3>
                        {{ codRAO[i].value }}
                      </h3>
                    </v-col>
                    <v-col cols="6" class="pa-5">
                      {{
                        codRAO[i].value === "*"
                          ? codRAO[i].value
                          : activeMenu(i)[0].text
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
      <v-col cols="12" class="mt-2">
        <v-container class="bordered">
          <h2>Радионуклидный состав</h2>
          <v-row class="nuclidstable">
            <v-data-table
              class="bordered ma-2 mt-4"
              :headers="headers"
              :items="selectedNuclids"
              :hide-default-footer="selectedNuclids.length < 5"
            ></v-data-table>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="calc__types d-flex align-stretch">
        <v-container class="d-flex justify-center">
          <v-btn width="40%" @click="closeDialog"> Новый расчет </v-btn>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: ["codRAO", "kodRAO", "selectedNuclids"],
  data() {
    return {
      headers: [
        { text: "Радионуклид", value: "Name_RN" },
        { text: "Период полураспада", value: "Period" },
        { text: "Удельная активность", value: "UdAUnit" },
        { text: "Вид излучения", value: "Vid_izluch" },
        { text: "Трансурановый", value: "Trans" },
        { text: "ПЗУА", value: "UdA_TRO" },
        { text: "Период потенциальной опасности", value: "Potential" },
      ],
      codheaders: [
        { text: "№ символа", value: "description" },
        { text: "Идентификатор", value: "value" },
        { text: "Значение", value: "activeMenu(item-key)[0].text" },
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
    copyToClipboard() {
      // try {
      navigator.clipboard.writeText(this.kodRAO);
      // } catch(e) {
      //   throw e
      // }
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
  computed: {
    show_Kod() {
      return localStorage.MODAL_NAME === "show_Kod_Form";
    },
  },
};
</script>

<style lang='sass'>
.bordered
	margin: 0
	width: 100%
	border: 1px solid lightblue

.h1color
	color: darkblue !important
</style>