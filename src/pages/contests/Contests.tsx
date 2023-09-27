import React from 'react';
import {API} from "../../components/api/api";
import {Contest, GetContestsResponse} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {GetLocationQueryParam, GetLocationQueryParams, UpdateBrowserURL} from "../../components/utils/utils";
import {PageNav, PageNavValue} from "../../components/utils/page";
import Select from 'react-select'
import {SetBackGround} from "../../components/utils/background";


export function convertDateString(input: string): string {
    const inputDate = new Date(input);
    const year = inputDate.getFullYear();

    if (year < 2000) {
        return '-';
    }
    const month = inputDate.getMonth() + 1;
    const date = inputDate.getDate();
    return `${year}年${month}月${date}号`;
}

class Contests extends React.Component {
    state = {
        data: null,
    }

    getData() {
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['page'])) ? 1 : Number(query['page'])
        const size = isNaN(Number(query['size'])) ? 20 : Number(query['size'])
        const typ = query["type"] ? query["type"] : ""
        API.GetContests(page, size, typ).then(value => {
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


    private contestTrBody(c: Contest) {
        let status = "进行中"
        if (c.IsEnd) {
            status = "已结束"
        }


        return (
            <tr key={"contestTrBody_" + c.ID}>
                <td>{convertDateString(c.StartTime)}</td>
                <td>{convertDateString(c.EndTime)}</td>
                <td>{ContestTypeCn(c.Type)}</td>
                <td><Link to={"/contest?id=" + c.ID}>{c.Name}</Link></td>
                <td style={{color: c.IsEnd ? "red" : "green"}}>{status}</td>
            </tr>
        )
    }

    private renderTable(data: GetContestsResponse) {
        return (
            <table className="table text-center table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">开始时间</th>
                    <th scope="col">结束时间</th>
                    <th scope="col">形式</th>
                    <th scope="col">比赛名称</th>
                    <th scope="col">状态</th>
                </tr>
                </thead>
                <tbody>
                {data.Contests.map(item => (this.contestTrBody(item)))}
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

        const resp = this.state.data as GetContestsResponse
        const p: PageNavValue = {
            Id: "contests_page",
            Count: resp.Count,
            CurPage: page,
            Size: 20,
            Link: "/contests",
        }
        return PageNav(p)
    }

    private renderSelect() {

        const options = [
            {value: "", label: "所有"},
            {value: 'online', label: '线上'},
            {value: 'offline', label: '线下'},
            {value: 'official', label: '线下正式'}
        ]

        const query = GetLocationQueryParams()
        const typ = query["type"] ? query["type"] : ""
        let idx = 0
        for (let i = 0; i < options.length; i++) {
            if (options[i].value === typ) {
                idx = i
            }
        }

        return (
            <div style={{
                // position: "absolute",
                float: "right",
                maxWidth: "250px",
            }}>
                <Select
                    defaultValue={options[idx]}
                    options={options}
                    onChange={(newValue) => {
                        if (newValue === null) {
                            return
                        }
                        const typ = GetLocationQueryParam("type")
                        if (newValue.value === typ) {
                            return;
                        }
                        UpdateBrowserURL("type", newValue.value)
                        this.getData()
                    }}
                />
            </div>
        )
    }

    private renderPage() {
        if (this.state.data === null) {
            return (<div></div>)
        }

        let data = this.state.data as GetContestsResponse
        return (
            <div>
                {this.renderSelect()}
                {this.renderTable(data)}
                {this.readerPageNav()}
            </div>
        )
    }
}


export const ContestTypeCn = (t: string) => {
    switch (t) {
        case "":
            return "所有"
        case "online":
            return "线上"
        case "offline":
            return "线下"
        case "official":
            return "线下正式"
        default:
            return "其他"
    }
}


export default Contests;