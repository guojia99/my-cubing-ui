import './Player.css'


import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {AllProjectList, Cubes, CubesCn} from "../../components/cube/cube";
import {GetLocationQueryParams, SetTitleName} from "../../components/utils/utils";
import {GetPlayerAllScoreResponse, GetPlayerRecord, Player, PlayerBestScoreResponse, Podiums, RankScore, RecordMessage, Contest, Round, Score, ScoresByContest} from "../../components/api/api_model";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {FormatRank, FormatTime} from "../../components/cube/components/cube_timeformat";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {Link} from "react-router-dom";
import {WaitGroup} from "../../components/utils/async";
import {PR_And_GR_Record} from "../../components/cube/components/cube_record";
import {RecordType} from "../../components/cube/components/cube_score_tabels";
import {ScoreChat} from "../../components/cube/components/cube_scores_echarts";


class PlayerPage extends React.Component {
    state = {
        ok: false,
        player: null,
        best: null,
        podium: null,
        allScore: null,
        recordMap: new Map<string, RecordMessage>()
    }

    componentDidMount() {
        const p = GetLocationQueryParams()
        const id = Number(p["id"])
        const wg = new WaitGroup()
        wg.add(5)
        wg.wait().then(value => {
            this.setState({ok: true})
        })
        API.GetPlayer(id).then(value => {
            this.setState({player: value})
            wg.done()
        })
        API.GetPlayerBestScoreReport(id).then(value => {
            this.setState({best: value})
            wg.done()
        })
        API.GetPlayerAllScore(id).then(value => {
            this.setState({allScore: value})
            wg.done()
        })
        API.GetPlayerPodium(id).then(value => {
            this.setState({podium: value})
            wg.done()
        })
        API.GetPlayerRecord(id).then(value => {
            let record = value as GetPlayerRecord
            if (record === null || record === undefined) {
                wg.done()
                return
            }
            record = record.reverse()
            for (let i = 0; i < record.length; i++) {
                this.state.recordMap.set(record[i].Score.ID + "_" + record[i].Record.RType, record[i])
            }
            wg.done()
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
        SetTitleName(name)

        let titles = []
        if (player.TitlesVal !== undefined && player.TitlesVal !== null) {
            for (let i = 0; i < player.TitlesVal.length; i++) {
                titles.push(<span className="badge text-bg-light" style={{margin: "0 10px"}}>{player.TitlesVal[i]}</span>)
            }
        }

        return (
            <div>
                <h2 style={{textAlign: "center", fontWeight: 700}}>{name}</h2>
                <div style={{textAlign: "center", margin: "30px"}}>{titles}</div>

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
                        <td><Link to={"https://www.worldcubeassociation.org/persons/" + player.WcaID}>{player.WcaID ? player.WcaID : "-"}</Link></td>
                        <td>{player.ActualName ? player.ActualName : player.Name}</td>
                        <td>{player.ContestNumber}</td>
                        <td>{player.RecoveryNumber - player.ValidRecoveryNumber} / {player.RecoveryNumber}</td>
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

        const pjList = AllProjectList()
        let body = []
        for (let i = 0; i < pjList.length; i++) {
            const pj = pjList[i]

            const best = data.Best[pj] as RankScore
            const avg = data.Avg[pj] as RankScore
            if (best === undefined && avg === undefined) {
                continue
            }

            const key = "renderBestTable" + pj + best.Score.ID

            if (pj === Cubes.Cube333MBF) {
                body.push(
                    <tr key={key}>
                        <td>{GetCubeIcon(pj)} {CubesCn(pj)}</td>
                        <td style={{color: best.Rank === 1 ? "red" : ""}}>{best.Rank}</td>
                        <td style={{fontWeight: 700}}>{best.Score.R1 + "/" + best.Score.R2 + " " + FormatTime(best.Score.R3, Cubes.Cube333)}</td>
                    </tr>
                )
                continue
            }
            body.push(
                <tr key={key}>
                    <td>{GetCubeIcon(pj)} {CubesCn(pj)}</td>
                    <td style={{color: best.Rank === 1 ? "red" : ""}}>{best.Rank}</td>
                    <td style={{fontWeight: 700}}>{FormatTime(best.Score.Best, pj)}</td>
                    <td style={{fontWeight: 700}}>{avg === undefined ? "" : FormatTime(avg.Score.Avg, Cubes.Cube333)}</td>
                    <td style={{color: avg !== undefined && avg.Rank === 1 ? "red" : ""}}>{avg === undefined ? "" : avg.Rank}</td>
                </tr>
            )
        }

        return (
            <div>
                <h4 style={{textAlign: "center", fontWeight: 700}}>个人记录</h4>
                <table className="table table-striped table-hover text-center" id="best_score_table">
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

    renderPodiumsTable() {

        if (this.state.podium === null) {
            return <div></div>
        }

        const podium = this.state.podium as Podiums

        let body: JSX.Element[] = []
        if (podium !== undefined) {
            body.push(
                <tr key={"podium_" + podium.Player.ID}>
                    <td>{podium.Gold ? podium.Gold : 0}</td>
                    <td>{podium.Silver ? podium.Silver : 0}</td>
                    <td>{podium.Bronze ? podium.Bronze : 0}</td>
                </tr>
            )
        }


        return (
            <div>
                <h4 style={{textAlign: "center", fontWeight: 700}}>领奖台</h4>
                <table className="table table-striped table-hover text-center" id="best_score_table">
                    <thead>
                    <tr key={"renderPodiumsTable_head_tr"}>
                        <th colSpan={1}>金牌</th>
                        <th colSpan={1}>银牌</th>
                        <th colSpan={1}>铜牌</th>
                    </tr>
                    </thead>
                    <tbody>{body}</tbody>
                </table>
            </div>
        )
    }


    renderAllScore() {
        if (!this.state.ok) {
            return <div></div>
        }

        const renderPageByScore = () => {
            if (this.state.allScore === null) {
                return <div></div>
            }

            const allScore = this.state.allScore as GetPlayerAllScoreResponse
            if (allScore === null || allScore === undefined || allScore.Scores === null) {
                return <div></div>
            }


            // 轮次缓存
            let roundsByIdCache = new Map<number, Round>()
            for (let i = 0; i < allScore.Scores.length; i++) {
                const rounds = allScore.Scores[i].Rounds
                if (rounds !== undefined) {
                    for (let idx = 0; idx < rounds.length; idx++) {
                        roundsByIdCache.set(rounds[idx].ID, rounds[idx])
                    }
                }
            }

            // 成绩缓存
            let scoreByCubesMap = new Map<Cubes, ScoresByContest[]>()

            // 循环缓存
            for (let i = 0; i < allScore.Scores.length; i++) {
                const ss = allScore.Scores[i].Scores
                const contest = allScore.Scores[i].Contest
                const rounds = allScore.Scores[i].Rounds

                for (let j = 0; j < ss.length; j++) {
                    if (roundsByIdCache.get(ss[j].RouteID) !== undefined) {
                        ss[j].RouteValue = roundsByIdCache.get(ss[j].RouteID) as Round
                    }

                    let setScores = scoreByCubesMap.get(ss[j].Project)
                    if (setScores === undefined) {
                        setScores = [{Contest: contest, Scores: [ss[j]], Rounds: rounds}]
                        scoreByCubesMap.set(ss[j].Project, setScores)
                        continue
                    }
                    if (setScores[setScores.length - 1].Contest.ID === contest.ID) {
                        setScores[setScores.length - 1].Scores.push(ss[j])
                    }
                    setScores.push({Contest: contest, Scores: [ss[j]], Rounds: rounds})
                    scoreByCubesMap.set(ss[j].Project, setScores)
                }
            }


            const drawScoresBaseTablesAndChart = (pj: Cubes, scores: ScoresByContest[]) => {
                let tdNum = 5
                let items = []
                switch (pj) {
                    case Cubes.Cube666:
                    case Cubes.Cube777:
                    case Cubes.Cube333BF:
                    case Cubes.Cube444BF:
                    case Cubes.Cube555BF:
                    case Cubes.Cube333FM:
                        tdNum = 3
                }
                items.push(<tr key={"score_key_first_111"}>
                    <td colSpan={tdNum + 5}>{GetCubeIcon(pj)} {CubesCn(pj)}</td>
                </tr>)

                for (let i = 0; i < scores.length; i++) {
                    const contest = scores[i].Contest
                    const ss = scores[i].Scores

                    for (let j = 0; j < ss.length; j++) {
                        let cube5Td = (<></>)
                        if (tdNum === 5) {
                            cube5Td = (<>
                                <td>{FormatTime(ss[j].R4, pj)}</td>
                                <td>{FormatTime(ss[j].R5, Cubes.Cube333)}</td>
                            </>)
                        }

                        const IsBestGr = this.state.recordMap.get(ss[j].ID + "_" + RecordType.RecordBySingle) !== undefined
                        const IsAvgGr = this.state.recordMap.get(ss[j].ID + "_" + +RecordType.RecordByAvg) !== undefined

                        items.push(
                            <tr key={"score_key_" + ss[j].ID}>
                                <td>{j === 0 ? contest.Name : ""}</td>
                                {/*<td>{ss[j].RouteValue.Number}</td>*/}
                                {/*<td>{ss[j].Rank}</td>*/}
                                <td>{ss[j].RouteValue.Name}</td>
                                <td>{FormatRank(ss[j].Rank)}</td>
                                <td style={{fontWeight: 700}}>{PR_And_GR_Record(ss[j].IsBestSingle, IsBestGr)}{FormatTime(ss[j].Best, pj)}</td>
                                <td style={{fontWeight: 700}}>{PR_And_GR_Record(ss[j].IsBestAvg, IsAvgGr)}{FormatTime(ss[j].Avg, Cubes.Cube333)}</td>
                                <td>{FormatTime(ss[j].R1, pj)}</td>
                                <td>{FormatTime(ss[j].R2, pj)}</td>
                                <td>{FormatTime(ss[j].R3, pj)}</td>
                                {cube5Td}
                            </tr>
                        )
                    }
                }
                let ss: Score[] = []
                let ContestMap = new Map<number, Contest>()
                for (let idx = scores.length - 1; idx >= 0; idx--) {
                    ContestMap.set(scores[idx].Contest.ID, scores[idx].Contest)
                    for (let idk = 0; idk < scores[idx].Scores.length; idk++) {
                        ss.push(scores[idx].Scores[idk])
                    }
                }
                return (
                    <div style={{overflowX: "auto"}}>
                        <ScoreChat Project={pj} ContestMap={ContestMap}  scores={ss} key={"scores_chat_by_pj_" + pj}/>
                        <table className="table table-striped table-hover" style={{minWidth: "600px", marginTop: "20px", marginBottom: "30px"}}>
                            <thead>
                            <tr key={"renderPageByScore_thead"}>
                                <th>比赛</th>
                                <th>轮次</th>
                                <th>排名</th>
                                <th>单次</th>
                                <th>平均</th>
                                <th colSpan={tdNum}>详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                    </div>
                )
            }


            const drawScore333MBFTables = (scores: ScoresByContest[]) => {
                let items = []
                items.push(<tr key={"drawScore333MBFTables_score_key"}>
                    <td colSpan={5}>{GetCubeIcon(Cubes.Cube333MBF)} {CubesCn(Cubes.Cube333MBF)}</td>
                </tr>)
                for (let i = 0; i < scores.length; i++) {
                    const contest = scores[i].Contest
                    const ss = scores[i].Scores
                    for (let j = 0; j < ss.length; j++) {
                        const IsBestGr = this.state.recordMap.get(ss[j].ID + "_" + RecordType.RecordBySingle) !== undefined
                        items.push(
                            <tr key={"score_key" + ss[j].ID}>
                                <td><Link to={"/contest?id=" + contest.ID}>{j === 0 ? contest.Name : ""}</Link></td>
                                <td>{ss[j].RouteValue.Name}</td>
                                <td>{FormatRank(ss[j].Rank)}</td>
                                <td>{FormatTime(ss[j].Best, Cubes.Cube333MBF)}</td>
                                <td>{PR_And_GR_Record(ss[j].IsBestSingle, IsBestGr)} <i style={{fontWeight: 700}}> {ss[j].R1} / {ss[j].R2}</i> {FormatTime(ss[j].R3, Cubes.Cube333)}</td>
                            </tr>
                        )
                    }
                }

                return (
                    <div style={{overflowX: "auto"}}>
                        <table className="table table-striped table-hover" style={{minWidth: "600px", marginTop: "20px", marginBottom: "30px"}}>
                            <thead>
                            <tr key={"renderPageByScore_thead"}>
                                <th>比赛</th>
                                <th>轮次</th>
                                <th>排名</th>
                                <th>分数</th>
                                <th>详情</th>
                            </tr>
                            </thead>

                            <tbody>
                            {items}
                            </tbody>
                        </table>
                    </div>
                )
            }


            const pages: TabNavsPage[] = []
            const pjList = AllProjectList()

            for (let i = 0; i < pjList.length; i++) {
                const pj = pjList[i]
                let scores = scoreByCubesMap.get(pj)
                if (scores === undefined) {
                    continue
                }

                if (pj === Cubes.Cube333MBF) {
                    pages.push({
                        Id: "scores_" + pj,
                        Name: GetCubeIcon(pj),
                        Page: drawScore333MBFTables(scores)
                    })
                    continue
                }
                pages.push({
                    Id: "scores_" + pj,
                    Name: GetCubeIcon(pj),
                    Page: drawScoresBaseTablesAndChart(pj, scores)
                })
            }
            return (
                <div className="cubeTabNav">
                    <TabNav Id="socres" SelectedKey="score_cubes" Pages={pages} Center={true}/>
                </div>
            )
        }

        const renderPageByRecord = () => {
            let items: JSX.Element[] = []

            this.state.recordMap.forEach((value, key, map) => {
                let score = (<>
                    <td style={{fontWeight: 700}}>{FormatTime(value.Score.Best, value.Score.Project)}</td>
                    <td></td>
                </>)
                if (value.Record.RType === RecordType.RecordByAvg) {
                    score = (<>
                        <td></td>
                        <td style={{fontWeight: 700}}>{FormatTime(value.Score.Avg, value.Score.Project)}</td>
                    </>)
                }
                items.push(
                    <tr key={"renderPageByRecord_" + value.Record.RType + "_" + value.Record.ID}>
                        <td>{GetCubeIcon(value.Score.Project)} {CubesCn(value.Score.Project)}</td>
                        <td><Link to={"/contest?id=" + value.Contest.ID}>{value.Contest.Name}</Link></td>
                        {score}
                    </tr>
                )
            })
            return (
                <div style={{overflowX: "auto"}}>
                    <table className="table table-striped table-hover" style={{minWidth: "600px", marginTop: "20px", marginBottom: "30px"}}>
                        <thead>
                        <tr key={"renderPageByRecord_thead"}>
                            <th>项目</th>
                            <th>比赛</th>
                            <th>单次</th>
                            <th>平均</th>
                        </tr>
                        </thead>
                        <tbody>{items}</tbody>
                    </table>
                </div>
            )
        }

        const renderPageByPodium = () => {
            if (this.state.podium === null) {
                return <div></div>
            }

            const podium = this.state.podium as Podiums
            let items: JSX.Element[] = []
            if (podium.PodiumsResults !== null) {
                let lastContestID = -1
                podium.PodiumsResults = podium.PodiumsResults.reverse()
                for (let i = 0; i < podium.PodiumsResults.length; i++) {

                    let p = podium.PodiumsResults[i]
                    if (lastContestID !== p.Contest.ID) {
                        lastContestID = p.Contest.ID
                        items.push(<tr className="table-danger" key={"renderPageByPodium_contest" + p.Contest.ID}>
                            <td style={{color: "darkred"}} colSpan={9}>
                                <Link to={"/contest?id=" + p.Contest.ID}>{p.Contest.Name}</Link>
                            </td>
                        </tr>)
                    }

                    let pd = (
                        <>
                            <td>{FormatTime(p.Score.R1, p.Score.Project)}</td>
                            <td>{FormatTime(p.Score.R2, p.Score.Project)}</td>
                            <td>{FormatTime(p.Score.R3, p.Score.Project)}</td>
                            <td>{FormatTime(p.Score.R4, p.Score.Project)}</td>
                            <td>{FormatTime(p.Score.R5, p.Score.Project)}</td>
                        </>
                    )

                    switch (p.Score.Project) {
                        case Cubes.Cube666:
                        case Cubes.Cube777:
                        case Cubes.Cube333BF:
                        case Cubes.Cube444BF:
                        case Cubes.Cube555BF:
                        case Cubes.Cube333FM:
                            pd = (
                                <>
                                    <td>{FormatTime(p.Score.R1, p.Score.Project)}</td>
                                    <td>{FormatTime(p.Score.R2, p.Score.Project)}</td>
                                    <td>{FormatTime(p.Score.R3, p.Score.Project)}</td>
                                    <td></td>
                                    <td></td>
                                </>
                            )
                            break
                        case Cubes.Cube333MBF:
                            pd = (
                                <>
                                    <td>{p.Score.R1} / {p.Score.R2} </td>
                                    <td>{FormatTime(p.Score.R3, Cubes.Cube333)}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </>
                            )
                    }

                    items.push(
                        <tr key={"renderPageByPodium_value" + p.Score.ID}>
                            <td>{GetCubeIcon(p.Score.Project)} {CubesCn(p.Score.Project)}</td>
                            <td>{p.Score.Rank}</td>
                            <td style={{fontWeight: 700}}>{FormatTime(p.Score.Best, p.Score.Project)}</td>
                            <td style={{fontWeight: 700}}>{FormatTime(p.Score.Avg, p.Score.Project)}</td>
                            {pd}
                        </tr>
                    )
                }
            }

            return (
                <div style={{overflowX: "auto"}}>
                    <table className="table table-striped table-hover" style={{minWidth: "600px", marginTop: "20px", marginBottom: "30px"}}>
                        <thead>
                        <tr key={"renderPageByRecord_thead"}>
                            <th>项目</th>
                            <th>排名</th>
                            <th>单次</th>
                            <th>平均</th>
                            <th colSpan={5}>详情</th>
                        </tr>
                        </thead>
                        <tbody>{items}</tbody>
                    </table>
                </div>
            )
        }

        const tabs: TabNavsPage[] = [
            {
                Id: "score",
                Name: (<h4>成绩</h4>),
                Page: renderPageByScore(),
            },
            {
                Id: "record",
                Name: (<h4>记录</h4>),
                Page: renderPageByRecord(),
            },
            {
                Id: "podium",
                Name: (<h4>领奖台</h4>),
                Page: renderPageByPodium(),
            },
        ]

        return (
            <div style={{marginTop: "40px"}}>
                {/*<h4 style={{textAlign: "center", fontWeight: 700}}>成绩汇总</h4>*/}
                <TabNav Id={"player_scores"} SelectedKey={"tabs"} Pages={tabs} Center={true}/>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                {this.renderBestTable()}
                {this.renderPodiumsTable()}
                {this.renderAllScore()}
            </div>
        )
    }
}


export default PlayerPage;