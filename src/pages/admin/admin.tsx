import './admin.css'

import React from 'react';
import {API, AuthAPI} from "../../components/api/api";
import {GetContestsResponse, GetContestsResponseContest, Player, PlayersResponse, Score} from "../../components/api/api_model";
import {WaitGroup} from "../../components/utils/async";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {AdminScoreDataCtx, AdminScoreRender} from "./admin_score";
import {AdminContestRender} from "./admin_contest";


class Admin extends React.Component {
    state = {
        contests: null,
        contestsMap: new Map<number, GetContestsResponseContest>(),
        players: null,
        playersMap: new Map<string, Player>(),
        ok: false,
        scores: null,
    }

    componentDidMount() {
        if (!AuthAPI.IsAuth()) {
            window.location.href = "/xauth"
            return
        }
        this.loadData()
    }

    loginOut() {
        AuthAPI.DeleteToken()
        window.location.href = "/xauth"
        return
    }

    render() {
        const tabs: TabNavsPage[] = [
            {
                Id: "score",
                Name: (<h4>成绩录入</h4>),
                Page: this.ScoreRender(),
            },
            {
                Id: "contest",
                Name: (<h4>比赛管理</h4>),
                Page: (<div></div>),
            },
            {
                Id: "player",
                Name: (<h4>选手管理</h4>),
                Page: (<div></div>),
            },
        ]

        return (
            <div>
                <button type="button" className="btn btn-sm btn-danger login-out-btn" onClick={this.loginOut}>退出登录</button>
                <TabNav Id={"admin_tabs"} SelectedKey={"tabs"} Pages={tabs} Center={true}/>
            </div>)
    }

    loadData() {
        let data = {
            contests: {},
            players: {},
            ok: true
        }
        const wg = new WaitGroup()
        wg.add(2)
        API.GetContests(1, 50, "").then(value => {
            data.contests = value
            for (let i = 0; i < value.Contests.length; i++) {
                const contest = value.Contests[i]
                this.state.contestsMap.set(contest.Contest.ID, contest)
            }
            wg.done()
        })
        API.GetPlayers().then(value => {
            data.players = value
            for (let i = 0; i < value.Players.length; i++) {
                this.state.playersMap.set(value.Players[i].Name, value.Players[i])
            }
            wg.done()
        })

        wg.wait().then(() => {
            this.setState(data)
        })
    }

    AdminScoreRenderCli = new AdminScoreRender()
    ScoreRender = () => {

        const contest = this.state.contests ? this.state.contests as GetContestsResponse : null
        const player = this.state.players ? this.state.players as PlayersResponse : null

        let ctx: AdminScoreDataCtx = {
            Contests: contest,
            ContestsMap: this.state.contestsMap,
            Players: player,
            PlayersMap: this.state.playersMap,
            Scores: this.state.scores ? this.state.scores as Score[] : null,
            UpdateHandle: (obj: {}) => {
                this.setState(obj)
            },
        }
        return this.AdminScoreRenderCli.render(ctx)
    }

    AdminContestRenderCli = new AdminContestRender()
    ContestRender = () => {

    }
}

export default Admin;