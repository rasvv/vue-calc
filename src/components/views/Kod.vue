<template>
  <v-card class="pa-4 overflow-y-auto">
    <v-row class="posparent">
      <v-col cols="12" class="calc__types d-flex align-stretch">
        <v-container class="bordered">
          <v-row>
            <v-col cols="4" class="d-flex flex-column align-center">
              Код РАО
              <h1 class="h1color">
                {{ kodRAO }}
              </h1>
            </v-col>
            <v-col cols="4" class="d-flex justify-center align-center">
              <v-btn width="60%" @click="copyToClipboard">
                Скопировать код
              </v-btn>
            </v-col>
            <v-col cols="4" class="d-flex justify-end align-top">
              <!-- <v-btn width="60%" @click="closeDialog"> Новый расчет </v-btn> -->

              <v-btn
                fab
                light
                small
                color="light-blue lighten-5"
                @click="closeDialog"
              >
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="posparent">
            <v-col cols="12" class="calc__types d-flex align-stretch">
              <v-container class="bordered">
                <h2 class="d-flex justify-center">Расшифровка кода</h2>
                <v-list dense class="bordered">
                  <v-list-item-group>
                    <v-list-item-title flat>
                      <v-row>
                        <v-col cols="3" class="pl-7"><h4>№ символа</h4></v-col>
                        <v-col cols="2"><h4>Идентификатор</h4></v-col>
                        <v-col cols="7"><h4>Значение</h4></v-col>
                      </v-row>
                    </v-list-item-title>
                    <v-list-item v-for="(item, i) in codRAO" :key="i" flat tile>
                      <v-card width="100%">
                        <v-row>
                          <v-col cols="4" class="pa-4">
                            {{ codRAO[i].description }}
                          </v-col>
                          <v-col cols="1" class="pa-4">
                            <h3 class="h1color">
                              {{ codRAO[i].value }}
                            </h3>
                          </v-col>
                          <v-col cols="7" class="pa-4">
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
        </v-container>
      </v-col>
    </v-row>
    <v-row v-if="isNine" class="posparent">
      <v-col class="calc__types d-flex align-stretch">
        <h3 class="h3color" disabled="isNine">
          * В Коде РАО имеется значение = 9. Необходим комментарий к ячейке
        </h3>
      </v-col>
    </v-row>
    <v-row class="posparent">
      <v-col cols="12" class="calc__types d-flex align-stretch">
        <v-container class="bordered">
          <h2 class="d-flex justify-center">Радионуклидный состав</h2>
          <v-row class="nuclidstable">
            <v-data-table
              class="bordered ma-2 mt-4"
              :headers="headers"
              :items="selectedNuclids"
              hide-default-footer="true"
            ></v-data-table>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row class="posparent">
      <v-col cols="12" class="calc__types d-flex align-stretch">
        <v-container class="bordered">
          <h2 class="d-flex justify-center">Сумма активностей</h2>
          <sum-nuclids class="bordered" />
        </v-container>
      </v-col>
    </v-row>
    <!-- <v-row>
      <v-col cols="12" class="calc__types d-flex align-stretch">
        <v-container class="d-flex justify-center">
          <v-btn width="40%" @click="closeDialog"> Новый расчет </v-btn>
        </v-container>
      </v-col>
    </v-row> -->
  </v-card>
</template>

<script>
import SumNuclids from "./SumNuclids.vue";
export default {
  components: { SumNuclids },
  props: ["codRAO", "kodRAO", "selectedNuclids"],
  data() {
    return {
      headers: [
        { title: "Радионуклид", key: "Name_RN" },
        { title: "Период полураспада", key: "Period" },
        { title: "Удельная активность", key: "UdAUnit" },
        { title: "Вид излучения", key: "Vid_izluch" },
        { title: "Трансурановый", key: "Trans" },
        {
          title: "ПЗУА",
          key: "PZUA",
        },
        { title: "МУА", key: "MOI" },
        { title: "Период потенциальной опасности", key: "Potential" },
      ],
      codheaders: [
        { title: "№ символа", key: "description" },
        { title: "Идентификатор", key: "value" },
        { title: "Значение", key: "activeMenu(item-key)[0].text" },
      ],
    };
  },
  methods: {
    activeMenu(idx) {
      if (idx === 8) {
        return this.codRAO[8].radios;
      } else
        return this.codRAO[idx].radios.filter((elem) => {
          return elem.id === this.codRAO[idx].value;
        });
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.kodRAO);
    },
    closeDialog() {
      this.$emit("close-dialog");
    },
  },
  computed: {
    isNine() {
      let itNine = false;
      this.codRAO.filter((elem, i) => {
        if (i != 8) {
          if (elem.value === 9) itNine = true;
        } else {
          if (elem.value.toString().length > 1)
            if (elem.value.toString().substring(1, 2) === "9") itNine = true;
        }
      });
      return itNine;
    },
  },
};
</script>

<style lang="sass">
.h1color
	color: darkblue !important

.h3color
	color: red !important

.v-btn:before
	right: 0
</style>
