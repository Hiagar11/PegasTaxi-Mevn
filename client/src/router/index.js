import {createRouter, createWebHistory} from 'vue-router'
import layout from "@/views/layout";
import loginView from "@/views/loginView";
import {userToken} from "../../store/user.store";



const routes = [
    {
        path: '/',
        component: layout,
        beforeEnter: (to, from, next) => {
            if (userToken.value === null) {
                next({name: 'login'})
            } else next()
        },
        children: [
            {
                path: '',
                components: {
                    main: () => import( '@/views/trips/main'),
                    aside: () => import( '@/views/trips/aside')
                }
            }
        ]
    },
    {
        path: '/admin',
        component: layout,
        beforeEnter: (to, from, next) => {
            if (userToken.value === null) {
                next({name: 'login'})
            } else next()
        },
        children: [
            {
                path: '',
                components: {
                    main: () => import( '@/views/admin/main'),
                    aside: () => import( '@/views/admin/aside')
                }
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: loginView
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
