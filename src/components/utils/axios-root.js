import Axios from 'axios';

const axiosRoot = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

export default axiosRoot;