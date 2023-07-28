import './cube_icon_base.css'
import './cube_icon.css'
import {Cubes} from "../cube";



export const GetCubeIcon = (c: Cubes) => {
    return (
        <i
            className={"cubing-icon cubing-icon-" + c}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-custom-class="custom-tooltip"
            data-bs-title="This top tooltip is themed via CSS variables."
        >
        </i>
    )
}
