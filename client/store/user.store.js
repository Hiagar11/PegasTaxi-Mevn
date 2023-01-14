import {ref} from 'vue'

const token = window.localStorage.getItem('token') || null;
let user = window.localStorage.getItem('user') || '';

if(user !== '') {
    user = JSON.parse(user)
}

export let userToken = ref(token);
export let User = ref(user);


export const setUserToken = (token) => {
    userToken.value = token;
}
 export const setUserData = (data) => {
    User.value = data
 }