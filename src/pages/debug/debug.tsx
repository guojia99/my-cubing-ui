import {SetBackGround} from "../../components/utils/background";
import {RoundTables} from "../../components/cube/components/cube_rounds";
import {Cubes} from "../../components/cube/cube_map";

const Debug = () => {
    SetBackGround("")
    let items = []

    items.push((<br/>))

    items.push(
        RoundTables([
            {
                ID: 333,
                ContestID: 333,
                Project: Cubes.Cube333,
                Number: 1,
                Part: 1,
                Name: "333",
                Final: true,
                UpsetsVal: [
                    "F' D  B' L' U' R2 F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2",
                    "D  B' L' U' R2 F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2",
                    "B' L' U' R2 F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2",
                    "L' U' R2 F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2",
                    "U' R2 F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2",
                    "R2 F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2",
                    "F D' R2 F2 D2 L2 B U2 D2 F2 R2 D2",
                    "D' R2 F2 D2 L2 B U2 D2 F2 R2 D2"
                ]
            },
            {
                ID: 777,
                ContestID: 777,
                Project: Cubes.Cube777,
                Number: 1,
                Part: 1,
                Name: "333",
                Final: true,
                UpsetsVal: [
                    "D Rw2 Uw' L Dw' D 3Rw F' B Dw' 3Fw' 3Dw 3Bw2 3Uw' 3Bw Rw 3Dw Dw' Fw R 3Lw2 Dw R' 3Rw 3Dw L Rw 3Rw 3Lw Bw 3Rw 3Bw2 Uw' Dw2 F L' 3Dw Bw' 3Uw' 3Bw  Lw2 Uw' 3Bw' Bw2 3Rw R2 Lw2 U2 L2 Uw' 3Uw' Fw 3Dw2 Lw' Dw B2 3Lw Dw' Bw Fw2 U2 3Uw' Lw' L' D2 3Bw' U' Rw2 3Uw' 3Bw' Lw 3Fw' 3Uw' L 3Uw' 3Bw' D' Lw Uw2 3Fw' R2 D' B' 3Dw Uw2 3Rw' U2 Uw R' 3Uw2 Dw2 Lw2 B 3Uw Dw R Rw 3Bw",
                ]
            },

            {
                ID: 555111,
                ContestID: 22,
                Project: Cubes.CubeSk,
                Number: 1,
                Part: 1,
                Name: "sk",
                Final: true,
                UpsetsVal: [
                    "R' B' R' B U B L R B",
                ]
            },
            {
                ID: 1122,
                ContestID: 22,
                Project: Cubes.CubePy,
                Number: 1,
                Part: 1,
                Name: "py",
                Final: true,
                UpsetsVal: [
                    "U' R' B R U' B R U L' l r b' u",
                ]
            },
            {
                ID: 1231131,
                ContestID: 2131,
                Project: Cubes.CubeSq1,
                Number: 1,
                Part: 1,
                Name: "sq1",
                Final: true,
                UpsetsVal: [
                    // "(-5,-3)/ (-4,-4)/ (0,-3)/ (0,-3)/ (1,-5)/ (-3,0)/ (-4,0)/ (-3,-3)/ (3,0)/ (-1,-1)/ (0,-4)/ (2,-4)/",
                    " (-2,0)/ (0,3)/ (0,-3)/ (0,-3)/ (-1,-1)/ (3,0)/ (1,-3)/ (-3,0)/ (-1,0)/ (-4,-2)/ (5,-4)/ (1,-4)/ (-4,0)"
                ]
            },
            {
                ID: 12312313131,
                ContestID: 21311,
                Project: Cubes.CubeClock,
                Number: 1,
                Part: 1,
                Name: "clock",
                Final: true,
                UpsetsVal: [
                    "UR1- DR1- DL2+ UL1- U1+ R4- D5+ L3+ ALL4- y2 U1- R3+ D2- L3+ ALL3- UR DR DL"
                ]
            }

        ])
    )


    return (
        <div>
            <div style={{fontSize: "30px"}}>{items}</div>
        </div>

    );
};
export default Debug;