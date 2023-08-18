import './cube_icon_base.css'
import './cube_icon.css'
import {Cubes, CubesCn} from "../cube";


export const GetCubeIcon = (c: Cubes) => {
    return (
        <i
            className={"cubing-icon cubing-icon-" + c}
            data-toggle="tooltip"
            data-placement="top"
            data-title={c}
        >
        </i>
    )
}
