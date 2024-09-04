import service from './request';

export * from './user';
export * from './login';
export * from './search';
export * from './playlist'
export * from './songs'
export * from './mv'

export function getBanner() {
    return service.get('/banner');
}