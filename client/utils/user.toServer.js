import axios from "axios";
import {useTokenStore} from "../store/token.store";


export const findUser = async (login, password) => {
    try{
        return await axios({
            url: `http://localhost:3000/login`,
            method: 'post',
            data: {login, password}
        });
    } catch (e) {
        if (e.response.status === 403) {
            return false
        } else {
            throw new Error(e)
        }
    }
}
export const usersFromDb = async() => {
    const token = useTokenStore();
    try {
        return await axios({
            headers: {
                authorization: `Bearer ${token.getToken}`
            },
            url: `http://localhost:3000/users`,
            method: 'get',
        }).then(res => res.data)
    } catch (e) {
        console.log(e)
        if (e.response.status === 403) {
            token.setUserToken('')
            return []
        } else {
            throw new Error(e)
        }
    }
}
export const setUser = async(user, method) => {
    const token = useTokenStore();
    try {
        return await axios({
            headers: {
                authorization: `Bearer ${token.getToken}`
            },
            url: `http://localhost:3000/users/`,
            method: method,
            data: user,
        }).then(res => res.data)
    } catch (e) {
        if (e.response.status === 403) {
            token.setUserToken('')
            return []
        } else {
            throw new Error(e)
        }
    }
}
export const deleteUser = async(id) => {
    const token = useTokenStore();
    try {
        return await axios({
            headers: {
                authorization: `Bearer ${token.getToken}`
            },
            url: `http://localhost:3000/users/`,
            data: {id},
            method: 'delete',
        }).then(res => res.data)
    } catch (e) {
        if (e.response.status === 403) {
            token.setUserToken('')
            return []
        } else {
            throw new Error(e)
        }
    }
}