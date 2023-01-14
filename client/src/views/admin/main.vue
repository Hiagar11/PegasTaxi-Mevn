<template>
<component :is="selectedComponent"></component>
</template>

<script>
import statisticsComponent from "@/components/adminStatisticsComponent";
export default {
  name: "AdminMain",
  components: {
    statisticsComponent
  },
  props: {
    selectedComponent: {
      type: String,
      default: "statisticsComponent"
    }
  },

}
</script>

<style scoped>

</style>