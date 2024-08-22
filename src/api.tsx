import axios from "axios";

export const api = axios.create({
    baseURL: `https://dev.and2carvalho.publicvm.com/api`,
    headers: {
        common: {
            [`Content-Type`]: `application/json`
        }
    }
})