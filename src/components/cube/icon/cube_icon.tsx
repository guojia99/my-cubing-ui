import './cube_icon.css'
import { CubesCn} from "../cube";
import {Cubes} from "../cube_map";


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