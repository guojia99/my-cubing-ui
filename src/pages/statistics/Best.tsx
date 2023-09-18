import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {GetBestByAllScoresResponse, GetBestScoreResponse, Score} from "../../components/api/api_model";
import {AllProjectList, Cubes, CubesCn} from "../../components/cube/cube";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {Link} from "react-router-dom";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {CubeScoreTds} from "../../components/cube/components/cube_score_tabels";

class Best extends React.Component {
    state = {
        bestTop: null,
        bestAll: null,
    }

    componentDidMount() {
        API.GetBestScore().then(value => {
            this.setState({bestTop: value})
        })
        API.GetBestByAllScores().then(value => {
            this.setState({bestAll: value})
        })
    }


    allRenderTables = (pj: Cubes, IsBest: boolean, scores: Score[]) => {
        if (scores === undefined || scores.length === 0) {
            return (<div></div>)
        }

        const items: JSX.Element[] = []
        const k = IsBest ? "b" : "a"
        for (let i = 0; i < scores.length; i++) {
            const key = "allRenderTablesKey_" + k + "_" + pj + "_" + i + "_" + scores[i].ID
            const s = scores[i]
            items.push(<tr key={key}>
                <td>{i + 1}</td>
                <td><Link to={"/player?id=" + s.PlayerID}>{s.PlayerName}</Link></td>
                <td className={IsBest ? "table-info" : ""}>{FormatTime(s.Best, s.Project, false)}</td>
                <td className={!IsBest ? "table-info" : ""}>{FormatTime(s.Avg, s.Project, true)}</td>
                {CubeScoreTds(s)}
            </tr>)
        }
        return (<div key={pj + "_" + k}>
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th colSpan={9} style={{fontSize: "30px"}}>{GetCubeIcon(pj)} {CubesCn(pj)} {IsBest ? "最佳成绩排行" : "平均成绩排行"}</th>
                </tr>
                <tr>
                    <th>排名</th>
                    <th>选手</th>
                    <th>单次</th>
                    <th>平均</th>
                    <th colSpan={5}>详情</th>
                </tr>
                </thead>
                <tbody>{items}</tbody>
            </table>
        </div>)
    }


    allRender() {
        if (this.state.bestAll === null) {
            return (<div></div>)
        }

        const tabs: TabNavsPage[] = []

        const all = this.state.bestAll as GetBestByAllScoresResponse
        const bestSignals = all.BestSingle
        const bestAvgs = all.BestAvg

        const allPj = AllProjectList()
        for (let i = 0; i < allPj.length; i++) {
            const pj = allPj[i]

            const signal = bestSignals[pj] as Score[]
            const avg = bestAvgs[pj] as Score[]

            if (signal === undefined && avg === undefined) {
                continue
            }
            try {
                tabs.push({
                    Id: pj,
                    Name: (<p>{GetCubeIcon(pj)}</p>),
                    Page: (
                        <div>
                            {this.allRenderTables(pj, true, signal)}
                            <br/>
                            {this.allRenderTables(pj, false, avg)}
                        </div>
                    ),
                })
            } catch (e) {
                console.log(e)
            }
        }


        if (tabs.length === null) {
            return <div></div>
        }


        return (
            <div style={{marginTop: "40px"}}>
                <TabNav Id={"all_score_cubes"} SelectedKey={"cubes"} Pages={tabs} Center={false}/>
            </div>
        )
    }

    topRender() {
        let items: JSX.Element[] = []
        if (this.state.bestTop === null) {
            return <div></div>
        }

        const bestScore = this.state.bestTop as GetBestScoreResponse
        const pjs = AllProjectList()

        for (let i = 0; i < pjs.length; i++) {
            const pj = pjs[i]
            if (bestScore.BestSingle[pj] === undefined && bestScore.BestAvg[pj] === undefined) {
                continue
            }

            items.push(<tr key={"empty_" + i}>
                <th colSpan={1}>{" ".replace(/ /g, "\u00a0")}</th>
                <th colSpan={1}></th>
                <th colSpan={1}></th>
                <th colSpan={1}></th>
                <th colSpan={1}></th>
            </tr>)

            items.push(<tr key={"base_table_head_" + pj}>
                <th colSpan={5}>{GetCubeIcon(pj)} {CubesCn(pj)}</th>
            </tr>)

            if (bestScore.BestSingle[pj] !== undefined) {
                const s = bestScore.BestSingle[pj] as Score
                if (s.Project === Cubes.Cube333MBF) {
                    items.push(
                        <tr key={"best_by_id" + s.ID}>
                            <td colSpan={1}>单次</td>
                            <td colSpan={1}><Link to={"/player?id=" + s.PlayerID}>{s.PlayerName}</Link></td>
                            <td colSpan={1}>{s.R1} / {s.R2} ({FormatTime(s.R3, Cubes.Cube333, true)})</td>
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
                        <td colSpan={1}>{FormatTime(s.Best, s.Project, false)}</td>
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
                        <td>{FormatTime(s.Avg, s.Project, true)}</td>
                        <td colSpan={1}></td>
                        <td colSpan={1}></td>
                    </tr>
                )
            }
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


    render() {
        const tabs: TabNavsPage[] = [
            {
                Id: "best_top",
                Name: (<h4>最佳</h4>),
                Page: this.topRender(),
            },
            {
                Id: "best_all",
                Name: (<h4>全项目</h4>),
                Page: this.allRender(),
            }
        ]

        return (
            <div style={{marginTop: "40px"}}>
                {/*<h4 style={{textAlign: "center", fontWeight: 700}}>成绩汇总</h4>*/}
                <TabNav Id={"best_score"} SelectedKey={"tabs"} Pages={tabs} Center={false}/>
            </div>
        )
    }
}

export default Best;