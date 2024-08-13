import service from './request';

export function getDefaultSearchKeyWord() {
    return service.get('/search/default');
}