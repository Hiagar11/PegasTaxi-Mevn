<template>
  <table class="table table-striped text-center p-0 m-0">
    <thead>
    <tr>
      <th
          v-for="item of getNamesWeek"
          :key="item"
      >
        {{ item }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item of WEEKS_OF_TABLE"
        :key="item"
    >
      <td
          class="day"
          v-for="(day, index) of fillDaysOfTable(DAYS_OF_WEEK, item-1)"
          :key="index"
          :class="{today: day === today && currentMonth === month && currentYear === year,
          selectedDayOnTable: day === selectedDayOnTable}"
          @click="selectDay(day)"
      >
        {{ day }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {
  getLenghMonth, getFirstDayOfMonth,
  getWeekNames
} from "../../utils/date.util";
import {getRange} from "../../utils/number.util";
import {dateCurrent} from "../../store/dateStore";

export default {
  name: 'calendarComponentTable',
  data() {
    return {
      WEEKS_OF_TABLE: 6,
      DAYS_OF_WEEK: 7,
      arrDays: [],
      today: new Date().getDate(),
    }
  },
  props: {
    year: {
      type: Number,
      require: true
    },
    month: {
      type: Number,
      require: true
    },
    selectedDayOnTable: {
      type: Number
    },
  },
  emits: {
    selectedDay: null
  },
  methods: {
    fillArrDays() {
      this.arrDays = [];
      let monthLength = getLenghMonth(this.year, this.month);
      this.arrDays = [...this.arrDays, ...getRange(1, monthLength)];
      for (let i = 0; i < getFirstDayOfMonth(this.year, this.month) - 1; i++) {
        this.arrDays.unshift('');
      }
    },
    fillDaysOfTable(num, row) {
      return this.arrDays.slice(num * row, ((num * row) + num))
    },
    selectDay(day) {
      this.$emit('selectedDay', day)
    }
  },
  computed: {
    currentMonth() {
      return +dateCurrent.value.split('-')[1]
    },
    currentYear() {
      return +dateCurrent.value.split('-')[0]
    },
    getNamesWeek() {
      return getWeekNames
    }
  },
  watch: {
    month() {
      this.fillArrDays();
    }
  },
  mounted() {
    this.fillArrDays();
  }
}
</script>

<style lang="scss" scoped>
.day {
  &:hover {
    background-color: rgba(1, 1, 1, 0.3);
    cursor: pointer;
  }
}
.selectedDayOnTable {
  color: red !important;
  outline: 1px solid red;
  outline-offset: -4px;
}
.today {
  font-weight: bolder;
  outline: 1px solid black;
  outline-offset: -5px;
}

</style>