// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import App from './App'
import router from './router'
import store from '../src/store/index'
import instance from "@/axios";
import '../theme/index.css'
import moment from 'moment'
import util from "@/util/util.js";
import echarts from 'echarts'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = instance
Vue.prototype.util = util
Vue.prototype.$moment = moment;
Vue.prototype.$echarts = echarts


new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})