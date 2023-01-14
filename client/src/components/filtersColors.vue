<template>
  <div class="d-flex flex-column m-3">
    <div class="size mb-2 form-check"
         v-for="item of colors"
         :key="item._id"
    >
      <input class="form-check-input"
             v-model.lazy="inputsValue"
             :value="item.color"
             type="checkbox"
             :style="{outline:`1px solid ${item.color}`}"
             :id="item._id">
      <label class="form-check-label" :for="item._id">Убрать из {{ item.description }}</label>
    </div>
  </div>


</template>

<script>
import {colorsStore, setNoDisplayColor} from "../../store/filterColorStore";


export default {
  name: "filtersColors",
  data() {
    return {
      inputsValue: [],
      colors: [],
    }
  },
  methods: {
    async takeColors() {
      this.colors = await colorsStore()
    },
  },
  computed: {
  },
  mounted() {
    this.takeColors()
  },
  watch: {
    inputsValue(v) {
      setNoDisplayColor(v)
    }
  }
}
</script>

<style scoped>
.size {
  font-size: 20px;
}
</style>