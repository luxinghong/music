import service from "./request";

export function logout() {
    return service.get('logout?timestamp=' + new Date().getTime());
}