import service from './request'

export function getPersonalized() {
    return service.get('/personalized?limit=15')
}