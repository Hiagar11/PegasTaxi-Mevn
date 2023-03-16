import {defineStore} from "pinia/dist/pinia";

export const useTokenStore = defineStore('token', {
    state: () => ({
        userToken:  window.localStorage.getItem('token') || null,
        user: JSON.parse(window.localStorage.getItem('userName')) || '',
    }),
    actions: {
        setUserToken(token) {
            this.userToken = token;
        },
        setUserData(data) {
            this.user = data;
        }
    },
    getters: {
        getToken(state) {
            return state.userToken
        },
        getName(state) {
            return state.user
        }
    }
})

