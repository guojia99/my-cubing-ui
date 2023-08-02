import {DrawNumberCube} from "../../components/cube/draw/draw_cube";
import { DrawPyCube} from "../../components/cube/draw/draw_py";
import {DrawSkCube} from "../../components/cube/draw/draw_skewb";
import {DrawSQ1Cube} from "../../components/cube/draw/draw_sq1";

const Debug = () => {
    let items = []
    items.push(DrawNumberCube("222x", 2, 15, "F' D  B' L' U' R2 F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2"))
    items.push(DrawNumberCube("333x", 3, 15, "F' D  B' L' U' R2 F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2"))
    items.push(DrawNumberCube("444x", 4, 15, "F D2 R' B2 L' D' R F2 D F' R2 D2 B L2 F' U2 F2 D2 Rw2 U' D2 Uw2 Fw2 D' R' D' R' L U' Fw2 Rw2 B2 Fw' R' F' Uw' F' Fw' D2 Rw2 U2 D"))
    items.push(DrawNumberCube("555x", 5, 15, "Dw' Uw B2 Rw D' Fw' Dw2 Bw2 B2 F' Fw' U' L' U2 Fw U Dw D B F D F' Dw R Bw2 Rw' Dw U R2 Uw' Bw' U' R2 Rw' Uw' L Rw' Lw2 R' Fw D Bw2 B Dw' R2 F2 Lw2 Uw2 L U2 Fw' Uw2 U2 B2 Fw2 R' Uw Dw Lw F"))
    items.push(DrawNumberCube("666x", 6, 15, "L' Lw2 U' L2 Uw Dw2 L 3Rw2 F Lw L2 Uw B' 3Rw' Dw Uw' Rw2 Bw Fw2 Rw R2 B' D B 3Fw F2 D' Bw2 Lw2 Uw2 Lw2 R D2 B2 3Fw2 3Uw2 Rw' Fw' 3Uw' Fw' Bw' L2 3Uw 3Rw2 U B2 Dw2 Uw2 R 3Rw2 3Uw' U2 Dw Uw' 3Rw' R2 Lw2 Dw' Fw' 3Uw' R B 3Fw' Rw2 Dw' B2 Bw Lw2 Uw2 U' Bw' L2 Bw2 F 3Rw' 3Fw D2 Dw Fw2 Lw'"))
    items.push(DrawNumberCube("777x", 7, 15, "3Fw2 D Rw2 Uw' L Dw' D 3Rw F' B Dw' 3Fw' 3Dw 3Bw2 3Uw' 3Bw Rw 3Dw Dw' Fw R 3Lw2 Dw R' 3Rw 3Dw L Rw 3Rw 3Lw Bw 3Rw 3Bw2 Uw' Dw2 F L' 3Dw Bw' 3Uw' 3Bw Uw Lw2 Uw' 3Bw' Bw2 3Rw R2 Lw2 U2 L2 Uw' 3Uw' Fw 3Dw2 Lw' Dw B2 3Lw Dw' Bw Fw2 U2 3Uw' Lw' L' D2 3Bw' U' Rw2 3Uw' 3Bw' Lw 3Fw' 3Uw' L 3Uw' 3Bw' D' Lw Uw2 3Fw' R2 D' B' 3Dw Uw2 3Rw' U2 Uw R' 3Uw2 Dw2 Lw2 B 3Uw Dw R Rw 3Bw"))
    items.push(DrawPyCube("py_xxx", 15, "L U R B' L B L U' l r u"))
    items.push(DrawSkCube("sk_xxx", 15, "B' U' R' U L B U L'"))
    items.push(DrawSQ1Cube("sq1_xxx", 15, "(-3,-1)/ (0,3)/ (-2,-2)/ (-3,-3)/ (3,0)/ (-3,0)/ (5,0)/ (0,-3)/ (0,-1)/ (-5,0)/ (3,-4)/ (2,-1)/ (-5,-2)"))
    return (
        <div>{items}</div>
    );
};
export default Debug;