import './cube_score_tables.css'

import {ContestRecord, Score} from "../../api/api_model";
import {Cubes} from "./cube";
import {Link} from "react-router-dom";
import {FormatTime} from "./cube_timeformat";
import {PR_And_GR_Record} from "./cube_record";

export const CubeScoresTable = (pj: Cubes, Scores: Score[], records: ContestRecord[]) => {
    const cubeHandlers: { [_ in Cubes]: (pj: Cubes, Scores: Score[], records: Map<string, ContestRecord>) => JSX.Element } = {
        // 5
        [Cubes.Cube222]: DefaultResultCubeScoresTable,
        [Cubes.Cube333]: DefaultResultCubeScoresTable,
        [Cubes.Cube444]: DefaultResultCubeScoresTable,
        [Cubes.Cube555]: DefaultResultCubeScoresTable,
        [Cubes.CubeSk]: DefaultResultCubeScoresTable,
        [Cubes.CubePy]: DefaultResultCubeScoresTable,
        [Cubes.CubeSq1]: DefaultResultCubeScoresTable,
        [Cubes.CubeMinx]: DefaultResultCubeScoresTable,
        [Cubes.CubeClock]: DefaultResultCubeScoresTable,
        [Cubes.Cube333OH]: DefaultResultCubeScoresTable,
        // 3
        [Cubes.Cube666]: DefaultResultCubeScoresTable,
        [Cubes.Cube777]: DefaultResultCubeScoresTable,
        [Cubes.Cube333BF]: DefaultResultCubeScoresTable,
        [Cubes.Cube444BF]: DefaultResultCubeScoresTable,
        [Cubes.Cube555BF]: DefaultResultCubeScoresTable,
        [Cubes.Cube333FM]: DefaultResultCubeScoresTable,

        // 特殊
        [Cubes.Cube333MBF]: MBFCube333ScoreTable,
    };

    const recordMp = RecordsToMap(records)

    const handler = cubeHandlers[pj];
    if (handler) {
        return handler(pj, Scores, recordMp);
    }
    return <table className="table table-bordered table-striped"></table>;
}


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

const DefaultResultCubeScoresTable = (pj: Cubes, Scores: Score[], records: Map<string, ContestRecord>) => {
    let tdNum = 5
    const getItems = () => {
        const items = [];
        for (let i = 0; i < Scores.length; i++) {
            const score = Scores[i]

            const isSingleBestRecord = records !== undefined && records.get(score.ID.toString() + RecordType.RecordBySingle.toString()) !== undefined
            const isAvgBestRecord = records !== undefined && records.get(score.ID.toString() + RecordType.RecordByAvg.toString()) !== undefined

            let cube5Td = (<>
                <td>{FormatTime(score.R4, pj)}</td>
                <td>{FormatTime(score.R5, pj)}</td>
            </>)
            switch (pj) {
                case Cubes.Cube666:
                case Cubes.Cube777:
                case Cubes.Cube333BF:
                case Cubes.Cube444BF:
                case Cubes.Cube555BF:
                case Cubes.Cube333FM:
                    cube5Td = (<></>)
                    tdNum = 3
                    break
            }

            items.push(
                <tr className={i < 3 ? "table-success" : ""}>
                    <td className="idxTd">{i + 1}</td>
                    <td><Link to={"/player?id=" + score.PlayerID}>{score.PlayerName}</Link></td>
                    <td>{PR_And_GR_Record(score.IsBestSingle, isSingleBestRecord)}{FormatTime(score.Best, pj)}</td>
                    <td>{PR_And_GR_Record(score.IsBestAvg, isAvgBestRecord)}{FormatTime(score.Avg, Cubes.Cube333)}</td>
                    <td>{FormatTime(score.R1, pj)}</td>
                    <td>{FormatTime(score.R2, pj)}</td>
                    <td>{FormatTime(score.R3, pj)}</td>
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
                    <th colSpan={tdNum} >详情</th>
                </tr>
                </thead>
                <tbody>{getItems()}</tbody>
            </table>
        </div>
    )
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
                    <td>{FormatTime(score.R1 - score.R2, pj)} ({score.R1} / {score.R2}){PR_And_GR_Record(score.IsBestSingle, isSingleBestRecord)}</td>
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
