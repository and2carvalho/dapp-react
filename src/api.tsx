import axios from "axios";

export const api = axios.create({
    baseURL: `https://d4c8ca016818f8fac34ef20d8b5e9792.serveo.net/api`,
    headers: {
        common: {
            [`Content-Type`]: `application/json`
        }
    }
})