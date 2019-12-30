import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-5360d.firebaseio.com/'
})

export default instance;