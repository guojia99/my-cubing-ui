import './Player.css'


import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {AllProjectList, Cubes, CubesCn} from "../../components/cube/cube";
import {GetLocationQueryParams, SetTitleName} from "../../components/utils/utils";
import {
    Contest,
    GetPlayerAllScoreResponse, GetPlayerOldEnemyResponse,
    GetPlayerRecord,
    Player,
    PlayerBestScoreResponse,
    PlayerSorResponse,
    Podiums,
    RankScore,
    RecordMessage,
    Round,
    Score,
    ScoresByContest,
    SorScore
} from "../../components/api/api_model";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {FormatRank, FormatTime} from "../../components/cube/components/cube_timeformat";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {Link} from "react-router-dom";
import {PR_And_GR_Record} from "../../components/cube/components/cube_record";
import {CubeScoreTds, RecordType} from "../../components/cube/components/cube_score_tabels";
import {ScoreChat} from "../../components/cube/components/cube_scores_echarts";
import {SorKeys} from "../../components/cube/components/cube_sor";
import {SetBackGround} from "../../components/utils/background";
import {Avatar} from "../../components/utils/avatar";

class PlayerPage extends React.Component {
    state = {
        player: null,
        best: null,
        podium: null,
        allScore: null,
        recordMap: new Map<string, RecordMessage>(),
        sor: null,
        avatar: null,
        oldEnemy: null,
    }

    componentDidMount() {
        const p = GetLocationQueryParams()
        const id = Number(p["id"])

        API.GetPlayer(id).then(value => this.setState({player: value}))
        API.GetPlayerImage(id).then(value => {
            if (value.Background !== undefined) {
                SetBackGround(value.Background)
            }
            if (value.Avatar !== undefined && value.Avatar !== "") {
                this.setState({avatar: value.Avatar})
            }
        }).catch()
        API.GetPlayerBestScore(id).then(value => {
            this.setState({best: value})
        })
        API.GetPlayerAllScore(id).then(value => {
            this.setState({allScore: value})
        })
        API.GetPlayerPodium(id).then(value => {
            this.setState({podium: value})
        })
        API.GetPlayerSor(id).then(value => {
            this.setState({sor: value})
        })
        API.GetPlayerRecord(id).then(value => {
            let record = value as GetPlayerRecord
            if (record === null || record === undefined) {
                return
            }
            record = record.reverse()
            for (let i = 0; i < record.length; i++) {
                this.state.recordMap.set(record[i].Score.ID + "_" + record[i].Record.RType, record[i])
            }
        })
        API.GetPlayerOldEnemy(id).then(value => {
            this.setState({oldEnemy: value})
        })
    }

    renderAvatar() {
        if (this.state.avatar === null || this.state.player === null) {
            return <div></div>
        }
        const p = this.state.player as Player
        return Avatar(this.state.avatar as string, p.Name)
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
                {this.renderAvatar()}

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
                        <td>{player.RecoveryNumber - (player.ValidRecoveryNumber ? player.ValidRecoveryNumber : 0)} / {player.RecoveryNumber}</td>
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
                        <td style={{fontWeight: 700, color: best.Rank === 1 ? "red" : ""}}>
                            {best.Score.R1 + "/" + best.Score.R2 + " " + FormatTime(best.Score.R3, best.Score.Project, true)}
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                )
                continue
            }
            let avgTd = <>
                <td></td>
                <td></td>
            </>

            if (avg !== undefined) {
                avgTd = (<>
                    <td style={{fontWeight: 700, color: avg.Rank === 1 ? "red" : ""}}>{FormatTime(avg.Score.Avg, avg.Score.Project, true)}</td>
                    <td style={{color: avg.Rank === 1 ? "red" : ""}}>{avg.Rank}</td>
                </>)
            }

            body.push(
                <tr key={key}>
                    <td>{GetCubeIcon(pj)} {CubesCn(pj)}</td>
                    <td style={{color: best.Rank === 1 ? "red" : ""}}>{best.Rank}</td>
                    <td style={{fontWeight: 700, color: best.Rank === 1 ? "red" : ""}}>{FormatTime(best.Score.Best, pj, false)}</td>
                    {avgTd}
                </tr>
            )
        }

        return (
            <div>
                <h4 style={{textAlign: "center", fontWeight: 700}}>个人纪录</h4>
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
            const g = podium.Gold ? podium.Gold : 0
            const s = podium.Silver ? podium.Silver : 0
            const b = podium.Bronze ? podium.Bronze : 0
            body.push(
                <tr key={"podium_" + podium.Player.ID}>
                    <td>{g}</td>
                    <td>{s}</td>
                    <td>{b}</td>
                    <td>{g + s + b}</td>
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
                        <th colSpan={1}>总数</th>
                    </tr>
                    </thead>
                    <tbody>{body}</tbody>
                </table>
            </div>
        )
    }

    renderSorTable() {
        if (this.state.sor === null) {
            return <div></div>
        }

        const sor = this.state.sor as PlayerSorResponse

        if (sor.Single === undefined && sor.Avg === undefined) {
            return <div></div>
        }
        let body: JSX.Element[] = []
        SorKeys.forEach((value, key) => {
            const signal = sor.Single[key] as SorScore
            const avg = sor.Avg[key] as SorScore

            if (signal === undefined && avg === undefined) {
                return
            }

            body.push(
                <tr key={"renderSorTable_tr" + key}>
                    <th>{value}</th>
                    <td style={{color: signal.SingleRank === 1 ? "red" : ""}}>{signal.SingleRank}</td>
                    <td style={{color: signal.SingleRank === 1 ? "red" : ""}}>{signal.SingleCount} ({signal.SingleProjects})</td>
                    <td style={{color: avg.AvgRank === 1 ? "red" : ""}}> {avg.AvgCount} ({avg.AvgProjects})</td>
                    <td style={{color: avg.AvgRank === 1 ? "red" : ""}}>{avg.AvgRank}</td>
                </tr>
            )
        })

        return (
            <div>
                <h4 style={{textAlign: "center", fontWeight: 700}}>排位分</h4>
                <table className="table table-striped table-hover text-center" id="best_score_table">
                    <thead>
                    <tr key={"renderPodiumsTable_head_tr"}>
                        <th colSpan={1}>项目</th>
                        <th colSpan={1}>排位</th>
                        <th colSpan={1}>单次</th>
                        <th colSpan={1}>平均</th>
                        <th colSpan={1}>排位</th>
                    </tr>
                    </thead>
                    <tbody>{body}</tbody>
                </table>
            </div>
        )
    }

    renderAllScore() {
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
                        scoreByCubesMap.set(ss[j].Project, setScores)
                        continue
                    }
                    setScores.push({Contest: contest, Scores: [ss[j]], Rounds: rounds})
                    scoreByCubesMap.set(ss[j].Project, setScores)
                }
            }


            const drawScoresBaseTablesAndChart = (pj: Cubes, scores: ScoresByContest[]) => {
                let tdNum = 5
                let items = []

                items.push(<tr key={"score_key_first_111_" + pj}>
                    <td colSpan={tdNum + 5}>{GetCubeIcon(pj)} {CubesCn(pj)}</td>
                </tr>)

                for (let i = 0; i < scores.length; i++) {
                    const contest = scores[i].Contest
                    const ss = scores[i].Scores

                    for (let j = 0; j < ss.length; j++) {
                        const IsBestGr = this.state.recordMap.get(ss[j].ID + "_" + RecordType.RecordBySingle) !== undefined
                        const IsAvgGr = this.state.recordMap.get(ss[j].ID + "_" + +RecordType.RecordByAvg) !== undefined

                        items.push(
                            <tr key={"drawScoresBaseTablesAndChart_KEY_" + ss[j].ID}>
                                <td>{j === 0 ? contest.Name : ""}</td>
                                {/*<td>{ss[j].RouteValue.Number}</td>*/}
                                {/*<td>{ss[j].Rank}</td>*/}
                                <td>{ss[j].RouteValue.Name}</td>
                                <td>{FormatRank(ss[j].Rank)}</td>
                                <td style={{fontWeight: 700}}>{PR_And_GR_Record(ss[j].IsBestSingle, IsBestGr)}{FormatTime(ss[j].Best, pj, false)}</td>
                                <td style={{fontWeight: 700}}>{PR_And_GR_Record(ss[j].IsBestAvg, IsAvgGr)}{FormatTime(ss[j].Avg, pj, true)}</td>
                                {CubeScoreTds(ss[j])}
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
                        <ScoreChat Project={pj} ContestMap={ContestMap} scores={ss} key={"scores_chat_by_pj_" + pj}/>
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


                        let score = <>{ss[j].R1} / {ss[j].R2}</>
                        if (ss[j].R1 < 2) {
                            score = <>DNF</>
                        }

                        items.push(
                            <tr key={"score_key" + ss[j].ID}>
                                <td><Link to={"/contest?id=" + contest.ID}>{j === 0 ? contest.Name : ""}</Link></td>
                                <td>{ss[j].RouteValue.Name}</td>
                                <td>{FormatRank(ss[j].Rank)}</td>
                                <td>{FormatTime(ss[j].Best, Cubes.Cube333MBF, false)}</td>
                                <td>{PR_And_GR_Record(ss[j].IsBestSingle, IsBestGr)} <i style={{fontWeight: 700}}> {score} </i> {FormatTime(ss[j].R3, ss[j].Project, true)}
                                </td>
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

            let lastRecord: RecordMessage
            this.state.recordMap.forEach((value, key, map) => {
                let score = (<>
                    <td style={{fontWeight: 700}}>{FormatTime(value.Score.Best, value.Score.Project, false)}</td>
                    <td></td>
                </>)
                if (value.Record.RType === RecordType.RecordByAvg) {
                    score = (<>
                        <td></td>
                        <td style={{fontWeight: 700}}>{FormatTime(value.Score.Avg, value.Score.Project, true)}</td>
                    </>)
                }

                if (lastRecord !== null && lastRecord !== undefined && lastRecord.Score.ID === value.Score.ID) {
                    score = (<>
                        <td style={{fontWeight: 700}}>{FormatTime(value.Score.Best, value.Score.Project, false)}</td>
                        <td style={{fontWeight: 700}}>{FormatTime(value.Score.Avg, value.Score.Project, true)}</td>
                    </>)
                    items.pop()
                }
                items.push(
                    <tr key={"renderPageByRecord_" + value.Record.RType + "_" + value.Record.ID}>
                        <td>{GetCubeIcon(value.Score.Project)} {CubesCn(value.Score.Project)}</td>
                        <td><Link to={"/contest?id=" + value.Contest.ID}>{value.Contest.Name}</Link></td>
                        {score}
                    </tr>
                )
                lastRecord = value
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
            if (podium.PodiumsResults !== null && podium.PodiumsResults !== undefined) {
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

                    items.push(
                        <tr key={"renderPageByPodium_value" + p.Score.ID}>
                            <td>{GetCubeIcon(p.Score.Project)} {CubesCn(p.Score.Project)}</td>
                            <td>{p.Score.Rank}</td>
                            <td style={{fontWeight: 700}}>{FormatTime(p.Score.Best, p.Score.Project, false)}</td>
                            <td style={{fontWeight: 700}}>{FormatTime(p.Score.Avg, p.Score.Project, true)}</td>
                            {CubeScoreTds(p.Score)}
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

        const renderPageByOldEnemy = () => {
            if (this.state.oldEnemy === null || this.state.player === null) {
                return <h2 style={{margin: "30px 30px"}}>加载中</h2>
            }

            const player = this.state.player as Player
            const oldEnemy = this.state.oldEnemy as GetPlayerOldEnemyResponse
            if (oldEnemy === undefined || oldEnemy.length === 0) {
                return <h2 style={{margin: "30px 30px", textAlign: "center"}}><p style={{color: "red"}}>{player.Name}</p> 无任何宿敌!</h2>
            }

            let items: JSX.Element[] = []

            const allPj = AllProjectList()

            const scoreTable = (allSingle: any, allAvg: any) => {
                let items: JSX.Element[] = []
                for (let i = 0; i < allPj.length; i++) {
                    const avg = allAvg[allPj[i]] as Score
                    const best = allSingle[allPj[i]] as Score
                    if (avg === undefined && best === undefined) {
                        continue
                    }

                    items.push(<tr>
                        <td>{GetCubeIcon(allPj[i])} {CubesCn(allPj[i])}</td>
                        <td>{FormatTime(best.Best, allPj[i], false)}</td>
                        <td>{avg !== undefined ? FormatTime(avg.Avg, allPj[i], false) : "-"}</td>
                    </tr>)
                }
                return (
                    <div style={{overflowX: "auto"}}>
                        <table className="table table-striped table-hover" style={{minWidth: "600px", marginTop: "20px", marginBottom: "30px"}}>
                            <thead>
                            <tr>
                                <th>项目</th>
                                <th>单次</th>
                                <th>平均</th>
                            </tr>
                            </thead>
                            <tbody>{items}</tbody>
                        </table>
                    </div>
                )
            }


            for (let i = 0; i < oldEnemy.length; i++) {
                items.push(
                    <tr key={"renderPageByOldEnemy_item" + oldEnemy[i].Player.ID}>
                        <td>{oldEnemy[i].Player.Name}</td>
                        <td>{scoreTable(oldEnemy[i].Single, oldEnemy[i].Avg)}</td>
                    </tr>
                )
            }

            return (
                <div style={{overflowX: "auto"}}>
                    <table className="table table-striped table-hover" style={{minWidth: "600px", marginTop: "20px", marginBottom: "30px"}}>
                        <thead>
                        <tr key={"renderPageByOldEnemy_thead1"}>
                            <th colSpan={2}><h4>宿敌列表</h4></th>
                        </tr>
                        <tr key={"renderPageByOldEnemy_thead2"}>
                            <th>选手</th>
                            <th>成绩对比</th>
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
                Name: (<h4>纪录</h4>),
                Page: renderPageByRecord(),
            },
            {
                Id: "podium",
                Name: (<h4>领奖台</h4>),
                Page: renderPageByPodium(),
            },
            {
                Id: "old_enemy",
                Name: (<h4>宿敌</h4>),
                Page: renderPageByOldEnemy()
            }
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
                {this.renderSorTable()}
                {this.renderAllScore()}
            </div>
        )
    }
}


export default PlayerPage;