import service from './request';

export function getRecommendMv() {
  return service.get('/personalized/mv?limit=3');
}

export function getMvList({
  limit = 50,
  offset = 0,
  area = '全部',
  order = '最热',
  type = '全部',
}) {
  return service.get(
    `/mv/all?limit=${limit}&offset=${offset}&area=${area}&order=${order}&type=${type}`
  );
}
