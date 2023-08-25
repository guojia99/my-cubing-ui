import './admin.css'

import React, {JSX} from 'react';
import {API, AuthAPI} from "../../components/api/api";
import {GetContestsResponse, PlayersResponse} from "../../components/api/api_model";
import {
    CubesCn,
    WCAProjectList,
    XCubeOHProjectList,
    XCubeProjectList,
    XCubeRelaysList
} from "../../components/cube/cube";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {WaitGroup} from "../../components/utils/async";
import {TabNav, TabNavsPage} from "../../components/utils/tabs";


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
                <button type="button" className="btn btn-sm btn-danger login-out-btn" onClick={this.loginOut}>
                    退出登录
                </button>
                <TabNav Id={"admin_tabs"} SelectedKey={"tabs"} Pages={tabs} Center={true}/>
            </div>)
    }


    private FormIDPlayerSelect = "PlayerSelectID"
    private FormIDContestSelect = "ContestSelectID"
    private FormIDProjectSelect = "PlayerSelectID"
    private FormIDRoundSelect = "PlayerSelectID"
    private FormIDRoundNumberSelect = "RoundNumberSelectID"


    getSelectData() {
        const player = document.getElementById(this.FormIDPlayerSelect) as HTMLInputElement
        const contest = document.getElementById(this.FormIDContestSelect) as HTMLSelectElement
        const project = document.getElementById(this.FormIDProjectSelect) as HTMLSelectElement
        const round = document.getElementById(this.FormIDRoundSelect) as HTMLSelectElement
        const roundNumber = document.getElementById(this.FormIDRoundNumberSelect) as HTMLSelectElement
        return {
            player: player ? player.value : null,
            contest: contest ? contest.value : null,
            project: project ? project.value : null,
            round: round ? round.value : null,
            roundNumber: roundNumber ? roundNumber.value : null,
        }
    }

    PlayerSelect = () => {
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

        return (
            <div className="input-group" key="playerSelect">
                <input id={this.FormIDPlayerSelect} className="form-control" list="playerSelectDatalist"
                       placeholder="玩家名称或ID"
                       aria-label="玩家名称或ID" aria-describedby="score-input-username"></input>
                <datalist id="playerSelectDatalist" key="playerSelectDatalist">
                    {items}
                </datalist>
            </div>
        )
    }

    ContestSelect = () => {
        let items: JSX.Element[] = []
        if (this.state.contests !== null) {
            const contests = this.state.contests as GetContestsResponse
            for (let i = 0; i < contests.Contests.length; i++) {
                const c = contests.Contests[i].Contest
                if (!c.IsEnd) {
                    items.push(<option value={c.ID} selected={i === 0} key={"ContestSelect" + c.ID}>{c.Name}</option>)
                }
            }
        }

        return (
            <select id={this.FormIDContestSelect} className="form-select" key="ContestSelect">
                {items}
            </select>
        )
    }

    ProjectSelect = () => {
        console.log(this.getSelectData())

        let wcaItems: JSX.Element[] = []
        const wca = WCAProjectList()

        for (let i = 0; i < wca.length; i++) {
            wcaItems.push(<option value={wca[i]} selected={i === 0} key={"ContestSelect" + wca[i]}>{CubesCn(wca[i])}</option>)
        }

        let xCubeItems: JSX.Element[] = []
        const xCube = XCubeProjectList()
        for (let i = 0; i < xCube.length; i++) {
            xCubeItems.push(<option value={xCube[i]} key={"ContestSelect" + xCube[i]}>{CubesCn(xCube[i])}</option>)
        }

        let xCubeOhItems: JSX.Element[] = []
        const xCubeOh = XCubeOHProjectList()
        for (let i = 0; i < xCube.length; i++) {
            xCubeOhItems.push(<option value={xCubeOh[i]} key={"ContestSelect" + xCubeOh[i]}>{CubesCn(xCubeOh[i])}</option>)
        }

        let xCubeRelayItems: JSX.Element[] = []
        const xCubeRelay = XCubeRelaysList()
        for (let i = 0; i < xCubeRelay.length; i++) {
            xCubeRelayItems.push(<option value={xCubeRelay[i]} key={"ContestSelect" + xCubeRelay[i]}>{CubesCn(xCubeRelay[i])}</option>)
        }


        return (
            <select id={this.FormIDProjectSelect} className="form-select" key="ContestSelect">
                <optgroup label="WCA">
                    {wcaItems}
                </optgroup>
                <optgroup label="趣味">
                    {xCubeItems}
                </optgroup>
                <optgroup label="趣味单手">
                    {xCubeOhItems}
                </optgroup>
                <optgroup label="趣味连拧">
                    {xCubeRelayItems}
                </optgroup>
            </select>
        )
    }

    RoundSelect = () => {
        return (<div></div>)
    }

    RoundNumberSelect = () => {
        return (<div></div>)
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

                    <tfoot>
                    <tr>
                        <td colSpan={10} className="score-buttons">
                            <button type="button" className="btn btn-warning">清空</button>
                            <button type="button" className="btn btn-danger">删除</button>
                            <button type="button" className="btn btn-success">提交</button>
                        </td>
                    </tr>
                    </tfoot>

                    <tbody>

                    {/*选择*/}
                    <tr>
                        <th>选手</th>
                        <td colSpan={2}>{this.PlayerSelect()}</td>
                        <th>比赛</th>
                        <td colSpan={5}>{this.ContestSelect()}</td>
                    </tr>
                    <tr>
                        <th>项目</th>
                        <td colSpan={2}>{this.ProjectSelect()}</td>
                        <th>轮次</th>
                        <td colSpan={2}>{this.RoundSelect()}</td>
                        <th>打乱序</th>
                        <td colSpan={2}>{this.RoundNumberSelect()}</td>
                    </tr>
                    <tr>
                        <td colSpan={10}>成绩单</td>
                    </tr>

                    {/*输入成绩*/}
                    <tr>
                        <td>序号</td>
                        <td colSpan={3}>录入成绩</td>
                        <td colSpan={3}>判罚</td>
                        <td>最终成绩</td>
                    </tr>
                    <tr className="input-center-tr">
                        <td>1</td>
                        <td colSpan={3}>
                            <input type="text" className="input-group-text" defaultValue={1.1}/></td>
                        <td colSpan={3}>
                            {<span className="badge text-bg-danger">8</span>}
                        </td>
                        <td>{1.3}</td>
                    </tr>


                    {/*固定内容*/}
                    </tbody>
                </table>
                {renderPenaltyDescription()}
            </div>

        )
    }
}


const renderPenaltyDescription = () => {
    // https://blog.csdn.net/u010992313/article/details/99701862
    const list = [
        {
            name: "起表时魔方在计时器上",
            color: "#007bff",
            explain: "",
            add: 2
        },
        {
            name: "起表不规范",
            color: "#17a2b8",
            explain: "如存在手心向魔方的起表动作",
            add: 2
        },
        {
            name: "起表时触碰魔方",
            color: "#28a745",
            explain: "一切有意或无意在拍表过程中触碰魔方的动作",
            add: 2
        },
        {
            name: "观察超过15秒",
            color: "#6610f2",
            explain: "观察时间大于15秒小于17秒",
            add: 2
        },
        {
            name: "拍表时触碰魔方",
            color: "#fd7e14",
            explain: "",
            add: 2
        },
        {
            name: "拍表不规范",
            color: "#e83e8c",
            explain: "如存在手心向魔方的拍表动作",
            add: 2
        },
        {
            name: "拍表后触碰魔方",
            color: "#dc3545",
            explain: "拍表后存在触碰动作",
            add: 2
        },
        {
            name: "魔方存在一步还原",
            color: "#ffc107",
            explain: "不同魔方有不同的鉴定标准，一般以1/8角度内还原作为界限",
            add: 2
        },
    ]

    let item = []
    for (let i = 0; i < list.length; i++) {
        item.push(
            <li className="list-group-item d-flex justify-content-between align-items-start"
                key={"renderPenaltyDescription_" + i}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{list[i].name}</div>
                    {list[i].explain}
                </div>
                <span className="badge" style={{background: list[i].color}}>{i + 1}</span>
            </li>
        )
    }

    return (<ol className="list-group list-group-numbered">{item}</ol>)
}

export default Admin;