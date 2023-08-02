import './contest.css'

import React, {JSX} from 'react';
import {API, WCAProjectList} from "../../components/api/api";
import {WaitGroup} from "../../components/utils/async";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {Contest, ContestPodiums, ContestRecord, GetContestResponse, GetContestScoreResponse, GetContestSorResponse, Round, RoutesScores, SorScore} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {TabNav, TabNavsHorizontal, TabNavsPage} from "../../components/utils/tabs";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {Cubes} from "../../components/cube/score/cube";
import {CubeScoresTable} from "../../components/cube/score/tabels";

class ContestPage extends React.Component {
    state = {
        ok: false,
        score: {},
        sor: {},
        contest: {},
        record: {},
        podium: {},
    }

    componentDidMount() {
        const p = GetLocationQueryParams()
        const id = Number(p['id'])

        let wg = new WaitGroup();
        wg.add(5)

        API.GetContestRecord(id).then(value => {
            this.setState({record: value})
            wg.done()
        })
        API.GetContest(id).then(value => {
            this.setState({contest: value})
            wg.done()
        })
        API.GetContestScore(id).then(value => {
            this.setState({score: value})
            wg.done()
        })
        API.GetContestSor(id).then(value => {
            this.setState({sor: value})
            wg.done()
        })
        API.GetContestPodium(id).then(value => {
            this.setState({podium: value})
            wg.done()
        })

        // wait all
        wg.wait().then(_ => {
            this.setState({ok: true})
        })
    }

    private readerSorTable() {
        const sor = this.state.sor as GetContestSorResponse

        // hidden
        if (sor.Avg === undefined || sor.Single === undefined) {
            return (<div></div>)
        }

        function sorTableBody(sor: GetContestSorResponse) {
            if (sor.Avg === null || sor.Avg === undefined || sor.Single === null || sor.Single === undefined) {
                return (<tbody></tbody>)
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

            const maxLength = sor.Single.length > sor.Avg.length ? sor.Single.length : sor.Avg.length
            return (
                <tbody>
                {Array.from(Array(maxLength), (e, i) => {
                    const single = i < sor.Single.length ? sor.Single[i] : null
                    let avg = i < sor.Avg.length ? sor.Avg[i] : null
                    return sorTrs(i, single, avg)
                })}
                </tbody>
            )
        }

        return (
            <div>
                <table className="table text-center table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">排名</th>
                        <th scope="col" colSpan={2}>单次</th>
                        <th scope="col" colSpan={2}>平均</th>
                        <th scope="col">排名</th>
                    </tr>
                    </thead>
                    {sorTableBody(sor)}
                </table>
            </div>
        )
    }

    private readerScore() {
        // 确认是否为空
        if (this.state.score === null) {
            return (<div></div>)
        }
        const s = this.state.score as GetContestScoreResponse
        if (s.Scores === undefined) {
            return (<div></div>)
        }


        // 循环渲染每个项目
        // todo !!!!!!!!!!!!!!!!!! 非常重要， 打乱number相同算同一个组
        const drawRoutesScores = (pj: Cubes, score: RoutesScores[]) => {
            let items = [];
            const records = this.state.record as ContestRecord[]
            for (let i = 0; i < score.length; i++) {
                const routes = score[i]
                if (routes === undefined) {
                    continue
                }

                items.push(
                    <div className="accordion-item" key={"drawRoutesScores_" + routes.Round.ID + "_item"}>
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={"#accordion-item-body" + routes.Round.ID} aria-expanded="true"
                                    aria-controls={"accordion-item-body" + routes.Round.ID}>
                                {routes.Round.Name}
                            </button>
                        </h2>
                        <div id={"accordion-item-body" + routes.Round.ID} className="accordion-collapse collapse show">
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
        const wcaList = WCAProjectList()
        for (let i = 0; i < wcaList.length; i++) {
            const pj = wcaList[i]
            let score = s.Scores[pj] as RoutesScores[]
            if (score === undefined || score.length === 0) {
                continue
            }
            pages.push({
                Id: "score_" + pj,
                Name: GetCubeIcon(pj),
                Page: drawRoutesScores(pj, score)
            })
        }

        return (<><TabNav Id="constest_socre" SelectedKey="score_cubes" Pages={pages}/></>)
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
        const contest = this.state.contest as GetContestResponse
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


        const drawRoundTables = (pj: Cubes, round: Round[]) => {

            // todo !!!!!!!!!!!!
            // 1. 同一轮打乱放在一个地方
            // 2. 打乱表格抽一个公共组件 -》 3轮的，3-2搭配， 5轮的 5-2搭配， 多盲， 有多少公式出多少

            return <div>111</div>
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
                console.log(id, rs)
                items.push(
                    <div className="accordion-item" key={"drawRounds_" + rFirst.ID + "_item"}>
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                    data-bs-target={"#drawRounds_accordion-item-body" + rFirst.ID} aria-expanded="true"
                                    aria-controls={"drawRounds_accordion-item-body" + rFirst.ID}>
                                {rFirst.Name}
                            </button>
                        </h2>
                        <div id={"drawRounds_accordion-item-body" + rFirst.ID} className="accordion-collapse collapse show">
                            <div className="accordion-body">
                                {drawRoundTables(pj, rs)}
                            </div>
                        </div>
                    </div>
                )
            })


            return (<div className="accordion" id={"accordion_" + pj + "_round"}>{items}</div>)
        }


        const pages: TabNavsPage[] = []
        const wcaList = WCAProjectList()
        for (let i = 0; i < wcaList.length; i++) {
            const pj = wcaList[i]
            const rounds = roundMap.get(pj)
            if (rounds === undefined) {
                continue
            }

            pages.push({
                Id: "round_" + pj,
                Name: GetCubeIcon(pj),
                Page: drawRounds(pj, rounds),
            })
        }
        return (<><TabNav Id="constest_round" SelectedKey="round_cubes" Pages={pages}/></>)
    }

    render() {
        const pages: TabNavsPage[] = [
            {
                Id: "tab_nav_score",
                Name: (<p>成绩 <i className="bi bi-kanban"></i></p>),
                Page: this.readerScore(),
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

        const contest = this.state.contest as Contest
        return (
            <div>
                <div><h1 className="text-center">{contest.Name}</h1></div>
                <TabNavsHorizontal Id="contest_nav" SelectedKey="contest_tab" Pages={pages}/>
            </div>
        )

    }
}

export default ContestPage;