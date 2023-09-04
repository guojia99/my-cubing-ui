import './admin.css'

import React, {JSX} from 'react';
import {API, AuthAPI} from "../../components/api/api";
import {GetContestsResponse, PlayersResponse} from "../../components/api/api_model";
import {CubeRouteNumber, Cubes, CubesCn, WCAProjectList, XCubeOHProjectList, XCubeProjectList, XCubeRelaysList} from "../../components/cube/cube";
import {WaitGroup} from "../../components/utils/async";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";
import {renderPenaltyDescription} from "./admin_model";
import {GetLocationQueryParams, UpdateBrowserURL} from "../../components/utils/utils";


class Admin extends React.Component {
    state = {
        contests: null,
        players: null,
        ok: false,
    }


    loadData() {
        if (this.state.ok) {
            return
        }
        let data = {
            contests: {},
            players: {},
            ok: true
        }
        const wg = new WaitGroup()
        wg.add(2)
        API.GetContests(1, 50, "").then(value => {
            data.contests = value
            wg.done()
        })
        API.GetPlayers().then(value => {
            data.players = value
            wg.done()
        })

        wg.wait().then(() => {
            this.setState(data)
        })
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
                Page: this.AdminScoreRender(),
            },
            {
                Id: "record",
                Name: (<h4>比赛管理</h4>),
                Page: (<div></div>),
            },
            {
                Id: "podium",
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


    AdminScoreBody = () => {
        const FormIDPlayerSelect = "PlayerSelectID"
        const FormIDContestSelect = "ContestSelectID"
        const FormIDProjectSelect = "ProjectSelectID"
        const FormIDRoundSelect = "RoundSelectID"
        const FormIDRoundNumberSelect = "RoundNumberSelectID"


        // 获取当前所有选择框的数据
        const getSelectData = () => {
            const project = document.getElementById(FormIDProjectSelect) as HTMLSelectElement
            const contest = document.getElementById(FormIDContestSelect) as HTMLSelectElement
            const player = document.getElementById(FormIDPlayerSelect) as HTMLInputElement
            const round = document.getElementById(FormIDRoundSelect) as HTMLSelectElement
            const roundNumber = document.getElementById(FormIDRoundNumberSelect) as HTMLSelectElement
            return {
                player: player ? player.value : null,
                contest: contest ? contest.value : null,
                project: project ? project.value : Cubes.Cube333,
                round: round ? round.value : null,
                roundNumber: roundNumber ? roundNumber.value : null,
            }
        }

        // 玩家选择框
        const PlayerSelect = () => {
            const playerSelectKey = "_player_key"

            let items: JSX.Element[] = []
            if (this.state.players !== null) {
                const players = this.state.players as PlayersResponse
                if (players.Players !== undefined) {
                    const p = players.Players
                    for (let i = 0; i < p.length; i++) {
                        items.push(
                            <option value={p[i].Name} key={"playerSelectDatalist_id_" + p[i].ID}>
                                {p[i].ID}、{p[i].Name} - {p[i].WcaID}
                            </option>
                        )
                    }
                }
            }

            const onUpdateHandle = () => {
                const data = getSelectData()
                if (data.player !== null && data.player !== undefined) {
                    const player = GetLocationQueryParams()[playerSelectKey]
                    const curPlayer = data.player
                    UpdateBrowserURL(playerSelectKey, curPlayer)
                    if (player !== curPlayer) {
                        this.setState({}) // 刷新界面
                    }
                }
            }

            return (
                <div className="input-group" key="playerSelect">
                    <input id={FormIDPlayerSelect} className="form-control" list="playerSelectDatalist"
                           placeholder="玩家名称或ID" onChange={onUpdateHandle} defaultValue={GetLocationQueryParams()[playerSelectKey]}
                           aria-label="玩家名称或ID" aria-describedby="score-input-username"></input>
                    <datalist id="playerSelectDatalist" key="playerSelectDatalist">
                        {items}
                    </datalist>
                </div>
            )
        }


        // 比赛选择框
        const ContestSelect = () => {
            const contestSelectKey = "_contest_key"
            let contestID = GetLocationQueryParams()[contestSelectKey]

            let items: JSX.Element[] = []
            if (this.state.contests !== null) {
                const contests = this.state.contests as GetContestsResponse
                for (let i = 0; i < contests.Contests.length; i++) {
                    const c = contests.Contests[i].Contest
                    if (!c.IsEnd) {
                        items.push(
                            <option value={c.ID} selected={contestID !== "" ? contestID === c.ID + "" : i === 0} key={"ContestSelect" + c.ID}>
                                {c.Name}
                            </option>
                        )
                    }
                }
            }

            const onUpdateHandle = () => {
                const data = getSelectData()
                if (data.contest !== null && data.contest !== undefined) {
                    const contest = GetLocationQueryParams()[contestSelectKey]
                    const curContest = data.contest
                    UpdateBrowserURL(contestSelectKey, curContest)
                    if (contest !== curContest) {
                        this.setState({}) // 刷新界面
                    }
                }
            }

            return (
                <select id={FormIDContestSelect} className="form-select" key="ContestSelect" onChange={onUpdateHandle} onClick={onUpdateHandle}>{items}</select>
            )
        }

        // 项目选择框
        const ProjectSelect = () => {
            const projectSelectKey = "_cubes_key"
            let cube = GetLocationQueryParams()[projectSelectKey]
            if (cube === "" || cube === undefined) {
                cube = Cubes.Cube333
            }

            let wcaItems: JSX.Element[] = []
            const wca = WCAProjectList()

            for (let i = 0; i < wca.length; i++) {
                wcaItems.push(<option value={wca[i]} selected={wca[i] === cube} key={"ContestSelect" + wca[i]}>{CubesCn(wca[i])}</option>)
            }

            let xCubeItems: JSX.Element[] = []
            const xCube = XCubeProjectList()
            for (let i = 0; i < xCube.length; i++) {
                xCubeItems.push(<option value={xCube[i]} selected={xCube[i] === cube} key={"ContestSelect" + xCube[i]}>{CubesCn(xCube[i])}</option>)
            }

            let xCubeOhItems: JSX.Element[] = []
            const xCubeOh = XCubeOHProjectList()
            for (let i = 0; i < xCube.length; i++) {
                xCubeOhItems.push(<option value={xCubeOh[i]} selected={xCubeOh[i] === cube} key={"ContestSelect" + xCubeOh[i]}>{CubesCn(xCubeOh[i])}</option>)
            }

            let xCubeRelayItems: JSX.Element[] = []
            const xCubeRelay = XCubeRelaysList()
            for (let i = 0; i < xCubeRelay.length; i++) {
                xCubeRelayItems.push(<option value={xCubeRelay[i]} selected={xCubeRelay[i] === cube} key={"ContestSelect" + xCubeRelay[i]}>{CubesCn(xCubeRelay[i])}</option>)
            }

            const updateHandle = () => {
                const data = getSelectData()
                if (data.project !== null && data.project !== undefined) {
                    const cube = GetLocationQueryParams()[projectSelectKey]
                    const curCube = data.project
                    UpdateBrowserURL(projectSelectKey, curCube)
                    if (cube !== curCube) {
                        this.setState({}) // 刷新界面
                    }
                }
            }

            return (
                <select id={FormIDProjectSelect} className="form-select" key="ContestSelect" onChange={updateHandle} onClick={updateHandle}>
                    <optgroup label="WCA">{wcaItems}</optgroup>
                    <optgroup label="趣味">{xCubeItems}</optgroup>
                    <optgroup label="趣味单手">{xCubeOhItems}</optgroup>
                    <optgroup label="趣味连拧">{xCubeRelayItems}</optgroup>
                </select>
            )
        }

        // 轮次选择框
        const RoundSelect = () => {
            return (<div></div>)
        }

        // 轮次中打乱选择框
        const RoundNumberSelect = () => {
            return (<div></div>)
        }


        // 输入成绩框
        const scoreInputs = (n: number) => {
            const scoreInputKey = "_ScoreInputKey_"
            return (
                <tr className="input-center-tr" id={scoreInputKey + n} key={scoreInputKey + n}>
                    <td>{n}</td>
                    <td colSpan={3}><input type="text" className="input-group-text"/></td>
                    <td colSpan={3}>{<span className="badge text-bg-danger">8</span>}</td>
                    <td>{1.3}</td>
                </tr>
            )
        }

        const scoreInputList = () => {
            const selectData = getSelectData()
            let scoreItems: JSX.Element[] = []
            const round = CubeRouteNumber.get(selectData.project as Cubes) as number
            for (let i = 0; i < round; i++) {
                scoreItems.push(scoreInputs(i + 1))
            }
            return scoreItems
        }



        const onSubmitHandle = () => {
            console.log(getSelectData())
        }

        return (
            <>
                <tfoot>
                <tr>
                    <td colSpan={10} className="score-buttons">
                        <button type="button" className="btn btn-warning">清空</button>
                        <button type="button" className="btn btn-danger">删除</button>
                        <button type="button" className="btn btn-success" onClick={onSubmitHandle}>提交</button>
                    </td>
                </tr>
                </tfoot>
                <tbody>

                {/*选择*/}
                <tr>
                    <th>选手</th>
                    <td colSpan={2}>{PlayerSelect()}</td>
                    <th>比赛</th>
                    <td colSpan={5}>{ContestSelect()}</td>
                </tr>
                <tr>
                    <th>项目</th>
                    <td colSpan={2}>{ProjectSelect()}</td>
                    <th>轮次</th>
                    <td colSpan={2}>{RoundSelect()}</td>
                    <th>打乱序</th>
                    <td colSpan={2}>{RoundNumberSelect()}</td>
                </tr>
                <tr>
                    <td colSpan={10}>成绩单</td>
                </tr>
                <tr>
                    <td>序号</td>
                    <td colSpan={3}>录入成绩</td>
                    <td colSpan={3}>判罚</td>
                    <td>最终成绩</td>
                </tr>
                {scoreInputList()}
                </tbody>
            </>
        )
    }


    // todo 给所有的input框加X号
    AdminScoreRender = () => {
        // const p = GetLocationQueryParams()
        return (
            <div style={{marginTop: "20px"}}>
                <table className="table table-bordered text-center table-hover table-responsive"
                       style={{verticalAlign: "text-top"}}>
                    <thead>
                    <tr>
                        <th colSpan={20}>成绩录入</th>
                    </tr>
                    </thead>
                    {this.AdminScoreBody()}
                </table>
                {renderPenaltyDescription()}
            </div>

        )
    }
}


export default Admin;