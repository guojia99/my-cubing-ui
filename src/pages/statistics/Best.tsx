import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {GetBestByAllScoresResponse, Score} from "../../components/api/api_model";
import {AllProjectList, CubesCn} from "../../components/cube/cube";
import {Cubes} from "../../components/cube/cube_map";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {Link} from "react-router-dom";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {CubeScoreTds} from "../../components/cube/components/cube_score_tabels";
import {SetBackGround} from "../../components/utils/background";
import {CubeIcon} from "../../components/icon/cube_icon";
import TableLoader from "../../components/loading/DashboardLoader";

class Best extends React.Component {
    state = {
        bestAll: null,
    }

    componentDidMount() {
        SetBackGround("")
        API.GetBestByAllScores().then(value => {
            console.log(value)
            this.setState({bestAll: value})
        })
    }


    allRenderTables = (pj: Cubes, IsBest: boolean, scores: Score[]) => {
        if (scores === undefined || scores.length === 0) {
            return  <TableLoader/>
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
                    <th colSpan={9} style={{fontSize: "30px"}}>{CubeIcon(pj)} {CubesCn(pj)} {IsBest ? "最佳成绩排行" : "平均成绩排行"}</th>
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
            return  <TableLoader/>
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

            if ((signal === undefined && avg === undefined) || (signal.length === 0 && avg.length === 0) )  {
                continue
            }
            try {
                tabs.push({
                    Id: pj,
                    Name: (<p>{CubeIcon(pj)}</p>),
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
            return  <TableLoader/>
        }


        return (
            <div style={{marginTop: "40px"}}>
                <TabNav Id={"all_score_cubes"} SelectedKey={"cubes"} Pages={tabs} Center={false}/>
            </div>
        )
    }

    topRender() {
        let items: JSX.Element[] = []
        if (this.state.bestAll === null) {
            return  <TableLoader/>
        }

        // 1. 从所有项目按顺序排序下来

        const all = this.state.bestAll as GetBestByAllScoresResponse
        const bestSignals = all.BestSingle
        const bestAvgs = all.BestAvg
        const pjs = AllProjectList()

        for (let i = 0; i < pjs.length; i++) {
            const pj = pjs[i]
            const signal = bestSignals[pj] as Score[]
            const avg = bestAvgs[pj] as Score[]
            if (signal === undefined && avg === undefined) {
                continue
            }

            let signalTds: JSX.Element[] = []
            let avgTds: JSX.Element[] = []
            if (signal !== undefined && signal.length !== 0) {
                let last = signal[0]
                signalTds.push(<>
                    <th colSpan={1}>{CubeIcon(pj)} {CubesCn(pj)}</th>
                    <td><Link to={"/player?id=" + last.PlayerID}>{last.PlayerName}</Link></td>
                    <td>{FormatTime(last.Best, last.Project, false)}</td>
                </>)

                for (let i = 1; i < signal.length; i++) {

                    if (signal[i].Best === last.Best) {
                        signalTds.push(<>
                            <td></td>
                            <td><Link to={"/player?id=" + signal[i].PlayerID}>{signal[i].PlayerName}</Link></td>
                            <td>{FormatTime(signal[i].Best, signal[i].Project, false)}</td>
                        </>)
                        continue
                    }
                    break
                }
            }

            if (avg !== undefined && avg.length !== 0) {
                let last = avg[0]
                avgTds.push(<>
                    <td>{FormatTime(last.Avg, last.Project, true)}</td>
                    <td><Link to={"/player?id=" + last.PlayerID}>{last.PlayerName}</Link></td>
                </>)

                for (let i = 1; i < avgTds.length; i++) {
                    if (avg[i].Avg === last.Avg) {
                        avgTds.push(<>
                            <td>{FormatTime(avg[i].Avg, avg[i].Project, true)}</td>
                            <td><Link to={"/player?id=" + avg[i].PlayerID}>{avg[i].PlayerName}</Link></td>
                        </>)
                        continue
                    }
                    break
                }
            }

            for (let i = 0; i < signalTds.length; i++) {
                const s = signalTds[i]
                const a = i < avgTds.length ? avgTds[i] : <td colSpan={2}></td>
                items.push(
                    <tr key={"empty_" + i}>
                        {s}{a}
                    </tr>
                )
            }
        }
        return (
            <table className="table table-striped table-hover text-center">
                <thead>
                <tr>
                    <th colSpan={5}><h2>最佳排名</h2></th>
                </tr>
                <tr>
                    <th colSpan={1}>{" ".replace(/ /g, "\u00a0")}</th>
                    <th colSpan={2}>单次</th>
                    <th colSpan={2}>平均</th>
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
                Name: (<h4>所有</h4>),
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