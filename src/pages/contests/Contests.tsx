import React from 'react';
import {API} from "../../components/api/api";
import {GetContestsResponse, GetContestsResponseContest} from "../../components/api/api_model";
import {Link} from "react-router-dom";
import {GetLocationQueryParams} from "../../components/utils/utils";
import {PageNav, PageNavValue} from "../../components/utils/page";


class Contests extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        const query = GetLocationQueryParams()
        const page = isNaN(Number(query['page'])) ? 1 : Number(query['page'])
        const size = isNaN(Number(query['size'])) ? 20 : Number(query['size'])

        API.GetContests(page, size).then(value => {
            this.setState({data: value})
        })
    }

    render() {
        return this.renderPage()
    }


    private contestTrBody(c: GetContestsResponseContest) {
        let status = "进行中"
        if (c.Contest.IsEnd) {
            status = "已结束"
        }

        function convertDateString(input: string): string {
            const inputDate = new Date(input);
            const year = inputDate.getFullYear();

            if (year < 2000) {
                return '-';
            }
            const month = inputDate.getMonth() + 1;
            const date = inputDate.getDate();
            return `${year}年${month}月${date}号`;
        }


        return (
            <tr>
                <td>{convertDateString(c.Contest.StartTime)}</td>
                <td>{convertDateString(c.Contest.EndTime)}</td>
                <td><Link to={"/contest?id=" + c.Contest.ID}>{c.Contest.Name}</Link></td>
                <td style={{color: c.Contest.IsEnd ? "red" : "green"}}>{status}</td>
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
            Size: resp.Size,
            Link: "/contests",
        }
        return PageNav(p)
    }


    private renderPage() {
        if (this.state.data === null) {
            return (<div></div>)
        }

        let data = this.state.data as GetContestsResponse
        return (
            <div>
                {this.renderTable(data)}
                {this.readerPageNav()}
            </div>
        )
    }


}

export default Contests;