<template>
  <form class="p-0 m-0" @submit.prevent="submit" action="" ref="form">
    <div class="row align-items-center px-2 m-0">
      <input type="text" class="visually-hidden" name="id" v-model="form._id">

      <div class="col-1 d-flex">
        <input type="text" name="color" v-model="form.color" class="visually-hidden">
        <div class="colorSelected m-auto" :class="{notSelected: !form.color}" :style="{backgroundColor: form.color || 'transparent'}"
             @click.self="isOpenList = !isOpenList"
        >
          <ul class="colorList" v-if="isOpenList">
            <li
                class="colorItem"
                v-for="item of colors"
                :key="item"
                :style="{backgroundColor: item}"
                @click.self="selectColor(item)"
            ></li>

          </ul>
        </div>
      </div>

      <div class="col-1">
    <span class="m-auto time">
      <input type="time" name="time" v-model="form.time"
             class="p-0 text-center form-control-plaintext"
             required
      >
  </span></div>

      <div class="col-2">
        <select
            required
            name="directionFrom"
            class="form-control-plaintext text-center"
            v-model="form.directionFrom"
            :style="{'color': form.color === 'red' ? 'rgba(1,1,1,0.3)' : 'rgba(1,1,1,1)'}"
            :disabled="form.color === 'red'"
        >
          <option value="" disabled>Откуда</option>
          <option
              v-for="item of selectedDirection.directionFrom"
              :key="item"
          >
            {{item}}
          </option>
        </select>
      </div>

      <div class="col-2">
        <select
            required
            name="directionTo"
            class="form-control-plaintext text-center"
            v-model="form.directionTo"
            :style="{'color': form.color === 'red' ? 'rgba(1,1,1,0.3)' : 'rgba(1,1,1,1)'}"
            :disabled="form.color === 'red'"
        >
          <option value="" disabled>Куда</option>
          <option
              v-for="item of selectedDirection.directionTo"
              :key="item"
          >
            {{item}}
          </option>
        </select>
      </div>

      <div class="col-2">
        <select
            name="driverFrom"
            id=""
            class="text-center p-0 form-control-plaintext"
            v-model="form.driverFrom"
        >
          <option value="" disabled>Кто</option>
          <option
              v-for="item of selectedDirection.driverFrom"
              :key="item._id"
              :value="item._id"
          >
            {{item.name}}
          </option>
        </select>
      </div>

      <div class="col-2">
        <select
            name="driverTo"
            id=""
            class="text-center p-0 form-control-plaintext"
            v-model="form.driverTo"
        >
          <option value="" disabled>С кем</option>
          <option
              v-for="item of selectedDirection.driverTo"
              :key="item._id"
              :value="item._id"
          >
            {{item.name}}
          </option>
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
            v-model="form.money">
        <datalist id="money">
          <option value="1200">1200</option>
          <option value="2400">2400</option>
          <option value="3600">3600</option>
          <option value="4800">4800</option>
        </datalist>
      </div>

      <div class="col-6 mt-3">
        <textarea name="comment" class="form-control m-auto" v-model="form.comment"></textarea>
      </div>

      <div class="col-4 offset-2 mt-auto">
        <div class="row">
          <div class="col d-flex">
            <slot name="btnDelete">
              <input type="string" name="date" v-model="form.date" class="visually-hidden form-control text-center ">
              <span class="form-control-plaintext border rounded-2 text-center">{{ form.date }}</span>
            </slot>
          </div>
          <div class="col">
            <button
                type="submit"
                class="btn btn-primary"
            >
              <slot name="btnSave" v-if="!spinner">
                Сохранить
              </slot>
              <div class="spinner-border" role="status" v-else>
                <span class="visually-hidden">Loading...</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {updateOrCreateTrip} from "../../utils/trip.toServer";
import {mapStores} from "pinia";
import {useDirectionStore} from "../../store/directions.store";
import {useDateStore} from "../../store/date.store";
import {useUserStore} from "../../store/users.store";

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
  },
  data() {
    return {
      colors: [],
      isOpenList: false,
      form: {
        _id: '',
        color: null,
        time: '',
        directionFrom: '',
        directionTo: '',
        driverFrom: '',
        driverTo: '',
        money: '',
        comment: '',
        date: '',
      },
      selectedDirection: {
        directionFrom: [],
        directionTo: [],
        driverFrom: [],
        driverTo: [],
      },
      spinner: false,
    }
  },
  emits: ['closing', 'addTrip'],

  methods: {
    async submit() {
      this.spinner = true;
      if (this.method === 'post') delete this.form._id
      let response = await updateOrCreateTrip(this.form, this.method);
      if (this.method === 'post') this.$emit('addTrip', response.data);
      if (response.status === 200) {
        this.spinner = false;
        this.$emit('closing');
      }
    },
    selectColor(color) {
      this.form.color = color;
      this.isOpenList = false;
      this.selectedDirection = this.directionStore.getDirectionInfo(color);
    }

  },
  computed: {
    ...mapStores(useDirectionStore, useDateStore, useUserStore),
    method() {
      return this.form._id ? 'put' : 'post'
    },
  },
  mounted() {
    this.spinner = true
    this.userStore.loadUsersFromDB().then(() => {this.spinner = false})
    this.colors = this.directionStore.getColors;
     this.form.date = this.dateStore.actualDate;
     if (Object.keys(this.item).length) {
       this.form = this.item;
       this.selectedDirection = this.directionStore.getDirectionInfo(this.item.color)
     }
   },


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
.notSelected {
  border: 1px solid black;
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