import service from './request';

export function getNewSong() {
    return service.get('/personalized/newsong?limit=20');
}