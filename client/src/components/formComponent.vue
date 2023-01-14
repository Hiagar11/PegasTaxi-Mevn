<template>
  <form class="p-0 m-0" @submit.prevent="toReloadHandler" action="">
    <div class="row align-items-center px-2 m-0">
      <input type="text" class="visually-hidden" name="id" :value="item._id || ''">

      <div class="col-1 d-flex">
        <input type="text" name="color" :value="selectedColor || 'green'" class="visually-hidden">
        <div class="colorSelected m-auto" :style="{backgroundColor: selectedColor || 'green'}"
             @click.self="isOpenList = !isOpenList"
        >
          <ul class="colorList" v-if="isOpenList">
            <li
                class="colorItem"
                v-for="item of colors"
                :key="item"
                :style="{backgroundColor: item}"
                @click.self="selectedColor = item; isOpenList = false"
            ></li>

          </ul>
        </div>
      </div>

      <div class="col-1">
    <span class="m-auto time">
      <input type="time" name="time" :value="item.time || ''"
             class="p-0 text-center form-control-plaintext"
             required
      >
  </span></div>

      <div class="col-2">
        <select
            required
            name="directionFrom"
            class="form-control-plaintext text-center">
          <option :value="item.directionFrom || ''" selected>{{ item.directionFrom || 'Откуда' }}</option>
          <option value="Uspenka">Uspenka</option>
          <option value="Vokzal">Vokzal</option>
          <option value="Osoboe">Osoboe</option>
        </select>
      </div>

      <div class="col-2">
        <select
            required
            name="directionTo"
            class="form-control-plaintext text-center">
          <option :value="item.directionTo || ''" selected>{{ item.directionTo || 'Куда' }}</option>
          <option value="Donetsk">Donetsk</option>
          <option value="Uspenka">Uspenka</option>
          <option value="Osoboe">Osoboe</option>
        </select>
      </div>

      <div class="col-2"
           v-if="selectedColor !== 'red'"
      >
        <select
            name="driverFrom"
            id=""
            class="text-center p-0 form-control-plaintext"
        >
          <option :value="item.driverFrom || ''" selected>{{ item.driverFrom || 'Кто' }}</option>
          <option :value="''">Не выбран</option>
          <option value="Vladimir">Vladimir</option>
          <option value="Andrew">Andrew</option>
        </select>
      </div>

      <div class="col-2"
           :class="{'col-4': selectedColor === 'red'}"
      >
        <select
            name="driverTo"
            id=""
            class="text-center p-0 form-control-plaintext"
        >
          <option :value="item.driverTo || ''" selected>{{ item.driverTo || 'С кем' }}</option>
          <option :value="''">Не выбран</option>
          <option value="Vladimir">Vladimir</option>
          <option value="Andrew">Andrew</option>
        </select>
      </div>

      <div class="col-2">
        <input
            required
            type="number"
            name="money"
            autocomplete="off"
            class="form-control text-center"
            placeholder="Сумма"
            list="money"
            :value="item.money">
        <datalist id="money">
          <option value="1200">1200</option>
          <option value="2400">2400</option>
          <option value="3600">3600</option>
          <option value="4800">4800</option>
        </datalist>
      </div>

      <div class="col-6 mt-3">
        <textarea name="comment" class="form-control m-auto" :value="item.comment || ''"></textarea>
      </div>

      <div class="col-4 offset-2 mt-auto">
        <div class="row">
          <div class="col d-flex">
            <slot name="btnDelete">
              <input type="date" name="date" :value="fromActualDate" class="visually-hidden form-control text-center ">
              <span class="form-control-plaintext border rounded-2 text-center">{{ fromActualDate }}</span>
            </slot>
          </div>
          <div class="col">
            <button
                type="submit"
                class="btn btn-primary"
            >
              <slot name="btnSave">
                Сохранить
              </slot>
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>

import {actualDate} from "../../store/dateStore";
export default {
  name: "TripsForm",
  props: {
    item: {
      type: Object,
      require: true
    },
    isReductionForm: {
      type: Boolean
    },
    method: {type: String}
  },
  data() {
    return {
      colors: ['red', 'green', 'blue', 'yellow', 'black'],
      selectedColor: "green",
      isOpenList: false,
    }
  },
  emits: ['closing', 'setTrip', 'updateTrip'],
  methods: {
      toReloadHandler(e) {
      let data = Object.fromEntries(new FormData(e.target));
      if (this.method === 'post') {
        this.$emit('setTrip', data);
      } else if (this.method === 'put') {
        this.$emit('updateTrip', data);
      }
      this.$emit('closing')
    },
  },
  computed: {
    fromActualDate() {
      return actualDate.value
    },
  },
  mounted() {
    this.selectedColor = this.item.color
  }
}
</script>

<style scoped lang="scss">
.colorSelected {
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.colorList {
  padding: 0;
  margin: 0;
  position: absolute;
  list-style-type: none;
  top: 26px;
  left: 0;
}

.colorItem {
  padding: 0;
  margin: 1px 0;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 3;

  &:hover {
    opacity: 0.6
  }
}

textarea {
  height: 18vh;
  resize: none;
}

.colorSelect {
  &:active, &:focus, &:hover {
    outline: none;
    background-color: black;
  }
}

.colorOption {
  &:active, &:focus, &:hover {
    outline: none;
    background-color: black;
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}

</style>