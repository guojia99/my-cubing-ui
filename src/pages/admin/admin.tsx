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

    update: callback = () => {
        this.setState({})
    }

    state = {
        AdminScoreRenderCli: null,
        AdminContestRenderCli: null,
        AdminPlayerRenderCli: null,
        AdminXLogRenderCli: null,
        AdminApprovalScoreRenderCli: null,
        AdminApprovalScoreVideoRenderCli: null,
        AdminUserRenderCli: null,
    }


    componentDidMount() {
        SetBackGround("")
        if (!AuthAPI.IsAuth()) {
            window.location.href = "/xauth"
            return
        }

        this.setState({
            AdminScoreRenderCli: new AdminScoreRender(this.update),
            AdminContestRenderCli: new AdminContestRender(this.update),
            AdminPlayerRenderCli: new AdminPlayerRender(this.update),
            AdminXLogRenderCli: new AdminXLogRender(),
            AdminApprovalScoreRenderCli: new AdminApprovalScoreRender(),
            AdminApprovalScoreVideoRenderCli: new AdminApprovalScoreVideoRender(),
            AdminUserRenderCli: new AdminUserRender(),
        })
    }

    loginOut() {
        AuthAPI.DeleteToken()
        window.location.href = "/xauth"
        return
    }


    render() {
        if (!AuthAPI.IsAuth()) {
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


    ScoreRender = () => {
        if (this.state.AdminScoreRenderCli === null){
            return <div></div>
        }
        const v = this.state.AdminScoreRenderCli as AdminScoreRender
        return  v.render()
    }

    ContestRender = () => {
        if (this.state.AdminContestRenderCli === null){
            return <div></div>
        }
        const v = this.state.AdminContestRenderCli as AdminContestRender
        return  v.render()
    }

    PlayerRender = () => {
        if (this.state.AdminPlayerRenderCli === null){
            return <div></div>
        }
        const v = this.state.AdminPlayerRenderCli as AdminPlayerRender
        return  v.render()
    }

    XLogRender = () => {
        if (this.state.AdminXLogRenderCli === null){
            return <div></div>
        }
        const v = this.state.AdminXLogRenderCli as AdminXLogRender
        return  v.render()
    }

    AdminApprovalScoreRender = () => {
        if (this.state.AdminApprovalScoreRenderCli === null){
            return <div></div>
        }
        const v = this.state.AdminApprovalScoreRenderCli as AdminApprovalScoreRender
        return  v.render()
    }

    AdminApprovalScoreVideoRender = () => {
        if (this.state.AdminApprovalScoreVideoRenderCli === null){
            return <div></div>
        }
        const v = this.state.AdminApprovalScoreVideoRenderCli as AdminApprovalScoreVideoRender
        return  v.render()
    }

    AdminUserRender = () => {
        if (this.state.AdminUserRenderCli === null){
            return <div></div>
        }
        const v = this.state.AdminUserRenderCli as AdminUserRender
        return  v.render()
    }

}

export default Admin;