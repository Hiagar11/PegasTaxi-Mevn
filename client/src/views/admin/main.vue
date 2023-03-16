<template>
<component :is="selectedComponent"></component>
</template>

<script>
import adminStatisticsComponent from "@/components/adminStatisticsComponent";
import adminRedactorDriversComponent from "@/components/adminRedactorDriversComponent";
import adminRedactorColorsComponent from "@/components/adminRedactorDirectionComponent";
export default {
  name: "AdminMain",
  components: {
    adminStatisticsComponent,
    adminRedactorDriversComponent,
    adminRedactorColorsComponent
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