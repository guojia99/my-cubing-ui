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
import {GetContestsResponse, GetRecordsResponse, Player} from "../../components/api/api_model";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {CubesCn} from "../../components/cube/cube";
import {CubeIcon} from "../../components/cube/icon/cube_icon";
import {WaitGroup} from "../../components/utils/async";
import {SetBackGround} from "../../components/utils/background";


class Home extends React.Component {

    state = {
        contest: null,
        record: null,
        players: null,
    }

    componentDidMount() {
        SetBackGround("")
        const wg = new WaitGroup()
        wg.add(3)

        API.GetContests(1, 7, "").then(value => {
            this.setState({contest: value})
        }).finally(() => {
            wg.done()
        })
        API.GetRecords(1, 7).then(value => {
            this.setState({record: value})
        }).finally(() => {
            wg.done()
        })
        API.GetPlayers(1, 20).then(value => {
            this.setState({players: value.Players.reverse()})
        }).finally(() => {
            wg.done()
        })

        wg.wait().then(() => {
            setInterval(() => {
                this.setState({})
            }, 1000)
        })
    }

    layout = () => {
        return (
            <div className="layout-bg row">
                <div className="layout-left col-sm-12 col-md-6">
                    <h4>赛事系统</h4>
                    <p>提供魔方赛事成绩统计</p>
                    <ul className="row">
                        <li className="col-sm-6 col-md-4 col-xl-3"><Link to="/contests">比赛结果统计</Link></li>
                        <li className="col-sm-6 col-md-4 col-xl-3"><Link to="/players">可视化成绩曲线</Link></li>
                        <li className="col-sm-6 col-md-4 col-xl-3"><Link to="/players">个人成绩统计</Link></li>
                        <li className="col-sm-6 col-md-4 col-xl-3"><Link to="/statistics/sor">Sor成绩统计</Link></li>
                        <li className="col-sm-6 col-md-4 col-xl-3"><Link to="https://www.worldcubeassociation.org/">WCA全项目</Link></li>
                        <li className="col-sm-6 col-md-4 col-xl-3"><Link to="/statistics/interest">趣味项目玩法</Link></li>
                        <li className="col-sm-6 col-md-4 col-xl-3">在线打乱(开发中)</li>
                        <li className="col-sm-6 col-md-4 col-xl-3">各类求解器(开发中)</li>
                    </ul>
                </div>

                <div className="layout-right col-sm-12 col-md-6">
                    <h4>常用链接</h4>
                    <ul className="row">
                        <li className="col-sm-6 col-md-4 col-xl-3"><Link to="https://www.worldcubeassociation.org/">世界魔方协会</Link></li>
                        <li className="col-sm-6 col-md-4 col-xl-3"><Link to="https://cstimer.net/">魔方计时器</Link></li>
                    </ul>
                </div>
            </div>
        )
    }


    newCard(items: JSX.Element[], name: string, toLink: string) {
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
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
                const ct = contest.Contests[i]
                items.push(
                    <li key={"contestCard_item" + i}>
                        <Link to={"/contest?id=" + ct.ID}>
                            {ct.Name} ({ct.IsEnd ? "已结束" : "进行中"})
                        </Link>
                    </li>
                )
            }
        }

        return this.newCard(items, "最近比赛", "/contests")
    }


    recordCard = () => {
        let items: JSX.Element[] = []
        if (this.state.record !== null) {
            const records = this.state.record as GetRecordsResponse
            if (records.Records !== undefined) {
                for (let i = 0; i < records.Records.length; i++) {
                    const rd = records.Records[i]
                    items.push(
                        <li key={"recordCard_item" + i}>
                            <Link to={"/player?id=" + rd.PlayerID}>
                                {CubeIcon(rd.ScoreValue.Project)}
                                {rd.PlayerName} 以成绩
                                {rd.RType === 1 ? FormatTime(rd.ScoreValue.Avg, rd.ScoreValue.Project, true) : FormatTime(rd.ScoreValue.Best, rd.ScoreValue.Project, false)}
                                刷新 {CubesCn(rd.ScoreValue.Project)}
                                {rd.RType === 1 ? "平均" : "单次"}
                            </Link>
                        </li>
                    )
                }
            }
        }

        return this.newCard(items, "最近纪录", "/statistics/record")
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
                    <li key={"playerCard_item" + i}><Link to={"/player?id=" + p.ID}> {p.ID}. {p.Name} </Link></li>
                )
            }
        }
        return this.newCard(items, "新成员", "/players")
    }


    advertiseCard = (p: number) => {
        let items: JSX.Element[] = [
            (<li key={"advertiseCard_1" + p}>预留广告位,可以放图片、外部链接</li>),
            (<li key={"advertiseCard_2" + p}>欢迎有需要的大佬联系我</li>),
            (<li key={"advertiseCard_3" + p}>QQ:3164838686</li>),
            (<li key={"advertiseCard_4" + p}>支持定制</li>),
        ]
        return this.newCard(items, "广告", "/")
    }


    cards = () => {
        return (
            <section className="cards">
                <div className="common-layout">
                    <ul className="row">
                        {this.contestCard()}
                        {this.recordCard()}
                        {this.playerCard()}
                        {this.advertiseCard(1)}
                        {this.advertiseCard(2)}
                        {this.advertiseCard(3)}
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