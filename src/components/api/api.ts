import {apiCore, authApiCore} from "./api_core";

export const API = new apiCore("http://127.0.0.1:20000/v2/api");

export const AuthAPI = new authApiCore(API);