import axios from 'axios'
import store from './store/index'
import router from './router'
import { Message } from 'element-ui';

//创建axios实例
var instance = axios.create({
    timeout: 5000, //请求超过5秒即超时返回错误
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
});

//request拦截器
instance.interceptors.request.use(
    config => {
        //判断是否存在token，如果存在的话，则每个http header都加上token
        if (store.state.token) {
            config.headers.Authorization = `Bearer ${store.state.token}`;
        }
        return config;
    }
);

//respone拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        console.log(error.response)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    if (window.sessionStorage.getItem('city')) {
                        // alert('token过期');

                        router.push({ name: 'Index' });
                        store.dispatch("UserLogout");
                        Message({
                            type: "warning",
                            message: "请重新登录"
                        });
                    } else {
                        Message({
                            type: "warning",
                            message: "请先登录"
                        });
                    }
            }
        }
        // return error
        return Promise.reject(error.response);
    }
);



export default instance