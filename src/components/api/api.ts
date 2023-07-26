import {apiCore, authApiCore} from "./api_core";


function getAPIUrl(){
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === '0.0.0.0'){
        return "http://127.0.0.1:20000/v2/api"
    }
    return "/v2/api"
}
export const API = new apiCore(getAPIUrl());

export const AuthAPI = new authApiCore(API);



