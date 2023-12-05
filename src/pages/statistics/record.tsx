import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {GetRecordsResponse, Record, Record as rc} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {PageNav, PageNavValue} from "../../components/utils/page";
import {CubeIcon} from "../../components/icon/cube_icon";
import {CubesCn} from "../../components/cube/cube";
import {RecordType} from "../../components/cube/components/cube_score_tabels";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {SetBackGround} from "../../components/utils/background";
import {Cubes} from "../../components/cube/cube_map";
import TableLoader from "../../components/loading/DashboardLoader";

class RecordPage extends React.Component {
    state = {
        data: null,
        // map[比赛ID] map[项目]记录列表
        contestNameMap: new Map<number, string>(),
        recordMap: new Map<number, Map<Cubes, Record[]>>(),
    }

    getData() {
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['page'])) ? 1 : Number(query['page'])
        const size = isNaN(Number(query['size'])) ? 50 : Number(query['size'])
        API.GetRecords(page, size).then(value => {
            this.setState({data: value})

            if (value.Records === undefined || value.Records.length === 0) {
                return
            }


            for (let i = 0; i < value.Records.length; i++) {
                const r = value.Records[i]
                let mp = this.state.recordMap.get(r.ContestID)
                if (!mp) {
                    mp = new Map<Cubes, Record[]>()
                }
                this.state.contestNameMap.set(r.ContestID, r.ContestValue.Name)

                let ls = mp.get(r.ScoreValue.Project)
                if (ls === undefined) {
                    ls = [r]
                } else {
                    ls.push(r)
                }
                mp.set(r.ScoreValue.Project, ls)
                this.state.recordMap.set(r.ContestID, mp)
            }
        })
    }


    componentWillReceiveProps(nextProps: Readonly<{}>, nextContext: any) {
        this.getData()
    }

    componentDidMount() {
        SetBackGround("")
        this.getData()
    }

    render() {
        return this.renderPage()
    }

    private contestTrBody(c: rc) {
        let name = "单次"
        let score = FormatTime(c.ScoreValue.Best, c.ScoreValue.Project, false)
        if (c.RType === RecordType.RecordByAvg) {
            score = FormatTime(c.ScoreValue.Avg, c.ScoreValue.Project, true)
            name = "平均"
        }
        if (c.ScoreValue.Project === Cubes.Cube333MBF) {
            score = c.ScoreValue.R1 + "/" + c.ScoreValue.R2 + "(" + FormatTime(c.ScoreValue.R3, c.ScoreValue.Project, true) + ")"
        }

        return (
            <tr key={"contestTrBody_key" + c.ID}>
                <td><Link to={"/player?id=" + c.ScoreValue.PlayerID}>{c.PlayerName}</Link></td>
                <td>{CubeIcon(c.ScoreValue.Project)} {CubesCn(c.ScoreValue.Project)}</td>
                <td>{name} {score}</td>
                <td><Link to={"/contest?id=" + c.ContestID}>{c.ContestValue.Name}</Link></td>
            </tr>
        )
    }

    private renderTable() {
        let items: JSX.Element[] = []
        this.state.recordMap.forEach((value, key, map) => {
            items.push(<tr key={"renderTable_contest" + key} style={{textAlign: "left", marginLeft: "40px"}}>
                <td colSpan={4}>
                    <h6><Link to={"/contest?id=" + key}>{this.state.contestNameMap.get(key)}</Link></h6>
                </td>
            </tr>)
            value.forEach((records, pj, m) => {
                if (records.length >= 2) {
                    const r1 = records[0]
                    const r2 = records[1]
                    if (r1.score_id === r2.score_id) {
                        items.push(
                            <tr key={"renderTable" + r1.score_id}>
                                <td>{CubeIcon(r1.ScoreValue.Project)} {CubesCn(r1.ScoreValue.Project)}</td>
                                <td><Link to={"/player?id=" + r1.ScoreValue.PlayerID}>{r1.PlayerName}</Link></td>
                                <td>{FormatTime(r1.ScoreValue.Best, r1.ScoreValue.Project, false)}</td>
                                <td>{FormatTime(r2.ScoreValue.Avg, r2.ScoreValue.Project, true)}</td>
                            </tr>
                        )
                        return
                    }
                }
                for (let i = 0; i < records.length; i++) {
                    const s = records[i]
                    let best = s.RType === RecordType.RecordBySingle ? FormatTime(s.ScoreValue.Best, s.ScoreValue.Project, false) : ""
                    let avg = s.RType === RecordType.RecordByAvg ? FormatTime(s.ScoreValue.Avg, s.ScoreValue.Project, true) : ""


                    items.push(
                        <tr key={"renderTable" + s.score_id}>
                            <td>{CubeIcon(s.ScoreValue.Project)} {CubesCn(s.ScoreValue.Project)}</td>
                            <td><Link to={"/player?id=" + s.ScoreValue.PlayerID}>{s.PlayerName}</Link></td>
                            <td>{best}</td>
                            <td>{avg}</td>
                        </tr>
                    )
                }
            })
        })

        return (
            <table className="table text-center table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">项目</th>
                    <th scope="col">选手</th>
                    <th scope="col">单次</th>
                    <th scope="col">平均</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        )
    }

    private readerPageNav() {
        if (this.state.data === null) {
            return <TableLoader/>
        }
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['page'])) ? 1 : Number(query['page'])

        const resp = this.state.data as GetRecordsResponse
        const p: PageNavValue = {
            Id: "record_page",
            Count: resp.Count,
            PageKey: "page",
            CurPage: page,
            Size: 50,
            Link: "/statistics/record",
        }
        return PageNav(p)
    }

    private renderPage() {
        if (this.state.data === null) {
            return <TableLoader/>
        }
        return (
            <div>
                {this.renderTable()}
                {this.readerPageNav()}
            </div>
        )
    }
}

export default RecordPage;