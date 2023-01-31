<template>
<component :is="selectedComponent"></component>
</template>

<script>
import adminStatisticsComponent from "@/components/adminStatisticsComponent";
import adminRedactorDriversComponent from "@/components/adminRedactorDriversComponent";
export default {
  name: "AdminMain",
  components: {
    adminStatisticsComponent,
    adminRedactorDriversComponent
  },
  props: {
    selectedComponent: {
      type: String,
      default: "adminStatisticsComponent"
    }
  },

}
</script>

<style scoped>

</style>