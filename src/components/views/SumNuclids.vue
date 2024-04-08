<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col cols="12" class="bordered">
            <v-row class="pa-4 justify-end" height="50px"
              ><h4>Радионуклиды</h4></v-row
            >
            <v-row class="pa-4 justify-end" height="50px"
              ><h4>Значение</h4></v-row
            >
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10">
        <v-row>
          <v-col cols="3" class="bordered">
            <v-row class="pa-4 justify-center"><h4>Тритий</h4></v-row>
            <v-row class="pa-4 justify-center">
              <h3>{{ this.getUdAsSum[0][2].toExponential(2) }} Бк/г</h3>
            </v-row>
          </v-col>
          <v-col cols="3" class="bordered">
            <v-row class="pa-4 justify-center"><h4>Альфа</h4></v-row>
            <v-row class="pa-4 justify-center">
              <h3>{{ this.getUdAsSum[1][2].toExponential(2) }} Бк/г</h3>
            </v-row>
          </v-col>
          <v-col cols="3" class="bordered">
            <v-row class="pa-4 justify-center"><h4>Бета</h4></v-row>
            <v-row class="pa-4 justify-center">
              <h3>{{ this.getUdAsSum[2][2].toExponential(2) }} Бк/г</h3>
            </v-row>
          </v-col>
          <v-col cols="3" class="bordered">
            <v-row class="pa-4 justify-center"><h4>Трансурановые</h4></v-row>
            <v-row class="pa-4 justify-center">
              <h3>{{ this.getUdAsSum[3][2].toExponential(2) }} Бк/г</h3>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- {{ this.getUdAsSum }} -->
  </v-container>
</template>

<!-- <script src="../calculator.js"></script> -->
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getUdAsSum: "getUdAsSum",
    }),
  },
};
</script>
