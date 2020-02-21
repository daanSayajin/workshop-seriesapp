import { getToken } from './authService'

const URL = 'http://localhost:3000'

const doRequest = async (resource, method, body = '', urlParam = '') => {
    const params = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getToken()
        }
    }

    if (!['GET', 'DELETE'].includes(method)) params.body = JSON.stringify(body)
        
    return await fetch(URL + resource + '/' + urlParam, params)
}

const doPublicRequest = async (resource, method, body = '', urlParam = '') => {
    const params = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (!['GET', 'DELETE'].includes(method)) params.body = JSON.stringify(body)
        
    return await fetch(URL + resource + '/' + urlParam, params)
}

export { doRequest, doPublicRequest }