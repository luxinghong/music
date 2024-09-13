import service from './request';

export function getPersonalized() {
  return service.get('/personalized?limit=15');
}

export function getTopPlayList({ cat = '全部', limit = 10, before = '' }) {
  return service.get(
    `/top/playlist/highquality?cat=${cat}&limit=${limit}&before=${before}`
  );
}

export function getTopPlayListTags() {
  return service.get('/playlist/highquality/tags');
}
