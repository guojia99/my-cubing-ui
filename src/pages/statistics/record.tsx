import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {GetRecordsResponse, Record as rc} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {PageNav, PageNavValue} from "../../components/utils/page";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {CubesCn} from "../../components/cube/cube";
import {RecordType} from "../../components/cube/components/cube_score_tabels";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {SetBackGround} from "../../components/utils/background";
import {Cubes} from "../../components/cube/cube_map";

class Record extends React.Component {
    state = {
        data: null,
    }

    getData() {
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['page'])) ? 1 : Number(query['page'])
        const size = isNaN(Number(query['size'])) ? 50 : Number(query['size'])
        API.GetRecords(page, size).then(value => {
            this.setState({data: value})
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
                <td>{GetCubeIcon(c.ScoreValue.Project)} {CubesCn(c.ScoreValue.Project)}</td>
                <td>{name} {score}</td>
                <td><Link to={"/contest?id=" + c.ContestID}>{c.ContestValue.Name}</Link></td>
            </tr>
        )
    }

    private renderTable() {
        let items: JSX.Element[] = []
        if (this.state.data !== null) {
            const data = this.state.data as GetRecordsResponse
            if (data.Records !== undefined) {
                for (let i = 0; i < data.Records.length; i++) {
                    items.push(this.contestTrBody(data.Records[i]))
                }
            }
        }
        return (
            <table className="table text-center table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">项目</th>
                    <th scope="col">选手</th>
                    <th scope="col">成绩</th>
                    <th scope="col">比赛</th>
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
            return (<div></div>)
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
            return (<div></div>)
        }
        return (
            <div>
                {this.renderTable()}
                {this.readerPageNav()}
            </div>
        )
    }
}

export default Record;