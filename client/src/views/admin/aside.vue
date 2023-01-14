<template>
<div class="row mt-5 p-2">
  <div class="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
    <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio1" autocomplete="off" checked>
    <label class="btn btn-outline-dark" @click="selectNameComponent('statisticsComponent')" for="vbtn-radio1">Статистика</label>
    <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio2" autocomplete="off">
    <label class="btn btn-outline-dark" @click="selectNameComponent('hello')" for="vbtn-radio2">Radio 2</label>
    <input type="radio" class="btn-check" name="vbtn-radio" id="vbtn-radio3" autocomplete="off">
    <label class="btn btn-outline-dark" @click="selectNameComponent('statisticsComponent')" for="vbtn-radio3">Radio 3</label>
  </div>
</div>

</template>

<script>

export default {
  name: "AdminAside",
  methods: {
    selectNameComponent(name) {
      this.$emit('selectComponent', name)
    }
  }
}
</script>

<style scoped>

</style>