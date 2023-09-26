import './admin.css'

import React from 'react';
import {API, AuthAPI} from "../../components/api/api";
import {GetContestsResponse, GetContestsResponseContest, Player, PlayersResponse, Score} from "../../components/api/api_model";
import {WaitGroup} from "../../components/utils/async";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {AdminScoreDataCtx, AdminScoreRender} from "./admin_score";
import {AdminContestDataCtx, AdminContestRender} from "./admin_contest";
import {AdminPlayerDataCtx, AdminPlayerRender} from "./admin_player";
import {AdminXLogRender} from "./admin_xlog";
import {AdminApprovalScoreRender} from "./admin_approval_score";
import {AdminApprovalScoreVideoRender} from "./admin_approval_score_video";
import {AdminUserRender} from "./admin_user";
import {SetBackGround} from "../../components/utils/background";


class Admin extends React.Component {
    // todo 这里需要整理一下上下文
    state = {
        // 共用
        contests: null,
        contestsMap: new Map<number, GetContestsResponseContest>(),
        players: null,
        playersMap: new Map<string, Player>(),

        // score
        scores: null,
        deleteScoreID: null,

        // player
        PlayerRenderUpdateID: null,
        PlayerRenderDeleteID: null,


        // contest
        ContestRenderEndContestID: null,
    }

    componentDidMount() {
        SetBackGround("")
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
                Page: this.ContestRender(),
            },
            {
                Id: "player",
                Name: (<h4>选手管理</h4>),
                Page: this.PlayerRender(),
            },
            {
                Id: "xlog",
                Name: (<h4>日志管理</h4>),
                Page: this.XLogRender(),
            },
            {
                Id: "user",
                Name: (<h4>选手审批</h4>),
                Page: this.AdminUserRender(),
            },
            {
                Id: "approval_score",
                Name: (<h4>成绩审批</h4>),
                Page: this.AdminApprovalScoreRender(),
            },
            {
                Id: "approval_score_video",
                Name: (<h4>视频审批</h4>),
                Page: this.AdminApprovalScoreVideoRender(),
            }
        ]

        return (
            <div>
                <button type="button" className="btn btn-sm btn-danger login-out-btn" onClick={this.loginOut}>退出登录</button>
                <TabNav Id={"admin_tabs"} SelectedKey={"tabs"} Pages={tabs} Center={true}/>
            </div>)
    }


    // todo  这个请求下放给各自的子模块
    loadData() {
        let data = {
            contests: {},
            players: {},
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
        const deleteScore = this.state.deleteScoreID ? this.state.deleteScoreID as number : -2

        const ctx: AdminScoreDataCtx = {
            Contests: contest,
            ContestsMap: this.state.contestsMap,
            Players: player,
            PlayersMap: this.state.playersMap,
            Scores: this.state.scores ? this.state.scores as Score[] : null,
            UpdateHandle: (obj: {}) => {
                this.setState(obj)
            },
            DeleteScoreId: deleteScore,
        }
        return this.AdminScoreRenderCli.render(ctx)
    }

    AdminContestRenderCli = new AdminContestRender()
    ContestRender = () => {
        const endId = this.state.ContestRenderEndContestID ? this.state.ContestRenderEndContestID as number : -1

        const ctx: AdminContestDataCtx = {
            Contests: this.state.contests,
            EndContestID: endId,
            UpdateHandle: (obj: {}) => {
                this.setState(obj)
            },
        }

        return this.AdminContestRenderCli.render(ctx)
    }

    AdminPlayerRenderCli = new AdminPlayerRender()
    PlayerRender = () => {
        const player = this.state.players ? this.state.players as PlayersResponse : null
        const DeleteID = this.state.PlayerRenderDeleteID ? this.state.PlayerRenderDeleteID as number : -1
        const UpdateID = this.state.PlayerRenderUpdateID ? this.state.PlayerRenderUpdateID as number : -1
        const ctx: AdminPlayerDataCtx = {
            Players: player,
            DeleteID: DeleteID,
            UpdateID: UpdateID,
            UpdateHandle: (obj: {}) => {
                this.setState(obj)
            },
        }

        return this.AdminPlayerRenderCli.render(ctx)
    }

    AdminXLogRenderCli = new AdminXLogRender()
    XLogRender = () => {
        return this.AdminXLogRenderCli.render()
    }

    AdminApprovalScoreRenderCli = new AdminApprovalScoreRender()
    AdminApprovalScoreRender = () => {
        return this.AdminApprovalScoreRenderCli.render()
    }

    AdminApprovalScoreVideoRenderCli = new AdminApprovalScoreVideoRender()
    AdminApprovalScoreVideoRender = () => {
        return this.AdminApprovalScoreVideoRenderCli.render()
   }


    AdminAdminUserRenderCli = new AdminUserRender()
    AdminUserRender = () => {
        return this.AdminAdminUserRenderCli.render()
    }

}

export default Admin;