import axios from "axios";
import {setUserToken, userToken} from "../store/user.store";
import {actualDate} from "../store/dateStore";


export const takeTripsFromDb = async (date) => {
    try {
        return await axios({
            headers: {
                authorization: `Bearer ${userToken.value}`
            },
            url: `http://localhost:3000/trips/${date}`,
            method: 'get',
        }).then(res => res.data)
    } catch (e) {
        if (e.response.status === 403) {
            setUserToken('')
            return []
        } else {
            throw new Error(e)
        }
    }
}

export const updateOrCreateTrip = async (data, method) => {
    data.date = actualDate.value
    return await axios({
        url: `http://localhost:3000/trips/`,
        method: method,
        data: data,
    });
}
export const deleteTrip = async (id) => {
    return await axios({
        url: `http://localhost:3000/trips/`,
        method: 'delete',
        data: {
            id,
            date: actualDate.value
        },
    });
}
export const takeColors = async () => {
    return await axios({
        url: `http://localhost:3000/colors/`,
        method: 'get',
    });
}


export const findUser = async (login, password) => {
    try{
        return await axios({
            url: `http://localhost:3000/users`,
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

export const getTripsMonth = async(str) => {
    try {
        return await axios({
            headers: {
                authorization: `Bearer ${userToken.value}`
            },
            url: `http://localhost:3000/trips?date=${str}`,
            method: 'get',
        }).then(res => res.data)
    } catch (e) {
        if (e.response.status === 403) {
            setUserToken('')
            return []
        } else {
            throw new Error(e)
        }
    }
}