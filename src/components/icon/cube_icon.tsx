import './cube_icon.css'
import {Cubes} from "../cube/cube_map";
import {CubesCn} from "../cube/cube";

export const CubeIcon = (c: Cubes) => {
    let name = "cubing-icon-" + c
    return (
        <i
            className={"cubing-icon " + name}
            data-toggle="tooltip"
            data-placement="top"
            title={CubesCn(c)}
        ></i>
    )
}