<template>
  <v-container
    class="calc"
    fluid
  >
    <v-row class="bordered">
      <v-col cols="4" class="calc__selectnuclids borred">
        Выбор
        <v-row class="calc__typs bordered">
          Тип РАО
          <v-radio-group
            v-model="radioGroup"
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
                <!-- `{{ item.rper}}` -->
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Вид илучения
              </v-col>
              <v-col>
                <!-- `{{ item.rper}}` -->
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                Трасурановые (Да/Нет)
              </v-col>
              <v-col>
                <!-- `{{ item.rper}}` -->
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                ПЗУА, Бк/г
              </v-col>
              <v-col>
                <!-- `{{ item.rper}}` -->
              </v-col>
            </v-row>

          </v-col>
        </v-row> 
        <v-row width="100%">
          <v-col cols="5">
            <v-list>
              <v-list-item-group class="calc__nuclids bordered">
                <v-list-item
                  v-for="(item, i) in 50"
                  :key="i"
                >
                  {{ i + 1 }}
                  <!-- {{ item.Name_RN }} -->
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="1" class="buttons">
            <v-btn>
              <v-icon class="mx-0 mb-0">mdi-plus</v-icon>
            </v-btn>
            <v-btn>
              <v-icon class="mx-0 mb-0">mdi-minus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-list>
              <v-list-item-group class="calc__nuclids bordered">
                <v-list-item
                  v-for="(item, i) in 2"
                  :key="i"
                >
                  <div class="calc__nuclids-card">
                    <div>{{ i + 1 }}</div>
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
        Код РАО
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const fs = require('fs');
// import fs from 'fs';
// import {path} from 'path';
export default {
  data () {
    return {
      nuclids: localStorage.getItem('nuclids'),
      radioGroup: 1,
      kod: false,
      rules: [
        value => !!value || 'Required.',
        // value => (value && value.length >= 3) || 'Min 3 characters',
      ],      
    }
  },
  mounted() {
    localStorage.setItem('nuclids', fs.readFileSync('@/db/nuclids.json', 'utf-8'));    
  },
}
</script>

<style lang="sass" scoped>
// link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.css"
*
  box-sizing: border-box
  margin: 0 
  padding: 0 

.calc
  // margin: 15px
  // padding: 15px
  &__types
    padding: 10px

  &__item
    display: inline-block

  &__items
    width: 100%
    display: flex
    justify-content: space-between
    display: block
    gap: 30px

  &__nuclids
    width: 100%
    height: calc(98vh - 410px)
    overflow: scroll

    &-card
      border-bottom: 1px solid #ccc
      width: 100%
      padding: 8px
      justify-content: start

  &__selectnuclids
    // padding: 15px

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
  border: 1px solid red
  height: 98vh

.buttons
  padding: 0
  gap:30px  
  width: 100%
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

</style>
