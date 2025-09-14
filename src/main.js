import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import VueLazyLoad from 'vue3-lazyload'
import axios from 'axios'
import VueAxios from 'vue-axios'
import env from "./env";
import { useCookies } from '@vueuse/integrations/useCookies'
import store from "./store/index"
// import '@/permission' // permission control

const app = createApp(App);

// Element UI is a Vue 2 library and has been removed.
// To use a similar UI library with Vue 3, consider migrating to Element Plus.
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     Radio,
//     Pagination,
//     DatePicker,
//     Input,
//     Button,
//     InputNumber,
//     Message,
//     RadioGroup
// } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// app.use(Breadcrumb)
// app.use(BreadcrumbItem)
// app.use(Radio)
// app.use(RadioGroup)
// app.use(Pagination)
// app.use(InputNumber)
// app.use(DatePicker)
// app.use(Input)
// app.use(Button)
// app.use(Message) // Message component might need special handling in Vue 3

// 图片懒加载
app.use(VueLazyLoad, {
    preLoad: 1.3,
    loading: '/src/static/imgs/loading-svg/loading-spokes.svg', // Adjusted path
    attempt: 1
})

// 基础接口配置
axios.defaults.baseURL = env.baseURL;
axios.defaults.timeout = 10000;

// request拦截器
axios.interceptors.request.use(config => {
    if (store.state.token) {
        config.headers['Authorization'] = "JWT " + store.state.token
    }
    return config
}, error => {
    Promise.reject(error)
})

// 接口错误拦截
// Note: Element UI's Message is commented out. You'll need a Vue 3 compatible toast/notification library.
// For now, we'll use console.log or a simple alert.
axios.interceptors.response.use(function (response) {
    let code = response.data.code;
    if (code === 200) {
        return response.data;
    } else if (code === 401) {
        window.location.href = '/login';
        // Message.warning(response.data.message);
        console.warn(response.data.message);
        return Promise.reject(response);
    } else {
        // Message.warning(response.data.message);
        console.warn(response.data.message);
        return Promise.reject(response);
    }
}, (error) => {
    // Message.error('网络超时，请稍后重试');
    console.error('网络超时，请稍后重试', error);
    return Promise.reject(error);
});

// 将axios挂载到vue的this.axios下
app.use(VueAxios, axios);

// cookie
const cookies = useCookies()
app.config.globalProperties.$cookie = cookies;

// Global properties (if any components rely on this.$axios or this.$cookie)
// app.config.globalProperties.$axios = axios;
// app.config.globalProperties.$cookie = VueCookie;

app.use(store);
app.use(router);

app.mount('#app');
