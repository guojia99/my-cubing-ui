import './cube_score_tables.css'

import {ContestRecord, Score} from "../../api/api_model";
import {Link} from "react-router-dom";
import {CubeRouteNumber, Cubes} from "../cube";
import {FormatTime} from "./cube_timeformat";
import {PR_And_GR_Record} from "./cube_record";


function RecordsToMap(records: ContestRecord[]) {
    let m = new Map<string, ContestRecord>()
    if (records === null || records === undefined || records.length === 0) {
        return m
    }
    for (let i = 0; i < records.length; i++) {
        const record = records[i]
        const key = record.Score.ID.toString() + record.Record.RType.toString()
        m.set(key, record)
    }
    return m
}

export enum RecordType {
    RecordByAvg = 1,
    RecordBySingle = 2
}



const NumberDefaultResultCubeScoresTable = (tdNum: number, pj: Cubes, Scores: Score[], records: Map<string, ContestRecord>) => {
    const getItems = () => {
        const items = [];
        for (let i = 0; i < Scores.length; i++) {
            const score = Scores[i]

            const isSingleBestRecord = records !== undefined && records.get(score.ID.toString() + RecordType.RecordBySingle.toString()) !== undefined
            const isAvgBestRecord = records !== undefined && records.get(score.ID.toString() + RecordType.RecordByAvg.toString()) !== undefined

            let cube3Td = (<>
                <td>{FormatTime(score.R2, pj)}</td>
                <td>{FormatTime(score.R3, pj)}</td>
            </>)
            let cube5Td = (<>
                <td>{FormatTime(score.R4, pj)}</td>
                <td>{FormatTime(score.R5, pj)}</td>
            </>)

            if (tdNum < 3) {
                cube3Td = <></>
            }
            if (tdNum < 5) {
                cube5Td = <></>
            }
            items.push(
                <tr className={i < 3 ? "table-success" : ""}>
                    <td className="idxTd">{i + 1}</td>
                    <td><Link to={"/player?id=" + score.PlayerID}>{score.PlayerName}</Link></td>
                    <td>{PR_And_GR_Record(score.IsBestSingle, isSingleBestRecord)}{FormatTime(score.Best, pj)}</td>
                    <td>{PR_And_GR_Record(score.IsBestAvg, isAvgBestRecord)}{FormatTime(score.Avg, Cubes.Cube333)}</td>
                    <td>{FormatTime(score.R1, pj)}</td>
                    {cube3Td}
                    {cube5Td}
                </tr>
            )
        }
        return items
    }
    return (
        <div style={{overflowX: "auto"}}>
            <table className="table table-bordered table-striped table-hover text-center" style={{minWidth: "800px"}}>
                <thead>
                <tr>
                    <th>排名</th>
                    <th>选手</th>
                    <th>单次</th>
                    <th>平均</th>
                    <th colSpan={tdNum}>详情</th>
                </tr>
                </thead>
                <tbody>{getItems()}</tbody>
            </table>
        </div>
    )
}


const OneResultCubeScoreTableFn = (pj: Cubes, Scores: Score[], records: Map<string, ContestRecord>) => {
    return NumberDefaultResultCubeScoresTable(1, pj, Scores, records)
}

const ThreeResultCubeScoreTableFn = (pj: Cubes, Scores: Score[], records: Map<string, ContestRecord>) => {
    return NumberDefaultResultCubeScoresTable(3, pj, Scores, records)
}

const FiveResultCubeScoreTableFn = (pj: Cubes, Scores: Score[], records: Map<string, ContestRecord>) => {
    return NumberDefaultResultCubeScoresTable(5, pj, Scores, records)
}


const MBFCube333ScoreTable = (pj: Cubes, Scores: Score[], records: Map<string, ContestRecord>) => {
    const getItems = () => {
        const items = [];
        for (let i = 0; i < Scores.length; i++) {
            const score = Scores[i]
            const isSingleBestRecord = records !== undefined && records.get(score.ID.toString() + RecordType.RecordBySingle.toString()) !== undefined
            items.push(
                <tr>
                    <td>{i + 1}</td>
                    <td><Link to={"/player?id=" + score.PlayerID}>{score.PlayerName}</Link></td>
                    <td>({score.R1} / {score.R2}){PR_And_GR_Record(score.IsBestSingle, isSingleBestRecord)}</td>
                    <td>{FormatTime(score.R1, pj)}</td>
                    <td>{FormatTime(score.R2, pj)}</td>
                    <td>{FormatTime(score.R3, Cubes.Cube333)}</td>
                </tr>
            )
        }
        return items
    }
    return (
        <table className="table table-bordered table-striped table-hover">
            <thead>
            <tr>
                <th>排名</th>
                <th>选手</th>
                <th>分数</th>
                <th>还原数</th>
                <th>尝试数</th>
                <th>时间</th>
            </tr>
            </thead>
            <tbody>{getItems()}</tbody>
        </table>
    )
}

// todo重写
export const CubeScoresTable = (pj: Cubes, Scores: Score[], records: ContestRecord[]) => {
    const recordMp = RecordsToMap(records)

    let handler = FiveResultCubeScoreTableFn
    switch (CubeRouteNumber.get(pj)){
        case 1:
            handler = OneResultCubeScoreTableFn
            break
        case 3:
            handler = ThreeResultCubeScoreTableFn
            break
    }

    if (pj === Cubes.Cube333MBF){
        handler = MBFCube333ScoreTable
    }

    if (handler) {
        return handler(pj, Scores, recordMp);
    }
    return <table className="table table-bordered table-striped"></table>;
}
