import { doRequest } from './baseAPIService'

const RESOURCE = '/series'

const list = async () => {
    return await doRequest(RESOURCE, 'GET')
}

const insert = async serie => {
    return await doRequest(RESOURCE, 'POST', serie)
}

const remove = async id => {
    return await doRequest(RESOURCE, 'DELETE', {}, id)
}

const update = async serie => {
    return await doRequest(RESOURCE, 'PUT', serie, serie.id)
}

export { list, insert, remove, update }