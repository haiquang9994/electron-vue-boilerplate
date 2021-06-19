import store from '@/store'
import Http from '@/libraries/http/http'
import VueCookies from 'vue-cookies'
import config from 'config'

export default (to, from, next) => {
    let token = VueCookies.get('token')
    if (token === null || token === undefined) {
        next('/login')
    } else {
        if (store.state.me_loaded) {
            next()
        } else {
            Http.get(config.API_ENDPOINT + 'me')
                .authed(token)
                .sent()
                .then(body => {
                    store.state.user_data = body.user_data
                    store.state.me_loaded = true
                    next()
                })
                .catch(() => {
                    VueCookies.remove('token')
                    store.commit('save')
                    next('/login')
                })
        }
    }
}