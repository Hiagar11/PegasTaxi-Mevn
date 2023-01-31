<template>
<div class="row p-0 m-0">
  <div class="col p-2 pe-5 bg-info text-end">
    <h4>Выберите дату, чтобы просмотреть статистику.</h4>
  </div>
  <div class="row">
    <div class="col my-3">
      <form action="" class="form-control d-flex flex-wrap" @submit.prevent="getModulTrips">
        <input type="number"
               name="year"
               class="form-control me-4 w-25"
               placeholder="Наберите год"
               list="yearHelper"
               v-model="year"
        >
        <datalist id="yearHelper">
          <option
              v-for="year in yearOption"
              :key="year"
              :value="year"
          >{{year}}</option>
        </datalist>
        <select name="month"
                id=""
                class="form-control w-25 me-4"
                v-model="month"
        >
          <option
              v-for="(month, index) in monthOption"
              :value="index + 1"
              :key="month"
          >{{month}}</option>
        </select>
        <button class="btn btn-outline-success ms-auto w-25">Выбрать</button>
      </form>
    </div>
  </div>
  <transition>
    <div class="row m-0 p-0" v-if="tripsInfo">
      <div class="col-12 p-2 pe-5 bg-info text-end">
        Общее количество поездок за месяц: {{tripsInfo.totalTrips}}
      </div>
      <div class="col-12 p-2 pe-5 bg-info text-end">
        Общая сумма: <b>{{tripsInfo.totalMoney}}</b>
      </div>
      <div class="row">
        <div class="col-3 p-2 py-5 m-auto mt-2
         d-flex
          text-center flex-column rounded-2"
        v-for="(trips, index) of tripsInfo.statsTripsMoney"
             :key="index"
             :style="{border: '5px solid ' + trips.color}"
        >
          <span>Сумма: {{trips.money}}</span>
          <span>Количество поездок: {{trips.length}}</span>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import {fixMonth, getCurrentMonthRus} from "../../utils/date.util";
import {getTripsMonth} from "../../utils/toServer.util";
export default {
  name: "adminStatisticsComponent",
  data() {
    return {
      month: '',
      year: '',
      tripsInfo: null
    }
  },
  computed: {
    monthOption() {
      return getCurrentMonthRus.slice(1,13)
    },
    yearOption() {
      let yearNow = new Date().getFullYear();
      let arr = [];
      arr.push(yearNow)
      for (let i=1; i<3; i++) {
        arr.push(yearNow + i)
        arr.unshift(yearNow - i)
      }
      return arr
    },
  },
  methods: {
    async getModulTrips() {
     this.tripsInfo = await getTripsMonth(`${this.year}-${fixMonth(this.month)}-01`);
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>