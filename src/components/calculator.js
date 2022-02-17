import Radios from "./views/Radios.vue";
import RadioNuclids from "./views/RadioNuclids.vue";
import Kod from "./views/Kod.vue";
import FileSaver from 'file-saver'

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
      selected: {},
      selectedMin: {},
      selectedNuclids: [],
      showNuclidsTable: false,
      showlog: false,
      codRAO: [],
      classRAO: [],
      classTRONum: 4,
      typeRAO: [],
      sostav: ["0", "0", "0"],             //[бета, альфа, трансурановые]
      dialog: false,
      kod: true,
      ozri: 2,
      selectedTypes: [],
      UdAsSum: [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
      desc: "",
      rules: {
        required: value => !!value || 'Введите значение',
        percent: value => value <= 100 || 'Не более 100%',
        percentPlus: value => value > 0 || 'Должно быть больше 0',
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
      oldAgregate: 2,
    };
  },
  components: {
    Radios,
    RadioNuclids,
    Kod,
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.kodRAO);
    },

    activeMenu(idx) {
      return idx === 8
        ?  this.codRAO[8].radios
        : this.codRAO[idx].radios.filter((elem) => {
          return elem.id === this.codRAO[idx].value
        })
    },

    addNuclid() {
      this.log("--=== addNuclid ===--");
      if (this.selectedNuclids.length === 0 || !this.checkExistsNuclid(this.selected.Name_RN)) {
        this.selectedNuclids.push(this.selected);
        this.isCorrect();				
      }
      this.log("++=== addNuclid ===++");
    },

    delNuclid() {
      this.log("--=== delNuclid ===--");
      this.selectedNuclids.splice(
        this.selectedNuclids.indexOf(this.selectedMin),
        1
      );
      this.isCorrect();
      this.log("++=== delNuclid ===++");
    },

    toExp(value) {
      this.log("toExp value = " + value)
      value = +value
      if (typeof(value) === 'number')
        return value > 10000 ? value.toExponential(2)	: value
    },

    addNuclidFields(selected, pot) {
      this.log("--=== addNuclidFields ===--");
      selected.Trans = this.isTrans(selected.Num_TM);
      selected.Period = `${this.toExp(selected.Period_p_r)} ${selected.Edinica_izmer_p_r}`
      selected.UdAUnit = `${selected.UdA} Бк/г`;
      selected.Sostav = this.checkSostav(selected);
      this.log("addNuclidFields: pot =" + pot)
      if (pot != "не определен") {
        selected.Udamza = selected.UdA / +selected.MOI
        selected.Potential = `${this.toExp(pot)} лет`
      } else selected.Potential = "не определен"
 
      this.log("++=== addNuclidFields ===++");
      this.log("selected.PZUA = " + selected.PZUA)
    },

    getMOI(MOI) {
      this.log("getMOI(MOI).MOI = " + MOI)
      MOI && MOI != "NULL" && MOI != null && MOI != "-"
        ? MOI = +MOI
        : MOI = '-'
      this.log("getMOI(MOI).+MOI =" + MOI)
      return MOI
    },

    checkPotential(elem) {
      if (this.codRAO[0].value === 2) {
        if (+elem.UdA_TRO) elem.PZUA = +elem.UdA_TRO 
        else {
          elem.PZUA = '-'
        }
      }
      if (this.codRAO[0].value === 1) {
        if (+elem.UdA_GRO) elem.PZUA = +elem.UdA_GRO
        else {
          elem.PZUA = '-'
        }
      }
      return elem.PZUA
    },

    calcCodRAO() {
      this.log("--=== calcCodRAO ===--");
      let longlife = false
      this.codRAO[5].value = 0;
      this.log(this.selectedNuclids),
        this.selectedNuclids.forEach((elem, i) => {
        if (!longlife) this.checkLongLife(elem) ? longlife = this.checkLongLife(elem) : longlife = false
        this.setNuclidSostav(elem)
        let pot = null
        this.log("Before getMOI(MOI) elem.MOI =" + elem.MOI)
        elem.MOI = this.getMOI(elem.MOI) 
        this.log("elem.MOI =" + elem.MOI)


  
        elem.MOI === '-' 
          ? (
            pot = 'не определен',
            elem.Potential = 'не определен',
            this.log("Pot не определен"),
            elem.Udamza = 0,
            // this.codRAO[5].value = 0,
            // this.setRAO_Potential(pot),
            elem.PZUA = this.checkPotential(elem), 
            this.addNuclidFields(elem, pot)
          )
          : (
            this.log("Pot определен"),
            pot = this.calcPotential(elem),
            elem.PZUA = this.checkPotential(elem),
            elem.PZUA === '-' ? pot = 'не определен' : this.setRAO_Potential(pot),
            this.addNuclidFields(elem, pot)
          )
        this.selectedNuclids.splice(i, 1, this.selectedNuclids[i]);        
      })
      if (this.isNotRAO())
      {
        alert('Удельная активность ниже ПЗУА. Не является РАО!')
      } 
      else
      {
        longlife ? (this.codRAO[4].value = 1) : (this.codRAO[4].value = 2)
        this.setSostav(this.sostav)
        this.kateg_RAO()
        if (this.codRAO[0].value != 2) {this.showNuclidsTable = true}
        if (this.codRAO[0].value === 2) {
          this.checkClass_RAO()
            ? this.showNuclidsTable = true
            : alert('Установленный класс РАО не соответствует расчетному. Может принимать значения: 0, '+ this.classTRONum +'.')
        }
      }
       this.log("++=== calcCodRAO ===++")				
    },

    calcPercentsSum() {
      let sumPercents = 0
      this.selectedNuclids.forEach((elem) => {sumPercents += +elem.Percent})
      return sumPercents
    },

    checkPercents() {
      this.log("--=== checkPercents ===--");
      if (this.selectedNuclids.length === 0) return false;
      if (this.calcPercentsSum() > 100) {
        alert("Сумма значений процентов не может превышать 100!")
        return false
      }
      this.log("++=== checkPercents ===++");
      return true
    },
    
    isNotRAO() {
      this.log("--=== isNotRAO ===--");
      let rao = 0
      let res = true
      this.log("this.selectedNuclids.length = " + this.selectedNuclids.length)
      if (this.selectedNuclids.length === 1) {
        this.log("this.selectedNuclids[0].UdA = " + this.selectedNuclids[0].UdA)
        this.log("this.selectedNuclids[0].PZUA = " + this.selectedNuclids[0].PZUA)
        this.selectedNuclids[0].PZUA != '-'
          ? this.selectedNuclids[0].UdA > this.selectedNuclids[0].PZUA 
            ? (res = false, 
              this.log("res = false"))
            : (res = true, 
              this.log("res = true"))
          : res = false 
          }	
        else 
      {
        this.selectedNuclids.forEach((elem) => {
          this.log("elem.UdA = " + elem.UdA)
          this.log("elem.PZUA = " + elem.PZUA)
          if (+elem.PZUA > 0) {
            rao += +elem.UdA / +elem.PZUA
            this.log("forEach rao = " + rao)
          }
        })
        this.log("rao = " + rao)
        rao > 1 ? res = false : res = true
      }
      return res
    },

    isCorrect() {
      let per = false;
      if (this.showUda != 0) {
        if (!this.checkPercents()) return this.validNuclids = false
        if (this.selectedNuclids.length === 0) return false
        this.log(this.selectedNuclids)
      }
      this.selectedNuclids.forEach((elem) => {
        if (this.showUda === 0) {
          if (elem.UdA) elem.UdA = this.toExp(this.replaceExponent(elem.UdA))
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
      if (this.showUda === 2) {this.obUdAct = this.toExp((+this.sumAct / (+this.mass * +this.selectedMass)))}

      elem.UdA = this.toExp(this.obUdAct * elem.Percent / 100)
      if (+elem.UdA <= 0) elem.UdA = 0
      this.UdAKey += 1
      this.log("++=== recalcUdA ===++");
    },

    changeTypeRAO() {
      this.log("--=== changeTypeRAO ===--")
      this.log(this.selectedTypes);
      if (this.selectedTypes) {
        this.desc = this.selectedTypes.description
        this.codRAO[8].value = this.selectedTypes.cod
        let items = {}
        items.id = this.selectedTypes.cod
        items.text = this.desc
        if(this.selectedTypes.cod === "94") this.codRAO[7].value = 5
        if (!this.checkEnabledItems(7)) this.codRAO[7].value = 0

        this.codRAO[8].radios.splice(0, 1, items)
        this.log(this.codRAO[8].radios)        
      }
      else
      {
        this.desc = ""
      }
      this.log("++=== changeTypeRAO ===++")
    },

    setOZRI() {
      this.log("--=== setOZRI ===--")
      this.ozri === 1 
      ? this.codRAO[1].value = 4 
      : this.codRAO[1].value = 0
      this.log("++=== setOZRI ===++")
    },

    setShowKod() {
      this.log("--=== setShowKod ===--")
      this.$emit((this.showKod = false))
      this.log(this.showKod)
      this.log("++=== setShowKod ===++")
    },

    checkEnabledItems(idx) {
      this.log("--=== checkEnabledItems ===--")
      this.log("idx = " + idx)
      let vard = false
      this.codRAO[idx].radios.filter((elem) => {
      if (!vard && elem.id === this.codRAO[idx].value && elem.enabled.includes(this.section))
          vard = true
      })
      this.log("vard = " + vard)

      return vard
    },

    changeValue() {
      this.log("--=== changeValue ===--")
      if (this.oldAgregate != this.codRAO[0].value) {
        this.oldAgregate = this.codRAO[0].value
        this.desc = ""
        this.selectedTypes = ""
        this.codRAO[8].value = "**"
        if (!this.checkEnabledItems(6)) this.codRAO[6].value = 0
        if (!this.checkEnabledItems(7)) this.codRAO[7].value = 0
      }
      this.log("++=== changeValue ===++")
    },

    per_pr_min(perVal, per) {
      switch (per) {
        case "лет":
          return this.toExp(perVal * 365 * 24 * 60)
        case "мес":
          return this.toExp(perVal * 31 * 24 * 60)
        case "сут":
          return this.toExp(perVal * 24 * 60)
        case "час":
          return this.toExp(perVal * 60)
        case "мин":
          return this.toExp(perVal)
      }
    },

    setPeriod_per_year(perVal, per) {
      switch (per) {
        case "лет":
          return perVal
        case "мес":
          return perVal / 12
        case "сут":
          return perVal / 365
        case "час":
          return perVal / 24 / 365
        case "мин":
          return perVal / 60 / 24 / 365
      }
    },

    checkClass_RAO() {
      let ar = []
      let res = true
      let long = 9
      let shor = 9

      for (let i = 0; i < 4; i++) {
        let val = this.UdAsSum[i][2]
        let nuc = this.classTRO[i].nuclid
        this.log("nuc = " + nuc)
        this.log("val = " + val)
        ar = this.filteredClassTRO(nuc, val)
        if (ar.length > 0) {
        this.log("+ar[0].long = " + +ar[0].long)
        this.log("+ar[0].short = " + +ar[0].short)

          if (long > +ar[0].long) long = +ar[0].long
          if (shor > +ar[0].short) shor = +ar[0].short
        }
      }
      this.codRAO[4].value === 1 ? this.classTRONum = long : this.classTRONum = shor
      this.log("this.codRAO[7].value = " + this.codRAO[7].value)
      this.log("this.classTRONum = " + this.classTRONum)

      if (this.codRAO[7].value != 0 && this.codRAO[7].value != 9 && this.codRAO[7].value != this.classTRONum) {
        res = false
      } 
      this.log("res = " + res)
      return res
    },

    calcCategory_RAO() {
      let ar = []
      let categ = 0
      let catt = 0
      for (let i = 0; i < 4; i++) {
        let val = this.UdAsSum[i][2]
        this.log("val = " + val)

        switch (this.codRAO[0].value) {
          case 1: {
            let nuc = this.classGRO[i].nuclid
            ar = this.filteredClassGRO(nuc, val)
            break
          }
          case 2: {
            this.log("i = " + i)
            this.log("this.classTRO[i].nuclid = " + this.classTRO[i].nuclid)


            let nuc = this.classTRO[i].nuclid
            ar = this.filteredClassTRO(nuc, val)
            break
          }
        }

        if (ar.length > 0) catt = +ar[0].sum
        if (catt > categ) categ = catt
      }
      this.codRAO[1].value = categ
      return ar[0]
    },

    kateg_RAO() {
      this.log("--=== kateg_RAO ===--");
      if (this.ozri === 1 && this.codRAO[0].value === 2) return 4
      this.codRAO[1].value = 0;

      if (this.codRAO[0].value === 3) 
      this.codRAO[1].value = 9
      else 
      this.selectedNuclids.forEach((elem) => {
        this.log("kateg_RAO() elem.Sostav = " + elem.Sostav);

        switch (elem.Sostav){
          case "тритий": {
            this.checkLongLife(elem) ? this.UdAsSum[0][0] += +elem.UdA : this.UdAsSum[0][1] += +elem.UdA
            this.UdAsSum[0][2] += +elem.UdA
            break
          }
          case "бета": {
            this.checkLongLife(elem) ? this.UdAsSum[1][0] += +elem.UdA : this.UdAsSum[1][1] += +elem.UdA
            this.UdAsSum[1][2] += +elem.UdA
            break
          }
          case "альфа": {
            this.checkLongLife(elem) ? this.UdAsSum[2][0] += +elem.UdA : this.UdAsSum[2][1] += +elem.UdA
            this.UdAsSum[2][2] += +elem.UdA
            break
          }
          case "трансурановые": {
            this.checkLongLife(elem) ? this.UdAsSum[3][0] += +elem.UdA : this.UdAsSum[3][1] += +elem.UdA
            this.UdAsSum[3][2] += +elem.UdA
            break
          }
        }

        this.calcCategory_RAO()
      });
      this.log(this.UdAsSum)
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
      this.log("--=== calcPotential ===--");
      let pot = 'не определен' 
      if (selected.MOI != "-") {
        let udal = +selected.MOI
        this.log("udal = " + udal);
        if (this.codRAO[0].value === 1) {
          // udal = udal * selected.UdA_GRO
          udal = 0.1 * selected.UdA_GRO
        }
        let per = this.setPeriod_per_year(selected.Period_p_r, selected.Edinica_izmer_p_r)
        pot = (1.44 * Math.log(selected.UdA / udal) * per).toFixed(1)

        if (pot < 0) pot = 0
        this.log(selected.Name_RN + " = " + pot)
      }

      this.log("++=== calcPotential ===++");        

      return pot
    },

    setRAO_Potential(pot) {
      this.log("--=== setRAO_Potential ===--");
      this.log("pot = " + pot);
      if (!+pot) this.codRAO[5].value = 0
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
      this.log("++=== setRAO_Potential ===++");
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
      this.codRAO = []
      this.codRAO = require("@/db/codRAO.json")
      this.UdAsSum = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
      //[тритий:[долго, коротко, сумма], бета[...], альфа[...], транс[...]]

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
      if (!value || value == undefined) return ""
      this.log("value2 = " + value)
      if (value && +value) return +value
      this.log("value3 = " + value)
      value = value.toString()
      value = value.replace(",", ".")
      if (value.indexOf("e+") === -1) value = value.replace("+", "e+")
      if (value.indexOf("e+") === -1) value = value.replace("е", "e")
      if (value.indexOf("e-") === -1) value = value.replace("-", "e-")
      if (value.indexOf("e-") === -1) value = value.replace("е", "e")
      this.log("sumAct = " + value)
      this.log("++=== replaceExponent ===++")
      if (+value <= 0) return 0
      else return +value
    },

    recalcSumActFilter() {
      this.log("--=== recalcSumActFilter ===--")
      if (this.showUda === 2) this.sumAct = this.toExp(this.replaceExponent(this.sumAct))
      this.log("++=== recalcSumActFilter ===++")
    },

    recalcObUdActFilter() {
      this.log("--=== recalcObUdActFilter ===--")
      this.obUdAct = this.toExp(this.replaceExponent(this.obUdAct))
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
    },

    filteredClassTRO(nuclid, value) {
      return this.filteredClassNuclidTRO(nuclid)[0].ranges.filter((elem) => {
        return elem.begin < value && value <= elem.end
      });
      // this.log("++=== filteredClassTRO ===++");
    },

    filteredClassNuclidTRO(nuclid) {
      this.log("--=== filteredClassNuclidTRO ===--");
      return this.classTRO.filter((elem) => {
        return elem.nuclid === nuclid
      });
      // this.log("++=== filteredClassNuclidTRO ===++");
    },

    filteredClassGRO(nuclid, value) {
      return this.filteredClassNuclidGRO(nuclid)[0].ranges.filter((elem) => {
        return elem.begin < value && value <= elem.end
      });
      // this.log("++=== filteredClassTRO ===++");
    },

    filteredClassNuclidGRO(nuclid) {
      this.log("--=== filteredClassNuclidGRO ===--");
      return this.classGRO.filter((elem) => {
        return elem.nuclid === nuclid
      });
      // this.log("++=== filteredClassNuclidTRO ===++");
    },		
    saveFile() {
      this.log("--=== saveFile ===--");
      const data = JSON.stringify(this.codRAO)
      this.log(data);
      const blob = new Blob([data], {type: 'application/json'})
      FileSaver.saveAs(blob, `File name.json`)
      this.log("++=== saveFile ===++");
    },
  },

  created() {
    this.codRAO = require("@/db/codRAO.json")
    this.nuclids = require("@/db/nuclids.json")
    this.typeRAO = require("@/db/typeRAO.json")
    this.classTRO = require("@/db/classTRO.json")
    this.classGRO = require("@/db/classGRO.json")
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
        return elem.section.includes(this.section)
      });
    },

    filteredMassItem(edizm) {
      return this.massItems.filter((elem) => {
        return elem.text === edizm
      });
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
      return this.validNuclids && this.codRAO[8].value != "**" && this.desc != "";
    },

    section() {
      return this.ozri === 1 && this.codRAO[0].value === 2
      ? 4 // ОЗРИ
      : this.codRAO[6].value > 1 && this.codRAO[0].value === 2
        ? 5 // Твердые, переработанные
        : this.codRAO[0].value
    }
  },
};
