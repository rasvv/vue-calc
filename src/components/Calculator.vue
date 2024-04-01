<template>
  <v-container class="calc" fluid>
    <v-row class="calc__form bordered">
      <v-col cols="5">
        <v-row class="calc__types">
          <!-- Агрегатное состояние -->
          <Radios
            :codRAO="codRAO"
            :idx="0"
            :row="true"
            :wrap="true"
            :enabled="section"
            :changeValue="changeValue"
            class="bordered"
          />
        </v-row>

        <v-row class="">
          <v-col cols="4">
            <fieldset class="bordered">
              <legend>ОЗРИ?</legend>
              <v-radio-group
                v-model="ozri"
                column
                :disabled="codRAO[0].value != 2"
                class="calc__items py-0"
                @change="setOZRI"
              >
                <v-radio label="Да" :value="1" class="calc__item"></v-radio>
                <v-radio label="Нет" :value="2" class="calc__item"></v-radio>
              </v-radio-group>
            </fieldset>
            <!-- <v-container class="bordered">
              ОЗРИ?

            </v-container> -->
          </v-col>
          <v-col cols="8" class="calc__types d-flex align-stretch">
            <!-- Содержание ядерных материалов -->
            <Radios
              :codRAO="codRAO"
              :idx="3"
              :enabled="section"
              class="bordered"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6" class="calc__types d-flex align-stretch">
            <!-- Способ переработки -->
            <Radios
              :codRAO="codRAO"
              :idx="6"
              :enabled="section"
              class="bordered"
            />
          </v-col>
          <v-col cols="6" class="calc__types d-flex align-stretch">
            <!-- Класс РАО -->
            <Radios
              :codRAO="codRAO"
              :idx="7"
              :enabled="section"
              class="bordered"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" class="calc__types d-flex flex-column align-stretch">
            <fieldset class="bordered">
              <legend>9-10. Тип РАО</legend>
              <!-- Тип РАО -->
              <!-- <v-select
								:items="massItems"
								v-model="selectedTypes"
                item-title="description"
                item-value="cod"
								label="Тип РАО"
                @change="changeTypeRAO"
              >
              </v-select> -->
              <v-combobox
                :items="filteredTypeRAO"
                v-model="selectedTypes"
                item-title="descript"
                item-value="cod"
                label="Тип РАО"
                @update:modelValue="changeTypeRAO"
                hide-details
                auto-select-first
                clearable
              >
              </v-combobox>
              {{ desc }}
            </fieldset>
          </v-col>
        </v-row>

        <v-row class="calc__types">
          <!-- Пожароопасность -->
          <Radios
            :codRAO="codRAO"
            :idx="9"
            :row="true"
            :wrap="true"
            :enabled="section"
            class="bordered"
          />
        </v-row>
      </v-col>

      <v-col cols="7" class="mt-n2">
        <fieldset class="bordered">
          <legend>Радионуклидный состав</legend>
          <v-row width="95%">
            <v-row class="nuclids__top">
              <v-col
                cols="5"
                height="100%"
                class="d-flex justify-stretch flex-column calc__items"
              >
                <v-radio-group
                  v-model="favoriteNuclids"
                  column
                  class="d-flex align-start flex-column calc__items"
                >
                  <v-radio label="Все" :value="0" class="calc__item"></v-radio>
                  <v-radio
                    label="Часто используемые"
                    :value="1"
                    class="calc__item"
                  ></v-radio>
                </v-radio-group>
                <v-text-field
                  class="input"
                  width="300px"
                  label="Поиск"
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
                  <!-- <v-radio
                    label="Общая удельная активность + %"
                    :value="1"
                    class="calc__item"
                  ></v-radio> -->
                  <v-radio
                    label="Суммарная активность + масса + %"
                    :value="1"
                    class="calc__item"
                  ></v-radio>
                </v-radio-group>

                <v-row v-show="showUda === 0" class="px-4">
                  <v-text-field
                    label="Удельная активность"
                    hide-details="auto"
                    clearable
                    v-model="obUdAct"
                    :rules="[rules.required]"
                    @change="
                      recalcObUdActFilter();
                      recalcUdANuclids();
                    "
                    suffix="Бк/г"
                  >
                    <v-tooltip location="top" activator="parent">
                      <span>
                        Возможен ввод в экспоненциальной форме в формате "1.5+9"
                      </span>
                    </v-tooltip>
                  </v-text-field>
                </v-row>

                <v-row v-show="showUda === 1" class="pb-0">
                  <v-col cols="5" class="pb-0">
                    <v-text-field
                      label="Суммарная активность"
                      v-model="sumAct"
                      @change="
                        recalcSumActFilter();
                        recalcUdANuclids();
                      "
                      hide-details="auto"
                      clearable
                      :rules="[rules.required]"
                      suffix="Бк"
                    >
                      <v-tooltip location="top" activator="parent">
                        <span>
                          Возможен ввод в экспоненциальной форме в формате
                          "1.5+9"
                        </span>
                      </v-tooltip>
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="pb-0">
                    <v-text-field
                      label="Масса"
                      v-model="mass"
                      @change="recalcUdANuclids"
                      type="number"
                      hide-details="auto"
                      clearable
                      :rules="[rules.percentPlus]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="pb-0">
                    <v-select
                      :items="massItems"
                      v-model="selectedMass"
                      item-title="text"
                      item-value="value"
                      label="Ед. измер."
                    >
                      @change="recalcUdANuclids"
                    </v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="nuclids__bottom">
              <v-col cols="5">
                <v-list height="600px" class="ml-4" dense>
                  <v-list-item>
                    <v-list-item
                      v-for="(item, i) in filteredNuclids"
                      :key="i"
                      @click="selected = filteredNuclids[i]"
                      @dblclick="addNuclid"
                      @dragstart="onDragStart(i)"
                      @dragover.prevent
                      draggable="true"
                    >
                      <!-- {{ i + 1 }} -->
                      <!-- `${ item.Name_RN } ${ (Name_RN_Lat) }` -->
                      {{ item.Name_RN }} ( {{ item.Name_RN_Lat }} )
                    </v-list-item>
                  </v-list-item>
                </v-list>
                <!-- <v-divider></v-divider>	 -->
                <div class="bordered mt-2" v-show="!showNuclidsTable">
                  <RadioNuclids
                    :codRAO="codRAO"
                    :selected="selected"
                    :trans="isTrans(selected.Num_TM)"
                  />
                </div>
                <!-- {{ filteredNuclids }} -->
              </v-col>

              <v-col cols="1" class="buttons">
                <v-btn @click="addNuclid">
                  <v-icon class="mx-0 mb-0">mdi-arrow-right-bold</v-icon>
                </v-btn>
                <v-btn @click="delNuclid">
                  <v-icon class="mx-0 mb-0">mdi-arrow-left-bold</v-icon>
                </v-btn>
              </v-col>

              <v-col
                cols="6"
                @drop="onDrop"
                @dragover.prevent
                @dragenter.prevent
              >
                <v-list
                  class="calc__nuclids bordered d-flex align-start"
                  bg-color="blue-lighten-5"
                >
                  <v-list-item class="bordered pa-10" :style="rightPanel">
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
                          :key="UdAKey"
                          v-show="showUda === 0"
                          v-model="item.UdA"
                          @change="isCorrect()"
                          :rules="[rules.required]"
                          hide-details="auto"
                          suffix="Бк/г"
                          hint="Возможен ввод в экспоненциальной форме в формате '1.5+9'"
                        ></v-text-field>

                        <v-row v-show="showUda != 0">
                          <v-col cols="5">
                            <v-text-field
                              label="Процентов"
                              v-model="item.Percent"
                              type="number"
                              @change="
                                recalcUdA(item);
                                isCorrect();
                              "
                              @click="
                                recalcUdA(item);
                                isCorrect();
                              "
                              :rules="[
                                rules.required,
                                rules.percent,
                                rules.percentPlus,
                              ]"
                              hide-details="auto"
                              suffix="%"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="7">
                            <v-text-field
                              label="Удельная активность (Бк/г)"
                              :readonly="true"
                              :key="UdAKey"
                              v-model="item.UdA"
                              type="number"
                              hide-details="auto"
                              suffix="Бк/г"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </div>
                      <!-- {{ item.Name_RN }} -->
                    </v-list-item>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-row>
        </fieldset>
      </v-col>
      <v-row class="d-flex justify-center pa-6">
        <v-btn
          :disabled="!enabledBTN"
          height="50px"
          width="50%"
          @click="calcCodRAO"
        >
          Рассчитать
        </v-btn>
        <v-dialog
          v-model="showNuclidsTable"
          persistent
          transition="dialog-bottom-transition"
          width="auto"
        >
          <v-card>
            <Kod
              :codRAO="codRAO"
              :kodRAO="kodRAO"
              :selectedNuclids="selectedNuclids"
              v-on:close-dialog="closeDialog"
            />
          </v-card>
        </v-dialog>
      </v-row>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="2"></v-col>

      <v-col cols="8" class="d-flex justify-center">
        2021 - {{ new Date().getFullYear() }} &copy; Все права защищены
      </v-col>
      <v-col cols="2" class="d-flex justify-end">
        Автор
        <a href="https://rasvv.ru" target="blank"
          ><img src="../assets/rvv.png" alt="rvv" height="20px"
        /></a>
      </v-col>
    </v-row>
  </v-container>
</template>

<script src="./calculator.js"></script>

<style lang="sass" scoped>
// link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.css"
	.v-dialog
		overflow-y: none !important
		scrollable: false
</style>
