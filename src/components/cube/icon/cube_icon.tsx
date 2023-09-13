import './cube_icon_base.css'
import './cube_icon.css'
import {Cubes} from "../cube";


export const GetCubeIcon = (c: Cubes) => {

    let name = "cubing-icon-" + c
    switch (c) {
        case Cubes.XCube222BF:
            name = "unofficial-222bf"
            break
        case Cubes.XCube333Mini:
        case Cubes.XCube333Mirror:
        case Cubes.XCube333Mirroring:
            name = "cubing-icon-" + Cubes.Cube333
            break
        case Cubes.XCube666BF:
            name = "unofficial-666bf"
            break
        case Cubes.XCube777BF:
            name = "unofficial-777bf"
            break
        case  Cubes.XCube333ZongZi:
            name = "unofficial-mtetram"
            break
        case  Cubes.XCube333Ghost:
            name = "unofficial-fto"
            break

        // XCube OH
        case    Cubes.XCube222OH :
            name = "cubing-icon-" + Cubes.Cube222
            break
        case      Cubes.XCube333MiniOH:
            name = "cubing-icon-" + Cubes.Cube333
            break
        case        Cubes.XCube444OH:
            name = "cubing-icon-" + Cubes.Cube444
            break
        case      Cubes.XCube555OH:
            name = "cubing-icon-" + Cubes.Cube555
            break
        case          Cubes.XCube666OH:
            name = "cubing-icon-" + Cubes.Cube666
            break
        case       Cubes.XCube777OH:
            name = "cubing-icon-" + Cubes.Cube777
            break
        case       Cubes.XCubeSkOH:
            name = "cubing-icon-" + Cubes.CubeSk
            break
        case     Cubes.XCubePyOH:
            name = "cubing-icon-" + Cubes.CubePy
            break
        case     Cubes.XCubeSq1OH:
            name = "cubing-icon-" + Cubes.CubeSq1
            break
        case        Cubes.XCubeMinxOH:
            name = "cubing-icon-" + Cubes.CubeMinx
            break
        case Cubes.XCubeClockOH:
            name = "cubing-icon-" + Cubes.CubeClock
            break

        // XCube Relay
        case Cubes.XCube27Relay:
            name = "unofficial-234567relay"
            break
        case Cubes.XCube333Multiple5:
        case Cubes.XCube333Multiple10:
        case Cubes.XCube333Multiple15:
        case Cubes.XCube333Multiple20:
            name = "unofficial-333mts"
            break

        case Cubes.XCube345RelayBF:
        case Cubes.XCubeAlienRelay:
        case Cubes.XCube27AlienRelayAll:
            name = "unofficial-miniguild"
            break
    }


    return (
        <i
            className={"cubing-icon " + name}
            data-toggle="tooltip"
            data-placement="top"
            data-title={c}
        >
        </i>
    )
}


export const GetCubeIconDebug = (name: string) => {
    return (
        <div style={{border: "solid 1px red"}}>
            <i
                className={"cubing-icon " + name}
                data-toggle="tooltip"
                data-placement="top"
                data-title={"debug"}
            >
            </i>
            {name}
        </div>
    )
}