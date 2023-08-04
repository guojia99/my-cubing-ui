import {apiCore, authApiCore} from "./api_core";
import {Cubes} from "../cube/components/cube";


function getAPIUrl() {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === '0.0.0.0') {
        return "http://127.0.0.1:20000/v2/api"
    }
    return "/v2/api"
}

export const API = new apiCore(getAPIUrl());

export const AuthAPI = new authApiCore(API);

export const WCAProjectList = () => {
    return [
        Cubes.Cube333,
        Cubes.Cube222,
        Cubes.Cube444,
        Cubes.Cube555,
        Cubes.Cube666,
        Cubes.Cube777,
        Cubes.Cube333BF,
        Cubes.Cube333FM,
        Cubes.Cube333OH,
        Cubes.CubeClock,
        Cubes.CubeMinx,
        Cubes.CubePy,
        Cubes.CubeSk,
        Cubes.CubeSq1,
        Cubes.Cube444BF,
        Cubes.Cube555BF,
        Cubes.Cube333MBF,
    ]
}

