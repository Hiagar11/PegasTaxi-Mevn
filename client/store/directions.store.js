import {getDirections, setDirection, updateDirection} from "../utils/direction.toServer";
import {defineStore} from "pinia/dist/pinia";
import {useUserStore} from "./users.store";

export const useDirectionStore = defineStore('direction', {
    state: () => ({
        noDisplayColor: [],
        directions: [],
    }),
    actions: {
        async loadDirectionsFromDB() {
            const {data} = await getDirections();
            this.directions = data;
        },
        getDirectionInfo(color) {
            const storeUsers = useUserStore();
            const direction = this.directions.filter(item => item.color === color)[0];
            const directionTo = this.directions.filter(item => item._id === direction.direction)[0] || [];
            const driverFrom = storeUsers.getUsers.filter(item => item.geo === direction._id)
            const driverTo = storeUsers.getUsers.filter(item => item.geo === direction.direction)
            return {
                directionFrom: direction.locations,
                directionTo: directionTo.locations || [],
                driverFrom,
                driverTo: driverTo || []
            }
        },
        getRelatedDirection(id) {
            const direction = this.directions.filter(item => item._id === id)[0];
            if (direction) {
                return direction
            } else {
                return {title: 'Нет связи', color:'black'}
            }
        },
        getColorRelatedDirection(id) {
            const direction = this.directions.filter(item => item._id === id)[0];
            if (direction) {
               return direction.color
            } else {
                return '#ffffff'
            }
        },
        setNoDisplayColor(value) {
            this.noDisplayColor = value;
        },
        getColorByIdDirection(id){
            return this.directions.filter(item => item._id === id).map(item => {return item.color})
        },
        deleteDirectionStore(id) {
            this.directions = this.directions.filter(item => item._id !== id)
        },
        async addDirection(direction) {
            if (direction._id) {
                const {data} = await updateDirection(direction);
                this.directions.map(item => {
                    if(item._id === direction._id) {
                        return data
                    }
                })
                return 'Направление изменено'
            } else {
                const {data} = await setDirection(direction)
                this.directions.push(data)
                return "Hаправление сохранено"
            }

        }
    },
    getters: {
        getColors(state) {
            return state.directions.map(item => {return item.color});
        },
        getDirections(state) {
            return state.directions
        }
    }
})