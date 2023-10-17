import './admin.css'

import React from 'react';
import {AuthAPI} from "../../components/api/api";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {AdminScoreRender, callback} from "./admin_score";
import {AdminContestRender} from "./admin_contest";
import {AdminPlayerRender} from "./admin_player";
import {AdminXLogRender} from "./admin_xlog";
import {AdminApprovalScoreRender} from "./admin_approval_score";
import {AdminApprovalScoreVideoRender} from "./admin_approval_score_video";
import {AdminUserRender} from "./admin_user";
import {SetBackGround} from "../../components/utils/background";


class Admin extends React.Component {

    componentDidMount() {
        SetBackGround("")
        if (!AuthAPI.IsAuth()) {
            window.location.href = "/xauth"
            return
        }
    }

    loginOut() {
        AuthAPI.DeleteToken()
        window.location.href = "/xauth"
        return
    }

    update: callback = () => {
        this.setState({})
    }

    render() {
        if (!AuthAPI.IsAuth()){
            return <div>等待登录</div>
        }

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

    AdminScoreRenderCli = new AdminScoreRender()
    AdminContestRenderCli = new AdminContestRender()
    AdminPlayerRenderCli = new AdminPlayerRender()
    AdminXLogRenderCli = new AdminXLogRender()
    AdminApprovalScoreRenderCli = new AdminApprovalScoreRender()
    AdminApprovalScoreVideoRenderCli = new AdminApprovalScoreVideoRender()
    AdminAdminUserRenderCli = new AdminUserRender()

    ScoreRender = () => {
        this.AdminScoreRenderCli.init(this.update)
        return this.AdminScoreRenderCli.render()
    }

    ContestRender = () => {
        this.AdminContestRenderCli.init(this.update)
        return this.AdminContestRenderCli.render()
    }

    PlayerRender = () => {
        this.AdminPlayerRenderCli.init(this.update)
        return this.AdminPlayerRenderCli.render()
    }

    XLogRender = () => {
        return this.AdminXLogRenderCli.render()
    }

    AdminApprovalScoreRender = () => {
        return this.AdminApprovalScoreRenderCli.render()
    }

    AdminApprovalScoreVideoRender = () => {
        return this.AdminApprovalScoreVideoRenderCli.render()
    }

    AdminUserRender = () => {
        return this.AdminAdminUserRenderCli.render()
    }

}

export default Admin;