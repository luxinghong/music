import service from './request';

export * from './user';
export * from './login';
export * from './search';

export function getBanner() {
    return service.get('/banner');
}