import Axios from 'axios';

const axiosRoot = Axios.create({ baseURL: process.env.API_URL });

export default axiosRoot;