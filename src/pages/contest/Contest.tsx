import './contest.css'

import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {AllProjectList, CubesCn} from "../../components/cube/cube";
import {Cubes, CubesAttributes, CubesAttributesMap, CubesRouteType} from "../../components/cube/cube_map";
import {GetLocationQueryParams, SetTitleName} from "../../components/utils/utils";
import {
    Contest,
    ContestPodiums,
    ContestRecord,
    GetContestScoreResponse,
    GetContestSorResponse,
    Round,
    RoutesScores,
    SorScore
} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {CubeIcon} from "../../components/cube/icon/cube_icon";
import {
    CubeScoresTable,
    CubeScoreTds,
    RecordsToMap,
    RecordType
} from "../../components/cube/components/cube_score_tabels";
import {RoundTables} from "../../components/cube/components/cube_rounds";
import {SorKeys, SorTable} from "../../components/cube/components/cube_sor";
import {SetBackGround} from "../../components/utils/background";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {PR_And_GR_Record} from "../../components/cube/components/cube_record";

class ContestPage extends React.Component {
    state = {
        score: {},
        sor: {},
        contest: {},
        record: {},
        recordMap: new Map<string, ContestRecord>(),
        podium: {},
    }

    componentDidMount() {
        SetBackGround("")
        const p = GetLocationQueryParams()
        const id = Number(p['id'])

        API.GetContestRecord(id).then(value => {
            this.setState({
                record: value,
                recordMap: RecordsToMap(value),
            })
        })
        API.GetContest(id).then(value => {
            this.setState({contest: value})
        })
        API.GetContestScore(id).then(value => {
            this.setState({score: value})
        })
        API.GetContestSor(id).then(value => {
            this.setState({sor: value})
        })
        API.GetContestPodium(id).then(value => {
            this.setState({podium: value})
        })
    }

    private readerSorTable() {
        const sor = this.state.sor as GetContestSorResponse
        if (sor === undefined || (sor.Single === undefined && sor.Avg === undefined)) {
            return <div></div>
        }

        let tabs: TabNavsPage[] = []
        SorKeys.forEach((value, key) => {
            const single = sor.Single[key] as SorScore[]
            const avg = sor.Avg[key] as SorScore[]

            if (single === undefined && avg === undefined) {
                return
            }
            tabs.push({
                Id: key,
                Name: (<h6>{value}</h6>),
                Page: SorTable(single, avg),
            })
        })

        return (<TabNav Id={"contest_sor_tabs"} SelectedKey={"contest_sor_tabs"} Pages={tabs} Center={true}/>)
    }

    private readerScore() {
        if (this.state.score === null) {
            return (<div></div>)
        }
        const s = this.state.score as GetContestScoreResponse
        if (s.Scores === undefined) {
            return (<div></div>)
        }


        // 循环渲染每个项目
        const drawRoutesScores = (pj: Cubes, scores: RoutesScores[]) => {
            let items = [];
            const records = this.state.record as ContestRecord[]
            for (let i = 0; i < scores.length; i++) {
                const routes = scores[i]
                if (routes === undefined) {
                    continue
                }

                const id = routes.Round[0].ID
                items.push(
                    <div className="accordion-item" key={"drawRoutesScores_" + id + "_item"}>
                        <h2 className="accordion-header">
                            <button className="accordion-button"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={"#accordion-item-body" + id}
                                    aria-expanded="true"
                                    aria-controls={"accordion-item-body" + id}>
                                {routes.Round[0].Name}
                            </button>
                        </h2>
                        <div id={"accordion-item-body" + id} className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                {CubeScoresTable(pj, routes.Scores, records)}
                            </div>
                        </div>
                    </div>
                )
            }

            return (
                <div className="accordion" id={"accordion" + pj + "scores"}>{items}</div>
            )
        }

        const pages: TabNavsPage[] = []
        const pjList = AllProjectList()
        for (let i = 0; i < pjList.length; i++) {
            const pj = pjList[i]
            let score = s.Scores[pj] as RoutesScores[]
            if (score === undefined || score.length === 0) {
                continue
            }
            pages.push({
                Id: "score_" + pj,
                Name: CubeIcon(pj),
                Page: drawRoutesScores(pj, score)
            })
        }

        return (<TabNav Id="constest_socre" SelectedKey="score_cubes" Pages={pages} Center={false}/>)
    }

    private readerScoreAll() {
        if (this.state.score === null) {
            return (<div></div>)
        }

        const s = this.state.score as GetContestScoreResponse
        if (s.Scores === undefined) {
            return (<div></div>)
        }


        let items: JSX.Element[] = []

        AllProjectList().forEach((value) => {
            const scores = s.Scores[value] as RoutesScores[]
            if (scores === undefined) {
                return
            }

            for (let i = 0; i < scores.length; i++) {
                const ss = scores[i]
                if (ss === undefined || ss.Scores === undefined) {
                    continue
                }

                for (let j = 0; j < ss.Scores.length; j++) {
                    const score = ss.Scores[j]
                    let sp = <td rowSpan={ss.Scores.length}>{CubeIcon(score.Project)} {CubesCn(score.Project)}</td>
                    if (j !== 0) {
                        sp = <></>
                    }

                    items.push(
                        <tr key={"readerScoreAll" + score.ID}>
                            {sp}
                            <td>{j + 1}</td>
                            {/*<td>{score.RouteValue.Name}</td>*/}
                            <td><Link to={"/player?id=" + score.PlayerID}>{score.PlayerName}</Link></td>
                            <td>{PR_And_GR_Record(score.IsBestSingle, this.state.recordMap.get(score.ID.toString() + RecordType.RecordBySingle.toString()) !== undefined)}{FormatTime(score.Best, score.Project, false)}</td>
                            <td>{PR_And_GR_Record(score.IsBestAvg, this.state.recordMap.get(score.ID.toString() + RecordType.RecordByAvg.toString()) !== undefined)}{FormatTime(score.Avg, score.Project, true)}</td>
                            <>{CubeScoreTds(score)}</>
                        </tr>
                    )
                }

            }
        })


        return (
            <div style={{marginTop: "20px", marginBottom: "20px", overflowX: "auto"}}>
                <table className="table table-bordered table-striped table-hover text-center"
                       style={{minWidth: "800px"}}>
                    <thead>
                    <tr>
                        <th>项目</th>
                        <th>排名</th>
                        {/*<th>轮次</th>*/}
                        <th>选手</th>
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

    private readerPodiums() {
        const podiums = this.state.podium as ContestPodiums[]
        if (podiums === null || podiums === undefined || podiums.length === 0) {
            return (<div></div>)
        }

        const getItems = () => {
            const items = [];
            for (let i = 0; i < podiums.length; i++) {
                items.push(
                    <tr className={i < 3 ? "table-success" : ""}>
                        <td>{i + 1}</td>
                        <td><Link to={"/player?id=" + podiums[i].Player.ID}>{podiums[i].Player.Name}</Link></td>
                        <td>{podiums[i].Gold}</td>
                        <td>{podiums[i].Silver}</td>
                        <td>{podiums[i].Bronze}</td>
                    </tr>
                )
            }
            return items;
        }

        return (
            <table className="table table-bordered table-striped table-hover text-center">
                <thead>
                <tr>
                    <th>排名</th>
                    <th>选手</th>
                    <th>金牌数</th>
                    <th>银牌数</th>
                    <th>铜牌数</th>
                </tr>
                </thead>
                <tbody>{getItems()}</tbody>
            </table>
        )
    }

    private readerRound() {
        const contest = this.state.contest as Contest
        if (contest === null || contest === undefined || contest.Rounds === null || contest.Rounds === undefined || contest.Rounds.length === 0) {
            return (<div></div>)
        }

        // cache
        let roundMap = new Map<string, Round[]>()
        for (let i = 0; i < contest.Rounds.length; i++) {
            const pj = contest.Rounds[i].Project
            let oldRounds = roundMap.get(pj)
            if (oldRounds === undefined) {
                roundMap.set(pj, [contest.Rounds[i]])
                continue
            }
            oldRounds.push(contest.Rounds[i])
            roundMap.set(pj, oldRounds)
        }

        const drawRounds = (pj: Cubes, rounds: Round[]) => {
            // 分开每一轮的数据
            let roundNumberMap = new Map<number, Round[]>()
            for (let i = rounds.length - 1; i >= 0; i--) {
                const num = rounds[i].Number
                let oldRounds = roundNumberMap.get(num)
                if (oldRounds === undefined) {
                    roundNumberMap.set(num, [rounds[i]])
                    continue
                }
                oldRounds.push(contest.Rounds[i])
                roundNumberMap.set(num, oldRounds)
            }


            // 循环
            const items: JSX.Element[] = []
            roundNumberMap.forEach((rs, id) => {
                const rFirst = rs[0]
                items.push(
                    <div className="accordion-item" key={"drawRounds_" + rFirst.ID + "_item"}>
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={"#drawRounds_accordion-item-body" + rFirst.ID} aria-expanded="true"
                                    aria-controls={"drawRounds_accordion-item-body" + rFirst.ID}>
                                {rFirst.Name}
                            </button>
                        </h2>
                        <div id={"drawRounds_accordion-item-body" + rFirst.ID}
                             className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                {RoundTables(rs)}
                            </div>
                        </div>
                    </div>
                )
            })


            return (<div className="accordion" id={"accordion_" + pj + "_round"}>{items}</div>)
        }


        const pages: TabNavsPage[] = []
        const pjList = AllProjectList()
        for (let i = 0; i < pjList.length; i++) {
            const pj = pjList[i]
            const rounds = roundMap.get(pj)
            if (rounds === undefined) {
                continue
            }

            pages.push({
                Id: "round_" + pj,
                Name: CubeIcon(pj),
                Page: drawRounds(pj, rounds),
            })
        }
        return (<><TabNav Id="constest_round" SelectedKey="round_cubes" Pages={pages} Center={false}/></>)
    }

    private readerRecord() {
        if (this.state.record === undefined || this.state.record === null) {
            return <div>加载中...</div>
        }

        const record = this.state.record as ContestRecord[]
        if (record === undefined || record === null || record.length === 0) {
            return <div>比赛未结束或无记录</div>
        }

        let items: JSX.Element[] = []

        for (let i = 0; i < record.length; i++) {
            const r = record[i]
            let name = "单次"
            let score = FormatTime(r.Score.Best, r.Score.Project, false)
            if (r.Record.RType === RecordType.RecordByAvg) {
                score = FormatTime(r.Score.Avg, r.Score.Project, true)
                name = "平均"
            }
            const attr = CubesAttributesMap.get(r.Score.Project) as CubesAttributes
            if (attr.RouteType === CubesRouteType.RouteTypeRepeatedly) {
                score = r.Score.R1 + "/" + r.Score.R2 + "(" + FormatTime(r.Score.R3, r.Score.Project, true) + ")"
            }


            items.push(
                <tr key={"readerRecord" + r.Record.ID}>
                    <td>{CubeIcon(r.Score.Project)}{CubesCn(r.Score.Project)}</td>
                    <td>{r.Player.Name}</td>
                    <td>{name}</td>
                    <td>{score}</td>
                </tr>
            )
        }

        return (
            <table className="table text-center table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">项目</th>
                    <th scope="col">选手</th>
                    <th scope="col">类型</th>
                    <th scope="col">成绩</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        )
    }


    render() {
        const contest = this.state.contest as Contest
        if (contest === undefined) {
            return <div></div>
        }
        SetTitleName(contest.Name)

        const pages: TabNavsPage[] = [
            {
                Id: "tab_nav_score",
                Name: (<p>成绩 <i className="bi bi-kanban"></i></p>),
                Page: this.readerScore(),
            },
            {
                Id: "tab_nav_all_score_table",
                Name: (<p>汇总 <i className="bi bi-kanban-fill"></i></p>),
                Page: this.readerScoreAll(),
            },
            {
                Id: "tab_nav_record",
                Name: (<p>记录<i className="bi bi-kanban"></i></p>),
                Page: this.readerRecord(),
            },
            {
                Id: "tab_nav_podium",
                Name: (<p>奖牌 <i className="bi bi-trophy-fill"></i></p>),
                Page: this.readerPodiums(),
            },
            {
                Id: "tab_nav_sor",
                Name: (<p>排名 <i className="bi bi-bar-chart"></i></p>),
                Page: this.readerSorTable(),
            },
            {
                Id: "tab_nav_round",
                Name: (<p>打乱 <i className="bi bi-receipt-cutoff"></i></p>),
                Page: this.readerRound(),
            },
        ]
        return (
            <div>
                <div><h1 className="text-center">{contest.Name}</h1></div>
                <TabNav Id="contest_nav" SelectedKey="contest_tab" Pages={pages} Center={false}/>
            </div>
        )

    }
}

export default ContestPage;