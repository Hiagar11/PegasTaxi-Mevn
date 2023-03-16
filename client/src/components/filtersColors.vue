<template>
  <div class="d-flex flex-column m-3">
    <div class="size mb-2 form-check"
         v-for="item of directionStore.directions"
         :key="item._id"
    >
      <input class="form-check-input"
             v-model.lazy="inputsValue"
             :value="item.color"
             type="checkbox"
             :style="{outline:`1px solid ${item.color}`}"
             :id="item._id">
      <label class="form-check-label" :for="item._id">Убрать {{ item.title }}</label>
    </div>
  </div>


</template>

<script>
import {mapStores} from "pinia";
import {useDirectionStore} from "../../store/directions.store";

export default {
  name: "filtersColors",
  data() {
    return {
      inputsValue: [],
    }
  },
  computed: {
    ...mapStores(useDirectionStore)
  },
  watch: {
    inputsValue(v) {
      this.directionStore.setNoDisplayColor(v)
    }
  }
}
</script>

<style scoped>
.size {
  font-size: 20px;
}
</style>