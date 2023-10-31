import {Round} from "../../api/api_model";
import React, {JSX} from "react";
import {Cubes, CubesAttributes, CubesAttributesMap} from "../cube_map";


export const DrawByCubeImageTable = (id: string, cube: Cubes, imageWidth: number, seq: string[]): JSX.Element => {
    if (seq === undefined || seq.length === 0) {
        return <p>{cube} 无打乱</p>
    }

    const attr = CubesAttributesMap.get(cube) as CubesAttributes
    let items = attr.DrawFn(id, attr.DrawSize, imageWidth, seq)


    let body: JSX.Element[] = []
    for (let i = 0; i < items.length; i++) {
        if (i >= attr.SeqNumber + attr.SpareSeqNumber) {
            break
        }
        const E = i - attr.SeqNumber + 1
        const spare = i >= attr.SeqNumber

        body.push(
            <tr className={spare ? "table-warning" : ""} key={"DrawByCubeImageTable" + id + i}>
                <td>{spare ? "E" : ""}{spare ? E : i + 1}</td>
                <td>{attr.DrawSeq ? seq[i] : ""}</td>
                <td>{items[i]}</td>
            </tr>
        )
    }

    return (
        <table className="table table-bordered table-striped table-hover text-center align-items-center"
               style={{minWidth: "800px", fontSize: "18px"}}>
            <thead>
            <tr>
                <th style={{minWidth: "40px", width: "40px"}}>序号</th>
                <th>打乱</th>
                <th>打乱图</th>
            </tr>
            </thead>
            <tbody>{body}</tbody>
        </table>
    )
}

export const RoundTable = (round: Round) => {
    const id = "RoundTable" + round.ID + round.Number + round.Part

    return (
        <div style={{overflowX: "auto"}} key={round.ID + "round_table"}>
            <h5 style={{margin: "20px 0px"}}>{"打乱" + round.Part}</h5>
            {DrawByCubeImageTable(id, round.Project, 12, round.UpsetsVal)}
        </div>
    )

}

export const RoundTables = (rounds: Round[]) => {
    let items = []
    for (let i = rounds.length - 1; i >= 0; i--) {
        items.push(RoundTable(rounds[i]))
    }
    return (<div>{items}</div>)
}
