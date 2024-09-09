import axios from "axios";
import type {AxiosError, AxiosResponse} from 'axios';
import {WarnToast} from "../utils/alert";

export type  Error = {
    Msg: string,
    Code: number,
    StatusCode: number,
}




export const Request = axios.create();
Request.defaults.timeout = 30000;

Request.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        const resp = error.response
        if (resp === undefined) {
            return Promise.reject(error);
        }


        const msg = resp.data as Error
        if (msg !== undefined) {
            WarnToast(<>错误: {msg.Msg} ({msg.StatusCode}) </>)
        } else {
            const status = resp.status
            const url = error.config?.url
            WarnToast(<>未知错误: {url} ({status})</>)
        }
        return Promise.reject(error);
    },
)