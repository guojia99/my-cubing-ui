import React from 'react';
import {API, WCAProjectList} from "../../components/api/api";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {Player, PlayerBestScoreResponse, RankScore} from "../../components/api/api_model";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {Cubes, CubesCn} from "../../components/cube/components/cube";

class PlayerPage extends React.Component {
    state = {
        player: null,
        best: null,
    }

    componentDidMount() {
        const p = GetLocationQueryParams()
        const id = Number(p["id"])

        API.GetPlayer(id).then(value => {
            this.setState({player: value})
        })

        API.GetPlayerBestScoreReport(id).then(value => {
            this.setState({best: value})
        })
    }

    renderHeader() {
        if (this.state.player === null) {
            return <div></div>
        }
        const player = this.state.player as Player
        let name = player.Name
        if (player.ActualName !== null && player.ActualName !== undefined && player.ActualName !== "") {
            name = player.Name + " (" + player.ActualName + ")"
        }
        document.title = name + " | 魔缘赛事系统"


        let titles = []
        if (player.TitlesVal !== undefined && player.TitlesVal !== null){
            for (let i = 0; i < player.TitlesVal.length; i++){
                titles.push(<span className="badge text-bg-light" style={{margin:"0 10px"}}>{player.TitlesVal[i]}</span>)
            }
        }

        return (
            <div>
                <h2 style={{textAlign: "center", fontWeight: 700}}>{name}</h2>
                <div style={{textAlign:"center", margin: "30px"}}>{titles}</div>

                <table className="table table-striped table-hover text-center">
                    <thead>
                    <tr>
                        <th colSpan={1}>WCA ID</th>
                        <th colSpan={1}>名字</th>
                        <th colSpan={1}>比赛</th>
                        <th colSpan={1}>复原次数</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{player.WcaID}</td>
                            <td>{player.ActualName}</td>
                            <td>{1}</td>
                            <td>{2}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    renderBestTable() {
        if (this.state.best === null) {
            return (<div></div>)
        }

        const data = this.state.best as PlayerBestScoreResponse
        if (data === undefined) {
            return <div></div>
        }

        const wcaList = WCAProjectList()
        let body = []
        for (let i = 0; i < wcaList.length; i++) {
            const pj = wcaList[i]

            const best = data.Best[pj] as RankScore
            const avg = data.Avg[pj] as RankScore
            if (best === undefined && avg === undefined) {
                continue
            }

            if (pj === Cubes.Cube333MBF){
                body.push(
                    <tr>
                        <td>{GetCubeIcon(pj)} {CubesCn(pj)}</td>
                        <td style={{color: best !== undefined && best.Rank === 1 ? "red":"" }}>{best === undefined ? "" : best.Rank}</td>
                        <td style={{fontWeight: 700}}>{best === undefined ? "" : best.Score.R1 + "/" + best.Score.R2 + " " + FormatTime(best.Score.R3, Cubes.Cube333)}</td>
                    </tr>
                )
                continue
            }
            body.push(
                <tr>
                    <td>{GetCubeIcon(pj)} {CubesCn(pj)}</td>
                    <td style={{color: best !== undefined && best.Rank === 1 ? "red":"" }}>{best === undefined ? "" : best.Rank}</td>
                    <td style={{fontWeight: 700}}>{best === undefined ? "" : FormatTime(best.Score.Best, pj)}</td>
                    <td style={{fontWeight: 700}}>{avg === undefined ? "" : FormatTime(avg.Score.Avg, Cubes.Cube333)}</td>
                    <td style={{color: avg !== undefined && avg.Rank === 1 ? "red":"" }}>{avg === undefined ? "" : avg.Rank }</td>
                </tr>
            )
        }

        return (
            <div>
                <h4 style={{textAlign:"center", fontWeight: 700}}>个人记录</h4>
                <table className="table table-striped table-hover text-center">
                    <thead>
                    <tr>
                        <th colSpan={1} style={{width: "150px"}}>项目</th>
                        <th colSpan={1}>GR</th>
                        <th colSpan={1}>单次</th>
                        <th colSpan={1}>平均</th>
                        <th colSpan={1}>GR</th>
                    </tr>
                    </thead>
                    <tbody>{body}</tbody>
                </table>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBestTable()}
            </div>
        )
    }
}


export default PlayerPage;