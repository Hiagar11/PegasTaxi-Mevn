<template>
  <div>
    <trips-button-group
        @addTrip="addTrip"
    ></trips-button-group>
    <div class="trips-list row flex-column p-0 m-0 overflow-auto flex-nowrap">
      <div v-if="trips.length" class="p-0 m-0">
        <trips-wrapper
            v-for="(item, index) of filteredTrips"
            :key="item.id"
            :index="index"
            :item="item"
            :spinner="spinner"
            @deleteOne="deleteTripOne"
        ></trips-wrapper>
      </div>
      <div v-else class="p-2 m-0"
      >На этот день поездок пока нет.
      </div>
    </div>
  </div>
</template>

<script>
import {deleteTrip, getTripsFromDb} from "../../../utils/trip.toServer";

import tripsWrapper from "@/components/tripsWrapper";
import tripsButtonGroup from "@/components/tripsButtonGroup";
import {useDirectionStore} from "../../../store/directions.store";
import {mapStores} from "pinia";
import {useDateStore} from "../../../store/date.store";


export default {
  name: "trips-main",
  components: {
    tripsWrapper,
    tripsButtonGroup
  },
  data() {
    return {
      trips: [],
      spinner: false,
    }
  },
  computed: {
    ...mapStores(useDateStore, useDirectionStore),
    actualDate() {
      return this.dateStore.actualDate
    },
    filteredTrips() {
      let tripsFiltered = [];
      this.directionStore.noDisplayColor.forEach(color => {
        if(!tripsFiltered.length) {
          tripsFiltered = [...this.trips]
        }
        tripsFiltered = tripsFiltered.filter(item => item.color !== color)
      })
      if (! this.directionStore.noDisplayColor.length) return this.trips
      return tripsFiltered
    }
  },
  methods: {
    async getTrips(date) {
      this.trips = await getTripsFromDb(date);
    },
    async deleteTripOne(_id) {
      this.spinner = true;
     let res = await deleteTrip(_id);
      if(res.status === 200) {
        this.spinner = false;
        this.trips.splice(this.trips.findIndex(item => item._id === _id),1);
      }
    },
    addTrip(trip) {
      this.trips.push(trip)
    }
  },
  watch: {
    actualDate(v) {
      this.getTrips(v)
    },
  },
   mounted() {
    this.getTrips(this.dateStore.actualDate);
  }
}
</script>
