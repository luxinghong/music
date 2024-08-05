import axios from "axios";

const instance = axios.create({
    baseURL: 'https://netease-cloud-music-api-three-phi.vercel.app',
    method: 'get',
    withCredentials: true
});

instance.interceptors.request.use((config) => {
    return config;
}, err => {
    return Promise.reject(err);
});

instance.interceptors.response.use((data) => {
    return data;
}, err => {
    window.$message.error('network error');
    return Promise.reject(err);
});

export default instance;