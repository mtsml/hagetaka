import { localHost, host, port } from './const'

export const getHost = () => {
    if (process.env.NODE_ENV === 'production') {
        return host + ':' + port
    } else {
        return localHost + ':' + port
    }
}

export const isNull = (value) => {
    console.log(value)
    if (value === null || value === undefined || value === '') {
        return true
    } else {
        return false
    }
}