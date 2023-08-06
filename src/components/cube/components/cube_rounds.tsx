import {Round} from "../../api/api_model";
import React from "react";
import {DrawByCubeImage} from "../draw/draw";
import {Cubes} from "./cube";

export const RoundTables = (rounds: Round[]) => {
    let items = []
    for (let i = rounds.length - 1; i >= 0; i--) {
        items.push(RoundTable(rounds[i]))
    }
    return (<div>{items}</div>)
}


const RoundTable = (round: Round) => {
    let body: JSX.Element[] = []


    const setTr = (idx: string, seq: string, trClass: boolean) => {
        const id = "round_image_id_" + round.ID + "_" + round.Number + "_" + round.Part + "_" + idx
        body.push(
            <tr className={trClass ? "table-warning" : ""}>
                <td className="idxTd">{idx}</td>
                <td>{seq}</td>
                <td>{DrawByCubeImage(id, round.Project, 12, seq)}</td>
            </tr>
        )
    }

    switch (round.Project) {
        case Cubes.Cube333BF:
        case Cubes.Cube444BF:
        case Cubes.Cube555BF:
        case Cubes.Cube666:
        case Cubes.Cube777:
            for (let i = 0; i < 5; i++) {
                setTr(i >= 3 ? "E" + (i - 3) : i + 1 + "", round.UpsetsVal[i], i >= 3)
            }
            break
        case Cubes.Cube333MBF:
            for (let i = 0; i < round.UpsetsVal.length; i++) {
                setTr(i + 1 + "", round.UpsetsVal[i], false)
            }
            break
        default:
            for (let i = 0; i < 7; i++) {
                setTr(i >= 5 ? "E" + (i - 5) : i + 1 + "", round.UpsetsVal[i], i >= 5)
            }
    }

    return (
        <div style={{overflowX: "auto"}} key={round.ID + "round_table"}>
            <h5 style={{margin: "20px 0px"}}>{"打乱" + round.Part}</h5>
            <table className="table table-bordered table-striped table-hover text-center align-items-center"
                   style={{minWidth: "800px"}}>
                <thead>
                <tr key={round.ID + "round_table_head_tr"}>
                    <th colSpan={1} style={{maxWidth: "1em"}}>序号</th>
                    <th colSpan={1}>打乱</th>
                    <th colSpan={1}>打乱图</th>
                </tr>
                </thead>
                <tbody>{body}</tbody>
            </table>
        </div>
    )
}