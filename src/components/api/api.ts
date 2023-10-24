import {apiCore} from "./api_core";
import {authApiCore} from "./api_auth";

function getAPIUrl() {
    const hostname = window.location.hostname;
    // 本地测试
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === '0.0.0.0') {
        return "http://127.0.0.1:20000/v2/api"
    }
    // 内网测试
    if (/^192\.168/.test(hostname) || /^10./.test(hostname)) {
        return window.location.protocol + "//" + hostname + ":20000/v2/api"
    }
    // 正式网络
    return window.location.protocol + "//" + hostname + ":" + window.location.port + "/v2/api"
}

export const API = new apiCore(getAPIUrl());

export const AuthAPI = new authApiCore(new apiCore(getAPIUrl()));