import {currentDate, fixMonth} from "../utils/date.util";
import {defineStore} from "pinia/dist/pinia";

export const useDateStore = defineStore('date', {
    state: () => ({
        actualDate: currentDate,
        dateCurrent: currentDate,
    }),
    actions: {
        setActualDate(date) {
            this.actualDate = date
        },
        setActualMonth(direction) {
            let month = +this.actualDate.split('-')[1]
            let year = +this.actualDate.split('-')[0]
            month = fixMonth(month + direction)
            if(month > 12) {
                month = '01';
                year++
            }
            if(month < 1 ) {
                month = 12
                year--
            }
            this.setActualDate(`${year}-${month}-01`)

        }
    }
})