import { doPublicRequest } from './baseAPIService'

const RESOURCE = '/usuarios'
const TOKEN_KEY = '@Series:token'

const signIn = async user => {
    try {
        const res = await doPublicRequest(RESOURCE + '/autenticar', 'POST', user)

        if (res.status === 400) {
            return false
        }

        else if (res.ok) {
            const user = await res.json()

            localStorage.setItem(TOKEN_KEY, JSON.stringify(user))

            return user
        }
    } catch(e) {
        return e
    }
}

const signOut = () => {
    localStorage.removeItem(TOKEN_KEY)
}

const isSignedIn = () => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY))
}

const getToken = () => {
    return JSON.parse(localStorage.getItem(TOKEN_KEY)).token
}

export {signIn, signOut, isSignedIn, getToken}
