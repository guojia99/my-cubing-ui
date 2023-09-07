import {apiCore, authApiCore} from "./api_core";

function getAPIUrl() {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === '0.0.0.0') {
        return "http://127.0.0.1:20000/v2/api"
    }
    if (/^192\.168/.test(hostname) || /^10./.test(hostname)) {
        return "http://" + hostname + ":20000/v2/api"
    }
    return "http://www.mycube.club/v2/api"
}

export const API = new apiCore(getAPIUrl());

export const AuthAPI = new authApiCore(new apiCore(getAPIUrl()));
