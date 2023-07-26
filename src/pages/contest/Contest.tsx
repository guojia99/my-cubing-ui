import './contest.css'

import React from 'react';
import {API} from "../../components/api/api";
import {WaitGroup} from "../../components/utils/async";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {Contest, GetContestSorResponse, SorScore} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {TabNav, TabNavsHorizontal, TabNavsPage} from "../../components/utils/tabs";
import {Cubes, GetCubeIcon} from "../../components/icon/cube_icon";


class ContestPage extends React.Component {
    state = {
        ok: false,
        score: {},
        sor: {},
        contest: {},
    }

    componentDidMount() {
        const p = GetLocationQueryParams()
        const id = Number(p['id'])

        let wg = new WaitGroup();
        wg.add(3)

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

    private sorTableBody(sor: GetContestSorResponse) {
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
                    {this.sorTableBody(sor)}
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
        const pages: TabNavsPage[] = [
            {
                Id: "event-555bf",
                Name: GetCubeIcon(Cubes.Cube555BF),
                Page: (<div>Cube555BF</div>)
            },
            {
                Id: "event-magic",
                Name:GetCubeIcon(Cubes.Cube333FM),
                Page: (<div>Cube333FM</div>)
            },
            {
                Id: "event-sq1",
                Name: GetCubeIcon(Cubes.CubeSk),
                Page: (<div>CubeSk</div>)
            },
            {
                Id: "event-event-skewb",
                Name: GetCubeIcon(Cubes.CubePy),
                Page: (<div>CubePy</div>)
            },
            {
                Id: "event-event-777",
                Name: GetCubeIcon(Cubes.Cube777),
                Page: (<div>777</div>)
            },
        ]

        return (<><TabNav Id="constest_socre" Pages={pages}/></>)
    }

    render() {
        const pages: TabNavsPage[] = [
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
                Id: "Score",
                Name: (<p>成绩</p>),
                Page: this.readerScore(),
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