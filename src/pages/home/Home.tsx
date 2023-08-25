/*
 *  * Copyright (c) 2023 guojia99 All rights reserved.
 *  * Created: 2023/7/21 下午6:11.
 *  * Author: guojia(https://github.com/guojia99)
 */
import './home.css'
import "bootstrap-icons/font/bootstrap-icons.css";

import React, {JSX} from 'react';
import {Link} from "react-router-dom";
import {API} from "../../components/api/api";
import {GetContestsResponse, Player, Record} from "../../components/api/api_model";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {CubesCn} from "../../components/cube/cube";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";


class Home extends React.Component {

    state = {
        contest: null,
        record: null,
        players: null,
    }

    componentDidMount() {
        API.GetContests(1, 7, "").then(value => {
            this.setState({contest: value})
        })
        API.GetRecords(1, 7).then(value => {
            this.setState({record: value})
        })
        API.GetPlayers().then(value => {
            this.setState({players: value.Players.reverse()})
        })
    }

    layout = () => {
        return (
            <div className="layout-bg">
                <div className="layout-left">
                    <h4>赛事系统</h4>
                    <p>提供魔方赛事成绩统计</p>
                    <ul>
                        <li><Link to="/contests">比赛结果统计</Link></li>
                        <li><Link to="/players">可视化成绩曲线</Link></li>
                        <li><Link to="/players">个人成绩统计</Link></li>
                        <li><Link to="/statistics/sor">Sor成绩统计</Link></li>
                        <li><Link to="https://www.worldcubeassociation.org/">WCA全项目</Link></li>
                        <li><Link to="/statistics/interest">趣味项目玩法</Link></li>
                        <li>在线打乱(开发中)</li>
                        <li>各类求解器(开发中)</li>
                    </ul>
                </div>

                <div className="layout-right">
                    <h4>常用链接</h4>
                    <ul>
                        <li><Link to="https://www.worldcubeassociation.org/">世界魔方协会</Link></li>
                        <li><Link to="https://cstimer.net/">魔方计时器</Link></li>
                    </ul>
                </div>
            </div>
        )
    }


    newCard(items: JSX.Element[], name: string, toLink: string) {
        return (
            <div className="col-md-4 col-sm-6 col-lg-3">
                <li className="layout-card">
                    <Link to={toLink} className="cards-header">
                        <p><i className="bi bi-postcard"></i> {name} </p>
                    </Link>
                    <ul className="cards-body">
                        {items}
                        <li><Link to={toLink}>查看更多...</Link></li>
                    </ul>
                </li>
            </div>
        )
    }

    contestCard = () => {
        let items: JSX.Element[] = []
        if (this.state.contest !== null) {
            const contest = this.state.contest as GetContestsResponse
            for (let i = 0; i < contest.Contests.length; i++) {
                const ct = contest.Contests[i].Contest
                items.push(
                    <li><Link
                        to={"/contest?id=" + contest.Contests[i].Contest.ID}>
                        {ct.Name} ({ct.IsEnd ? "已结束" : "进行中"})
                    </Link></li>
                )
            }
        }

        return this.newCard(items, "最近比赛", "/contests")
    }


    recordCard = () => {
        let items: JSX.Element[] = []
        if (this.state.record !== null) {
            const records = this.state.record as Record[]
            for (let i = 0; i < records.length; i++) {
                const rd = records[i]
                items.push(
                    <li><Link
                        to={"/player?id=" + rd.PlayerID}>
                        {GetCubeIcon(rd.ScoreValue.Project)}
                        <a style={{color: "#dba0ef"}}> {rd.PlayerName} </a> 以成绩
                        {rd.RType === 1 ? FormatTime(rd.ScoreValue.Avg, rd.ScoreValue.Project) : FormatTime(rd.ScoreValue.Best, rd.ScoreValue.Project)}
                        刷新 {CubesCn(rd.ScoreValue.Project)}
                        {rd.RType === 1 ? "平均" : "单次"} 记录
                    </Link>
                    </li>
                )
            }
        }

        return this.newCard(items, "最近记录", "/statistics/record")
    }


    playerCard = () => {
        let items: JSX.Element[] = []
        if (this.state.players !== null) {
            const players = this.state.players as Player[]
            for (let i = 0; i < players.length; i++) {
                if (i >= 7) {
                    break
                }
                const p = players[i]
                items.push(
                    <li><Link to={"/player?id=" + p.ID}> {p.ID}. {p.Name} </Link></li>
                )
            }
        }
        return this.newCard(items, "新成员", "/players")
    }


    cards = () => {
        return (
            <section className="cards">
                <div className="common-layout">
                    <ul className="row">
                        {this.contestCard()}
                        {this.recordCard()}
                        {this.playerCard()}
                    </ul>
                </div>
            </section>
        )
    }

    render() {
        return (
            <div>
                {this.layout()}
                {this.cards()}
            </div>
        );
    }
}


export default Home;