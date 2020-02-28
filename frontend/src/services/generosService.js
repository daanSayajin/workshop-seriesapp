import { doRequest } from './baseAPIService'

const RESOURCE = '/generos'

const list = async () => {
    return await doRequest(RESOURCE, 'GET')
}

export { list }