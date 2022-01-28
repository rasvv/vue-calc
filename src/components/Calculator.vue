<template>
  <v-container class="calc" fluid>
    <v-row class="calc__form bordered">
      <v-col cols="5" class="calc__selectnuclids">
        <v-row class="calc__types">
          <!-- Агрегатное состояние -->
          <Radios
            :codRAO="codRAO"
            :idx="0"
            :row="true"
            :wrap="true"
            :changeValie="changeValue"
            class="bordered"
          />
        </v-row>

        <v-row class="">
          <v-col cols="4" class="calc__types d-flex align-stretch">
            <v-container class="bordered">
              ОЗРИ?
              <v-radio-group
                v-model="ozri"
                column
                :disabled="codRAO[0].value != 2"
                class="calc__items pt-4"
                @change="setOZRI"
              >
                <v-radio label="Да" :value="1" class="calc__item"></v-radio>
                <v-radio label="Нет" :value="2" class="calc__item"></v-radio>
              </v-radio-group>
            </v-container>
          </v-col>
          <v-col cols="8" class="calc__types d-flex align-stretch">
            <!-- Содержание ядерных материалов -->
            <Radios :codRAO="codRAO" :idx="3" class="bordered" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6" class="calc__types d-flex align-stretch">
            <!-- Способ переработки -->
            <Radios :codRAO="codRAO" :idx="6" class="bordered" />
          </v-col>
          <v-col cols="6" class="calc__types d-flex align-stretch">
            <!-- Класс РАО -->
            <Radios :codRAO="codRAO" :idx="7" class="bordered" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="calc__types d-flex align-stretch">
            <v-container class="bordered">
              <!-- Тип РАО -->
              9-10. Тип РАО

              <v-combobox
                v-model="selectedTypes"
                :items="filteredTypeRAO"
                item-text="description"
                item-value="cod"
                auto-select-first
                dense
                clearable
                @change="parseSelected"
              >
              </v-combobox>

              {{ desc }}
            </v-container>
          </v-col>
        </v-row>

        <v-row class="calc__types">
          <!-- Пожароопасность -->
          <Radios
            :codRAO="codRAO"
            :idx="9"
            :row="true"
            :wrap="true"
            class="bordered"
          />
        </v-row>
      </v-col>
      <v-col cols="7" class="mt-n2">
        <v-container class="bordered">
          <h2>Радионуклидный состав</h2>
          <v-row width="100%">
            <div class="nuclids__top">
              <v-col
                cols="5"
                class="d-flex flex-column justify-stretch"
                height="100%"
              >
                <v-radio-group
                  v-model="favoriteNuclids"
                  row
                  class="d-flex justify-start flex-column calc__items"
                >
                  <v-radio label="Все" :value="0" class="calc__item"></v-radio>
                  <v-radio
                    label="Часто используемые"
                    :value="1"
                    class="calc__item"
                  ></v-radio>
                </v-radio-group>
                <v-text-field
                  class="d-flex justify-end flex-column"
                  label="Фильтр"
                  hide-details="auto"
                  clearable
                  v-model="filter"
                ></v-text-field>
              </v-col>
              <v-col cols="1" class="d-flex flex-column"> </v-col>
              <v-col cols="6" class="nuclids__top-right">
                <v-radio-group v-model="showUda" column class="calc__items">
                  <v-radio
                    label="Удельная активность каждого нуклида"
                    :value="0"
                    class="calc__item"
                  ></v-radio>
                  <v-radio
                    label="Общая удельная активность + %"
                    :value="1"
                    class="calc__item"
                  ></v-radio>
                  <v-radio
                    label="Суммарная активность + масса"
                    :value="2"
                    class="calc__item"
                  ></v-radio>
                </v-radio-group>
                <v-text-field
                  v-show="showUda === 1"
                  label="Удельная активность"
                  type="number"
                  hide-details="auto"
                  clearable
                  v-model="obUdAct"
                  suffix="Бк/г"
                ></v-text-field>
                <v-row v-show="showUda === 2">
                  <v-col cols="5">
                    <v-text-field
                      label="Суммарная активность"
                      v-model="sumAct"
                      type="number"
                      hide-details="auto"
                      clearable
                      :rules="[rules.required]"
                      suffix="Бк"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      label="Масса"
                      type="number"
                      hide-details="auto"
                      clearable
                      v-model="mass"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                    <v-select
                      :items="massItems"
                      v-model="selectedMass"
                      item-text="text"
                      item-value="value"
                      label="Ед. измер."
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </div>
            <div class="nuclids__bottom">
              <v-col cols="5">
                <div>
                  <v-list max-height="50vh" dense>
                    <v-list-item-group class="bordered" :style="leftPanel">
                      <v-list-item
                        v-for="(item, i) in filteredNuclids"
                        :key="i"
                        @click="selected = filteredNuclids[i]"
                        @dblclick="addNuclid"
                      >
                        <!-- {{ i + 1 }} -->
                        <!-- `${ item.Name_RN } ${ (Name_RN_Lat) }` -->
                        {{ item.Name_RN }} ( {{ item.Name_RN_Lat }} )
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
                <v-row class="bordered" v-show="!showNuclidsTable">
                  <RadioNuclids
                    :codRAO="codRAO"
                    :selected="selected"
                    :trans="isTrans(selected.Num_TM)"
                  />
                </v-row>
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
                <v-list class="calc__nuclids">
                  <v-list-item-group class="bordered" :style="rightPanel">
                    <v-list-item
                      v-for="(item, i) in selectedNuclids"
                      :key="i"
                      @click="selectedMin = selectedNuclids[i]"
                      @dblclick="delNuclid"
                    >
                      <div class="calc__nuclids-card">
                        {{ item.Name_RN }}
                        <v-text-field
                          label="Удельная активность (Бк/г)"
                          v-show="showUda === 0"
                          v-model="item.UdA"
                          type="number"
                          @change="isdisb()"
                          :rules="[rules.required]"
                          hide-details="auto"
                          suffix="Бк/г"
                        ></v-text-field>
                        <v-row v-show="showUda != 0">
                          <v-col cols="5">
                            <v-text-field
                              label="Процентов"
                              v-model="item.Percent"
                              type="number"
                              @change="
                                recalcUdA(item);
                                isdisb();
                              "
                              :rules="[rules.required, rules.percent]"
                              hide-details="auto"
                              suffix="%"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="7">
                            <v-text-field
                              label="Удельная активность (Бк/г)"
                              :readonly="true"
                              v-model="item.UdA"
                              type="number"
                              hide-details="auto"
                              suffix="Бк/г"
                            ></v-text-field>
                          </v-col>
                        </v-row>

                        <!-- <v-text-field
                          label="Масса (кг)"
                          v-show="showUda === 2"
                          v-model="item.UdA"
                          type="number"
                          @change="isdisb()"
                          :rules="rules"
                          hide-details="auto"
                          suffix="кг"
                        ></v-text-field> -->
                      </div>
                      <!-- {{ item.Name_RN }} -->
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </div>
          </v-row>
        </v-container>
      </v-col>
      <div>
        <v-dialog
          v-model="showNuclidsTable"
          persistent
          transition="dialog-bottom-transition"
          width="65vw"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              :disabled="!enabledBTN"
              width="150%"
              @click="calcCodRAO"
            >
              Расчитать
            </v-btn>
          </template>
          <Kod
            :codRAO="codRAO"
            :kodRAO="kodRAO"
            :selectedNuclids="selectedNuclids"
            v-on:close-dialog="closeDialog"
          />
        </v-dialog>
      </div>
    </v-row>
  </v-container>
</template>

<script src="./calculator.js"></script>

<style lang="sass" scoped>
// link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.css"
html
  box-sizing: border-box
  margin: 0
  padding: 0

.calc
  &__form
    min-height: 1020px
    height: 95vh
    display: flex
    justify-content: center

  &__types
    padding: 5px
    // margin: 0

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

.gap
  gap: 10px

.left
  overflow-y: scroll
  height: 40vh

.right
  height: listHeight

.h100
  height: 100vh

.nuclids__top
  width: 100%
  display: flex
  justify-content: space-between

  &-left
    display: flex
    flex-direction: column
    justify-content: space-between

.nuclids__bottom
  width: 100%
  display: flex
  justify-content: space-between
</style>
