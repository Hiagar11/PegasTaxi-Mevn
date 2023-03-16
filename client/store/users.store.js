import {deleteUser, setUser, usersFromDb} from "../utils/user.toServer";
import {defineStore} from "pinia/dist/pinia";

export const useUserStore = defineStore('user', {
    state:() => ({
        usersStore: [],
    }),
    actions: {
        async addUsersToStore(user, method) {
            let response = await setUser(user, method);
            if (response.code === 403) {
                return response.msg
            } else {
                if (method === 'post') {
                    this.usersStore.push(response.user);
                    return response.msg
                } else if (method === 'put') {
                    const index = this.usersStore.findIndex(item => item._id === user._id);
                    this.usersStore.splice(index,1, response.user)
                    return response.msg
                }

            }

        },
        async loadUsersFromDB() {
            this.usersStore = await usersFromDb();
        },
        async deleteUsersToStore(_id) {
            const obj = await deleteUser(_id);
            this.usersStore = this.usersStore.filter(item => {return item._id !== _id});
            return obj
        },
        getUsersInfoById(id) {
            return this.usersStore.filter(item => item._id === id)[0] || []
        },
        getUserNameById(id) {
            if (this.usersStore.filter(item => item._id === id)[0]) {
                return this.usersStore.filter(item => item._id === id)[0].name
            } else {
                return 'Удален'
            }
        },
        getUser(name) {
            return this.usersStore.filter(item => item.name === name)
        },
    },
    getters: {
        getUsers(state) {
            return state.usersStore
        },

    }
})