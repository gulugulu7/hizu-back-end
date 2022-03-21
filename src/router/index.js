import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Citymgt from '@/views/Citymgt'
import Areamgt from '@/views/Areamgt'
import Subwaymgt from '@/views/Subwaymgt'
import Adminmgt from '@/views/Adminmgt'
import Housemgt from '@/views/Housemgt'
import Usermgt from '@/views/Usermgt'
import Promotionmgt from '@/views/Promotionmgt'
import Appointmentmgt from '@/views/Appointmentmgt'
import Reportmgt from '@/views/Reportmgt'
import ViewHouse from '@/views/ViewHouse'
import Login from '@/views/Login'
import { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'Adminmgt',
            component: Adminmgt,
            redirect: '/index',
            meta: {
                requiresAuth: true
            },
            children: [{
                    path: 'index',
                    name: 'Index',
                    component: Index,
                    meta: {
                        title: '主页',
                        nojump: false,
                        requiresAuth: true
                    },
                },
                {
                    path: 'housemgt',
                    name: 'Housemgt',
                    component: Housemgt,
                    meta: {
                        title: '房源管理',
                        nojump: false,
                        requiresAuth: true,
                    }
                },
                {
                    path: 'usermgt',
                    name: 'Usermgt',
                    component: Usermgt,
                    meta: {
                        title: '用户管理',
                        nojump: false,
                        frequiresAuth: true,
                        roleLimit: true
                    }
                },
                {
                    path: 'promotionmgt',
                    name: 'Promotionmgt',
                    component: Promotionmgt,
                    meta: {
                        title: '推广管理',
                        nojump: false,
                        requiresAuth: true,
                        roleLimit: true
                    }
                },
                {
                    path: 'appointmentmgt',
                    name: 'Appointmentmgt',
                    component: Appointmentmgt,
                    meta: {
                        title: '预约管理',
                        nojump: false,
                        requiresAuth: true,
                        roleLimit: true
                    }
                },
                {
                    path: 'reportmgt',
                    name: 'Reportmgt',
                    component: Reportmgt,
                    meta: {
                        title: '举报管理',
                        nojump: false,
                        requiresAuth: true
                    }
                },
                {
                    path: 'viewhouse/:houseid',
                    name: 'ViewHouse',
                    component: ViewHouse,
                    meta: {
                        title: '查看房源',
                        nojump: false,
                        requiresAuth: true,
                        roleLimit: true
                    }
                },
                {
                    path: 'citymgt',
                    name: 'Citymgt',
                    component: Citymgt,
                    redirect: 'areamgt/:city/:district',
                    meta: {
                        title: '城市管理',
                        nojump: true,
                        requiresAuth: true,
                        roleLimit: true
                    },
                    children: [{
                            path: 'areamgt/:city/:district',
                            name: 'Areamgt',
                            component: Areamgt,
                            meta: {
                                title: '区域管理',
                                nojump: true,
                                requiresAuth: true,
                                roleLimit: true
                            }
                        },
                        {
                            path: 'subwaymgt/:city/:subwayLine',
                            name: 'Subwaymgt',
                            component: Subwaymgt,
                            meta: {
                                title: '地铁管理',
                                nojump: true,
                                requiresAuth: true,
                                roleLimit: true
                            }
                        }

                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }
    ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
    //获取store里面的token
    let token = window.sessionStorage.getItem('token');
    let role = window.sessionStorage.getItem('role');
    //判断要去的路由有没有requiresAuth
    if (to.meta.requiresAuth) {
        if (token) {
            next();
        } else {
            next({
                path: '/login'
            });
        }
    } else {
        next();
    }
    if (to.meta.roleLimit) {
        if (role == 1) {
            next();
        } else {
            Message({
                type: "error",
                message: "权限不足"
            });
            next({
                path: '/index'
            });
        }
    } else {
        next();
    }
});


export default router;