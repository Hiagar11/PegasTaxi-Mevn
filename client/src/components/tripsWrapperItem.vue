<template>
  <div class="item row d-flex align-items-center m-0 p-1">
    <div class="col-1 d-flex">
    <span
        class="m-auto color rounded-circle"
        :style="{backgroundColor: item.color}"
    >
  </span></div>
    <div class="col-1 d-flex">
    <span class="m-auto time">
      {{ item.time }}
  </span></div>

    <div class="col-2 d-flex">
    <span class="m-auto directionFrom">
      {{ item.directionFrom }}
  </span></div>
    <div class="col-2 d-flex">
    <span class="m-auto directionTo">
      {{ item.directionTo }}
  </span></div>

    <div class="col-2 d-flex">
      <span class="m-auto driverFrom" v-if="item.driverFrom !== ''">
                 {{ checkingInfoDriver(item.color, item.driverFrom, 'driverFrom').name }}
          <account-remove-outline v-if="checkingInfoDriver(item.color, item.driverFrom, 'driverFrom').isDeleted"/>
      </span>

    </div>
    <div
        class="col-2 d-flex">
   <span class="m-auto driverFrom" v-if="item.driverTo !== ''">
            {{ checkingInfoDriver(item.color, item.driverTo, 'driverTo').name }}
          <account-remove-outline v-if="checkingInfoDriver(item.color, item.driverTo, 'driverTo').isDeleted"/>
      </span>

    </div>

    <div class="col-1 d-flex">
    <span class="m-auto comments w-100 h-50">
      <strong>{{ item.money }}</strong>
  </span></div>
    <div class="col-1 d-flex ">
    <span class="m-auto dragDrop">
<arrow-up-down-bold></arrow-up-down-bold>
    </span>
    </div>
  </div>
</template>

<script>
import arrowUpDownBold from 'vue-material-design-icons/ArrowUpDownBoldOutline'
import AccountRemoveOutline from 'vue-material-design-icons/AccountRemoveOutline'
import {mapStores} from "pinia";
import {useUserStore} from "../../store/users.store";
import {useDirectionStore} from "../../store/directions.store";

export default {
  name: "TripsItem",
  props: {
    item: {
      require: true,
      type: Object,
    },
  },
  computed:{
    ...mapStores(useUserStore, useDirectionStore)
  },
  methods: {
    checkingInfoDriver(color, _id, property) {
     const direction = this.directionStore.getDirectionInfo(color);
     const driver = direction[property].filter(item => item._id === _id);
      if(driver.length) {
        return {name: driver[0].name, isDeleted: false}
      } else {
        return {name: this.userStore.getUserNameById(_id), isDeleted: true}
      }
    },


  },
  components: {
    arrowUpDownBold,
    AccountRemoveOutline
  },
  emits: ['closing']
}
</script>

<style scoped lang="scss">
.color {
  width: 25px;
  height: 25px;
}

.dragDrop {
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
</style>