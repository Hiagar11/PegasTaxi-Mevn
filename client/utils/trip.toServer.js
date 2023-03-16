import axios from "axios";
import {useTokenStore} from "../store/token.store";
import {useDateStore} from "../store/date.store";

const token = useTokenStore();
const date = useDateStore();

export const updateOrCreateTrip = async (data, method) => {
    data.date = date.actualDate;
    return await axios({
        url: `http://localhost:3000/trips/`,
        method: method,
        data: data,
    });
}
export const deleteTrip = async (_id) => {
    return await axios({
        url: `http://localhost:3000/trips/`,
        method: 'delete',
        data: {
            _id,
            date: date.actualDate
        },
    });
}
export const getTripsMonth = async(str) => {
    try {
        return await axios({
            headers: {
                authorization: `Bearer ${token.userToken}`
            },
            url: `http://localhost:3000/trips?date=${str}`,
            method: 'get',
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
export const getTripsFromDb = async (date) => {
    try {
        return await axios({
            headers: {
                authorization: `Bearer ${token.userToken}`
            },
            url: `http://localhost:3000/trips/${date}`,
            method: 'get',
        }).then(res => res.data)
    } catch (e) {
        if (e.response.status === 403) {
            token.setUserToken('');
            return []
        } else {
            throw new Error(e)
        }
    }
}
