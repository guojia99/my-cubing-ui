import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {GetBestScoreResponse, Score} from "../../components/api/api_model";
import {AllProjectList, Cubes, CubesCn} from "../../components/cube/cube";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {Link} from "react-router-dom";

class Best extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        API.GetBestScore().then(value => {
            this.setState({data: value})
        })
    }

    render() {
        console.log(this.state.data)

        let items: JSX.Element[] = []
        if (this.state.data === null) {
            return <div></div>
        }

        const bestScore = this.state.data as GetBestScoreResponse
        const pjs = AllProjectList()

        for (let i = 0; i < pjs.length; i++) {
            const pj = pjs[i]
            if (bestScore.BestSingle[pj] === undefined && bestScore.BestAvg[pj] === undefined) {
                continue
            }
            items.push(<tr key={"base_table_head_" + pj}>
                <th colSpan={5}>{GetCubeIcon(pj)} {CubesCn(pj)}</th>
            </tr>)

            if (bestScore.BestSingle[pj] !== undefined) {
                const s = bestScore.BestSingle[pj] as Score
                if (s.Project === Cubes.Cube333MBF){
                    items.push(
                        <tr key={"best_by_id" + s.ID}>
                            <td colSpan={1}>单次</td>
                            <td colSpan={1}><Link to={"/player?id=" + s.PlayerID}>{s.PlayerName}</Link></td>
                            <td colSpan={1}>{s.R1} / {s.R2} ({FormatTime(s.R3, Cubes.Cube333)})</td>
                            <td colSpan={1}></td>
                            <td colSpan={1}></td>
                        </tr>
                    )
                    continue
                }

                items.push(
                    <tr key={"best_by_id" + s.ID}>
                        <td colSpan={1}>单次</td>
                        <td colSpan={1}><Link to={"/player?id=" + s.PlayerID}>{s.PlayerName}</Link></td>
                        <td colSpan={1}>{FormatTime(s.Best, s.Project)}</td>
                        <td colSpan={1}></td>
                        <td colSpan={1}></td>
                    </tr>
                )
            }

            if (bestScore.BestAvg[pj] !== undefined) {
                const s = bestScore.BestAvg[pj] as Score
                items.push(
                    <tr key={"avg_by_id" + s.ID}>
                        <td>平均</td>
                        <td><Link to={"/player?id=" + s.PlayerID}>{s.PlayerName}</Link></td>
                        <td>{FormatTime(s.Avg, s.Project)}</td>
                        <td colSpan={1}></td>
                        <td colSpan={1}></td>
                    </tr>
                )
            }

            items.push(<tr key={"empty_" + i}>
                <th colSpan={1}>{" ".replace(/ /g, "\u00a0")}</th>
                <th colSpan={1}></th>
                <th colSpan={1}></th>
                <th colSpan={1}></th>
                <th colSpan={1}></th>
            </tr>)
        }


        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th colSpan={4}><h2>最佳排名</h2></th>
                </tr>
                </thead>
                <tbody>{items}</tbody>
            </table>
        )
    }
}

export default Best;