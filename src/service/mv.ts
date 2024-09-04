import service from './request'

export function getRecommendMv() {
    return service.get('/personalized/mv?limit=3')
}