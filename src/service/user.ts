import service from './request';

export function getUserDetail(uid: string) {
    return service.get('/user/detail?uid='+uid);
}

export function getUserInfo() {
    return service.get('/user/account');
}

export function getLoginStatus() {
    return service.get('/login/status?timestamp=' + Date.now());
}

export function signIn() {
    return service.post('/daily_signin?timestamp=' + Date.now() + '&type=1');
}