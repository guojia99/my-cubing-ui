import {RelativeSor, SorScore} from "../../api/api_model";
import {Link} from "react-router-dom";
import React, {JSX} from "react";
import relativeSor from "../../../pages/statistics/RelativeSor";

function sorTableBody(single: SorScore[], avg: SorScore[]) {
    if ((avg === null || avg === undefined) && (single === null || single === undefined)) {
        return (<div></div>)
    }

    function sorTrs(idx: number, single: SorScore | null, avg: SorScore | null) {
        idx = idx += 1
        const SingleTds = () => {
            if (single === null) {
                return (<>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </>)
            }
            return (<>
                <td>{idx}</td>
                <td><Link to={"/player?id=" + single.Player.ID}>{single.Player.Name}</Link></td>
                <td>{single.SingleCount}</td>
            </>)
        }

        const AvgTds = () => {
            if (avg === null) {
                return (<>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </>)
            }
            return (<>
                <td>{avg.AvgCount}</td>
                <td><Link to={"/player?id=" + avg.Player.ID}>{avg.Player.Name}</Link></td>
                <td>{idx}</td>
            </>)
        }

        return (
            <tr className={idx <= 3 ? "table-success" : ""}>
                <SingleTds/>
                <AvgTds/>
            </tr>
        )
    }

    const maxLength = single.length > avg.length ? single.length : avg.length
    return (
        <tbody>
        {Array.from(Array(maxLength), (e, i) => {
            const s = i < single.length ? single[i] : null
            let a = i < avg.length ? avg[i] : null
            return sorTrs(i, s, a)
        })}
        </tbody>
    )
}


export const SorKeys: Map<string, string> = new Map([
    ["wca", "WCA项目"],
    ["xcube", "趣味项目"],
    ["wca2345", "WCA低正阶"],
    ["wca234567", "WCA全正阶"],
    ["wca_alien", "WCA全异型"],
    ["wca333", "WCA三阶"],
    ["wca_bf", "WCA盲拧"],
])

export const SorTable = (single: SorScore[], avg: SorScore[]) => {
    return (
        <table className="table text-center table-striped table-hover">
            <thead>
            <tr>
                <th scope="col">排名</th>
                <th scope="col" colSpan={2}>单次</th>
                <th scope="col" colSpan={2}>平均</th>
                <th scope="col">排名</th>
            </tr>
            </thead>
            {sorTableBody(single, avg)}
        </table>
    )
}
const relativeSorTableBody = (sor: RelativeSor[], key: string) => {
    let items:JSX.Element[] = []

    for (let i = 0 ; i < sor.length; i++){
        items.push(
            <tr key={"relativeSorTableBody_" + i + key}>
                <td>{i + 1}</td>
                <td>{sor[i].Player.Name}</td>
                <td>{sor[i].Sor}</td>
            </tr>
        )
    }
    return items
}

export const RelativeSorTable = (sor: RelativeSor[], key: string) => {
    return (
        <table className="table text-center table-striped table-hover">
            <thead>
            <tr>
                <th scope="col">排名</th>
                <th scope="col">选手</th>
                <th scope="col">分数</th>
            </tr>
            </thead>
            {relativeSorTableBody(sor, key)}
        </table>
    )
}