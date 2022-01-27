import Radios from "./views/Radios.vue";
import RadioNuclids from "./views/RadioNuclids.vue";
import Tooltip from "./views/TooltipT.vue";
import Kod from "./views/Kod.vue";

export default {
  data() {
    return {
      filter: "",
      validNuclids: false,
      showKod: false,
      nuclids: [],
      favoriteNuclids: 1,
      showUda: 0,
      sumAct: 0,
      obUdAct: 0,
      typeRAO: [],
      selected: {},
      selectedMin: {},
      selectedNuclids: [],
      showNuclidsTable: false,
      listHeight: 60+'vh',
      // longlife: false,
      codRAO: [],
      dialog: false,
      kod: true,
      ozri: 2,
      selectedTypes: [],
      desc: "",
      rules: [(value) => !!value || "Required."],
      leftPanel: {
        height: '40vh',
        'overflow-y': 'scroll'
      },
      rightPanel: {
        height: '60vh'
      },
      headers: [
        { text: "Радионуклид", value: "Name_RN" },
        { text: "Период полураспада", value: "Period" },
        { text: "Удельная активность", value: "UdA" },
        { text: "Вид излучения", value: "Vid_izluch" },
        { text: "Трансурановый", value: "Trans" },
        { text: "ПЗУА", value: "UdA_TRO" },
        { text: "Период потенциальной опасности", value: "Potential" },
      ],			
    };
  },
  components: {
    // Radio1,
    Radios,
    RadioNuclids,
    Tooltip,
    Kod,
  },
  methods: {
    copyToClipboard() {
      // try {
      navigator.clipboard.writeText(this.kodRAO);
      // } catch(e) {
      //   throw e
      // }
    },
    activeMenu(idx) {
      if (idx === 8) {
        console.log(this.codRAO[8].radios);
        return this.codRAO[8].radios;
      } else
        return this.codRAO[idx].radios.filter((elem) => {
          return elem.id === this.codRAO[idx].value;
        });
    },		
    addNuclid() {
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
    addNuclidFields(selected, pot) {
      console.log("--=== addNuclidFields ===--");
      selected.Trans = this.isTrans(selected.Num_TM);
      selected.Period = `${selected.Period_p_r} ${selected.Edinica_izmer_p_r}`;
      selected.UdA = `${selected.UdA} Бк/г`;
      selected.Sostav = this.checkSostav(selected);
      selected.Udamza = selected.UdA / +selected.MOI;
      selected.Potential = `${pot} лет`;
      console.log("++=== addNuclidFields ===++");
    },
    setSelected() {
      // this.selected = this.nuclids[i]
    },
    isdisb() {
      let per = false;
      if (this.selectedNuclids.length === 0) return false;
      console.log(this.selectedNuclids);
      this.selectedNuclids.forEach((elem) => {
        console.log(elem.UdA);
        if (!elem.UdA || elem.UdA <= 0) per = true;
      });
      per ? (this.isdisabled = false) : (this.isdisabled = true);
      this.validNuclids = this.isdisabled;
    },
    parseSelected() {
      console.log("--=== parseSelected ===--");
      console.log(this.selectedTypes);
      this.desc = this.selectedTypes.description;
      this.codRAO[8].value = this.selectedTypes.cod;
      let items = {};
      items.id = this.selectedTypes.cod;
      items.text = this.desc;
      this.codRAO[8].radios.splice(0, 1, items);
      console.log(this.codRAO[8].radios);
      console.log("++=== parseSelected ===++");
    },
    setOZRI() {
      console.log("--=== setOZRI ===--");
      if (this.ozri === 1) {
        this.codRAO[1].value = 4;
      }
      console.log("++=== setOZRI ===++");
    },
    setShowKod() {
      console.log("--=== setShowKod ===--");
      this.$emit((this.showKod = false));
      console.log(this.showKod);
      console.log("++=== setShowKod ===++");
    },
    changeValue() {
      console.log("--=== changeValue ===--");
      if (this.idx === 0) this.codRAO[8].value = "**";
      console.log("++=== changeValue ===++");
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
      console.log("--=== kateg_RAO ===--");
      this.codRAO[1].value = 0;
      this.selectedNuclids.forEach((elem) => {
        console.log("kateg_RAO() elem.Sostav = " + elem.Sostav);
        // elem.Udamza = elem.UdA / +elem.MOI
        if (this.codRAO[0].value === 1) {
          if (elem.Sostav === 0) {
            console.log("1-0- elem.Sostav" + elem.Sostav);
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
          console.log("2-- elem.Sostav = " + elem.Sostav);

          if (elem.Sostav === 0) {
            console.log("2-0- elem.Sostav" + elem.Sostav);
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
            console.log("2-1- elem.Sostav" + elem.Sostav);
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
            console.log("2-2- elem.Sostav" + elem.Sostav);
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
            console.log("2-3- elem.Sostav" + elem.Sostav);
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
      console.log("++=== kateg_RAO ===++");
    },
    checkSostav(selected) {
      if (selected.Name_RN === "тритий") return 0; //тритий
      if (selected.Num_TM > 92) return 3; //трансурановые
      if (selected.Kod_gruppy === "б") return 1; //бета не трансурановые
      if (selected.Kod_gruppy === "а") return 2; //альфа не трансурановые
    },
    setSostav(sostav) {
      console.log("--=== setSostav ===--");
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
        console.log("this.codRAO[2].value =" + this.codRAO[2].value);        
      console.log("++=== setSostav ===++");
      return this.codRAO[2].value
    },
    isTrans(Num_TM) {
      return Num_TM > 92 ? "да" : "нет";
    },
    calcPotential(selected) {
      let udal = selected.MOI;
      console.log("--=== calcPotential ===--");
      // console.log(selected.UdA_TRO);

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
      console.log("++=== calcPotential ===++");
      return pot;
    },
    setPotential(pot) {
      console.log("--=== setPotential ===--");
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
      console.log("++=== setPotential ===++");
    },
    calcCodRAO() {
      console.log("--=== calcCodRAO ===--");
      let longlife = false;
      this.codRAO[5].value = 0;
      let sostav = ["0", "0", "0"]; //[бета, альфа, трансурановые]
      console.log("1. selectedNuclids length = " + this.selectedNuclids.length);
      console.log("2. selectedNuclids: ")
      console.log(this.selectedNuclids)
      this.selectedNuclids.forEach((elem, i) => {
        if (elem.Edinica_izmer_p_r === "лет" && elem.Period_p_r > 31)
          longlife = true;

        console.log("elem.Sostav = " + i);
        console.log(this.checkSostav(elem));

        switch (this.checkSostav(elem)) {
          case 0:
            sostav[0] = "1";
            console.log("Sostav[0] = 1");
            break;
          case 1:
            sostav[0] = "1";
            console.log("Sostav[0] = 1");
            break;
          case 2:
            sostav[1] = "1";
            console.log("Sostav[1] = 1");
            break;
          case 3:
            sostav[2] = "1";
            console.log("Sostav[2] = 1");
            break;
        }
        // console.log("UdA = " + elem.UdA);
        // console.log("MOI = " + elem.MOI);
        // console.log("Udamza = " + elem.Udamza);
        elem.Udamza = elem.UdA / +elem.MOI;
        // console.log("Udamza = " + elem.Udamza);
        let pot = this.calcPotential(elem);
        this.setPotential(pot)
        this.addNuclidFields(elem, pot)
        this.selectedNuclids.splice(i, 1, this.selectedNuclids[i]);        
      });

      longlife ? (this.codRAO[4].value = 1) : (this.codRAO[4].value = 2);
      this.setSostav(sostav)
      this.kateg_RAO()
      console.log("4. this.codRAO[2].value =" + this.codRAO[2].value);
      console.log(this.codRAO);

      this.showNuclidsTable = true
      this.rightPanel.height = '40vh'
      console.log("++=== calcCodRAO ===++");
    },
    reloadVar() {
      console.log("--=== reloadVar ===--");
      this.selectedNuclids = []
      this.selected = {}
      this.codRAO = require("@/db/codRAO.json");
      this.validNuclids = false
      this.codRAO[8].value = "**"
      this.selectedTypes = []
      this.desc=""
      console.log("++=== reloadVar ===++");
    },
    closeDialog() {
      console.log("--=== closeDialog ===--");
      this.showNuclidsTable = false
      this.reloadVar()
      console.log("++=== closeDialog ===++");
    }
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
