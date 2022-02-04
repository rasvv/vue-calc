import Radios from "./views/Radios.vue";
import RadioNuclids from "./views/RadioNuclids.vue";
import Tooltip from "./views/TooltipT.vue";
import Kod from "./views/Kod.vue";

export default {
  data() {
    return {
      filter: null,
      validNuclids: false,
      showKod: false,
      nuclids: [],
      favoriteNuclids: 1,
      showUda: 0,
      UdAKey: 0,
      sumAct: null,
      obUdAct: null,
      mass: null,
      sumPercents: 0,
      typeRAO: [],
      selected: {},
      selectedMin: {},
      selectedNuclids: [],
      showNuclidsTable: false,
      showlog: false,
      // longlife: false,
      codRAO: [],
      sostav: ["0", "0", "0"],             //[бета, альфа, трансурановые]
      dialog: false,
      kod: true,
      ozri: 2,
      selectedTypes: [],
      desc: "",
      rules: {
        required: value => !!value || 'Required.',
        percent: value => value <= 100 || 'Не более 100%',
        percentPlus: value => value > 0 || 'Больше 0',
      },      
      leftPanel: {
        height: '40vh',
        'overflow-y': 'scroll'
      },
      rightPanel: {
        height: '56vh',
        'overflow-y': 'auto'
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
      massItems: [
        { text: "г", value: 1 },
        { text: "кг", value: 1000 },
        { text: "т", value: 1000000 },
      ],
      selectedMass: 1,
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
        this.log(this.codRAO[8].radios);
        return this.codRAO[8].radios;
      } else
        return this.codRAO[idx].radios.filter((elem) => {
          return elem.id === this.codRAO[idx].value;
        });
    },		
    addNuclid() {
      this.log("--=== addNuclid ===--");
      // this.selected.UdA = ""
      if (this.selectedNuclids.length === 0 || !this.checkExistsNuclid(this.selected.Name_RN)) {
        this.selectedNuclids.push(this.selected);
        this.isdisb();				
      }
      this.log("++=== addNuclid ===++");
    },
    delNuclid() {
      this.log("--=== delNuclid ===--");
      this.selectedNuclids.splice(
        this.selectedNuclids.indexOf(this.selectedMin),
        1
      );
      this.isdisb();
      this.log("++=== delNuclid ===++");
    },
    addNuclidFields(selected, pot) {
      this.log("--=== addNuclidFields ===--");
      selected.Trans = this.isTrans(selected.Num_TM);
      selected.Period = `${selected.Period_p_r} ${selected.Edinica_izmer_p_r}`;
      // selected.UdA = `${selected.UdA} Бк/г`;
      selected.UdAUnit = `${selected.UdA} Бк/г`;
      selected.Sostav = this.checkSostav(selected);
      selected.Udamza = selected.UdA / +selected.MOI;
      selected.Potential = `${pot} лет`;
      this.log("++=== addNuclidFields ===++");
    },
    checkPercents() {
      this.log("--=== checkPercents ===--");
      this.sumPercents = 0
      this.log("sumPercents = " + this.sumPercents);
      if (this.selectedNuclids.length === 0) return false;
      this.selectedNuclids.forEach((elem) => {
        this.sumPercents += +elem.Percent
      this.log("sumPercents = " + this.sumPercents);
    });
      if (this.sumPercents > 100) {
        alert("Сумма значений процентов не может превышать 100!")
        return false
      }
      this.log("sumPercents = " + this.sumPercents);
      this.log("++=== checkPercents ===++");
      return true
    },
    isdisb() {
      let per = false;
      if (this.showUda != 0) {
        if (!this.checkPercents()) return this.validNuclids = false
        if (this.selectedNuclids.length === 0) return false;
        this.log(this.selectedNuclids);        
      }
      this.selectedNuclids.forEach((elem) => {
        if (this.showUda === 0) {
          elem.UdA = this.replaceExponent(elem.UdA)
          this.UdAKey += 1
          this.log(elem.UdA);					
        }
        if (!elem.UdA || elem.UdA <= 0 || elem.UdA == undefined) per = true;
      });
      per ? (this.isdisabled = false) : (this.isdisabled = true);
      this.validNuclids = this.isdisabled;
    },
    recalcUdA(elem) {
      this.log("--=== recalcUdA ===--");
      this.log(elem)
      this.log("this.sumAct = " + this.sumAct)
      this.log("this.mass = " + this.mass)
      this.log("this.selectedMass = " + this.selectedMass)
      if (this.showUda === 2) {this.obUdAct = (+this.sumAct / (+this.mass * +this.selectedMass))}

      elem.UdA = (this.obUdAct * elem.Percent / 100).toFixed(2)
      if (+elem.UdA <= 0) elem.UdA = 0
      this.log("elem.UdA = " + elem.UdA)
      this.UdAKey += 1
      this.log("++=== recalcUdA ===++");
    },
    parseSelected() {
      this.log("--=== parseSelected ===--");
      this.log(this.selectedTypes);
      if (this.selectedTypes === null) {
        this.desc = ""
        this.codRAO[8].value = "**"
        return
      }
      this.desc = this.selectedTypes.description
      this.codRAO[8].value = this.selectedTypes.cod;
      let items = {};
      items.id = this.selectedTypes.cod;
      items.text = this.desc;
      this.codRAO[8].radios.splice(0, 1, items);
      this.log(this.codRAO[8].radios);
      this.log("++=== parseSelected ===++");
    },
    setOZRI() {
      this.log("--=== setOZRI ===--");
      if (this.ozri === 1) {
        this.codRAO[1].value = 4;
      }
      this.log("++=== setOZRI ===++");
    },
    setShowKod() {
      this.log("--=== setShowKod ===--");
      this.$emit((this.showKod = false));
      this.log(this.showKod);
      this.log("++=== setShowKod ===++");
    },
    changeValue() {
      this.log("--=== changeValue ===--");
      if (this.idx === 0) this.codRAO[8].value = "**";
      this.log("++=== changeValue ===++");
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
      this.log("--=== kateg_RAO ===--");
      if (this.ozri === 1) return 4
      this.codRAO[1].value = 0;

      let UdAsSumTri = 0
      let UdAsSumBet = 0
      let UdAsSumAlp = 0
      let UdAsSumTra = 0

      this.selectedNuclids.forEach((elem) => {
        this.log("kateg_RAO() elem.Sostav = " + elem.Sostav);
        // elem.Udamza = elem.UdA / +elem.MOI
        if (this.codRAO[0].value === 1) {
          if (elem.Sostav === "тритий") {
            this.log("1-0- elem.Sostav" + elem.Sostav);
            UdAsSumTri += +elem.UdA
            if (UdAsSumTri< 1 * 10e4) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (UdAsSumTri >= 1 * 10e4 && UdAsSumTri < 1 * 10e8) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (UdAsSumTri >= 1 * 10e8) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === "бета") {
            UdAsSumBet += +elem.UdA
            if (UdAsSumBet < 1 * 10e3) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (UdAsSumBet >= 1 * 10e3 && UdAsSumBet < 1 * 10e7) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (UdAsSumBet >= 1 * 10e7) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === "альфа") {
            UdAsSumAlp += +elem.UdA
            if (UdAsSumAlp < 1 * 10e2) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (UdAsSumAlp >= 1 * 10e2 && UdAsSumAlp < 1 * 10e6) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (UdAsSumAlp >= 1 * 10e6) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === "трансурановые") {
            UdAsSumTra += +elem.UdA
            if (UdAsSumTra < 10) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (UdAsSumTra >= 10 && UdAsSumTra < 1 * 10e5) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (UdAsSumTra >= 1 * 10e5) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
        }
        if (this.codRAO[0].value === 2) {
          this.log("this.codRAO[1].value = " + this.codRAO[1].value);
          this.log("2-- elem.Sostav = " + elem.Sostav);

          if (elem.Sostav === "тритий") {
            UdAsSumTri += +elem.UdA
            this.log("2-0- elem.Sostav" + elem.Sostav);
            if (UdAsSumTri < 1e7) {
              if (this.codRAO[1].value < 0) this.codRAO[1].value = 0;
            } else if (UdAsSumTri >= 1e7 && UdAsSumTri < 1e8) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (UdAsSumTri >= 1e8 && UdAsSumTri < 1e11) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (UdAsSumTri >= 1e11) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === "бета") {
            UdAsSumBet += +elem.UdA
            this.log("2-1- elem.Sostav" + elem.Sostav);
            if (UdAsSumBet < 1e3) {
              if (this.codRAO[1].value === 0) this.codRAO[1].value = 0;
            } else if (UdAsSumBet >= 1e3 && UdAsSumBet < 1e4) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (UdAsSumBet >= 1e4 && UdAsSumBet < 1e7) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (UdAsSumBet >= 1e7) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === "альфа") {
            UdAsSumAlp += +elem.UdA
            this.log("2-2- elem.Sostav" + elem.Sostav);
            if (UdAsSumAlp < 1e2) {
              if (this.codRAO[1].value === 0) this.codRAO[1].value = 0;
            } else if (UdAsSumAlp >= 1e2 && UdAsSumAlp < 1e3) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (UdAsSumAlp >= 1e3 && UdAsSumAlp < 1e6) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (UdAsSumAlp >= 1e6) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
          if (elem.Sostav === "трансурановые") {
            UdAsSumTra += +elem.UdA
            this.log("2-3- elem.Sostav" + elem.Sostav);
            if (UdAsSumTra < 10) {
              if (this.codRAO[1].value === 0) this.codRAO[1].value = 0;
            } else if (UdAsSumTra >= 10 && UdAsSumTra < 1e2) {
              if (this.codRAO[1].value < 1) this.codRAO[1].value = 1;
            } else if (UdAsSumTra >= 1e2 && UdAsSumTra < 1e5) {
              if (this.codRAO[1].value < 2) this.codRAO[1].value = 2;
            } else if (UdAsSumTra >= 1e5) {
              if (this.codRAO[1].value < 3) this.codRAO[1].value = 3;
            }
          }
        }
        if (this.codRAO[0].value === 3) {
          this.codRAO[1].value = 9;
        }
      });
      this.log("UdAsSumTri = " + UdAsSumTri);
      this.log("UdAsSumBet = " + UdAsSumBet);
      this.log("UdAsSumAlp = " + UdAsSumAlp);
      this.log("UdAsSumTra = " + UdAsSumTra);
      this.log("++=== kateg_RAO ===++");
    },
    checkSostav(selected) {
      if (selected.Name_RN === "тритий") return "тритий"; //тритий
      if (selected.Num_TM > 92) return "трансурановые"; //трансурановые
      if (selected.Kod_gruppy === "б") return "бета"; //бета не трансурановые
      if (selected.Kod_gruppy === "а") return "альфа"; //альфа не трансурановые
    },
    setSostav(sostav) {
      this.log("--=== setSostav ===--");
      this.log(sostav);
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
        this.log("this.codRAO[2].value =" + this.codRAO[2].value);        
      this.log("++=== setSostav ===++");
      return this.codRAO[2].value
    },
    isTrans(Num_TM) {
      return Num_TM > 92 ? "да" : "нет";
    },
    calcPotential(selected) {
      let udal = +selected.MOI;
      this.log("--=== calcPotential ===--");
      // this.log(selected.UdA_TRO);

      if (this.codRAO[0].value === 1) {
        udal = udal * selected.UdA_GRO;
      }
      let per = this.per_pr_year(
        selected.Period_p_r,
        selected.Edinica_izmer_p_r
      );

      let pot = (1.44 * Math.log(selected.UdA / udal) * per).toFixed(2);
      if (pot < 0) pot = 0
      this.log(selected.Name_RN + " = " + pot);
      selected.Potential = pot;
      this.log("++=== calcPotential ===++");
      return pot;
    },
    setPotential(pot) {
      this.log("--=== setPotential ===--");
      this.log("pot = " + pot);
      if (pot > 0) {
        if (this.codRAO[5].value < 1) this.codRAO[5].value = 1;
      }
      if (pot > 100) {
        if (this.codRAO[5].value < 2) this.codRAO[5].value = 2;
      }
      if (pot > 500) {
        if (this.codRAO[5].value < 3) this.codRAO[5].value = 3;
      }
      this.log("this.codRAO[5].value = " + this.codRAO[5].value);
      this.log("++=== setPotential ===++");
    },
    checkLongLife(elem) {
      return elem.Edinica_izmer_p_r === "лет" && elem.Period_p_r > 31 ? true : false
    },
    setNuclidSostav(elem) {
      switch (this.checkSostav(elem)) {
        case "тритий":
          this.sostav[0] = "1";
          this.log("Sostav[0] = 1");
          break;
        case "бета":
          this.sostav[0] = "1";
          this.log("Sostav[0] = 1");
          break;
        case "альфа":
          this.sostav[1] = "1";
          this.log("Sostav[1] = 1");
          break;
        case "трансурановые":
          this.sostav[2] = "1";
          this.log("Sostav[2] = 1");
          break;
      }      
    },
    calcCodRAO() {
      this.log("--=== calcCodRAO ===--");
      let longlife = false;
      this.codRAO[5].value = 0;
      this.selectedNuclids.forEach((elem, i) => {
        longlife = this.checkLongLife(elem)
        this.setNuclidSostav(elem)
        elem.Udamza = elem.UdA / +elem.MOI;
        let pot = this.calcPotential(elem);
        this.setPotential(pot)
        this.addNuclidFields(elem, pot)
        this.selectedNuclids.splice(i, 1, this.selectedNuclids[i]);        
      });

      longlife ? (this.codRAO[4].value = 1) : (this.codRAO[4].value = 2);
      this.setSostav(this.sostav)
      this.kateg_RAO()
      this.log("4. this.codRAO[2].value =" + this.codRAO[2].value);
      this.log(this.codRAO);

      this.showNuclidsTable = true
      this.log("++=== calcCodRAO ===++")
    },
    reloadVar() {
      this.log("--=== reloadVar ===--")
      this.selectedNuclids.forEach((elem) => {
         elem.Percent = null
         elem.UdA = null
      })
      this.selectedNuclids.splice(0, this.selectedNuclids.length + 1, {})
      this.selectedNuclids = []
      this.log("this.selectedNuclids")
      this.log(this.selectedNuclids)
      this.selected = {}
      // this.codRAO.splice(0)
      this.codRAO = []
      this.codRAO = require("@/db/codRAO.json")
      this.validNuclids = false
      this.codRAO[8].value = "**"
      this.selectedTypes = []
      this.desc = ""
      this.sumAct = null
      this.mass = null
      this.obUdAct = null
      this.sostav = ["0", "0", "0"]
      this.log("++=== reloadVar ===++")
    },
    closeDialog() {
      this.log("--=== closeDialog ===--")
      this.showNuclidsTable = false
      this.reloadVar()
      this.log("++=== closeDialog ===++")
    },
    replaceExponent(value) {
      this.log("--=== replaceExponent ===--")
      this.log("value1 = " + value)
      // if (value.toString().indexOf(",") === -1 && value.toString().indexOf("+") === -1 && value.toString().indexOf("-") === -1) return +value
      if (!value || value == undefined) return ""
      this.log("value2 = " + value)
      if (value && +value) return +value
      this.log("value3 = " + value)
      value = value.toString()
      value = value.replace(",", ".")
      if (value.indexOf("e+") === -1) value = value.replace("+", "e+")
      if (value.indexOf("e-") === -1) value = value.replace("-", "e-")
      this.log("sumAct = " + value)
      this.log("++=== replaceExponent ===++")
      if (+value <= 0) return 0
      else return +value
    },
    recalcSumActFilter() {
      this.log("--=== recalcSumActFilter ===--")
      if (this.showUda === 2) this.sumAct = this.replaceExponent(this.sumAct)
      this.log("++=== recalcSumActFilter ===++")
    },
    recalcObUdActFilter() {
      this.log("--=== recalcObUdActFilter ===--")
      this.obUdAct = this.replaceExponent(this.obUdAct)
      this.log("++=== recalcObUdActFilter ===++")
    },
    recalcUdActFilter(value) {
      return this.replaceExponent(value)
    },
    recalcUdANuclids() {
      if (this.selectedNuclids.length > 0) {
        this.selectedNuclids.forEach((elem) => {
          this.recalcUdA(elem)
        })
      }
    },
    checkExistsNuclid(name) {
      let exists = false
      this.selectedNuclids.forEach((elem) => {
        if (elem.Name_RN === name) exists = true
      })
      return exists ? true : false
    },
    onDragStart(i) {
      this.log("--=== onDragStart ===--")
      this.selected = this.filteredNuclids[i]
      // event.dataTransfer.setData("Text", event.target.id)
      this.log("selected = " + this.selected.Name_RN)
      this.log("++=== onDragStart ===++")
    },
    onDrop() {
      this.log("--=== onDrop ===--")
      this.addNuclid()
      this.log("++=== onDrop ===++")
    },
    checkFilter(filter) {
      this.log("this.filter1 = " + this.filter);
      if (filter === null) return true
      this.log("this.filter2 = " + this.filter);
      if (filter == "" || !filter) return true
      return false
    },
    log(txt) {
      if (this.showlog) console.log(txt);
    }
  },
  created() {
    this.codRAO = require("@/db/codRAO.json")
    this.nuclids = require("@/db/nuclids.json")
    this.typeRAO = require("@/db/typeRAO.json")
  },
  computed: {
    filteredNuclids() {
      if (this.filter === null) this.filter = ""

      if (this.favoriteNuclids === 1)
      return this.nuclids.filter((elem) => {
        return ((this.filter == "" || !this.filter) && elem.favorite === this.favoriteNuclids) 
          ? true 
          : (
          (elem.Name_RN.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
          elem.Name_RN_Lat.toLowerCase().indexOf(this.filter.toLowerCase()) > -1) &&
          elem.favorite === this.favoriteNuclids
        )
      });
      if (this.favoriteNuclids === 0)
      return this.nuclids.filter((elem) => {
        return (this.filter == "" || !this.filter)
          ? true
          : (
          (elem.Name_RN.toLowerCase().indexOf(this.filter.toLowerCase()) > -1 ||
          elem.Name_RN_Lat.toLowerCase().indexOf(this.filter.toLowerCase()) > -1) 
        )
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
    filteredMassItem(edizm) {
      return this.massItems.filter((elem) => {
        return elem.text === edizm
      });
      // return this.typeRAO
    },
    kodRAO() {
      let cod = "";
      this.codRAO.forEach((elem) => {
        cod = cod.toString() + elem.value;
      });
      this.log(cod);
      return cod;
    },
    enabledBTN() {
      return this.validNuclids && this.codRAO[8].value != "**";
    },
  },
};
