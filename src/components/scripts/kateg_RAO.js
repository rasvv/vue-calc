export default {
  methods: {
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
	},	
};
