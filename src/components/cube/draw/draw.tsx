import {Cubes} from "../components/cube";
import {DrawNumberCubeImage} from "./draw_cube";
import {JSX} from "react";
import {DrawPyCubeImage} from "./draw_py";
import {DrawSkCubeImage} from "./draw_skewb";
import {DrawClockCubeImage} from "./draw_clock";


export const DrawByCubeImage = (id: string, cube: Cubes, imageWidth: number, seq: string): JSX.Element => {
    if (seq === undefined || seq === ""){
        return <p>no cube {cube} image</p>
    }

    // todo 其他项目
    switch (cube) {
        case Cubes.Cube222:
            return DrawNumberCubeImage(id, 2, imageWidth, seq)
        case Cubes.Cube333:
        case Cubes.Cube333OH:
        case Cubes.Cube333FM:
        case Cubes.Cube333BF:
        case Cubes.Cube333MBF:
            return DrawNumberCubeImage(id, 3, imageWidth, seq)
        case Cubes.Cube444:
        case Cubes.Cube444BF:
            return DrawNumberCubeImage(id, 4, imageWidth, seq)
        case Cubes.Cube555:
        case Cubes.Cube555BF:
            return DrawNumberCubeImage(id, 5, imageWidth, seq)
        case Cubes.Cube666:
            return DrawNumberCubeImage(id, 6, imageWidth, seq)
        case Cubes.Cube777:
            return DrawNumberCubeImage(id, 7, imageWidth, seq)
        case Cubes.CubeSk:
            return DrawSkCubeImage(id, imageWidth, seq)
        case Cubes.CubePy:
            return DrawPyCubeImage(id, imageWidth, seq)
        case Cubes.CubeClock:
            return DrawClockCubeImage(id, imageWidth, seq)
    }
    return <p>no cube {cube} image</p>
}