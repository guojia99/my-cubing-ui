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
                    "U' B' R' L' U R' B' U'",
                    "U' L U' R' L B L R'",
                    "U' B L B' U R' U' B",
                    "B U R' L B' U L' U B'",
                    "R U' L R' L R L U' R",
                    "R' U R U' L' B' U R",
                    "U' R' U L' B' L R L'",
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
                    "U R L' B' R' L R' L' U' b' u'",
                    "L' B U' R' U L' U' L l r' b' u'",
                    "B U' L' B' U B' L' U' r u",
                    "U R B' L' U L' U' L' l'",
                    "L' B R' B' R U L' B L' l' b'",
                    "U B U B' R L B' U' R' l r' b u",
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
                    " (-5,0)/ (-3,0)/ (2,-1)/ (-5,-2)/ (-3,0)/ (3,0)/ (6,-4)/ (0,-3)/ (-3,-2)/ (-4,-2)/ (-2,0)/ (6,-4)",
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