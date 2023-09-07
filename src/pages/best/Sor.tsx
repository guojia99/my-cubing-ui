import React, {JSX} from 'react';
import {API} from "../../components/api/api";
import {BestSorReportResponse} from "../../components/api/api_model";
import {Link} from "react-router-dom";

class Sor extends React.Component {
    state = {
        data: null,
    }

    componentDidMount() {
        API.GetBestSor().then(value => {
            this.setState({data: value})
        })
    }

    render() {
        if (this.state.data === null) {
            return <div></div>
        }
        const data = this.state.data as BestSorReportResponse

        let items: JSX.Element[] = []


        let lastBest = data.BestSingle[0].SingleCount
        let lastBestRank = 1

        let lastAvg = data.BestAvg[0].AvgCount
        let lastAvgRank = 1

        items.push(
            <tr>
                <td>{1}</td>
                <td><Link to={"/player?id=" +  data.BestSingle[0].Player.ID}>{ data.BestSingle[0].Player.Name}</Link></td>
                <td>{ data.BestSingle[0].SingleCount}</td>
                <td>{data.BestAvg[0].AvgCount}</td>
                <td><Link to={"/player?id=" + data.BestAvg[0].Player.ID}>{data.BestAvg[0].Player.Name}</Link></td>
                <td>{1}</td>
            </tr>
        )



        for (let i = 1; i < data.BestSingle.length; i++) {
            const best = data.BestSingle[i]
            const avg = data.BestAvg[i]


            let bestRank = lastBestRank
            if (best.SingleCount !== lastBest){
                lastBestRank = i + 1
                bestRank = i+1
            }
            lastBest = best.SingleCount


            let avgRank = lastAvgRank
            if (avg.AvgCount !== lastAvg){
                lastAvgRank = i + 1
                avgRank = i+1
            }
            lastAvg = avg.AvgCount


            items.push(
                <tr>
                    <td>{bestRank}</td>
                    <td><Link to={"/player?id=" + best.Player.ID}>{best.Player.Name}</Link></td>
                    <td>{best.SingleCount}</td>
                    <td>{avg.AvgCount}</td>
                    <td><Link to={"/player?id=" + avg.Player.ID}>{avg.Player.Name}</Link></td>
                    <td>{avgRank}</td>
                </tr>
            )
        }


        console.log(this.state)
        return (
            <table className="table text-center table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">序</th>
                    <th scope="col">选手</th>
                    <th scope="col" colSpan={2}>分数</th>
                    <th scope="col">选手</th>
                    <th scope="col">序</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        )
    }
}

export default Sor;