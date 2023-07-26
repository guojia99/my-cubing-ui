import './cube_icon_base.css'
import './cube_icon.css'

export enum Cubes {
    Cube333 = "333",
    Cube222 = "222",
    Cube444 = "444",
    Cube555 = "555",
    Cube666 = "666",
    Cube777 = "777",
    CubeSk = "skewb",
    CubePy = "pyram",
    CubeSq1 = "sq1",
    CubeMinx = "minx",
    CubeClock = "clock",
    Cube333OH = "333oh",
    Cube333FM = "333fm",
    Cube333BF = "333bf",
    Cube444BF = "444bf",
    Cube555BF = "555bf",
    Cube333MBF = "333mbf",
}


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