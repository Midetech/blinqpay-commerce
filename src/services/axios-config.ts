import axios from "axios";



axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json",
    }

});


export const getAccessToken = () => {
    let token;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        token = localStorage.getItem('access_token');
        if (token) {
            return token
        }
        return null
    }


}

export const getLoggedInUser = () => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('fleet_manager');
        if (user) {
            return JSON.parse(user)
        }
        return null
    }
}

axiosInstance.interceptors.request.use(
    (config) => {

        config.headers["Content-Type"] = "application/json";
        config.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
        if (getAccessToken()) {
            config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
);


axiosInstance.interceptors.response.use(
    (res) => {

        return res;

    },
    (error) => {

        if (error.response?.status === 403) {
            console.log('403 error', error.response.data);

        }

        return Promise.reject(error.response.data);
    }
)

export default axiosInstance;
