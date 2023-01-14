<template>


  <trips-button-group
      @setTrip="setTrip"
  ></trips-button-group>


  <div class="trips-list row flex-column p-0 m-0 overflow-auto flex-nowrap">
    <div v-if="trips.length" class="p-0 m-0">
      <trips-wrapper
          v-for="(item, index) of filteredTrips"
          :key="item.id"
          :index="index"
          :item="item"
          @updateTrip="updateTrip"
          @deleteOne="deleteTripOne"
      ></trips-wrapper>
    </div>
    <div v-else class="p-2 m-0"
    >На этот день поездок пока нет.
    </div>
  </div>
</template>

<script>
import {deleteTrip, takeTripsFromDb, updateOrCreateTrip} from "../../../utils/toServer.util";

import tripsWrapper from "@/components/tripsWrapper";
import tripsButtonGroup from "@/components/tripsButtonGroup";
import {actualDate} from "../../../store/dateStore";
import {noDisplayColor} from "../../../store/filterColorStore";


export default {
  name: "trips-main",
  components: {
    tripsWrapper,
    tripsButtonGroup
  },
  data() {
    return {
      trips: [],
    }
  },
  computed: {
    actualDate() {
      return actualDate.value
    },
    filteredTrips() {
      let tripsFiltered = [];
      noDisplayColor.value.forEach(color => {
        if(!tripsFiltered.length) {
          tripsFiltered = [...this.trips]
        }
        tripsFiltered = tripsFiltered.filter(item => item.color !== color)
      })
      if (! noDisplayColor.value.length) return this.trips
      return tripsFiltered
    }
  },
  methods: {
    async getTrips(date) {
      this.trips = await takeTripsFromDb(date);
    },
    async setTrip(tripData) {
      let {data: trip} = await updateOrCreateTrip(tripData, 'post');
      this.trips = [...this.trips, trip]
    },
    async updateTrip(tripData) {
      let {data: trip} = await updateOrCreateTrip(tripData, 'put');
      this.trips[this.trips.findIndex(item => item._id === trip._id)] = trip;
    },
    async deleteTripOne(id) {
      let res = await deleteTrip(id);
      if(res) {
        this.trips.splice(this.trips.findIndex(item => item._id === id),1);
      }
    },
  },
  watch: {
    actualDate(v) {
      this.getTrips(v)
    },
  },
   mounted() {
    this.getTrips(actualDate.value);
  }
}
</script>
