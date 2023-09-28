// 获取当前所有选择框的数据
import {CubeRouteNumber, Cubes, CubesCn, WCAProjectList, XCubeOHProjectList, XCubeProjectList, XCubeRelaysList} from "../../components/cube/cube";
import React, {JSX} from "react";
import {AddScoreRequest, Contest, GetContestsResponse, Player, PlayersResponse, Score, ScorePenalty} from "../../components/api/api_model";
import {GetLocationQueryParams, UpdateBrowserURL} from "../../components/utils/utils";
import {GetCubeIcon} from "../../components/cube/icon/cube_icon";
import {FormatTime} from "../../components/cube/components/cube_timeformat";
import {API, AuthAPI} from "../../components/api/api";
import {parseTimeToSeconds} from "./admin_utils";
import {Once, WaitGroup} from "../../components/utils/async";
import {CreateModal, ModalButton} from "../../components/utils/modal";
import {CubeScoreTds} from "../../components/cube/components/cube_score_tabels";

export const _playerSelectKey = "_player"
export const _contestSelectKey = "_contest"
export const _projectSelectKey = "_cubes"

// dom id
export const FormID_playerSelect = "_playerSelectID"
export const FormID_contestSelect = "_contestSelectID"
export const FormID_projectSelect = "_projectSelectID"
export const FormID_roundSelect = "_roundSelectID"
export const FormID_roundNumberSelect = "_roundNumberSelectID"

export const scoreInputKey = "_ScoreInputKey_"
export const hideStyleKey = "text-bg-secondary"
export const _renderPenaltyListKey = "_renderPenaltyListKey"

export type callback = (obj: {}) => void

export type AdminScoreDataCtx = {
    Contests: GetContestsResponse | null,
    ContestsMap: Map<number, Contest>,
    Players: PlayersResponse | null,
    PlayersMap: Map<string, Player>,
    Scores: Score[] | null,
    UpdateHandle: callback,
    DeleteScoreId: number,
}

const PenaltyList = [
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
        explain: "一切有意或无意在起表过程中触碰魔方的动作",
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
        color: "#c90bd0",
        explain: "拍表后存在触碰动作",
        add: 2
    },
    {
        name: "魔方存在一步还原",
        color: "#ffc107",
        explain: "不同魔方有不同的鉴定标准，一般以1/8角度内还原作为界限",
        add: 2
    },
    {
        name: "没有菊爆浩浩",
        color: "#32f548",
        explain: "菊爆浩浩才能给你带来好成绩",
        add: 2
    }
]

// 判罚规则表
const renderPenaltyDescription = () => {
    // https://blog.csdn.net/u010992313/article/details/99701862
    let item = []
    for (let i = 0; i < PenaltyList.length; i++) {
        item.push(
            <li className="list-group-item d-flex justify-content-between align-items-start"
                key={"renderPenaltyDescription_" + i}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{PenaltyList[i].name}</div>
                    {PenaltyList[i].explain}
                </div>
                <span className="badge" style={{background: PenaltyList[i].color}}>{i + 1}</span>
            </li>
        )
    }

    return (<ol className="list-group list-group-numbered">{item}</ol>)
}

// 获取当前选择框的数据
const _getSelectData = () => {
    const project = document.getElementById(FormID_projectSelect) as HTMLSelectElement
    const contest = document.getElementById(FormID_contestSelect) as HTMLSelectElement
    const player = document.getElementById(FormID_playerSelect) as HTMLInputElement
    const round = document.getElementById(FormID_roundSelect) as HTMLSelectElement
    const roundNumber = document.getElementById(FormID_roundNumberSelect) as HTMLSelectElement
    return {
        player: player ? player.value : null,
        contest: contest ? contest.value : null,
        project: project ? project.value : "",
        round: round ? round.value : null,
        roundNumber: roundNumber ? roundNumber.value : null,
    }
}

// 获取所有的判罚
const _getCurPenalty = () => {
    let out = new Map<number, number[]>()
    for (let i = 0; i < 5; i++) {
        let num: number[] = []
        for (let j = 0; j < PenaltyList.length; j++) {
            const id = _renderPenaltyListKey + "_" + (i + 1) + "_" + j
            const val = document.getElementById(id)
            if (val === null) {
                continue
            }
            if (!val.className.includes(hideStyleKey)) {
                num.push(j + 1)
            }
        }
        out.set(i + 1, num)
    }
    return out
}

// AdminScoreRender 成绩选项
export class AdminScoreRender {

    ctx: AdminScoreDataCtx = {
        Contests: null,
        ContestsMap: new Map<number, Contest>(),
        Players: null,
        PlayersMap: new Map<string, Player>(),
        Scores: null,
        DeleteScoreId: -1,
        UpdateHandle: () => {
            console.log("empty")
        },
    }


// 渲染判罚列表： 单行
    private _renderPenaltyList = (input: number) => {
        const penaltyOnClickHandle = (e: React.MouseEvent<HTMLSpanElement>) => {
            if (e.currentTarget.className.includes(hideStyleKey)) {
                e.currentTarget.className = e.currentTarget.className.replace(hideStyleKey, "")
                return
            }
            e.currentTarget.className = e.currentTarget.className + " " + hideStyleKey
            this.ctx.UpdateHandle({})
        }

        let item = []
        for (let i = 0; i < PenaltyList.length; i++) {
            item.push(
                <span id={_renderPenaltyListKey + "_" + input + "_" + i}
                      key={"_renderPenaltyList_Item" + i}
                      className={"badge penalty_item " + hideStyleKey}
                      onClick={penaltyOnClickHandle}
                      style={{background: PenaltyList[i].color, cursor: "pointer"}}>{i + 1}</span>)
        }
        return (<>{item}</>)
    }

// 玩家选择框
    private _playerSelect = () => {
        let items: JSX.Element[] = []
        if (this.ctx.Players !== null) {
            if (this.ctx.Players.Players !== undefined) {
                const p = this.ctx.Players.Players
                for (let i = 0; i < p.length; i++) {
                    items.push(
                        <option value={p[i].Name} key={"_playerSelectDatalist_id_" + p[i].ID}>
                            {p[i].ID}、{p[i].Name} - {p[i].WcaID}
                        </option>
                    )
                }
            }
        }

        const onUpdateHandle = () => {
            const data = _getSelectData()
            if (data.player !== null && data.player !== undefined) {
                const player = GetLocationQueryParams()[_playerSelectKey]
                const curPlayer = data.player
                UpdateBrowserURL(_playerSelectKey, curPlayer)
                if (player !== curPlayer) {
                    this.ctx.UpdateHandle({})
                }
            }
        }

        const onClickHandle = () => {
            const input = document.getElementById(FormID_playerSelect) as HTMLInputElement
            input.value = ""
            UpdateBrowserURL(_playerSelectKey, "")
            this.ctx.UpdateHandle({})
        }

        return (
            <div className="input-group" key="_playerSelect">
                <input id={FormID_playerSelect}
                       className="form-control"
                       list="_playerSelectDatalist"
                       placeholder="玩家名称或ID"
                       onChange={onUpdateHandle}
                       defaultValue={GetLocationQueryParams()[_playerSelectKey]}
                       aria-label="玩家名称或ID"
                       aria-describedby="score-input-username">
                </input>
                <datalist id="_playerSelectDatalist" key="_playerSelectDatalist">
                    {items}
                </datalist>
                <span className="input-group-text" style={{cursor: "pointer"}} onClick={onClickHandle}>X</span>
            </div>
        )
    }

// 比赛选择框
    private _contestSelect = () => {
        let contestID = GetLocationQueryParams()[_contestSelectKey]

        let items: JSX.Element[] = []
        if (this.ctx.Contests !== null) {
            for (let i = 0; i < this.ctx.Contests.Contests.length; i++) {
                const c = this.ctx.Contests.Contests[i]
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
            const data = _getSelectData()
            if (data.contest !== null && data.contest !== undefined) {
                const contest = GetLocationQueryParams()[_contestSelectKey]
                const curContest = data.contest
                UpdateBrowserURL(_contestSelectKey, curContest)
                if (contest !== curContest) {
                    this.ctx.UpdateHandle({})
                }
            }
        }

        return (
            <select id={FormID_contestSelect} className="form-select" key="ContestSelect" onChange={onUpdateHandle} onClick={onUpdateHandle}>{items}</select>
        )
    }

// 项目选择框
    private _projectSelect = () => {
        let cube = GetLocationQueryParams()[_projectSelectKey]
        if (cube === "" || cube === undefined) {
            cube = Cubes.Cube333
        }

        let wcaItems: JSX.Element[] = []
        let xCubeItems: JSX.Element[] = []
        let xCubeOhItems: JSX.Element[] = []
        let xCubeRelayItems: JSX.Element[] = []

        const data = _getSelectData()
        const pjCache = new Map<Cubes, string>()
        if (this.ctx.Contests !== null && data.contest !== null) {
            const contest = this.ctx.ContestsMap.get(Number(data.contest))
            if (contest !== undefined) {
                for (let i = 0; i < contest.Rounds.length; i++) {
                    pjCache.set(contest.Rounds[i].Project, contest.Rounds[i].Project)
                }
            }
        }

        const wca = WCAProjectList()
        for (let i = 0; i < wca.length; i++) {
            if (pjCache.get(wca[i]) !== undefined) {
                wcaItems.push(<option value={wca[i]} selected={wca[i] === cube} key={"ContestSelect" + wca[i]}>{CubesCn(wca[i])}</option>)
            }
        }

        const xCube = XCubeProjectList()
        for (let i = 0; i < xCube.length; i++) {
            if (pjCache.get(xCube[i]) !== undefined) {
                xCubeItems.push(<option value={xCube[i]} selected={xCube[i] === cube} key={"ContestSelect" + xCube[i]}>{CubesCn(xCube[i])}</option>)
            }
        }

        const xCubeOh = XCubeOHProjectList()
        for (let i = 0; i < xCubeOh.length; i++) {
            if (pjCache.get(xCubeOh[i]) !== undefined) {
                xCubeOhItems.push(<option value={xCubeOh[i]} selected={xCubeOh[i] === cube} key={"ContestSelect" + xCubeOh[i]}>{CubesCn(xCubeOh[i])}</option>)
            }
        }

        const xCubeRelay = XCubeRelaysList()
        for (let i = 0; i < xCubeRelay.length; i++) {
            if (pjCache.get(xCubeRelay[i]) !== undefined) {
                xCubeRelayItems.push(<option value={xCubeRelay[i]} selected={xCubeRelay[i] === cube} key={"ContestSelect" + xCubeRelay[i]}>{CubesCn(xCubeRelay[i])}</option>)
            }
        }

        const updateHandle = () => {
            const data = _getSelectData()
            if (data.project !== null && data.project !== undefined) {
                const cube = GetLocationQueryParams()[_projectSelectKey]
                const curCube = data.project
                UpdateBrowserURL(_projectSelectKey, curCube)
                if (cube !== curCube) {
                    this.ctx.UpdateHandle({})
                }
            }
        }

        return (
            <select id={FormID_projectSelect} className="form-select" key="ContestSelect" onChange={updateHandle} onClick={updateHandle}>
                <optgroup label="WCA">{wcaItems}</optgroup>
                <optgroup label="趣味">{xCubeItems}</optgroup>
                <optgroup label="趣味单手">{xCubeOhItems}</optgroup>
                <optgroup label="趣味连拧">{xCubeRelayItems}</optgroup>
            </select>
        )
    }

// 轮次选择框
    private _roundSelect = () => {
        // 需要 比赛 + 项目
        const data = _getSelectData()
        if (data.contest === null || data.project === null || this.ctx.Contests === null) {
            return (<div>1</div>)
        }

        const contest = this.ctx.ContestsMap.get(Number(data.contest))
        if (contest === undefined || contest.Rounds === undefined) {
            return <div>2</div>
        }

        let items: JSX.Element[] = []
        for (let i = 0; i < contest.Rounds.length; i++) {
            const r = contest.Rounds[i]
            if (r.Project === data.project && r.Part === 1) {
                items.push(<option value={r.ID} key={"_round_key" + r.ID}>{GetCubeIcon(r.Project)} {r.Name}</option>)
            }
        }
        return (<select className="form-select" id={FormID_roundSelect}>{items}</select>)
    }

// 轮次中打乱选择框
    private _roundNumberSelect = () => {
        // 需要轮次
        return (<div></div>)
    }

    // 更新输出框的成绩，不符合的需要删除或更新
    private inputUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.value = event.target.value.replace(/\s+/g, "")

        // 确认是否是指定的格式
        if (event.target.value === "DNF" || event.target.value === "DNS") {
            return
        }
        if (event.target.value === "D" || event.target.value === "d") {
            event.target.value = "DNF"
            return;
        }
        if (event.target.value === "S" || event.target.value === "s") {
            event.target.value = "DNS"
            return;
        }

        // 确认是否是数字
        const num = Number(event.target.value)
        if (!isNaN(num)) {
            if (num > 60) {
                const data = _getSelectData()
                event.target.value = FormatTime(num, data.project as Cubes, false)
            }
            return;
        }

        // 确认是否符合时间格式
        // 时分秒 {number} : {number} : {number} . {number}
        // 分秒   {number} : {number} . {number}
        // 秒    {number} . {number}
        const reg = /^(\d+(\.\d*)?|\d*[:|：]\d*\.{0,1}\d{0,3})$/
        if (reg.test(event.target.value)) {
            return;
        }
        const match = event.target.value.match(reg)
        if (match) {
            event.target.value = match[0]
            return
        }
        alert(event.target.value + "不符合格式")
        event.target.value = ""
    }

// 输入成绩框
    private scoreInputs = (n: number) => {
        return (
            <tr className="input-center-tr" key={scoreInputKey + "tr" + n}>
                <td>{n}</td>
                <td colSpan={3}><input type="text" className="input-group-text" id={scoreInputKey + n} onChange={this.inputUpdate}/></td>
                <td colSpan={3}>
                    {this._renderPenaltyList(n)}
                </td>
                <td>
                    <div id={scoreInputKey + n + "value"}></div>
                </td>
            </tr>
        )
    }

// 渲染成绩列表
    private scoreInputList = () => {
        const selectData = _getSelectData()
        let scoreItems: JSX.Element[] = []
        const round = CubeRouteNumber.get(selectData.project as Cubes) as number
        for (let i = 0; i < round; i++) {
            scoreItems.push(this.scoreInputs(i + 1))
        }
        return scoreItems
    }

// 清空所有成绩
    private clearInputHandle = () => {
        // 清空输入框
        for (let i = 0; i < 6; i++) {
            const inputID = scoreInputKey + i
            const input = document.getElementById(inputID) as HTMLInputElement
            if (input === null || input === undefined) {
                continue
            }
            input.value = ""
        }

        // 清空所有判罚
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < PenaltyList.length; j++) {
                const pID = _renderPenaltyListKey + "_" + i + "_" + j
                const p = document.getElementById(pID) as HTMLSpanElement
                if (!p) {
                    continue
                }
                if (!p.className.includes(hideStyleKey)) {
                    p.className = p.className + " " + hideStyleKey
                }
            }
        }
    }

    private getAllScores = (): number[] => {
        let out: number[] = []
        for (let i = 0; i < 5; i++) {
            const id = scoreInputKey + (i + 1)
            const input = document.getElementById(id) as HTMLInputElement
            if (input === null) {
                continue
            }
            if (input.value !== "") {
                out.push(parseTimeToSeconds(input.value))
            }
        }
        return out
    }

// 提交成绩单
    private onSubmitHandle = async () => {
        // 1. 获取当前成绩
        // 2. 获取所有所需的key
        // 3. 统计结果
        // 4. 同步调用上报成绩接口

        // 其他参数
        const data = _getSelectData()
        if (data.player === null || data.contest === null || data.round === null) {
            alert("请填玩家、比赛、轮次信息")
            return
        }

        const pj = data.project as Cubes

        // 成绩
        const scores = this.getAllScores()
        if (scores.length !== CubeRouteNumber.get(pj)) {
            alert("必须输入全部成绩")
            return
        }

        // 判罚
        let penalty: ScorePenalty = {R1: [], R2: [], R3: [], R4: [], R5: []}
        _getCurPenalty().forEach((value, key) => {
            switch (key) {
                case 1:
                    penalty.R1 = value
                    break
                case 2:
                    penalty.R2 = value
                    break
                case 3:
                    penalty.R3 = value
                    break
                case 4:
                    penalty.R4 = value
                    break
                case 5:
                    penalty.R5 = value
                    break
            }
        })


        const req: AddScoreRequest = {
            PlayerName: data.player,
            ContestID: Number(data.contest),
            Project: data.project as Cubes,
            RouteNum: Number(data.round),
            Penalty: penalty,
            Results: scores,
        }

        await AuthAPI.AddScore(req).then(value => {
            alert("添加成功")
        }).catch(() => {
            alert("添加失败")
        }).finally(() => {
            window.location.reload()
        })
    }

    private _quickInputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updateInputs = (slide: string[]) => {
            for (let i = 0; i < slide.length; i++) {
                const id = scoreInputKey + (i + 1)
                const input = document.getElementById(id) as HTMLInputElement
                if (input === null) {
                    continue
                }
                input.value = slide[i]
            }
            this._loadScoreValue()
        }


        e.target.value = e.target.value.replaceAll("\t", " ")

        // 01:53.25	01:35.41	52.66	01:13.53	48.86
        // 01:18.39	01:21.05	01:22.41	01:22.07	01:23.31
        // 04:16.87	04:57.08	DNF
        const reg = /^\d{1}[:0-9. DNFSdnfs]+$/
        if (reg.test(e.target.value)) {
            const slide = e.target.value.split(/\s+/);
            updateInputs(slide)
            return;
        }


        // 成绩列表：(58.371), 1:02.797, (1:06.937), 1:00.928, 1:05.900
        const reg1 = /[：:][:0-9., ()DNFSdnfs]+$/
        if (reg1.test(e.target.value)) {
            const out = e.target.value.match(reg1)
            if (out === null || out.length === 0) {
                return
            }
            let find = out[0]
            find = find.slice(1)
            find = find.replaceAll("(", "").replaceAll(")", "").replaceAll("（", "").replaceAll("）", "").replaceAll(" ", "")
            const slide = find.split(",")

            updateInputs(slide)
            return;
        }


    }

// 渲染成绩的table body
    private _adminScoreBody = () => {
        return (
            <>
                <tfoot>
                <tr>
                    <td colSpan={10} className="score-buttons">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="输入成绩" aria-describedby="quick-input-score" onChange={this._quickInputHandle}/>
                            <span className="input-group-text" id="quick-input-score">成绩输入</span>
                        </div>
                        <button type="button" className="btn btn-warning" onClick={this.clearInputHandle}>清空</button>
                        <button type="button" className="btn btn-success" onClick={this.onSubmitHandle}>提交</button>
                    </td>
                </tr>
                </tfoot>
                <tbody>

                {/*选择*/}
                <tr>
                    <th>选手</th>
                    <td colSpan={2}>{this._playerSelect()}</td>
                    <th>比赛</th>
                    <td colSpan={5}>{this._contestSelect()}</td>
                </tr>
                <tr>
                    <th>项目</th>
                    <td colSpan={2}>{this._projectSelect()}</td>
                    <th>轮次</th>
                    <td colSpan={2}>{this._roundSelect()}</td>
                    <th>打乱序</th>
                    <td colSpan={2}>{this._roundNumberSelect()}</td>
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
                {this.scoreInputList()}
                </tbody>
            </>
        )
    }


// 捞取select选择
    private _loadScoresSelect = () => {
        let lastContest = ""
        let lastPlayer = ""

        return async () => {
            const data = _getSelectData()
            const player = data.player
            const contest = data.contest

            if (contest === null || player === null || contest === "" || player === "") {
                this.ctx.Scores = null
                return
            }
            const p = this.ctx.PlayersMap.get(player)
            if (p === undefined) {
                this.ctx.Scores = null
                this.ctx.UpdateHandle({})
                return
            }
            if (lastContest === contest && lastPlayer === player && this.ctx.Scores !== null) {
                return
            }

            await AuthAPI.GetPlayerScoreByContest(Number(p.ID), Number(contest)).then(value => {
                this.ctx.Scores = value
                console.log(value)
                this.ctx.UpdateHandle({})
            }).catch().finally(() => {
                lastContest = contest
                lastPlayer = player
            })
        }
    }

// 渲染实际成绩
    private _loadScoreValue = () => {
        const data = _getSelectData()
        const penalty = _getCurPenalty()
        for (let i = 0; i < 5; i++) {
            const inputId = scoreInputKey + (i + 1)
            const inputValueId = inputId + "value"

            // 获取input数据
            const input = document.getElementById(inputId) as HTMLInputElement
            if (!input) {
                continue
            }

            let score = Number(parseTimeToSeconds(input.value))
            const ps = penalty.get(i + 1)
            let psStr = ""
            if (ps !== undefined && score > -10000) {
                score += ps.length * 2
                psStr = "(+" + ps.length * 2 + ")"
            }

            // 更新实际value
            const value = document.getElementById(inputValueId) as HTMLDivElement
            value.innerText = FormatTime(score, data.project as Cubes, false) + " " + psStr
        }
    }


// ------------------------------------------------------ 成绩列表

    private _scoreListTr = (s: Score, useDelete: boolean) => {
        let deleteButton = (
            <td>
                {ModalButton("删除", this.deleteModalTarget, () => {
                    this.ctx.DeleteScoreId = s.ID
                }, "btn-danger btn-sm")}
            </td>
        )
        if (!useDelete) {
            deleteButton = (<></>)
        }
        if (s.Project === Cubes.Cube333MBF) {
            return (
                <tr key={"_renderScoreList_tr_" + s.ID}>
                    {deleteButton}
                    <td>{GetCubeIcon(s.Project)} {CubesCn(s.Project)}</td>
                    <td>{s.RouteValue.Name}</td>
                    <td>-</td>
                    <td>-</td>
                    {CubeScoreTds(s)}
                </tr>
            )
        }

        return (
            <tr key={"_renderScoreList_tr" + s.ID}>
                {deleteButton}
                <td>{GetCubeIcon(s.Project)} {CubesCn(s.Project)}</td>
                <td>{s.RouteValue.Name}</td>
                <td>{FormatTime(s.Best, s.Project, false)}</td>
                <td>{FormatTime(s.Avg, s.Project, true)}</td>
                {CubeScoreTds(s)}
            </tr>
        )
    }

// _renderScoreList 该选手成绩列表
    private deleteModalTarget = "delete_scores"
    private _renderScoreList = () => {
        if (this.ctx.Scores === null) {
            return <div></div>
        }

        let items: JSX.Element[] = []
        for (let i = 0; i < this.ctx.Scores.length; i++) {
            const s = this.ctx.Scores[i]
            items.push(this._scoreListTr(s, true))
        }

        return (
            <table className="table table-hover" style={{minWidth: "600px", marginTop: "20px", marginBottom: "30px"}}>
                <thead>
                <tr key={"renderPageByScore_thead"}>
                    <th>删除</th>
                    <th>项目</th>
                    <th>轮次</th>
                    <th>单次</th>
                    <th>平均</th>
                    <th colSpan={5}>详情</th>
                </tr>
                </thead>
                <tbody>
                {items}
                </tbody>
            </table>
        )
    }

// 删除成绩
    private GetDeleteModal = () => {
        const bodyHandle = () => {
            if (this.ctx.Scores === null || this.ctx.Scores.length === 0) {
                return <div>是否删除该成绩</div>
            }

            let score = this.ctx.Scores[0]
            for (let i = 0; i < this.ctx.Scores.length; i++) {
                if (this.ctx.Scores[i].ID === this.ctx.DeleteScoreId) {
                    score = this.ctx.Scores[i]
                    break
                }
            }

            return (
                <div>
                    <table className="table table-hover table-sm" style={{width: "90%"}}>
                        <thead>
                        <tr key={"renderPageByScore_thead_delete"}>
                            <th>项目</th>
                            <th>轮次</th>
                            <th>单次</th>
                            <th>平均</th>
                            <th colSpan={5}>详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this._scoreListTr(score, false)}
                        </tbody>
                    </table>
                </div>
            )
        }

        const deleteScoreHandle = () => {
            AuthAPI.DeleteScore(this.ctx.DeleteScoreId).then(() => {
                alert("删除成功")
            }).catch(() => {
                alert("删除失败")
            }).finally(() => {
                window.location.reload()
            })
        }
        return CreateModal("删除", bodyHandle, this.deleteModalTarget, deleteScoreHandle)
    }

    private async loadAllPlayer() {
        let players: PlayersResponse = {
            Size: 0,
            Count: 0,
            Players: [],
        }

        await API.GetPlayers(1, 50).then(value => {
            players = value
            players.Size = players.Players.length
        })

        const wg = new WaitGroup()
        let ps: number[] = []
        for (let i = 1; i <= players.Count / 50; i++) {
            ps.push(i + 1)
            wg.add(1)
        }
        ps.forEach((value, index, array) => {
            API.GetPlayers(value, 50).then(value => {
                players.Players.push(...value.Players)
                players.Size = players.Players.length
            }).catch().finally(() => {
                wg.done()
            })
        })

        await wg.wait()
        for (let i = 0; i < players.Size; i++) {
            this.ctx.PlayersMap.set(players.Players[i].Name, players.Players[i])
        }
        this.ctx.Players = players
    }

    private async loadAllContest() {
        let contests: GetContestsResponse = {
            Contests: [],
            Count: 0,
            Size: 0
        }

        await API.GetContests(1, 50, "").then(value => {
            contests = value
            contests.Size = contests.Contests.length
        })

        const wg = new WaitGroup()
        let ps: number[] = []
        for (let i = 1; i <= contests.Count / 50; i++) {
            ps.push(i + 1)
            wg.add(1)
        }

        ps.forEach((value, index, array) => {
            API.GetContests(value, 50, "").then(value => {
                contests.Contests.push(...value.Contests)
                contests.Size = contests.Contests.length
            }).catch().finally(() => {
                wg.done()
            })
        })

        await wg.wait()

        for (let i = 0; i < contests.Size; i++) {
            this.ctx.ContestsMap.set(contests.Contests[i].ID, contests.Contests[i])
        }
        this.ctx.Contests = contests
    }

    private once = Once(() => {
        setInterval(this._loadScoresSelect(), 100)
        setInterval(this._loadScoreValue, 100)
        setInterval(() => {
            this.ctx.UpdateHandle({})
        }, 300)
        this.loadAllPlayer().then()
        this.loadAllContest().then()
    })

    init(callback: callback) {
        this.ctx.UpdateHandle = callback
        this.once()
    }

    render() {
        return (
            <div style={{marginTop: "20px"}}>
                {this.GetDeleteModal()}
                <table className="table table-bordered text-center table-hover table-responsive"
                       style={{verticalAlign: "text-top"}}>
                    <thead>
                    <tr>
                        <th colSpan={20}>成绩录入</th>
                    </tr>
                    </thead>
                    {this._adminScoreBody()}
                </table>

                {this._renderScoreList()}
                {renderPenaltyDescription()}
            </div>
        )
    }
}