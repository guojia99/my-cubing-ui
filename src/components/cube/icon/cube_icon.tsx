import './cube_icon.css'
import {Cubes, CubesCn} from "../cube";


export const GetCubeIcon = (c: Cubes) => {
    let name = "cubing-icon-" + c
    return (
        <i
            className={"cubing-icon " + name}
            data-toggle="tooltip"
            data-placement="top"
            title={CubesCn(c)}
        >
        </i>
    )
}


export const GetCubeIconDebug = (name: string) => {
    return (
        <div style={{border: "solid 1px red"}}>
            <button
                className={"cubing-icon " + name}
                data-toggle="tooltip"
                data-placement="top"
                title="name"
            >
            </button>
            {name}
        </div>
    )
}