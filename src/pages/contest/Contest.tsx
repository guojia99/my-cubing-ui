import './contest.css'

import React from 'react';
import {API, WCAProjectList} from "../../components/api/api";
import {WaitGroup} from "../../components/utils/async";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {Contest, ContestRecord, GetContestScoreResponse, GetContestSorResponse, RoutesScores, SorScore} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {TabNav, TabNavsHorizontal, TabNavsPage} from "../../components/utils/tabs";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {Cubes} from "../../components/cube/cube";
import {CubeScoresTable} from "../../components/cube/tabels";


class ContestPage extends React.Component {
    state = {
        ok: false,
        score: {},
        sor: {},
        contest: {},
        record: {},
    }

    componentDidMount() {
        const p = GetLocationQueryParams()
        const id = Number(p['id'])

        let wg = new WaitGroup();
        wg.add(4)

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

        // wait all
        wg.wait().then(_ => {
            this.setState({ok: true})
        })
    }

    private readerSorTable() {
        const sor = this.state.sor as GetContestSorResponse

        // hidden
        if (sor.Avg === undefined || sor.Single === undefined) {
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
                        <tbody>
                        <tr>
                            {Array.from(Array(6), (e, i) => {
                                return (<td><p aria-hidden="true"><span className="placeholder placeholder-wave col-12"></span></p></td>)
                            })}
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }

        function sorTableBody(sor: GetContestSorResponse) {
            if (sor.Avg === null || sor.Avg === undefined || sor.Single === null || sor.Single === undefined) {
                return (<tbody></tbody>)
            }

            function sorTrs(idx: number, single: SorScore | null, avg: SorScore | null) {
                idx = idx += 1


                const SingleTds = () => {
                    if (single === null) {
                        return (
                            <>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </>
                        )
                    }
                    return (
                        <>
                            <td>{idx}</td>
                            <td><Link to={"/player?id=" + single.Player.ID}>{single.Player.Name}</Link></td>
                            <td>{single.SingleCount}</td>
                        </>
                    )
                }

                const AvgTds = () => {
                    if (avg === null) {
                        return (
                            <>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </>
                        )
                    }
                    return (
                        <>
                            <td>{avg.AvgCount}</td>
                            <td><Link to={"/player?id=" + avg.Player.ID}>{avg.Player.Name}</Link></td>
                            <td>{idx}</td>
                        </>
                    )
                }

                return (
                    <tr>
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

    private readerContestInfo() {
        // hidden
        const contest = this.state.contest as Contest
        if (contest.Name === "") {
            return (
                <h1 className="text-center">
                    <p aria-hidden="true"><span className="placeholder placeholder-wave col-12"></span></p>
                </h1>
            )
        }

        return (
            <div><h1 className="text-center">{contest.Name}</h1></div>
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

        const drawRoutesScores = (pj: Cubes, score: RoutesScores[]) => {
            let items = [];
            const records = this.state.record as ContestRecord[]
            for (let i = 0; i < score.length; i++) {
                const routes = score[i]
                if (routes === undefined) {
                    continue
                }

                items.push(
                    <div className="accordion-item">
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
                Id: "round_score_" + pj,
                Name: GetCubeIcon(pj),
                Page: drawRoutesScores(pj, score)
            })
        }

        return (<><TabNav Id="constest_socre" Pages={pages}/></>)
    }

    render() {
        const pages: TabNavsPage[] = [
            {
                Id: "Score",
                Name: (<p>成绩</p>),
                Page: this.readerScore(),
            },
            {
                Id: "other",
                Name: (<p>奖牌榜</p>),
                Page: (<div>1111</div>)
            },
            {
                Id: "sor",
                Name: (<p>综合排名</p>),
                Page: this.readerSorTable(),
            },

            {
                Id: "Round",
                Name: (<p>打乱</p>),
                Page: (<div>1111</div>)
            },
        ]

        return (
            <div>
                {this.readerContestInfo()}
                <TabNavsHorizontal Id="contestId" Pages={pages}/>
            </div>
        )

    }
}

export default ContestPage;