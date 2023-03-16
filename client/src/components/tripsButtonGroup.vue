<template>
  <div class="row border-bottom p-2 m-0">

    <div class="col">
      <button class="btn btn-outline-primary"
              @click="isOpen = true"
      >
        Создать поездку
        <car-clock></car-clock>
      </button>
    </div>

  </div>


  <Teleport to="body">
    <popup-component
        :is-open="isOpen"
        @closing="closePopup"
    >
      <form-component
          :item="{}"
          @addTrip="addTrip"
          @closing="closePopup"
      >

        <template #btnSave>
          Создать
          <car-arrow-right></car-arrow-right>
        </template>

        <template #btnDelete>

        </template>

      </form-component>
    </popup-component>
  </Teleport>
</template>

<script>
import CarArrowRight from 'vue-material-design-icons/CarArrowRight'
import CarClock from 'vue-material-design-icons/CarClock';
import popupComponent from "@/components/popupComponent";
import formComponent from "@/components/formComponent";

export default {
  name: "tripsCreateTrip",
  data() {
    return {
      isOpen: false
    }
  },
  emits: ['addTrip',],
  components: {
    CarClock,
    CarArrowRight,
    popupComponent,
    formComponent
  },
  methods: {
    closePopup() {
      this.isOpen = false
    },
    addTrip(trip) {
      this.$emit('addTrip', trip)
    }
  },

}
</script>

<style scoped>

</style>