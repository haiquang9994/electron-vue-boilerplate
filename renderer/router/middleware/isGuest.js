import VueCookies from 'vue-cookies'

export default (to, from, next) => {
    let token = VueCookies.get('token')
    if (token === null || token === undefined) {
        next()
    } else {
        next('/')
    }
}