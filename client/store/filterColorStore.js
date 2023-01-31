import {ref} from 'vue'
import {takeColors} from "../utils/toServer.util";


export let colorsStore = async () => {
    let {data} = await takeColors()
    return data
}

export let noDisplayColor = ref([]);

export const setNoDisplayColor = (arrColor) => {
    noDisplayColor.value = [...arrColor];
}