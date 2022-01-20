<template>
  <v-container class="calc" fluid>
    <v-row class="calc__form bordered">
      <v-col cols="4" class="calc__selectnuclids borred">
        <v-row class="calc__types bordered mb-4">
          <Radios :codRAO="codRAO" :idx="0" :row="true" />
        </v-row>

        <v-row width="100%">
          <v-col cols="5">
            <div>
              <v-radio-group v-model="favoriteNuclids" row class="calc__items">
                <v-radio label="Все" :value="0" class="calc__item"></v-radio>
                <v-radio
                  label="Часто используемые"
                  :value="1"
                  class="calc__item"
                ></v-radio>
              </v-radio-group>
              <v-text-field
                label="Фильтр"
                hide-details="auto"
                clearable
                v-model="filter"
              ></v-text-field>
              <v-list max-height="50vh" dense>
                <v-list-item-group class="left bordered">
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
              <v-icon class="mx-0 mb-0">mdi-plus</v-icon>
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
            <v-radio-group v-model="favoriteNuclids" column class="calc__items">
              <v-radio
                label="Удельная активность"
                :value="0"
                class="calc__item"
              ></v-radio>
              <v-radio
                label="Суммарная активность + %"
                :value="1"
                class="calc__item"
              ></v-radio>
              <v-radio
                label="Активность + масса"
                :value="2"
                class="calc__item"
              ></v-radio>
            </v-radio-group>
            <v-text-field
              label="Фильтр"
              hide-details="auto"
              clearable
              v-model="filter"
            ></v-text-field>

            <v-list class="calc__nuclids">
              <v-list-item-group class="right bordered">
                <v-list-item
                  v-for="(item, i) in selectedNuclids"
                  :key="i"
                  @click="selectedMin = selectedNuclids[i]"
                  @dblclick="delNuclid"
                >
                  <div class="calc__nuclids-card">
                    {{ item.Name_RN }}
                    <v-text-field
                      label="Удельная активность (кБк/кг)"
                      v-model="item.UdA"
                      type="number"
                      @change="
                        isdisb();
                        calcCodRAO();
                      "
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

        <v-row class="bordered">
          <RadioNuclids
            :codRAO="codRAO"
            :selected="selected"
            :trans="isTrans(selected.Num_TM)"
          />
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
                  <Tooltip
                    v-for="i in 11"
                    :key="i"
                    :codRAO="codRAO"
                    :idx="i - 1"
                  />
                </h2>

                <v-btn
                  :disabled="!enabledBTN"
                  width="100%"
                  class="mb-4"
                  @click="calcCodRAO"
                >
                  Расчитать
                </v-btn>

                <!-- <v-btn 
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
                </v-btn>           -->
                <v-row class="calc__types bordered">
                  ОЗРИ?
                  <v-radio-group
                    v-model="ozri"
                    column
                    :disabled="codRAO[0].value != 2"
                    class="calc__items"
                    @change="setOZRI"
                  >
                    <v-radio label="Да" :value="1" class="calc__item"></v-radio>
                    <v-radio
                      label="Нет"
                      :value="2"
                      class="calc__item"
                    ></v-radio>
                  </v-radio-group>
                </v-row>
              </div>
            </v-col>
          </v-row>
          <v-row class="pagebottom">
            <v-col cols="6" class="bordered">
              <v-row class="calc__types bordered">
                <Radios :codRAO="codRAO" :idx="3" />
              </v-row>
              <v-row class="calc__types bordered">
                <Radios :codRAO="codRAO" :idx="6" />
              </v-row>
            </v-col>
            <v-col cols="6" class="bordered">
              <v-row>
                <v-col cols="12">
                  <v-row class="calc__types bordered">
                    <Radios :codRAO="codRAO" :idx="7" />
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-row class="calc__types bordered">
                    <v-col cols="12">
                      <v-row> 9-10. Тип РАО </v-row>
                      <v-row>
                        <v-combobox
                          v-model="selectedTypes"
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
                    <Radios :codRAO="codRAO" :idx="9" />
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
// import Radio1 from './radios/Radio01.vue'
import Radios from "./radios/Radios.vue";
import RadioNuclids from "./RadioNuclids.vue";
import Tooltip from "./TooltipT.vue";
export default {
  data() {
    return {
      filter: "",
      validNuclids: false,
      showKod: false,
      nuclids: [],
      favoriteNuclids: 1,
      showUda: 1,
      typeRAO: [],
      selected: {},
      selectedMin: {},
      selectedNuclids: [],
      // longlife: false,
      codRAO: [],
      kod: true,
      ozri: 2,
      headers: [
        { text: "Радионуклид", value: "Name_RN" },
        { text: "Период полураспада", value: "Period" },
        { text: "Удельная активность", value: "UdA" },
        { text: "Вид", value: "Vid_izluch" },
        { text: "Трансурановый", value: "Trans" },
        { text: "ПЗУА", value: "UdA_TRO" },
        { text: "Период ПО", value: "Potential" },
      ],
      selectedTypes: [],
      desc: "",
      rules: [(value) => !!value || "Required."],
    };
  },
  components: {
    // Radio1,
    Radios,
    RadioNuclids,
    Tooltip,
  },
  methods: {
    addNuclid() {
      this.selected.Trans = this.isTrans(this.selected.Num_TM);
      this.selected.Period = `${this.selected.Period_p_r} ${this.selected.Edinica_izmer_p_r}`;
      this.selected.UdA = 0;
      this.selected.Sostav = this.checkSostav(this.selected);
      this.selected.Udamza = this.selected.UdA / +this.selected.MOI;
      this.selected.Potential = 0;
      this.selectedNuclids.push(this.selected);
      this.isdisb();
    },
    delNuclid() {
      this.selectedNuclids.splice(
        this.selectedNuclids.indexOf(this.selectedMin),
        1
      );
      this.isdisb();
    },
    setSelected() {
      // this.selected = this.nuclids[i]
    },
    isdisb() {
      let per = false;
      if (this.selectedNuclids.length === 0) return false;
      console.log("isdisb");
      console.log(this.selectedNuclids);
      this.selectedNuclids.forEach((elem) => {
        console.log(elem.UdA);
        if (!elem.UdA || elem.UdA <= 0) per = true;
      });
      per ? (this.isdisabled = false) : (this.isdisabled = true);
      this.validNuclids = this.isdisabled;
    },
    parseSelected() {
      console.log(this.selectedTypes);
      this.desc = this.selectedTypes.description;
      this.codRAO[8].value = this.selectedTypes.cod;
      let items = {};
      items.id = this.selectedTypes.cod;
      items.text = this.desc;
      this.codRAO[8].radios.splice(0, 5, items);
      console.log(this.codRAO[8].radios);
    },
    setOZRI() {
      if (this.ozri === 1) {
        this.codRAO[1].value = 4;
      }
    },
    setShowKod() {
      this.$emit((this.showKod = false));
      console.log(this.showKod);
    },
    per_pr_min(perVal, per) {
      switch (per) {
        case "лет":
          return perVal * 365 * 24 * 60;
        case "мес":
          return perVal * 31 * 24 * 60;
        case "сут":
          return perVal * 24 * 60;
        case "час":
          return perVal * 60;
        case "мин":
          return perVal;
      }
    },
    per_pr_year(perVal, per) {
      switch (per) {
        case "лет":
          return perVal;
        case "мес":
          return perVal / 12;
        case "сут":
          return perVal / 365;
        case "час":
          return perVal / 24 / 365;
        case "мин":
          return perVal / 60 / 24 / 365;
      }
    },
    kateg_RAO() {
      this.codRAO[1].value = 0;
      this.selectedNuclids.forEach((elem) => {
        console.log("elem.UdA = " + elem.UdA);
        // elem.Udamza = elem.UdA / +elem.MOI
        if (this.codRAO[0].value === 1) {
          if (elem.Sostav === 0) {
            console.log("elem.Sostav" + elem.Sostav);
            if (elem.UdA < 1 * 10e4) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (elem.UdA >= 1 * 10e4 && elem.UdA < 1 * 10e8) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (elem.UdA >= 1 * 10e8) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === 1) {
            if (elem.UdA < 1 * 10e3) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (elem.UdA >= 1 * 10e3 && elem.UdA < 1 * 10e7) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (elem.UdA >= 1 * 10e7) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === 2) {
            if (elem.UdA < 1 * 10e2) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (elem.UdA >= 1 * 10e2 && elem.UdA < 1 * 10e6) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (elem.UdA >= 1 * 10e6) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === 3) {
            if (elem.UdA < 10) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (elem.UdA >= 10 && elem.UdA < 1 * 10e5) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (elem.UdA >= 1 * 10e5) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
        }
        if (this.codRAO[0].value === 2) {
          console.log("this.codRAO[1].value = " + this.codRAO[1].value);
          console.log("elem.Sostav = " + elem.Sostav);

          if (elem.Sostav === 0) {
            console.log("elem.Sostav" + elem.Sostav);
            if (elem.UdA < 1e7) {
              if (this.codRAO[1].value < 0) this.codRAO[1].value = 0;
            } else if (elem.UdA >= 1e7 && elem.UdA < 1e8) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (elem.UdA >= 1e8 && elem.UdA < 1e11) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (elem.UdA >= 1e11) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === 1) {
            console.log("elem.Sostav" + elem.Sostav);
            if (elem.UdA < 1e3) {
              if (this.codRAO[1].value === 0) this.codRAO[1].value = 0;
            } else if (elem.UdA >= 1e3 && elem.UdA < 1e4) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (elem.UdA >= 1e4 && elem.UdA < 1e7) {
              console.log(
                "elem.UdA >= 1*10e4 && elem.UdA < 1*10e7 " +
                  this.codRAO[1].value
              );
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (elem.UdA >= 1e7) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === 2) {
            console.log("elem.Sostav" + elem.Sostav);
            if (elem.UdA < 1e2) {
              if (this.codRAO[1].value === 0) this.codRAO[1].value = 0;
            } else if (elem.UdA >= 1e2 && elem.UdA < 1e3) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (elem.UdA >= 1e3 && elem.UdA < 1e6) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (elem.UdA >= 1e6) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === 3) {
            console.log("elem.Sostav" + elem.Sostav);
            if (elem.UdA < 10) {
              if (this.codRAO[1].value === 0) this.codRAO[1].value = 0;
            } else if (elem.UdA >= 10 && elem.UdA < 1e2) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (elem.UdA >= 1e2 && elem.UdA < 1e5) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (elem.UdA >= 1e5) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
        }
        if (this.codRAO[0].value === 3) {
          this.codRAO[1].value = 9;
        }
      });
    },
    checkSostav(selected) {
      if (selected.Name_RN === "тритий") return 0; //тритий
      if (selected.Num_TM > 92) return 3; //трансурановые
      if (selected.Kod_gruppy === "б") return 1; //бета не трансурановые
      if (selected.Kod_gruppy === "а") return 2; //альфа не трансурановые
    },
    isTrans(Num_TM) {
      return Num_TM > 92 ? "да" : "нет";
    },
    calcPotential(selected) {
      let udal = selected.MOI;
      console.log("calcPotential");
      console.log(selected.UdA_TRO);

      if (this.codRAO[0].value === 1) {
        udal = udal * selected.UdA_GRO;
      }
      let per = this.per_pr_year(
        selected.Period_p_r,
        selected.Edinica_izmer_p_r
      );

      let pot = (1.44 * Math.log(selected.UdA / udal) * per).toFixed(2);
      console.log(selected.Name_RN + " = " + pot);
      selected.Potential = pot;
      return pot;
    },
    calcCodRAO() {
      let longlife = false;
      this.codRAO[5].value = 0;
      let sostav = ["0", "0", "0"]; //[бета, альфа, трансурановые]
      this.selectedNuclids.forEach((elem) => {
        if (elem.Edinica_izmer_p_r === "лет" && elem.Period_p_r > 31)
          longlife = true;

        switch (elem.Sostav) {
          case 0:
            sostav[0] = "1";
            break;
          case 1:
            sostav[0] = "1";
            break;
          case 2:
            sostav[1] = "1";
            break;
          case 3:
            sostav[2] = "1";
            break;
        }
        console.log("UdA = " + elem.UdA);
        console.log("MOI = " + elem.MOI);
        console.log("Udamza = " + elem.Udamza);
        elem.Udamza = elem.UdA / +elem.MOI;
        console.log("Udamza = " + elem.Udamza);
        let pot = this.calcPotential(elem);
        console.log("pot = " + pot);
        if (pot > 0) {
          if (this.codRAO[5].value < 1) this.codRAO[5].value = 1;
        }
        if (pot > 100) {
          if (this.codRAO[5].value < 2) this.codRAO[5].value = 2;
        }
        if (pot > 500) {
          if (this.codRAO[5].value < 3) this.codRAO[5].value = 3;
        }
        console.log("this.codRAO[5].value = " + this.codRAO[5].value);
      });
      console.log(this.selectedNuclids);
      this.selectedNuclids.splice(
        0,
        this.selectedNuclids.length,
        this.selectedNuclids
      );
      console.log(this.selectedNuclids);

      longlife ? (this.codRAO[4].value = 1) : (this.codRAO[4].value = 2);
      console.log(sostav);
      if (sostav[0] === "1" && sostav[1] === "0" && sostav[2] === "0")
        this.codRAO[2].value = 4;
      if (sostav[0] === "1" && sostav[1] === "1" && sostav[2] === "0")
        this.codRAO[2].value = 5;
      if (sostav[0] === "1" && sostav[1] === "1" && sostav[2] === "1")
        this.codRAO[2].value = 6;
      if (sostav[0] === "0" && sostav[1] === "1" && sostav[2] === "0")
        this.codRAO[2].value = 2;
      if (sostav[0] === "0" && sostav[1] === "1" && sostav[2] === "1")
        this.codRAO[2].value = 3;
      if (sostav[0] === "1" && sostav[1] === "0" && sostav[2] === "1")
        this.codRAO[2].value = 6;
      if (sostav[0] === "0" && sostav[1] === "0" && sostav[2] === "1")
        this.codRAO[2].value = 1;

      this.kateg_RAO();
    },
  },
  created() {
    this.codRAO = require("@/db/codRAO.json");
    this.nuclids = require("@/db/nuclids.json");
    this.typeRAO = require("@/db/typeRAO.json");
  },
  computed: {
    filteredNuclids() {
      return this.nuclids.filter((elem) => {
        if (
          (this.filter === "" || !this.filter) &&
          elem.favorite === this.favoriteNuclids
        )
          return true;
        else
          return (
            elem.Name_RN.indexOf(this.filter) > -1 &&
            elem.favorite === this.favoriteNuclids
          );
      });
    },
    filteredTypeRAO() {
      return this.typeRAO.filter((elem) => {
        console.log("this.codRAO[0].value = " + this.codRAO[0].value);
        return this.codRAO[0].value === 2
          ? elem.section === 1 || elem.section === 2
          : elem.section === this.codRAO[0].value;
      });
      // return this.typeRAO
    },

    kodRAO() {
      let cod = "";
      this.codRAO.forEach((elem) => {
        cod = cod.toString() + elem.value;
      });
      console.log(cod);
      return cod;
    },
    enabledBTN() {
      return this.validNuclids && this.codRAO[8].value != "**";
    },
  },
};
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
	border: 1px solid lightblue

.borred
	height: 97vh

.buttons
	padding: 0
	gap: 30px
	width: 100%
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center

.left
	overflow-y: scroll
	max-height: 50vh

.right
	height: 40vh

.h100
	height: 100%
</style>
