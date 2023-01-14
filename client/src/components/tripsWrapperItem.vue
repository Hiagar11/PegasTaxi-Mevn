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

    <div class="col-2 d-flex"
         v-if="item.color !== 'red'"
    >
      <span class="m-auto driverFrom" v-if="item.driverFrom !== ''">
         {{ item.driverFrom }}
      </span>
      <account-question-outline :style="{color: 'darkblue'}" class="m-auto" v-else/>
    </div>
    <div
        class="col-2 d-flex"
        :class="{'col-4': item.color === 'red'}"
    >
   <span class="m-auto driverFrom" v-if="item.driverTo !== ''">
         {{ item.driverTo }}
      </span>
      <account-question-outline :style="{color: item.color === 'red' ? 'darkred' : 'darkgreen'}" class="m-auto" v-else/></div>

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
import accountQuestionOutline from 'vue-material-design-icons/AccountQuestionOutline'

export default {
  name: "TripsItem",
  props: {
    item: {
      require: true,
      type: Object,
    },
  },
  components: {
    arrowUpDownBold,
    accountQuestionOutline
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