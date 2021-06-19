import Vue from 'vue'
import Router from 'vue-router'
import config from 'config'
import multiguard from 'vue-router-multiguard'
// import isLoggedIn from './middleware/isLoggedIn'
// import isGuest from './middleware/isGuest'

Vue.use(Router)

const routes = {
    // '/': ['Home', 'home', { active: 'home', use_layout: true, label: 'Home' }, [isLoggedIn]],
    '/': ['Home', 'home', { active: 'home', use_layout: true, label: 'Home' }, []],
    '/about': ['About', 'about', { active: 'about', use_layout: true, label: 'About' }, []],
}

const vueRoutes = []

for (let path in routes) {
    let options = routes[path]
    vueRoutes.push({
        path,
        component: () => import('@/views/' + options[0]),
        name: options[1],
        meta: options[2] || {},
        beforeEnter: multiguard(options[3] || []),
    })
}

export default new Router({
    mode: 'hash',
    base: config.BASE_URL,
    routes: vueRoutes,
})