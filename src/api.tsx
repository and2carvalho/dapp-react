import axios from "axios";

export const api = axios.create({
    baseURL: `http://192.168.0.81:5009/api`,
    headers: {
        common: {
            [`Content-Type`]: `application/json`
        }
    }
})