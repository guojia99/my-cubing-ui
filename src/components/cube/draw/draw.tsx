import {JSX} from "react";
import {DrawClockCubeImage} from "./draw_clock";
import {DrawNumberCubeImage} from "./draw_cube";
import {DrawMinx} from "./draw_minx";
import {DrawPyCubeImage} from "./draw_py";
import {DrawSkCubeImage} from "./draw_skewb";
import {DrawSQ1Cube} from "./draw_sq1";
import {Cubes} from "../cube_map";

export const DrawByCubeImage = (id: string, cube: Cubes, imageWidth: number, seq: string): JSX.Element => {
    if (seq === undefined || seq === "") {
        return <p>{cube} 无打乱</p>
    }

    // todo 其他项目
    switch (cube) {
        case Cubes.Cube222:
        case Cubes.XCube222BF:
        case Cubes.XCube222OH:
            return DrawNumberCubeImage(id, 2, imageWidth, seq)
        case Cubes.Cube333:
        case Cubes.Cube333OH:
        case Cubes.Cube333FM:
        case Cubes.Cube333BF:
        case Cubes.Cube333MBF:
        case Cubes.Cube333Ft:
        case Cubes.XCube333Mini:
        case Cubes.XCube333MiniOH:
        case Cubes.XCube333Mirror:
        case Cubes.XCube333Mirroring:
        case Cubes.XCube333Multiple5:
        case Cubes.XCube333Multiple10:
        case Cubes.XCube333Multiple15:
        case Cubes.XCube333Multiple20:
            return DrawNumberCubeImage(id, 3, imageWidth, seq)
        case Cubes.Cube444:
        case Cubes.Cube444BF:
        case Cubes.XCube444OH:
            return DrawNumberCubeImage(id, 4, imageWidth, seq)
        case Cubes.Cube555:
        case Cubes.Cube555BF:
        case Cubes.XCube555OH:
            return DrawNumberCubeImage(id, 5, imageWidth, seq)
        case Cubes.Cube666:
        case Cubes.XCube666BF:
        case Cubes.XCube666OH:
            return DrawNumberCubeImage(id, 6, imageWidth, seq)
        case Cubes.Cube777:
        case Cubes.XCube777BF:
        case Cubes.XCube777OH:
            return DrawNumberCubeImage(id, 7, imageWidth, seq)
        case Cubes.CubeSk:
        case Cubes.XCubeSkOH:
            return DrawSkCubeImage(id, imageWidth, seq)
        case Cubes.CubePy:
        case Cubes.XCubePyOH:
            return DrawPyCubeImage(id, imageWidth, seq)
        case Cubes.CubeClock:
            return DrawClockCubeImage(id, imageWidth, seq)
        case Cubes.CubeSq1:
        case Cubes.XCubeSq1OH:
            return DrawSQ1Cube(id, imageWidth, seq)
        case Cubes.CubeMinx:
        case Cubes.XCubeMinxOH:
            return DrawMinx(id, seq)
        case Cubes.XCube333Ghost:
            return <p>暂无鬼魔打乱图</p>
        case Cubes.XCube333ZongZi:
            return <p>暂无粽子打乱图</p>
    }
    return <p>no cube {cube} image</p>
}