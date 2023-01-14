<template>
  <div class="row flex-column">
    <div class="col calendar w-100 border-bottom border-dark">
      <calendar-component @jsonDate="jsonDate"></calendar-component>
    </div>
    <div class="col filters overflow-auto w-100">
      <filters-colors></filters-colors>
    </div>
  </div>
</template>

<script>
import calendarComponent from "@/components/calendarComponent";
import filtersColors from "@/components/filtersColors";

export default {
  name: "trips-aside",
  components: {
    calendarComponent,
    filtersColors
  },
  methods: {
    jsonDate(jsonDate) {
      this.$emit("jsonDate", jsonDate)
    },
  }
}
</script>

<style scoped>
</style>