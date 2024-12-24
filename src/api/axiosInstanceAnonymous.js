import Axios from "axios";

const axiosInstanceAnonymous = Axios.create({
    baseURL: "http://localhost:8000/api",
});


export default axiosInstanceAnonymous;