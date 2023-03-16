<template>
  <div class="row flex-column">
    <div class="text-center d-flex p-2 justify-content-around">
      <h4>{{ getMonthName }}</h4> <h4>{{ currYear }}</h4>
    </div>
    <div class="calendar border-top border-bottom p-2">
      <calendar-component-table
          :year="currYear"
          :month="+currMonth"
          :selectedDayOnTable="selectedDay"
          @selectedDay="createFullDate"
      ></calendar-component-table>
    </div>
    <div class="btn-group col-6 ms-auto my-1">
      <button
          class="btn btn-primary"
          @click="setMonth(-1)"
      >
        <arrow-left-bold></arrow-left-bold>
      </button>
      <button
          class="btn btn-primary"
          @click="setMonth(1)"
      >
        <arrow-right-bold></arrow-right-bold>
      </button>
    </div>
  </div>
</template>

<script>
import arrowLeftBold from 'vue-material-design-icons/ArrowLeftBold'
import arrowRightBold from 'vue-material-design-icons/ArrowRightBold'
import calendarComponentTable from './calendarComponentTable'
import {fixDay, fixMonth, getCurrentMonthRus} from "../../utils/date.util";
import {mapStores} from 'pinia'
import {useDateStore} from "../../store/date.store";

export default {
  name: 'calendarComponent',
  components: {
    arrowLeftBold,
    arrowRightBold,
    calendarComponentTable,
  },
  data() {
    return {
      selectedDay: 0,
    }
  },
  methods: {
    setMonth(dir) {
      this.selectedDay = 1;
      this.dateStore.setActualMonth(dir)
    },
    createFullDate(day) {
      this.selectedDay = day
      this.dateStore.setActualDate(`${this.currYear}-${this.currMonth}-${fixDay(day)}` )
    }
  },
  computed: {
    ...mapStores(useDateStore),
    getMonthName() {
      return getCurrentMonthRus[+this.currMonth]
    },
    currMonth() {
      return fixMonth(+this.dateStore.actualDate.split('-')[1])
    },
    currYear() {
      return +this.dateStore.actualDate.split('-')[0]
    }
  },
}
</script>

<style scoped>
.calendar {
  min-height: 42vh;
}
</style>