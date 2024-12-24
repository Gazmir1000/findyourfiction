import Axios from "axios";
import setAxiosHeader from "./setAxiosHeaders";

const axiosInstance = Axios.create({
    baseURL: "http://localhost:8000/api",
});

axiosInstance.interceptors.request.use(
    async (config) => setAxiosHeader(config),
    (error) => {
        Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;