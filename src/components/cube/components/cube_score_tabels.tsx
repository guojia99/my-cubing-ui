import './cube_score_tables.css'

import {ContestRecord, Score} from "../../api/api_model";
import {Link} from "react-router-dom";
import {Cubes} from "../cube";
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

const cubeHandlers: { [_ in Cubes]: (pj: Cubes, Scores: Score[], records: Map<string, ContestRecord>) => JSX.Element } = {

    [Cubes.Cube222]: FiveResultCubeScoreTableFn,
    [Cubes.Cube333]: FiveResultCubeScoreTableFn,
    [Cubes.Cube444]: FiveResultCubeScoreTableFn,
    [Cubes.Cube555]: FiveResultCubeScoreTableFn,
    [Cubes.Cube666]: ThreeResultCubeScoreTableFn,
    [Cubes.Cube777]: ThreeResultCubeScoreTableFn,
    [Cubes.CubeSk]: FiveResultCubeScoreTableFn,
    [Cubes.CubePy]: FiveResultCubeScoreTableFn,
    [Cubes.CubeSq1]: FiveResultCubeScoreTableFn,
    [Cubes.CubeMinx]: FiveResultCubeScoreTableFn,
    [Cubes.CubeClock]: FiveResultCubeScoreTableFn,
    [Cubes.Cube333OH]: FiveResultCubeScoreTableFn,
    [Cubes.Cube333FM]: ThreeResultCubeScoreTableFn,
    [Cubes.Cube333BF]: ThreeResultCubeScoreTableFn,
    [Cubes.Cube444BF]: ThreeResultCubeScoreTableFn,
    [Cubes.Cube555BF]: ThreeResultCubeScoreTableFn,
    [Cubes.Cube333MBF]: MBFCube333ScoreTable,
    [Cubes.Cube333Ft]: FiveResultCubeScoreTableFn,
    [Cubes.JuBaoHaoHao]: OneResultCubeScoreTableFn,
    [Cubes.OtherCola]: OneResultCubeScoreTableFn,
    [Cubes.XCube222BF]: ThreeResultCubeScoreTableFn,
    [Cubes.XCube666BF]: ThreeResultCubeScoreTableFn,
    [Cubes.XCube777BF]: ThreeResultCubeScoreTableFn,
    [Cubes.XCube333Mini]: FiveResultCubeScoreTableFn,
    [Cubes.XCube333MiniOH]: FiveResultCubeScoreTableFn,
    [Cubes.XCube222OH]: FiveResultCubeScoreTableFn,
    [Cubes.XCube444OH]: FiveResultCubeScoreTableFn,
    [Cubes.XCube555OH]: FiveResultCubeScoreTableFn,
    [Cubes.XCube666OH]: ThreeResultCubeScoreTableFn,
    [Cubes.XCube777OH]: ThreeResultCubeScoreTableFn,
    [Cubes.XCubeSkOH]: FiveResultCubeScoreTableFn,
    [Cubes.XCubePyOH]: FiveResultCubeScoreTableFn,
    [Cubes.XCubeSq1OH]: FiveResultCubeScoreTableFn,
    [Cubes.XCubeMinxOH]: FiveResultCubeScoreTableFn,
    [Cubes.XCube333Mirror]: FiveResultCubeScoreTableFn,
    [Cubes.XCube333Mirroring]: FiveResultCubeScoreTableFn,
    [Cubes.XCube333Multiple5]: OneResultCubeScoreTableFn,
    [Cubes.XCube333Multiple10]: OneResultCubeScoreTableFn,
    [Cubes.XCube333Multiple15]: OneResultCubeScoreTableFn,
    [Cubes.XCube333Multiple20]: OneResultCubeScoreTableFn,
    [Cubes.XCube27Relay]: OneResultCubeScoreTableFn,
    [Cubes.XCube345RelayBF]: OneResultCubeScoreTableFn,
    [Cubes.XCubeAlienRelay]: OneResultCubeScoreTableFn,
    [Cubes.XCube27AlienRelayAll]: OneResultCubeScoreTableFn,
    [Cubes.XCube333Ghost]: FiveResultCubeScoreTableFn,
    [Cubes.XCube333ZongZi]: FiveResultCubeScoreTableFn,
}
// todo重写
export const CubeScoresTable = (pj: Cubes, Scores: Score[], records: ContestRecord[]) => {
    const recordMp = RecordsToMap(records)

    const handler = cubeHandlers[pj];
    if (handler) {
        return handler(pj, Scores, recordMp);
    }
    return <table className="table table-bordered table-striped"></table>;
}
