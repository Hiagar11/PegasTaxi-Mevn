import axios from "axios";

export const getDirections = async () => {
    try {
        return await axios({
            url: `http://localhost:3000/directions/`,
            method: 'get',
        });
    } catch (e) {
        console.log(e)
    }
}

export const setDirection = async (data) => {
    try{
        return await axios({
            url: `http://localhost:3000/directions/`,
            method: 'post',
            data: data,
        });
    } catch(e) {
        console.log(e)
    }

}

export const updateDirection = async (data) => {
    try{
        return await axios({
            url: `http://localhost:3000/directions/`,
            method: 'put',
            data: data,
        });
    } catch(e) {
        console.log(e)
    }

}

export const deleteDirectionDb = async (data) => {
    try{
        return await axios({
            url: `http://localhost:3000/directions/${data}`,
            method: 'delete',
        });
    } catch(e) {
        console.log(e)
    }

}