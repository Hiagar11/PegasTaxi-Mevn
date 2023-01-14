import {ref} from 'vue'
import {currentDate, fixMonth} from "../utils/date.util";

export let actualDate = ref(currentDate);
export let dateCurrent = ref(currentDate)

export const setActualDate = function (date) {
    actualDate.value = date
}

export const setActualMonth = (direction) => {
    let month = +actualDate.value.split('-')[1]
    let year = +actualDate.value.split('-')[0]
    month = month + direction
    month = fixMonth(month)
    if (month > 12) {
        month = '01'
        year++
    }
    if (month < 1) {
        month = 12
        year--
    }
    setActualDate(`${year}-${month}-01`)
}