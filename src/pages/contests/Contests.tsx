import React from 'react';
import {API} from "../../components/api/api";
import {GetContestsResponse, Contest, GetContestsResponseContest} from "../../components/api/api_model";
import {Link} from "react-router-dom";


class Contests extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        API.GetContests().then(value => {
            this.setState({data: value})
        })
    }


    render() {
        if (this.state.data === null) {
            return (<div></div>)
        }

        let data = this.state.data as GetContestsResponse
        console.log(data)


        return (
            <table className="table text-center table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">开始时间</th>
                    <th scope="col">结束时间</th>
                    <th scope="col">比赛名称</th>
                    <th scope="col">状态</th>
                    <th scope="col">查看详情</th>
                </tr>
                </thead>
                <tbody>
                {data.Contests.map(item => (
                    contest(item)
                ))}
                </tbody>
            </table>
        )
    }
}

function contest(c: GetContestsResponseContest) {
    let status = "进行中"
    if (c.Contest.IsEnd){
        status = "已结束"
    }

    return (
        <tr>
            <th scope="col">{convertDateString(c.Contest.StartTime)}</th>
            <th scope="col">{convertDateString(c.Contest.EndTime)}</th>
            <th scope="col">{c.Contest.Name}</th>
            <th scope="col">{status}</th>
            <th scope="col"><Link to={"/contest?id=" + c.Contest.ID} className={"btn btn-success btn-sm"}>前往</Link></th>
        </tr>
    )
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


export default Contests;