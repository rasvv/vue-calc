<template>
  <v-container>
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
          <v-col cols="4" >

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
          <v-col cols="12" class="calc__types d-flex align-stretch">
            <fieldset class="bordered">
              <legend>9-10. Тип РАО</legend>
              <!-- Тип РАО -->
              <v-combobox
                v-model="selectedTypes"
                :items="filteredTypeRAO"
                item-title="descript"
                item-value="cod"
                auto-select-first
                dense
                clearable
                @change="changeTypeRAO"
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

	</v-container>
</template>

<script src="../calculator.js">
export default {
	data() {
		return {};
	},
};
</script>

<style lang="sass" scoped>
</style>
