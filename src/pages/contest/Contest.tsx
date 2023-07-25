import React from 'react';
import {API} from "../../components/api/api";
import {WaitGroup} from "../../components/async";
import {GetLocationQueryParams} from "../../components/utils";
import {Contest, GetContestSorResponse} from "../../components/api/api_model";


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


        let wg = new WaitGroup;
        wg.add(3)

        API.GetContest(id).then(value => {
            this.state.contest = value
        }).finally(() =>{
            wg.done()
        })

        API.GetContestScore(id).then(value => {
            this.state.score = value
        }).finally(() => {
            wg.done()
        })

        API.GetContestSor(id).then(value => {
            this.state.sor = value
        }).finally(() => {
            wg.done()
        })


        // wait all
        wg.wait().then(_ => {
            this.setState({ok: true})
        })
    }

    render() {
        if (!this.state.ok) {
            return (<div></div>)
        }

        console.log(this.state)

        const contest = this.state.contest as Contest
        console.log(contest)

        return (
            <div>
                <div><h1 className="text-center">{contest.Name}</h1></div>
                <h2 style={{margin: "10px 0"}}>本场综合排名</h2>
                <table className="table text-center table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">排名</th>
                        <th scope="col" colSpan={2}>单次</th>
                        <th scope="col" colSpan={2}>平均</th>
                        <th scope="col">排名</th>
                    </tr>
                    </thead>

                    {sorTableBody(this.state.sor as GetContestSorResponse)}
                </table>
            </div>
        )

    }
}


function sorTableBody(s: GetContestSorResponse) {
    const maxLength = s.Single.length > s.Avg.length ? s.Single.length : s.Avg.length

    function sorTrs(idx: number, singleName: string, single: number, avgName: string, avg: number) {
        idx = idx += 1
        return (
            <tr>
                <td>{singleName !== "" ? idx.toString() : '-'}</td>
                <td>{singleName !== "" ? singleName : '-'}</td>
                <td>{singleName !== "" ? single : '-'}</td>
                <td>{avgName !== "" ? avg : '-'}</td>
                <td>{avgName !== "" ? avgName : '-'}</td>
                <td>{avgName !== "" ? idx.toString() : "-"}</td>
            </tr>
        )
    }

    return (
        <tbody>
        {Array.from(Array(maxLength), (e, i) => {
            let singleName = "", single = 0;
            let avgName = "", avg = 0;
            if (i < s.Single.length){
                singleName = s.Single[i].Player.Name
                single = s.Single[i].SingleCount
            }
            if (i < s.Avg.length){
                avgName = s.Avg[i].Player.Name
                avg = s.Avg[i].AvgCount
            }
            return sorTrs(i, singleName, single, avgName, avg)
        })}
        </tbody>
    )
}


export default ContestPage;