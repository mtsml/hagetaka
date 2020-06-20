import { localHost, host, port, proc } from './const'

export const getHost = () => {
    if (process.env.NODE_ENV === 'production') {
        return host + ':' + port
    } else {
        return localHost + ':' + port
    }
}

export const isNull = (value) => {
    if (value === null || value === undefined || value === '') {
        return true
    } 
    return false
}

export const onGame = (_proc) => {
    if (_proc === proc.input || _proc === proc.result || _proc === proc.end) {
        return true
    }
    return false
}