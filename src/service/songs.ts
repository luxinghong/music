import service from './request';

export function getNewSong() {
  return service.get('/personalized/newsong?limit=20');
}

export async function getTopSong(type: string) {
  return await service.get(`/top/song?type=${type}`);
}
